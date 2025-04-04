import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import { saveService, getServiceDetails, serviceDelete, getSingleService, serviceUpdate } from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { showToast } from "../../commoncomponents/toastUtils";

interface FormErrors {
  name?: string;
  image?: string;
}

export default function ServiceChoice() {
  const [errors, setErrors]: any = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [currentUserData, setCurrentUserData]: any = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [services, setService] = useState([]);
  const [service2, setService2] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(new Array(services.length).fill(false));
  const [serviceList, setServiceList]: any = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [preview, setPreview] = useState<null | string>(null);
  const [newImage, setNewImage] = useState("");

  const pageSize = 5;

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
    const data = isPageVisibleToRole("admin-servicechoice");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      setCurrentUserData(userData);
    }
    fetchServiceDetails();
  }, [currentPage, pageSize]);

  const fetchServiceDetails = async () => {
    try {
      const res = await getServiceDetails();
      if (res.status) {
        setService2(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setService(paginatedPosts);
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
      text: "You want to delete the Service detail",
      icon: "warning",
      //buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      //confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        serviceDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your Service Details has been deleted!", {
                icon: "success",
              });
              fetchServiceDetails();
              setServiceList([]);
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

    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        description: description,
        user_id: currentUserData.id,
      };

      saveService(data, image)
        .then((res) => {
          if (res.status == true) {
            setModalConfirm(false);
            setButtonState(false);

            // Reset form data
            setName("");
            setDescription("");
            setImage("");
            setImage("");
            setPreviewImage("");
            const paginatedPosts = paginate(res.data, currentPage, pageSize);
            setService(paginatedPosts);
            setServiceList([]);
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
    setServiceList((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event: any) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    console.log(image);

    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  const editService = (e: any, id: any) => {
    e.preventDefault();
    editsetModalConfirm(true);
    getSingleService(id).then((res) => {
      setServiceList(res.data);
    });
  };

  const handleUpdateService = (e: any) => {
    e.preventDefault();
    const updatedData: any = {
      id: serviceList.id,
      service_name: serviceList.service_name,
      description: serviceList.description,
    };
    if (e.target.image.files[0]) {
      updatedData.image = e.target.image.files[0];
    }

    serviceUpdate(serviceList.id, updatedData)
      .then((res) => {
        //console.log(res.data);
        editsetModalConfirm(false);
        fetchServiceDetails();
        setServiceList(res.data);
        showToast("success", res.message);
      })
      .catch((err) => {
        toast.error("Failed to update Service. Please try again.", {
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

  const handleMenuBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

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
            <h2>Services Choice</h2>
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
                Add Services Choice Information
              </button>
            </ul>
          </div>
        </div>

        <div className="table-box " id="ffff">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-sm-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: any, index) => (
                <tr key={service.id}>
                  <td>{++index}</td>
                  <td className="chefs_pic">
                    <div className="flex-commn">
                      <div className=""> {service.image ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/admin/service/" + service.image} alt="" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />}</div>
                      <div className="">{service.service_name}</div>
                    </div>
                  </td>
                  {/* <td>{service.service_name}</td> */}
                  <td className="abc">
                    {showFullDescription[index] && service.description ? service.description : service.description ? (service.description.length > 100 ? `${service.description.slice(0, 100)}...` : service.description) : ""}
                    {service.description && service.description.length > 100 && (
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
                          <a className="dropdown-item" href="#" onClick={(e) => editService(e, service.id)}>
                            Edit
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#" onClick={(e) => handleDelete(e, service.id)}>
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
        <Pagination items={service2.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
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
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              {/* <input
                type="file"
                name="image"
                onChange={(e:any) => setImage(e.target.files)}
                accept="jpg,png"
              /> */}
              <input type="file" name="image" onChange={handleImageChange} accept="jpg,png" />
              {previewImage && <img src={previewImage} alt="Preview" style={{ width: "20%", height: "auto" }} />}
            </div>

            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Submit Services Choice Information
            </button>
          </form>
        </div>
      </PopupModal>

      <PopupModal show={editmodalConfirm} handleClose={editmodalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form className="common_form_error" id="menu_form" onSubmit={handleUpdateService}>
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="text" name="service_name" value={serviceList ? serviceList.service_name : ""} onBlur={handleMenuBlur} autoComplete="username" onChange={(e) => setServiceList({ ...serviceList, service_name: e.target.value })} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea name="description" value={serviceList ? serviceList.description : ""} onBlur={handleMenuBlur} onChange={(e) => setServiceList({ ...serviceList, description: e.target.value })}></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              {/* <input type="file" name="image" accept="jpg,png" /> */}
              <input type="file" name="image" accept="jpg,png" onChange={handleInputChange} />
              {newImage ? (
                <img src={newImage} alt="Preview" style={{ width: "20%", height: "100px" }} />
              ) : (
                serviceList.image && <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/admin/service/${serviceList.image}`} alt="Preview" style={{ width: "20%", height: "100px" }} />
              )}
            </div>

            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Update Services Choice Information
            </button>
          </form>
        </div>
      </PopupModal>

      {/* // Menu popup end  */}
      <ToastContainer />
    </>
  );
}
