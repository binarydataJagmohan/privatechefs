import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import {
	saveService,
	getServiceDetails,
	serviceDelete,
	getSingleService,
	serviceUpdate
} from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";

export default function ServiceChoice() {
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [services, setService] = useState([]);
  const [service2, setService2] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  
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

    const data = isPageVisibleToRole('admin-servicechoice');
			if (data == 2) {
			  window.location.href = '/login'; // redirect to login if not logged in
			} else if (data == 0) {
			  window.location.href = '/404'; // redirect to 404 if not authorized
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
      text: "You want to delete the Service detail",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      confirmButtonColor: "#062B60",
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

      saveService(data, image[0])
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
			setService(paginatedPosts);
			setServiceList([]);
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

const editService = (e, id) => {
  e.preventDefault();
  editsetModalConfirm(true);
  getSingleService(id).then((res) => {
    setServiceList(res.data);
  });
};

const handleUpdateService = (e) => {
  e.preventDefault();
  const updatedData = {
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
      toast.success("service updated successfully!");
    })
    .catch((err) => {
      toast.error("Failed to update Service. Please try again.");
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
        <h2>Services Choice</h2>
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
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td className="chefs_pic">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        "/images/admin/service/" +
                        service.image
                      }
                      alt=""
                    />
                  </td>
                  <td>{service.service_name}</td>
                  <td>{service.description}</td>
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
                            onClick={(e) => editService(e, service.id)}
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => handleDelete(e, service.id)}
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
          items={service2.length}
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
  <form className="common_form_error" id="menu_form" onSubmit={handleUpdateService}>
    <div className="login_div">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="service_name"
        value={serviceList ? serviceList.service_name : ''}
        onBlur={handleMenuBlur}
        autoComplete="username"
        onChange={(e) => setServiceList({ ...serviceList, service_name: e.target.value })}
      />
      {errors.name && (
        <span className="small error text-danger mb-2 d-inline-block error_login">
          {errors.name}
        </span>
      )}
    </div>
    <div className="login_div">
      <label htmlFor="Description">Description:</label>
      <textarea name="description" value={serviceList ? serviceList.description : ''} onBlur={handleMenuBlur} onChange={(e) => setServiceList({ ...serviceList, description: e.target.value })}></textarea>
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
