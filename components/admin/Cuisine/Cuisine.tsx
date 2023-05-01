import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import {
  saveCuisine,
  getAllCrusine,
  cuisneDelete,
  getSingleCisine,
  updateCuisine
} from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function Cuisine() {
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [cuisines2, setCuisines2] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(new Array(cuisines.length).fill(false));
  const [cuisinesList, setCuisinesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

<<<<<<< HEAD

=======
  const toggleDescription = (index) => {
    const newShowFullDescription = [...showFullDescription];
    newShowFullDescription[index] = !newShowFullDescription[index];
    setShowFullDescription(newShowFullDescription);
  };

  
>>>>>>> refs/remotes/origin/main
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

    const data = isPageVisibleToRole('admin-cuisine');
    if (data == 2) {
      window.location.href = '/login'; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = '/404'; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      // console.log(userData);
      setCurrentUserData(userData);
    }
    fetchCuisneDetails();
  }, [currentPage, pageSize]);

  const fetchCuisneDetails = async () => {
    try {
      const res = await getAllCrusine();
      if (res.status) {
        setCuisines2(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setCuisines(paginatedPosts);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the cuisine detail",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        cuisneDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your cuisine Details has been deleted!", {
                icon: "success",
              });
              fetchCuisneDetails();
              setCuisinesList([]);
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((err) => {
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          });
      } else {
        // handle cancel
      }
    });
  };

  //login submit start

  const handlMenuSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!description) {
      errors.description = "description is required";
    }

    if (!image) {
      errors.image = "Image is required";
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

      saveCuisine(data, image[0])
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
            const paginatedPosts = paginate(res.data, currentPage, pageSize);
            setCuisines(paginatedPosts);
            setCuisinesList([]);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //login submit close

  const editCuisine = (e, id) => {
    e.preventDefault();
    editsetModalConfirm(true);
    getSingleCisine(id).then((res) => {
      setCuisinesList(res.data);
    });
  };

  const handleUpdateCuisine = (e) => {
    e.preventDefault();
    const updatedData = {
      id: cuisinesList.id,
      name: cuisinesList.name,
      description: cuisinesList.description,
    };
    if (e.target.image.files[0]) {
      updatedData.image = e.target.image.files[0];
    }

    updateCuisine(cuisinesList.id, updatedData)
      .then((res) => {
        console.log(res.data);
        editsetModalConfirm(false);
        fetchCuisneDetails();
        toast.success("Cuisine updated successfully!");
      })

      .catch((err) => {
        toast.error("Failed to update cuisine. Please try again.");
        console.log(err);
      });
  };

  const handleMenuBlur = (event) => {
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


  return (
    <>
      <div className="table-part">
        <h2>Cuisine</h2>
        <ul className="table_header_button_section p-r">
          {/* <li><button className="table-btn">Total</button></li> */}
          <li className="right-li">
            <button
              className="table-btn border-radius round-white"
              onClick={() => setModalConfirm(true)}
            >
              Add{" "}
            </button>
          </li>
        </ul>
        <div className="table-box" id="ffff">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {cuisines.map((cuisine, index) => (
                <tr key={cuisine.id}>
                  <td>{index + 1}</td>
                  <td className="chefs_pic">
                    {cuisine.image && cuisine.image !== 'null' ?
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/chef/cuisine/" +
                          cuisine.image
                        }
                        alt=""
                      />
                      :
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/placeholder.jpg"
                        }
                        alt=""
                      />
                    }
                  </td>
                  <td>{cuisine.name}</td>
                  <td>
                    {cuisine.description && cuisine.description.length > 100 ? (
                      <ReactReadMoreReadLess
                        charLimit={100}
                        readMoreText={"Read more..."}
                        readLessText={"Read less..."}
                      >
                        {cuisine.description}
                      </ReactReadMoreReadLess>
                    ) : (
                      cuisine.description
                    )}
                  </td>


=======
              {cuisines.map((cuisine,index) => (
                <tr key={cuisine.id}>
                  <td>{++index}</td>
                  <td className="chefs_pic">
                    {cuisine.image ? (
                      <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        "/images/chef/cuisine/" +
                        cuisine.image
                      }
                      alt=""
                    />
                    ): (

                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />
                    )}
                    
                  </td>
                  <td>{cuisine.name}</td>
                  {/* <td>{cuisine.description}</td> */}
                  <td className="abc">
                    {showFullDescription[index] && cuisine.description
                      ? cuisine.description
                      : cuisine.description
                      ? cuisine.description.length > 100
                        ? `${cuisine.description.slice(0, 100)}...`
                        : cuisine.description
                      : ""}
                    {cuisine.description &&
                      cuisine.description.length > 100 && (
                        <a
                          className="read-more-link"
                          onClick={() => toggleDescription(index)}
                        >
                          {showFullDescription[index]
                            ? "Read Less"
                            : "Read More"}
                        </a>
                      )}
                  </td>
>>>>>>> refs/remotes/origin/main
                  <td>
                    <div className="dropdown" id="none-class">
                      <a
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => editCuisine(e, cuisine.id)}
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => handleDelete(e, cuisine.id)}
                          >
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
        <Pagination
          items={cuisines2.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>

      {/* // Menu popup start  */}
      <PopupModal
        show={modalConfirm}
        handleClose={modalConfirmClose}
        staticClass="var-login"
      >
        <div className="all-form">
          <form
            onSubmit={handlMenuSubmit}
            className="common_form_error"
            id="menu_form"

          >
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleMenuBlur}
                autoComplete="username"
              />
              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleMenuBlur}
              ></textarea>
              {errors.description && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.description}
                </span>
              )}
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files)}
                accept="jpg,png"
              />
              {errors.image && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.image}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn-send w-100"
              disabled={buttonStatus}
            >
              Submit
            </button>
          </form>
        </div>
      </PopupModal>

      <PopupModal
        show={editmodalConfirm}
        handleClose={editmodalConfirmClose}
        staticClass="var-login"
      >
        <div className="all-form">
          <form className="common_form_error" id="menu_form" onSubmit={handleUpdateCuisine}>
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="allergy_name"
                value={cuisinesList ? cuisinesList.name : ''}
                onBlur={handleMenuBlur}
                autoComplete="username"
                onChange={(e) => setCuisinesList({ ...cuisinesList, name: e.target.value })}
              />
              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea name="description" value={cuisinesList ? cuisinesList.description : ''} onBlur={handleMenuBlur} onChange={(e) => setCuisinesList({ ...cuisinesList, description: e.target.value })}></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input type="file" name="image" accept="jpg,png" />
            </div>

            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>
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
