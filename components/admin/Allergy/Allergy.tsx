import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import { allergy, getAllergyDetails, allergyDelete, getSingleAllergy, updateAllergy } from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { showToast } from "../../commoncomponents/toastUtils";

type Employee = {
  [key: string]: any; // 👈️ variable key
};

interface FormErrors {
  name?: string;
  description?: string;
  image?: string;
}
interface Allergy {
  id: number;
  allergy_name: string;
  description: string;
  image: String;
}

interface FormErrors {
  name?: string;
  image?: string;
}

export default function Allergy() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [deleteAllergy, setdeleteAllergy] = useState(null);
  const [allergis, setAllergis] = useState([]);
  const [allergis2, setAllergis2] = useState([]);
  const [newImage, setNewImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(new Array(allergis.length).fill(false));
  const [previewImage, setPreviewImage] = useState("");
  const [allergyList, setAllergyList] = useState<Allergy>({ id: 0, allergy_name: "", description: "", image: "" });

  const [preview, setPreview] = useState<null | string>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const errors_name: any = { errors };
  const allergy_List: any = { allergyList };

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

  useEffect(() => {
    const data = isPageVisibleToRole("admin-allergy");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      // console.log(userData);
      setCurrentUserData(userData);
    }
    fetchAllergyDetails();
  }, [currentPage, pageSize]);

  const fetchAllergyDetails = async () => {
    try {
      const res = await getAllergyDetails();
      if (res.status) {
        setAllergis2(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setAllergis(paginatedPosts);
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

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleDelete = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the Allergy detail",
      icon: "warning",
      //buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      //confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        allergyDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your Allergy Details has been deleted!", {
                icon: "success",
                timer: 2000, // Close after 2 seconds
              });
              fetchAllergyDetails();
              setAllergyList({ id: 0, allergy_name: "", description: "", image: "" });
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

  //login submit start

  const handlMenuSubmit = (event: any) => {
    event.preventDefault();
    // Validate form data
    const errors: any = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }

    if (!image) {
      errors.image = "Image is required";
    }
    setErrors(errors);
    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
      const currentUserData: any = {};
      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        description: description,
        user_id: currentUserData.id,
      };
      allergy(data, image)
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
            setAllergis(paginatedPosts);
            setAllergyList({ id: 0, allergy_name: "", description: "", image: "" });
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
  //login submit close

  const handleImageChange = (event: any) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    console.log(image);
    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  const editAllergy = (e: any, id: any) => {
    e.preventDefault();
    editsetModalConfirm(true);
    getSingleAllergy(id).then((res) => {
      setAllergyList(res.allergy);
      console.log(res);
    });
  };

  const handleUpdateAllergy = (e: any) => {
    e.preventDefault();
    const updatedData = { ...allergyList };
    // Get the image file
    const imageFile = e.target.image.files[0];
    if (imageFile) {
      updatedData.image = imageFile;
    }
    updateAllergy(updatedData)
      .then((res) => {
        console.log(res.data);
        if (res.status == true) {
          editsetModalConfirm(false);
          fetchAllergyDetails();
          setAllergyList(updatedData);
          showToast("success", res.message);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: "#ffff",
              borderLeft: "4px solid #ff4e00d1",
              color: "#454545",
              "--toastify-icon-color-success": "#ff4e00d1",
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
    setAllergyList((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      case "image":
        if (!value) {
          newErrors.image = "Image is required";
        } else {
          delete newErrors.image;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
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
        <div className="row align-items-center mt-3 mb-3">
          <div className="col-sm-6 col-4">
            <h2>Allergy</h2>
          </div>
          <div className="col-sm-6 col-8 text-lg-0 text-end">
            <ul className="table_header_button_section p-r" id="">
              <button
                className="table-btn border-radius round-white"
                onClick={() => {
                  resetForm();
                  setModalConfirm(true);
                }}
              >
                Add Allergy Information
              </button>
            </ul>
          </div>
        </div>
        <div className="table-box " id="ffff">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">ID</th>
                {/* <th scope="col">Photo</th> */}
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-sm-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allergis.map((allergy: any, index) => (
                <tr key={allergy.id}>
                  <td>{++index}</td>
                  <td className="chefs_pic">
                    <div className="flex-commn">
                      <div className="">{allergy.image ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/admin/allergy/" + allergy.image} alt="" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />}</div>

                      <div className="">{allergy.allergy_name}</div>
                    </div>
                  </td>

                  {/* <td></td> */}
                  {/* <td>{allergy.description}</td> */}
                  <td className="abc">
                    {showFullDescription[index] && allergy.description ? allergy.description : allergy.description ? (allergy.description.length > 100 ? `{allergy.description.slice(0, 100)}...` : allergy.description) : ""}
                    {allergy.description && allergy.description.length > 100 && (
                      <a className="read-more-link" onClick={() => toggleDescription(index)}>
                        {showFullDescription[index] ? "Read Less" : "Read More"}
                      </a>
                    )}
                  </td>
                  <td>
                    <div className="dropdown" id="none-class">
                      <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                          <a className="dropdown-item" href="#" onClick={(e) => editAllergy(e, allergy.id)}>
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
        </div>
        <Pagination items={allergis2.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
      </div>

      {/* // Menu popup start  */}
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form onSubmit={handlMenuSubmit} className="common_form_error" id="menu_form">
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleMenuBlur} autoComplete="username" />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={handleMenuBlur}></textarea>
              {errors.description && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.description}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              {/* <input
                type="file"
                name="image"
                onChange={(e: any) => setImage(e.target.files)}
                accept="jpg,png"
              /> */}
              <input type="file" name="image" onChange={handleImageChange} accept="jpg,png" />
              {errors.image && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.image}</span>}
              {previewImage && <img src={previewImage} alt="Preview" style={{ width: "20%", height: "auto" }} />}
            </div>
            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Submit Allergy Information
            </button>
          </form>
        </div>
      </PopupModal>

      <PopupModal show={editmodalConfirm} handleClose={editmodalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form className="common_form_error" id="menu_form" onSubmit={handleUpdateAllergy}>
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="hidden" id="name" value={allergyList.id} />

              <input type="text" name="allergy_name" value={allergyList ? allergyList.allergy_name : ""} onBlur={handleMenuBlur} autoComplete="username" onChange={handleInputChange} />
              {errors_name.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors_name.name}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea name="description" value={allergyList ? allergyList.description : ""} onBlur={handleMenuBlur} onChange={handleInputChange}></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input type="file" name="image" accept="jpg,png" onChange={handleInputChange} />
              {/* {newImage ? (
                <img src={newImage} alt="Preview" style={{ width: "20%", height: "100px" }} />
              ) : (
                allergyList.image && <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/admin/service/${allergyList.image}`} alt="Preview" style={{ width: "20%", height: "100px" }} />
              )} */}
              {newImage ? (
                <img src={newImage} alt="Preview" style={{ width: "20%", height: "100px" }} />
              ) : (
                allergyList.image && <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/admin/allergy/${allergyList.image}`} alt="Preview" style={{ width: "20%", height: "100px" }} />
              )}
            </div>
            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Update Allergy Information
            </button>
          </form>
        </div>
      </PopupModal>

      {/* // Menu popup end  */}
      <ToastContainer />
    </>
  );
}
