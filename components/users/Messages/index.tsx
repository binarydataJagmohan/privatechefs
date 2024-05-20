import React, { useState, useEffect, useRef } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModalXtraLarge";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserBookingId, deleteBooking } from "../../../lib/adminapi";
import { getCurrentUserByBooking, getUserFilterByBooking, getUserChefOffer } from "../../../lib/userapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";
import swal from "sweetalert";
import * as CryptoJS from "crypto-js";
import PageFound from "../../pageFound";
export default function Booking() {
  interface Booking {
    adults?: number;
    allergies?: string;
    booking_id?: number;
    booking_status?: string;
    category?: string;
    childrens?: number;
    cuisines?: string;
    dates?: string;
    email?: string;
    lat?: string;
    lng?: string;
    latest_created_at?: string;
    location?: string;
    name?: string;
    notes?: string;
    service_name?: string;
    surname?: string;
    teens?: number;
    user_id?: number;
    phone?: string;
  }

  interface DaysBookingCheck {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  }

  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string;
  }

  interface MenuData {
    id: number;
    name?: string;
    menu_name?: string;
    image?: string;
  }

  interface Errors {
    amount?: string;
    selectedmenu?: string;
  }

  interface ChefOffer {
    name?: string;
    surname?: string;
    menu_names?: string;
    amount?: string;
    admin_amount?: string;
    client_amount?: string;
    pic?: string;
    user_show?: string;
  }

  interface ChefAppliedOffer {
    amount?: string;
    chef_id?: string;
    location?: string;
    menu_names?: string;
    name?: string;
    surname?: string;
    booking_id?: string;
  }

  const [bookingUsers, setBookingUser] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [sidebarConfirm, setSidebarConfirm] = useState(false);
  const [booking, setBooking] = useState<Booking>({});
  const [totalBooking, setTotalBooking] = useState([]);
  const [bookingdate, setBookingDate] = useState("");
  const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingid, setBookingId] = useState("");
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: "",
    name: "",
    email: "",
    pic: null,
    surname: "",
    role: "",
    approved_by_admin: "",
  });

  const [chefoffer, setChefOffer] = useState<ChefOffer[]>([]);

  const [menu, setMenu] = useState<MenuData[]>([]);

  const [errors, setErrors] = useState<Errors>({});

  const [amount, setAmount] = useState("");

  const [selectedmenu, setSelectedMenu] = useState<number[]>([]);

  const [category, setBookingCategory] = useState("");

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

  const [chefappliedoffer, setChefAppliedOffer] = useState<ChefAppliedOffer[]>([]);

  const pageSize = 10;

  useEffect(() => {
    const data = isPageVisibleToRole("user-bookings");
    if (data == 2) {
      window.location.href = "/"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData() as CurrentUserData;
      fetchBookingUserDetails(userData.id);
      setCurrentUserData({
        ...userData,
        id: userData.id,
        name: userData.name,
        pic: userData.pic,
        surname: userData.surname,
        role: userData.role,
        approved_by_admin: userData.approved_by_admin,
      });
    }
  }, []);

  const fetchBookingUserDetails = async (id: any) => {
    try {
      const res = await getCurrentUserByBooking(id);
      if (res.status) {
        setTotalBooking(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setBookingUser(paginatedPosts);
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
    getCurrentUserByBooking(currentUserData.id)
      .then((res) => {
        if (res.status == true) {
          setTotalBooking(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setBookingUser(paginatedPosts);
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSingleBookingUser = (e: any, id: any) => {
    e.preventDefault();
    getUserBookingId(id).then((res) => {
      //   console.log(res.booking[0]);
      setBooking(res.booking[0]);
      setChefOffer(res.chefoffer);
      setDaysBooking(res.days_booking);
      setSidebarConfirm(true);
      setBookingCategory(res.days_booking[0].category);

      if (res.days_booking.length == 1) {
        setBookingDate(formatDate(res.booking[0].dates));
      } else {
        const datesString = res.booking[0].dates;
        const dates = datesString.split(",").map((dateString: string) => formatDate(dateString));
        const startDate = dates[0];
        const endDate = dates[dates.length - 1];
        const output = `${startDate} to ${endDate}`;
        setBookingDate(output);
      }

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
        version: "weekly",
      });

      loader.load().then(() => {
        // create a new map instance
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: parseFloat(res.booking[0].lat), lng: parseFloat(res.booking[0].lng) },
            zoom: 12,
          });

          const marker = new google.maps.Marker({
            position: { lat: parseFloat(res.booking[0].lat), lng: parseFloat(res.booking[0].lng) },
            map: map,
            title: res.booking[0].location,
          });
        }
      });
    });
  };

  const formatDate = (value: any) => {
    return moment(value).format("D/M/YY");
  };

  const handleButtonClick = (index: any, type: string, id: string) => {
    setActiveIndex(index);
    if (type == "all") {
      fetchBookingUserDetails(id);
    } else {
      getUserFilterByBooking(id, type)
        .then((res) => {
          if (res.status == true) {
            setTotalBooking(res.data);
            const paginatedPosts = paginate(res.data, currentPage, pageSize);
            setBookingUser(paginatedPosts);
          } else {
            setErrorMessage(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBookingApplyAmount = (e: any) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    switch (name) {
      case "amount":
        if (value.trim() === "") {
          newErrors.amount = "Amount is required";
        } else if (!/^\d+$/.test(value.trim())) {
          newErrors.amount = "Amount should be a number";
        } else {
          delete newErrors.amount;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleMenuItemChange = (event: any, menuItemId: any) => {
    const isChecked = event.target.checked;
    setSelectedMenu((prevMenuItems: any) => (isChecked ? [...prevMenuItems, menuItemId] : prevMenuItems.filter((item: any) => item !== menuItemId)));
  };

  const handleMenuItemBlur = (event: any) => {};

  const resetFields = () => {
    setAmount("");
    setSelectedMenu([]);
    console.log(selectedmenu);
  };

  const deleteBookingByAdmin = (id: any) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the booking",
      icon: "warning",
      buttons: ["No", "Yes"], // Modify the buttons here
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteBooking(id)
          .then((res) => {
            if (res.status === true) {
              swal("Booking has been deleted succesfully", {
                icon: "success",
              });
              fetchBookingUserDetails(currentUserData.id);
            } else {
              swal(res.message, {
                icon: "info",
              });
            }
          })
          .catch((err) => {
            // Handle error
          });
      } else {
        // Handle cancellation
      }
    });
  };

  const editbooking = (id: any) => {
    window.localStorage.removeItem("time");
    window.localStorage.removeItem("servicetype");
    window.localStorage.removeItem("servicestyle");
    window.localStorage.removeItem("selectedMeals");
    window.localStorage.removeItem("selectedcuisine");
    window.localStorage.removeItem("selectedallergies");
    window.localStorage.removeItem("additionalnotes");
    window.localStorage.setItem("bookingid", id);
    window.location.href = "/user/edit-booking/step1";
  };

  const getuserchefofferdata = (e: any, id: any) => {
    getUserChefOffer(id)
      .then((res) => {
        if (res.status == true) {
          console.log(res.chefoffer);
          setChefAppliedOffer(res.chefoffer);
          setModalConfirm(true);
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChatClick = (user_id: any, chef_id: any, booking_id: any) => {
    const ids = `${user_id},${chef_id},${booking_id}`;

    // Encrypt the IDs using AES encryption
    const encryptedIds = CryptoJS.AES.encrypt(ids, "your-secret-key").toString();

    // URL-encode the encrypted IDs
    const encodedIds = encodeURIComponent(encryptedIds);

    // Create the URL
    const url = `http://localhost/laravel/circle/messages/${encodedIds}`;
    console.log(url);
  };

  return (
    <>
      <section className="userprofile-part">
        <div className="container">
          <div className="my-profile mt-5 tab-m-0">
            <h2>
              {" "}
              My profile{" "}
              <span className="log-out">
                <a href="#">Log out</a>
              </span>
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="my-profile">
                <a href="/user/userprofile">
                  <div className="profile-cols mt-5">
                    <h4>Account Settings</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </a>
                <div className="profile-cols mt-4 active">
                  <h4>My Bookings</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <a href="/user/userprofilethree">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Aditional Information/Preferences</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form mt-4 tab-m-0  right-left-spacing">
                <div className="table-part mt-2">
                  <ul className="table_header_button_section text-right">
                    <li>
                      <button className={`table-btn ${activeIndex == 0 ? "active" : "btn-2"}`} onClick={() => handleButtonClick(0, "all", currentUserData.id)}>
                        Total
                      </button>
                    </li>
                    <li>
                      <button className={`table-btn ${activeIndex == 1 ? "active" : "btn-2"}`} onClick={() => handleButtonClick(1, "upcoming", currentUserData.id)}>
                        Upcoming
                      </button>
                    </li>
                    <li>
                      <button className={`table-btn ${activeIndex == 2 ? "active" : "btn-2"}`} onClick={() => handleButtonClick(2, "cancelled", currentUserData.id)}>
                        Cancelled
                      </button>
                    </li>
                    <li>
                      <button className={`table-btn ${activeIndex == 3 ? "active" : "btn-2"}`} onClick={() => handleButtonClick(3, "completed", currentUserData.id)}>
                        Completed
                      </button>
                    </li>
                  </ul>
                  <div className="popup-part " id="back-no">
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              {" "}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="text-center popup-img">
                              <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/pop.jpg"} alt="pop" />
                            </div>
                            <p>
                              <b>Are you sure you want to cancel this booking?</b>
                            </p>
                            <div className="text-right">
                              <button className="btn-send cencel">Cancel booking</button>
                              <button className="btn-send">No, I want a chef</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-box ">
                    {bookingUsers.length > 0 ? (
                      <table className="table table-borderless common_booking common_booking">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date Requested</th>
                            <th scope="col">Booking Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookingUsers.map((user: any, index) => {
                            const datesString = user.dates;
                            const dates = datesString.split(",").map((dateString: string) => formatDate(dateString));
                            const startDate = dates[0];
                            const endDate = dates[dates.length - 1];
                            const output = `${startDate} to ${endDate}`;

                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <p className="text-data-18">{formatDate(user.latest_created_at)}</p>
                                </td>
                                <td>
                                  <p className="text-data-18">{user.category == "onetime" ? formatDate(user.dates) : output}</p>
                                </td>
                                <td>
                                  <p className="text-data-18">{user.category == "onetime" ? "One time" : "Mutiple Times"}</p>
                                </td>
                                <td>
                                  <p className="text-data-18">{user.booking_status}</p>
                                </td>
                                <td>
                                  <div className="dropdown" id="none-class">
                                    <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                      <i className="fa-solid fa-ellipsis" role="button"></i>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => getSingleBookingUser(e, user.booking_id)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                          View Booking
                                        </a>
                                      </li>
                                      {user.category == "onetime" && (
                                        <li>
                                          <a className="dropdown-item" href="#" onClick={(e) => getuserchefofferdata(e, user.booking_id)}>
                                            View Chef offer
                                          </a>
                                        </li>
                                      )}

                                      <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => editbooking(user.booking_id)}>
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => {
                                            deleteBookingByAdmin(user.booking_id);
                                          }}
                                        >
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <>
                        <PageFound iconClass={"fa-solid fa-book-open-reader"} heading={" No bookings "} subText={"Messages"} />
                      </>
                    )}
                    <Pagination items={totalBooking.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />

                    <div className="offcanvas-part">
                      <div className="offcanvas offcanvas-end" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Booking Details</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                          <div>
                            <button className="table-btn btn-2 date mr-sp">{bookingdate}</button>
                          </div>
                          <div className="off-can">
                            <div className="accordion" id="accordionExample">
                              {category != "onetime" && (
                                <div className="accordion-item">
                                  <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                      Chefs offers
                                    </button>
                                  </h2>
                                  <div id="collapseOne" className="mt-2 accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                      {chefoffer.length > 0 ? (
                                        chefoffer.map((chef, index) =>
                                          chef.user_show === "visible" ? (
                                            <div className="row" key={index}>
                                              <div className="col-5">
                                                <p className="chefs-name m-2">{chef.name}</p>
                                              </div>
                                              <div className="col-2">
                                                <p className="mony m-2">${chef.client_amount}</p>
                                              </div>
                                              <div className="col-5">
                                                {chef.menu_names?.split(",").map((menu, index) => (
                                                  <button className="table-btn btn-2 list-btn m-2" key={index}>
                                                    {menu.trim()}
                                                  </button>
                                                ))}
                                              </div>
                                            </div>
                                          ) : (
                                            <p className="mt-2">{index == 0 && "No Chef apply for this booking"}</p>
                                          )
                                        )
                                      ) : (
                                        <p className="mt-2"></p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    Service Details
                                  </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="row mt-1">
                                      <div className="col-4">
                                        <p className="chefs-name name-12">Service Type:</p>
                                      </div>
                                      <div className="col-8">
                                        <p className="mony f-w-4">{booking.category == "onetime" ? "One time Service" : "Mutiple Times Services"} </p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-4">
                                        <p className="chefs-name name-12">Services </p>
                                      </div>
                                      <div className="col-8">
                                        <p className="mony f-w-4">{booking.service_name}</p>
                                      </div>
                                    </div>
                                    {daysbooking.length === 1 && (
                                      <div className="row mt-1">
                                        <div className="col-4">
                                          <p className="chefs-name name-12">Meal:</p>
                                        </div>
                                        <div className="col-8">
                                          <>
                                            {daysbooking[0].breakfast === "yes" && <button className="table-btn btn-2 list-btn">Breakfast</button>}
                                            {daysbooking[0].lunch === "yes" && <button className="table-btn btn-2 list-btn">Lunch</button>}
                                            {daysbooking[0].dinner === "yes" && <button className="table-btn btn-2 list-btn">Dinner</button>}
                                          </>
                                        </div>
                                      </div>
                                    )}

                                    <div className="row mt-1">
                                      <div className="col-4">
                                        <p className="chefs-name name-12">Cuisine:</p>
                                      </div>
                                      <div className="col-8">
                                        {booking &&
                                          booking.cuisines &&
                                          booking.cuisines.split(",").map((cuisine, index) => (
                                            <button key={index} className="table-btn btn-2 list-btn m-1 mb-2">
                                              {cuisine.trim()}
                                            </button>
                                          ))}
                                      </div>
                                    </div>

                                    <div className="row mt-1">
                                      <div className="col-4">
                                        <p className="chefs-name name-12">Allergies:</p>
                                      </div>
                                      <div className="col-8">
                                        {booking &&
                                          booking.allergies &&
                                          booking.allergies.split(",").map((allergies, index) => (
                                            <button key={index} className="table-btn btn-2 list-btn m-1 mb-2">
                                              {allergies.trim()}
                                            </button>
                                          ))}
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-4">
                                        <p className="chefs-name name-12">Special Requests:</p>
                                      </div>
                                      <div className="col-8">
                                        <p className="mony f-w-4">{booking.notes}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {daysbooking.length > 1 && (
                                <div className="accordion-item">
                                  <h2 className="accordion-header" id="headingTwo4">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo4" aria-expanded="true" aria-controls="collapseTwo4">
                                      Days Overview
                                    </button>
                                  </h2>
                                  <div id="collapseTwo4" className="accordion-collapse show" aria-labelledby="headingTwo4" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                      {daysbooking.map((daybooking, index) => (
                                        <div key={index} className="row mt-1">
                                          <div className="col-4">
                                            <p className="chefs-name name-12">Days {index + 1}:</p>
                                          </div>
                                          <div className="col-8">
                                            <p className="mony f-w-4">
                                              {daybooking.breakfast === "yes" && <button className="table-btn btn-2 list-btn">Breakfast</button>}
                                              {daybooking.lunch === "yes" && <button className="table-btn btn-2 list-btn">Lunch</button>}
                                              {daybooking.dinner === "yes" && <button className="table-btn btn-2 list-btn">Dinner</button>}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                    Customer Details
                                  </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="row mt-1">
                                      <div className="col-5 text-right">
                                        <p className="chefs-name name-12">Number of people:</p>
                                      </div>
                                      <div className="col-7"></div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5 text-right">
                                        <p className="chefs-name name-12">Adults</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">{booking.adults}</p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5 text-right">
                                        <p className="chefs-name name-12">Teens:</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">{booking.teens}</p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5 text-right">
                                        <p className="chefs-name name-12">Children:</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">{booking.childrens}</p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5">
                                        <p className="chefs-name name-12">Full Name:</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">
                                          {booking.name} {booking.surname}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5">
                                        <p className="chefs-name name-12">Email:</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">{booking.email}</p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5">
                                        <p className="chefs-name name-12">Phone Number:</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">{booking.phone}</p>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col-5">
                                        <p className="chefs-name name-12">Location:</p>
                                      </div>
                                      <div className="col-7">
                                        <p className="mony">{booking.location}</p>
                                      </div>
                                    </div>
                                    <div ref={mapRef} style={{ height: "400px" }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="popup-part new-modala">
          <h2 className="title-pop up-move mt-2">Booking id #{bookingid}</h2>
          <div className="offers">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Chef's Name</th>
                  <th scope="col">Location</th>
                  <th scope="col-2">Menu</th>
                  <th scope="col">Amount</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {chefappliedoffer.length > 0 ? (
                  chefappliedoffer.map((chef, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <p>
                          {chef.name} {chef.surname}
                        </p>
                      </td>
                      <td>{chef.location}</td>
                      <td>
                        {chef.menu_names?.split(",").map((menu, index) => (
                          <button className="table-btn btn-2 list-btn mb-1" key={index}>
                            {menu.trim()}
                          </button>
                        ))}
                      </td>
                      <td>{chef.amount}</td>
                      <td>
                        <button id="btn_offer" className="mx-2" type="button" onClick={() => handleChatClick(currentUserData.id, chef.chef_id, chef.booking_id)}>
                          Chat
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="">No Chef apply for this booking</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </PopupModal>
    </>
  );
}
