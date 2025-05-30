import React, { useState, useEffect } from "react";
import { getAllUsers, getUserLocationByFilter, getUserAllLocation, sendMessageToUserByAdmin, userDelete } from "../../../lib/adminapi";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import { send } from "process";
import { showToast } from "../../commoncomponents/toastUtils";
import swal from "sweetalert";
import PageFound from "../../pageFound";

export default function Users() {
  interface User {
    id: number;
    name: string;
    surname: string;
    address: string;
    phone: number;
    pic: string;
  }
  interface Location {
    lat: number;
    name: string;
    surname: string;
    address: string;
    pic: string;
    approved_by_admin: string;
    profile_status: string;
    cuisine_name: string;
    amount: string;
    id: number;
    phone: number;
  }
  const [modalConfirm, setModalConfirm] = useState(false);
  const [getlocation, setGetLocation] = useState<Location[]>([]);
  const [filterLocation, setFilterLocation] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location[]>([]);
  const [getallusers, setAllUsers] = useState<User[]>([]);
  const [totalMenu, setTotalMenu]: any = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLatitudes, setSelectedLatitudes] = useState<number[]>([]);
  const [name, setChefName] = useState("");

  const pageSize = 10;

  useEffect(() => {
    getUserData();
    getAllUserLocation();
  }, []);

  const getUserData = () => {
    const data = isPageVisibleToRole("admin-users");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      getAllUsersData();
    }
  };

  useEffect(() => {
    const locationsArray = Array.isArray(selectedLocation) ? selectedLocation : [selectedLocation];
    getUserLocationByFilter({ locations: locationsArray.join(",") })
      .then((res) => {
        if (res.status) {
          setFilterLocation(res.data);
          // console.log(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedLocation]);
  const getAllUsersData = async () => {
    getAllUsers()
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, currentPage, pageSize);
          setAllUsers(paginatedPosts);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckboxLocationChange = (e: any) => {
    const value = e.target.value;
    console.log("Checkbox value:", value);

    if (e.target.checked) {
      setSelectedLocation((prevLocations) => [...prevLocations, value]);
    } else {
      setSelectedLocation((prevLocations) => prevLocations.filter((c) => c !== value));
    }
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getAllUsers()
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setAllUsers(paginatedPosts);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  const getAllUserLocation = () => {
    getUserAllLocation()
      .then((res) => {
        if (res.status) {
          setGetLocation(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeLocation = (location: any) => {
    setSelectedLocation((prevLocations) => prevLocations.filter((c) => c !== location));
  };

  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const [modalConfirmTwo, setModalConfirmTwo] = useState(false);

  const [buttonStatus, setButtonState] = useState(false);

  const [message, setMessage] = useState("");

  const handleFilterSelection = (filter: any) => {
    if (selectedFilters.includes(filter)) {
      // Deselect the filter if it was previously selected
      setSelectedFilters(selectedFilters.filter((selected: any) => selected !== filter));
    } else {
      // Select the filter
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const isFilterSelected = (filter: any) => selectedFilters.includes(filter);

  const modalConfirmCloseTwo = () => {
    setModalConfirmTwo(false);
  };

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();
    setButtonState(true);
    const data = {
      message: message,
      user_id: selectedFilters,
    };


    sendMessageToUserByAdmin(data)
      .then((res) => {
        if (res.status == true) {
          setModalConfirmTwo(false);
          setButtonState(false);
          setMessage("");
          showToast("success", res.message);
        } else {
          setButtonState(false);
          setModalConfirmTwo(false);
          setMessage("");
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
        console.error(err);
      });
  };

  const handleChef = (e: any) => {
    const searchTerm = e.target.value;

    if (!searchTerm) {
      getAllUsersData();
      setChefName(searchTerm);
    } else {
      setChefName(searchTerm);

      const filteredUsers = totalMenu.filter((user: any) => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setAllUsers(filteredUsers);
    }
  };

  const handleDelete = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the User Profile",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willDelete) => {
      if (willDelete) {
        userDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your User has been deleted!", {
                icon: "success",
              });
              getAllUsersData();
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

  return (
    <>
      <div className="table-part">
        <h2>Users</h2>

        <div className="row align-items-center mt-3 mb-3">
          <div className="col-8">
            <ul className="table_header_button_section p-r">
              <li className="text-right">
                <button className="table-btn border-radius round-white" onClick={() => setModalConfirm(true)}>
                  Filter{" "}
                </button>{" "}
                <button className="table-btn border-radius round-white" onClick={() => window.location.reload()}>
                  Clear All{" "}
                </button>
                {selectedFilters.length > 0 && (
                  <button className="table-btn border-radius round-white mx-2" onClick={() => setModalConfirmTwo(true)}>
                    Send message
                  </button>
                )}
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-12">
            {" "}
            <input type="text" className="form-control" placeholder="Search user here.." onChange={handleChef} />
          </div>
        </div>

        <div className="table-box">
          {getallusers.length > 0 ? (
            <table className="table table-borderless">
              <thead>
                <tr>
                  {/* {filterLocation.length > 0 && <th scope="col">Select</th>} */}
                  <th scope="col">Select</th>
                  <th scope="col">Name</th>
                  <th scope="col">Current Location</th>
                  <th scope="col">Phone no.</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterLocation.length > 0
                  ? filterLocation.map((user: any, index: any) => (
                      <tr key={index}>
                        <td className="chefs_pic">
                          <input
                            type="checkbox"
                            checked={isFilterSelected(user.id)} // You can customize this based on your data
                            onChange={() => handleFilterSelection(user.id)} // You can use a unique identifier for each user
                          />
                        </td>
                        <td>
                          <div className="flex-commn">
                            <div className="">
                              {user.pic ? (
                                <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + user.pic} alt="" height={35} width={35} style={{ borderRadius: "50px" }} />
                                </a>
                              ) : (
                                <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" height={35} width={35} style={{ borderRadius: "50px" }} />
                                </a>
                              )}
                            </div>
                            <div className="">
                              {" "}
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                                {user.name || ""} {user.surname || ""}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>{user.address || "N/A"}</td>
                        <td>{user.phone || "N/A"}</td>
                        <td style={{ paddingLeft: "25px" }}>
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  : getallusers.map((user, index) => (
                      <tr key={index}>
                        <td className="chefs_pic">
                          <input
                            type="checkbox"
                            checked={isFilterSelected(user.id)} // You can customize this based on your data
                            onChange={() => handleFilterSelection(user.id)} // You can use a unique identifier for each user
                          />
                        </td>
                        <td>
                          <div className="flex-commn">
                            <div className="">
                              {user.pic ? (
                                <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + user.pic} alt="" height={35} width={35} style={{ borderRadius: "50px" }} />
                                </a>
                              ) : (
                                <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" height={35} width={35} style={{ borderRadius: "50px" }} />
                                </a>
                              )}
                            </div>
                            <div className="">
                              {" "}
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                                {user.name || ""} {user.surname || ""}
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>{user.address || "N/A"}</td>
                        <td>{user.phone || "N/A"}</td>
                        <td style={{ paddingLeft: "25px" }}>
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </a>
                          {"   "}
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/users/" + user.id}>
                            <i className="fa fa-trash" aria-hidden="true" onClick={(e) => handleDelete(e, user.id)}></i>
                          </a>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          ) : (
            <p className="book1 text-center">No Records Found</p>
          )}
        </div>
      </div>

      <PopupModal show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
        <h4 style={{ color: "#ff4e00d1", textAlign: "center" }}>Send Message</h4>
        <div className="all-form">
          <form onSubmit={handleRegisterSubmit} className="common_form_error" id="register_form">
            <div className="login_div">
              <label htmlFor="name">Enter Message:</label>
              <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>

            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>
              {buttonStatus ? "Please wait.." : "Submit"}
            </button>
          </form>
        </div>
      </PopupModal>

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Locations
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="location-filter">
                {getlocation.map((location: any, index: any) => (
                  <div className="col-sm-12" key={index}>
                    <input type="checkbox" value={location.lat} onChange={handleCheckboxLocationChange} style={{ marginRight: "5px" }} checked={selectedLocation.includes(location.lat)} />
                    <label style={{ marginLeft: "5px" }}>{location.address}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopupModal>

      {!name && <Pagination items={totalMenu.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />}

      <ToastContainer />
    </>
  );
}
