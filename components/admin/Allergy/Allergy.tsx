import React, { useState, useEffect } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import {
  allergy,
  getAllergyDetails,
  allergyDelete,
  getSingleAllergy,
} from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";

export default function Allergy() {
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [deleteAllergy, setdeleteAllergy] = useState(null);
  const [allergis, setAllergis] = useState([]);
  const [allergis2, setAllergis2] = useState([]);
  const [allergyList, setAllergyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  
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
      text: "You want to delete the Allergy detail",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        allergyDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your Allergy Details has been deleted!", {
                icon: "success",
              });
              fetchAllergyDetails();
			  setAllergyList([]);
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

    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        description: description,
      };

      allergy(data, image[0])
        .then((res) => {
          if (res.status == true) {
            setModalConfirm(false);
            setButtonState(false);
            //console.log(res);
			const paginatedPosts = paginate(res.data, currentPage, pageSize);
			setAllergis(paginatedPosts);
			setAllergyList([]);
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

  const editAllergy = (e, id) => {
    e.preventDefault();
    editsetModalConfirm(true);
    getSingleAllergy(id).then((res) => {
      //console.log(res);
	  setAllergyList(res.allergy);
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

  //login submit close

  //edit Allergy functions

  return (
    <>
      <div className="table-part">
        <h2>Allergy</h2>
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
              {allergis.map((allergy) => (
                <tr key={allergy.id}>
                  <td>{allergy.id}</td>
                  <td className="chefs_pic">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        "/images/admin/allergy/" +
                        allergy.image
                      }
                      alt=""
                    />
                  </td>
                  <td>{allergy.allergy_name}</td>
                  <td>{allergy.description}</td>
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
                            onClick={(e) => editAllergy(e, allergy.id)}
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => handleDelete(e, allergy.id)}
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
          items={allergis2.length}
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
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files)}
                accept="jpg,png"
              />
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
          <form className="common_form_error" id="menu_form">
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={allergyList.allergy_name}
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
              <textarea name="description" value={allergyList.description} onBlur={handleMenuBlur}></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input type="file" name="image" accept="jpg,png" />
            </div>

            <button
              type="submit"
              className="btn-send w-100"
              disabled={buttonStatus}
            >
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
