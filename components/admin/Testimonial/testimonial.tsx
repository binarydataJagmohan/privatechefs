import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";

import { testimonial, getTestimonials, testimonialDelete, getSingleTestimonial, updateTestimonial } from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { showToast } from "../../commoncomponents/toastUtils";
import PageFound from "../../pageFound";

interface FormErrors {
  name?: string;
  description?: string;
  image?: string;
  stars?: number;
}
interface Testimonial {
  id: number;
  name: string;
  description: string;
  image: String;
  stars: number;
}

export default function Allergy() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStar] = useState(0);
  const [image, setImage] = useState("");
  const [deleteAllergy, setdeleteAllergy] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonials2, setTestimonials2] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(new Array(testimonial.length).fill(false));
  const [previewImage, setPreviewImage] = useState("");
  const [testimonialList, settestimonialList] = useState<Testimonial>({ id: 0, name: "", description: "", stars: 0, image: "" });
  const [preview, setPreview] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const errors_name: any = { errors };
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const toggleDescription = (index: any) => {
    const newShowFullDescription = [...showFullDescription];
    newShowFullDescription[index] = !newShowFullDescription[index];
    setShowFullDescription(newShowFullDescription);
  };

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };
  const modalConfirmClose = () => {
    setModalConfirm(false);
  };
  const editmodalConfirmOpen = () => {
    editsetModalConfirm(true);
  };
  const editmodalConfirmClose = () => {
    editsetModalConfirm(false);
  };

  const handlMenuSubmit = (event: any) => {
    event.preventDefault();
    // Validate form data
    const errors: any = {};
    if (!name) {
      errors.name = "Name is required";
    }
    // if (!stars) {
    //     errors.stars = "Stars is required";
    // }
    setErrors(errors);
    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
      // const currentUserData: any = {};
      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        description: description,
        user_id: localStorage.getItem("id"),
        stars: stars,
      };
      //  console.log(data.user_id);
      testimonial(data, image)
        .then((res) => {
          if (res.status == true) {
            console.log(data);
            setModalConfirm(false);
            setButtonState(false);
            //console.log(res);
            // Reset form data
            setName("");
            setDescription("");
            setImage("");
            setPreviewImage("");
            const paginatedPosts = paginate(res.data, currentPage, pageSize);
            setTestimonials(paginatedPosts);
            settestimonialList({ id: 0, name: "", description: "", image: "", stars: 0 });
            showToast("success", res.message);
          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: "#ffff",
                borderLeft: "4px solid #e74c3c",
                color: "#454545",
              },
              progressStyle: {
                background: "#ffff",
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleMenuBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors: any = { ...errors };
    switch (name) {
      case "name":
        if (!value) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const editTestimonial = (e: any, id: any) => {
    e.preventDefault();
    editsetModalConfirm(true);
    getSingleTestimonial(id).then((res) => {
      settestimonialList(res.testimonial);
      setStar(res.testimonial.stars);
      console.log(res.testimonial.stars);
    });
  };

  const handleUpdateTestimonial = (e: any) => {
    e.preventDefault();
    const updatedData = { ...testimonialList };
    // Get the image file
    const imageFile = e.target.image.files[0];
    if (imageFile) {
      updatedData.image = imageFile;
    }
    // Set the updated star value
    updatedData.stars = stars; // Assuming 'stars' is the updated star value
    updateTestimonial(updatedData)
      .then((res) => {
        console.log(res.data);
        editsetModalConfirm(false);
        fetchTestimonialDetails();
        settestimonialList(updatedData);
        showToast("success", res.message);
      })
      .catch((err) => {
        toast.error("Failed to update testimonial. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: "#ffff",
            borderLeft: "4px solid #e74c3c",
            color: "#454545",
          },
          progressStyle: {
            background: "#ffff",
          },
        });
        console.log(err);
      });
  };

  const handleImageChange = (event: any) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    console.log(image);
    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result as string);
        setNewImage(reader.result as string); // Set the new image URL here
      };
    }
    settestimonialList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the Testimonial detail",
      icon: "warning",
      //buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      //confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        testimonialDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your Testimonials Details has been deleted!", {
                icon: "success",
              });
              fetchTestimonialDetails();
              settestimonialList({ id: 0, name: "", description: "", image: "", stars: 0 });
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: "#ffff",
                  borderLeft: "4px solid #e74c3c",
                  color: "#454545",
                },
                progressStyle: {
                  background: "#ffff",
                },
              });
            }
          })
          .catch((err) => {
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: "#ffff",
                borderLeft: "4px solid #e74c3c",
                color: "#454545",
              },
              progressStyle: {
                background: "#ffff",
              },
            });
          });
      } else {
        // handle cancel
      }
    });
  };

  useEffect(() => {
    const data = isPageVisibleToRole("admin-testimonial");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      console.log(userData);
      setCurrentUserData(userData);
    }
    fetchTestimonialDetails();
  }, [currentPage, pageSize]);

  const fetchTestimonialDetails = async () => {
    try {
      const res = await getTestimonials();
      if (res.status) {
        setTestimonials2(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setTestimonials(paginatedPosts);
        console.log(paginatedPosts);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: "#ffff",
            borderLeft: "4px solid #e74c3c",
            color: "#454545",
          },
          progressStyle: {
            background: "#ffff",
          },
        });
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeButton: true,
        hideProgressBar: false,
        style: {
          background: "#ffff",
          borderLeft: "4px solid #e74c3c",
          color: "#454545",
        },
        progressStyle: {
          background: "#ffff",
        },
      });
    }
  };
  // const handleStarHover = (num: number) => {
  //     const starColor = num > 0 ? "blue" : "orange";
  //     const stars = document.querySelectorAll(".fa-star");
  //     stars.forEach((star, index) => {
  //         (star as HTMLElement).style.color = index < num ? starColor : "orange";
  //     });
  // };

  const handleStarHover = (num: number) => {
    const starColor = num > 0 ? "orange" : "blue";
    const stars = document.querySelectorAll(".fa-star");
    stars.forEach((star, index) => {
      (star as HTMLElement).style.color = index < num ? starColor : "#ff4e00d1";
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCurrentUserData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };
  const resetForm = () => {
    setName("");
    setDescription("");
    setImage("");
    setErrors({});
  };

  return (
    <>
      <div className="table-part">
        <h2>Testimonial</h2>
        <ul className="table_header_button_section p-r">
          <li className="right-li" id="allergy-id">
            <button
              className="table-btn border-radius round-white"
              onClick={() => {
                resetForm();
                setModalConfirm(true);
              }}
            >
              Add
            </button>
          </li>
        </ul>
        <div className="table-box" id="ffff">
          {testimonials.length > 0 ? (
            <table className="table table-borderless common_booking">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Star</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((allergy: any, index) => (
                  <tr key={allergy.id}>
                    <td>{++index}</td>
                    <td className="chefs_pic">
                      {allergy.image ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/admin/testimonial/" + allergy.image} alt="" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />}
                    </td>

                    <td>{allergy.name}</td>
                    {/* <td>{allergy.description}</td> */}
                    <td className="abc">
                      {showFullDescription[index] && allergy.description ? allergy.description : allergy.description ? (allergy.description.length > 100 ? `${allergy.description.slice(0, 100)}...` : allergy.description) : ""}
                      {allergy.description && allergy.description.length > 100 && (
                        <a className="read-more-link" onClick={() => toggleDescription(index)}>
                          {showFullDescription[index] ? "Read Less" : "Read More"}
                        </a>
                      )}
                    </td>
                    <td>{allergy.stars}</td>
                    <td>
                      <div className="dropdown" id="none-class">
                        <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis"></i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li>
                            <a className="dropdown-item" href="#" onClick={(e) => editTestimonial(e, allergy.id)}>
                              Edit
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#" onClick={(e) => handleDelete(e, allergy.id)}>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <PageFound iconClass={"fa-solid fa-comment-dots"} heading={" No testimonials yet "} subText={"Be the first to leave a testimonial!"} />
            </>
          )}
        </div>
        <Pagination items={testimonials2.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
      </div>

      {/* // Menu popup start  */}
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form className="common_form_error" id="menu_form" onSubmit={handlMenuSubmit}>
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="username" onBlur={handleMenuBlur} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Star">Star:</label>
              <input type="hidden" name="stars" value={stars} onChange={handleChange} />
              {/* <p className="star-list blue-star" id="star-color">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <i
                                        key={num}
                                        className={`fa${num <= (0) ? 's' : 'r'} fa-star`}
                                        onMouseEnter={() => handleStarHover(num)}
                                        onClick={() => setStar(num)}
                                    />
                                ))}
                            </p> */}
              <p className="star-list blue-star" id="star-color">
                {[1, 2, 3, 4, 5].map((num) => (
                  <i key={num} className={`fa${num <= stars ? "s" : "r"} fa-star`} onMouseEnter={() => handleStarHover(num)} onClick={() => setStar(num)} />
                ))}
              </p>
              {errors.stars && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.stars}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input type="file" name="image" accept="jpg,png" onChange={handleImageChange} />
              {previewImage && <img src={previewImage} alt="Preview" style={{ width: "20%", height: "auto" }} />}
            </div>
            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Submit
            </button>
          </form>
        </div>
      </PopupModal>

      <PopupModal show={editmodalConfirm} handleClose={editmodalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form className="common_form_error" id="menu_form" onSubmit={handleUpdateTestimonial}>
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="hidden" id="name" value={testimonialList.id} />

              <input type="text" name="name" value={testimonialList ? testimonialList.name : ""} autoComplete="username" onChange={handleInputChange} onBlur={handleMenuBlur} />
              {errors_name.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors_name.name}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea name="description" value={testimonialList ? testimonialList.description : ""} onChange={handleInputChange}></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Star">Star:</label>
              <input type="hidden" name="stars" onChange={handleChange} />
              <p className="star-list blue-star" id="star-color">
                {[1, 2, 3, 4, 5].map((num) => (
                  <i key={num} className={`fa${num <= stars ? "s" : "r"} fa-star`} onMouseEnter={() => handleStarHover(num)} onClick={() => setStar(num)} />
                ))}
              </p>
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input type="file" name="image" accept="jpg,png" onChange={handleInputChange} />

              {newImage ? (
                <img src={newImage} alt="Preview" style={{ width: "20%", height: "100px" }} />
              ) : (
                testimonialList.image && <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/admin/testimonial/${testimonialList.image}`} alt="Preview" style={{ width: "20%", height: "100px" }} />
              )}
            </div>
            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Update
            </button>
          </form>
        </div>
      </PopupModal>
      {/* // Menu popup end  */}
      <ToastContainer />
    </>
  );
}
