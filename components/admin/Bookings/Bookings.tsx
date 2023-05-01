import React, { useState, useEffect } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserBybooking, getUserBookingId } from "../../../lib/adminapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";

export default function Bookings() {
  const [bookingUsers, setBookingUser] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [sidebarConfirm,setSidebarConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };
  const modalConfirmClose = () => {
    setModalConfirm(false);
  };
  const sidebarConfirmOpen = () => {
    setSidebarConfirm(true);
  };
  const sidebarConfirmClose = () => {
    setModalConfirm(false);
  };
 

  useEffect(() => {
    const data = isPageVisibleToRole("admin-bookings");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
    }
    fetchBookingUserDetails();
  }, []);

  const fetchBookingUserDetails = async () => {
    try {
      const res = await getUserBybooking();
      if (res.status) {
        setBookingUser(res.data);
        //const paginatedPosts = paginate(res.data, currentPage, pageSize);
        //setAllergis(paginatedPosts);
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

  const getSingleBookingUser = (e, id) => {
    e.preventDefault();
    getUserBookingId(id).then((res) => {
      setSelectedUser(res.data);
      console.log(res.data)
      setSidebarConfirm(true);
    });
  };

  

  return (
    <>
      <div className="table-part">
        <h2>Bookings</h2>
        <ul className="table_header_button_section">
          <li>
            <button className="table-btn active">Total</button>
          </li>
          <li>
            <button className="table-btn btn-2">Upcoming</button>
          </li>
          <li>
            <button className="table-btn btn-2">Cancelled</button>
          </li>
          <li>
            <button className="table-btn btn-2" >
              Completed
            </button>
          </li>
        </ul>
        <div className="table-box">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Date Requested</th>
                {/* <th scope="col">Booking Date</th> */}
                <th scope="col">Address</th>
                <th scope="col">Category</th>
                <th scope="col">Chef</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {bookingUsers.map((user) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name + " " + user.surname}</td>
                  <td>{user.date}</td>
                  {/* <td>2/11/12</td> */}
                  <td>{user.address}</td>
                  <td>{user.category}</td>
                  <td className="chefs_pic">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "images/booking_chef_pic.png"
                      }
                      alt=""
                    />
                  </td>
                  <td>{user.booking_status}</td>

                  <td>
                    <a
                      href="#"
                      className="popup"
                      onClick={(e)=>getSingleBookingUser(e,user.id)}
                      data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"    
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
        <div className="offcanvas-part">
          <div
            className="offcanvas offcanvas-end"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">
                Booking Details <button>Cancel</button>
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div>
                <button className="table-btn btn-2 date mr-sp">{selectedUser.date}</button>
                <button className="table-btn btn-2 Pending">Pending</button>
              </div>
              <div className="off-can">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Service Details
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="row mt-1">
                          <div className="col-4">
                            <p className="chefs-name name-12">Service Type:</p>
                          </div>
                          <div className="col-8">
                            <p className="mony f-w-4">{selectedUser.category}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-4">
                            <p className="chefs-name name-12">Service </p>
                          </div>
                          <div className="col-8">
                            <p className="mony f-w-4">{selectedUser.service_name}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-4">
                            <p className="chefs-name name-12">Meal:</p>
                          </div>
                          <div className="col-8">
                            <button className="table-btn btn-2 list-btn">
                              Breakfast
                            </button>
                            <button className="table-btn btn-2 list-btn">
                              Lunch
                            </button>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-4">
                            <p className="chefs-name name-12">Meal:</p>
                          </div>
                          <div className="col-8">
                            <button className="table-btn btn-2 list-btn">
                              Breakfast
                            </button>
                            <button className="table-btn btn-2 list-btn">
                              Lunch
                            </button>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-4">
                            <p className="chefs-name name-12">Meal:</p>
                          </div>
                          <div className="col-8">
                            <button className="table-btn btn-2 list-btn">
                              Breakfast
                            </button>
                            <button className="table-btn btn-2 list-btn">
                              Lunch
                            </button>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-4">
                            <p className="chefs-name name-12">
                              Special Requests:
                            </p>
                          </div>
                          <div className="col-8">
                            <p className="mony f-w-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Sit neque diam neque facilisis.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Customer Details
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="row mt-1">
                          <div className="col-5 text-right">
                            <p className="chefs-name name-12">
                              Number of people:
                            </p>
                          </div>
                          <div className="col-7"></div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5 text-right">
                            <p className="chefs-name name-12">adults</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">{selectedUser.adults}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5 text-right">
                            <p className="chefs-name name-12">Teens:</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">{selectedUser.teens}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5 text-right">
                            <p className="chefs-name name-12">Children:</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">{selectedUser.childrens}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5">
                            <p className="chefs-name name-12">Full Name:</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">{selectedUser.name + " " +selectedUser. surname }</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5">
                            <p className="chefs-name name-12">Email:</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5">
                            <p className="chefs-name name-12">Phone Number:</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">{selectedUser.phone}</p>
                          </div>
                        </div>
                        <div className="row mt-1">
                          <div className="col-5">
                            <p className="chefs-name name-12">Location:</p>
                          </div>
                          <div className="col-7">
                            <p className="mony">
                              {/* 1901 Thornridge Cir. Shiloh, Hawaii 81063 */}
                              {selectedUser.location}
                            </p>
                          </div>
                        </div>
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL + "images/map.png"
                          }
                          alt="map"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
     

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="popup-part new-modala">
          <h2 className="title-pop up-move">Booking #98283</h2>
          <div className="offers">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="all-form">
                  <label className="f-w-4">Chef’s Offer:</label>
                  <input
                    type="text"
                    placeholder="432$"
                    className="placeholder-goldan-text"
                  />
                </div>
              </div>
              <div className="col-sm-2  col-6">
                <button className="pop-btn ">Menu 1</button>
              </div>
              <div className="col-sm-2  col-6">
                <button className="pop-btn">Menu 2</button>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="all-form">
                  <label className="f-w-4">Chef’s Menu:</label>
                  <p className="f-10">
                    Please pick one to send to the customer
                  </p>
                </div>
                <div className="pop-border-box">
                  <div className="faq-part">
                    <div className="accordion-part ">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              How does Private Chef Work?
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Private Chefs allows you to enjoy the experience
                              of having a private chef anywhere in the world. As
                              a guest,
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Who is the team behind Private Chefs?
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Private Chefs allows you to enjoy the experience
                              of having a private chef anywhere in the world. As
                              a guest...
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              How can I contact Private Chefs?
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Private Chefs allows you to enjoy the experience
                              of having a private chef anywhere in the world.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="banner-btn">
                    <a href="#">Start your journey</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopupModal>
    </>
  );
}
