import React, { useState, useEffect, useRef } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModalXtraLarge";
import { getCurrentUserData, removeBookingData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getCurrentUserByBooking, getUserFilterByBooking, getUserChefOffer, ContactChefByUserWithSingleBooking, UpdateUserToOffiline, addReviews,getSingleReceiptUser, getSingleInvoiceUser } from "../../../lib/userapi";
import { getSingleChefMenu } from "../../../lib/chefapi";
import { getUserBookingId, deleteBooking } from "../../../lib/adminapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";
import swal from "sweetalert";
import PopupModalTwo from "../../commoncomponents/PopupModal";
import { removeToken, removeStorageData } from "../../../lib/session";
import { showToast } from "../../commoncomponents/toastUtils";
import PageFound from "../../pageFound";

export default function Booking(props: any) {
  let id = props.MenuId;

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
    item_name?: string;
    type?: string;
  }

  interface Errors {
    amount?: string;
    selectedmenu?: string;
    chatmessage?: string;
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
    address?: string;
    menu_names?: string;
    name?: string;
    surname?: string;
    booking_id?: string;
    menu_id?: string;
    userName?: string;
    userSurname?: string;
    applied_jobs_id?: string;
  }

  interface FormErrors {
    description?: string;
    stars?: number;
  }
  interface Testimonial {
    id: number;
    description: string;
    stars: number;
  }

  const [bookingUsers, setBookingUser] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalConfirmTwo, setModalConfirmTwo] = useState(false);
  const [modalConfirmThree, setModalConfirmThree] = useState(false);
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

  const [errors, setErrors] = useState<FormErrors>({});

  const [amount, setAmount] = useState("");

  const [selectedmenu, setSelectedMenu] = useState<number[]>([]);

  const [category, setBookingCategory] = useState("");

  const [editmodalConfirm, editsetModalConfirm] = useState(false);

  const [stars, setStar] = useState(0);

  const [buttonStatus, setButtonState] = useState(false);

  const [description, setDescription] = useState("");
  const [getReceiptUser, setReceiptUsers] = useState<any>();
  const [getchefUser, setChefUser] = useState<any>({});

  const editmodalConfirmClose = () => {
    editsetModalConfirm(false);
  };

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

  const modalConfirmCloseTwo = () => {
    setModalConfirmTwo(false);
  };

  const modalConfirmThreeOpen = () => {
    setModalConfirmThree(true);
  };
  const modalConfirmThreeClose = () => {
    setModalConfirmThree(false);
  };

  const [chefappliedoffer, setChefAppliedOffer] = useState<ChefAppliedOffer[]>([]);

  const [chef_id, setChefID] = useState("");

  const [chatmessage, setChatMessage] = useState("");

  const [testimonialList, settestimonialList] = useState<Testimonial>({ id: 0, description: "", stars: 0 });

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
      removeBookingData();
      setCurrentUserData({
        ...userData,
        id: userData.id,
        name: userData.name,
        pic: userData.pic,
        surname: userData.surname,
        role: userData.role,
        approved_by_admin: userData.approved_by_admin,
      });
      removeBookingData();
    }
  }, []);

  const getSingleChefMenuData = async (id: any) => {
    getSingleChefMenu(id)
      .then((res) => {
        if (res.status == true) {
          modalConfirmThreeOpen();
          modalConfirmClose();
          setMenu(res.dishes);
          console.log(res.dishes);
        } else {
          //   toast.error(res.message, {
          //   position: toast.POSITION.TOP_RIGHT
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBookingUserDetails = async (id: any) => {
    try {
      const res = await getCurrentUserByBooking(id);
      if (res.status) {
        setTotalBooking(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setBookingUser(paginatedPosts);
        console.log(paginatedPosts);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
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
    getUserBookingId(id).then((res: any) => {
      //   console.log(res.booking[0]);
      setBooking(res.booking[0]);
      setChefOffer(res.chefoffer);
      setDaysBooking(res.days_booking);
      setSidebarConfirm(true);
      setBookingCategory(res.days_booking[0].category);
      GetSingleReceiptUser(id);
      getInvoiceData(id);
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

  const getuserchefofferdata = (e: any, id: any, category: any) => {
    getUserChefOffer(id)
      .then((res) => {
        if (res.status == true) {
          modalConfirmThreeClose();
          setChefAppliedOffer(res.chefoffer);
          setBookingCategory(category);
          setBookingId(id);
          setModalConfirm(true);
        } else {
          setErrorMessage(res.message);
          setModalConfirm(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlMessageSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};

    if (!chatmessage) {
      newErrors.chatmessage = "Message is required";
    }

    setErrors(newErrors);

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const data = {
        message: chatmessage,
        sender_id: currentUserData.id,
        receiver_id: chef_id,
        booking_id: bookingid,
        unique_booking_id: currentUserData.id + chef_id,
        chat_type: "booking",
      };

      ContactChefByUserWithSingleBooking(data)
        .then((res) => {
          if (res.status == true) {
            setModalConfirmTwo(false);
            window.location.href = "/user/messages";
          } else {
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

  const handleMessageBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {
      case "chatmessage":
        if (!value) {
          newErrors.chatmessage = "Messge is required";
        } else {
          delete newErrors.chatmessage;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    console.log(name);
  };

  function handleLogout() {
    UpdateUserToOffiline(currentUserData.id).then((res) => {
      if (res.status == true) {
        removeToken();
        removeStorageData();
        window.location.href = "/";
      } else {
        console.log("error");
      }
    });
  }

  const handlMenuSubmit = (event: any) => {
    event.preventDefault();
    // Validate form data
    const errors: any = {};
    if (!description) {
      errors.description = "Comment is required";
    }
    if (!stars) {
      errors.stars = "Stars is required";
    }
    setErrors(errors);
    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
      // const currentUserData: any = {};
      // Call an API or perform some other action to register the user
      const data = {
        booking_id: bookingid,
        comment: description,
        given_by_id: currentUserData.id,
        given_to_id: chef_id,
        stars: stars,
      };
      addReviews(data)
        .then((res) => {
          if (res.status == true) {
            editsetModalConfirm(false);
            setButtonState(false);
            showToast("success", res.message);
          } else {
            setButtonState(false);
            setModalConfirmTwo(true);
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

  const resetForm = () => {
    setStar(0);
    setChefID("");
    setBookingId("");
    setDescription("");
    setErrors({});
  };

    const getInvoiceData = async (bookingId: number) => {
      getSingleInvoiceUser(bookingId)
        .then((res) => {
          if (res.status == true) {
            setChefUser(res.data);
  
            setMenu(res.dishNames);
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const GetSingleReceiptUser = async (id: number) => {
      try {
        const res = await getSingleReceiptUser(id);
        if (res.status === true) {
          const apiBookingId = Number(res.data.booking_id);
          const inputBookingId = Number(id);
    
          if (apiBookingId === inputBookingId) {
            setReceiptUsers(res.data);
          } else {
            setReceiptUsers(null); 
          }
        } else {
          setReceiptUsers(null);
        }
      } catch (err) {
        setReceiptUsers(null); 
      }
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
                <a onClick={handleLogout} role="button">
                  Log out
                </a>
              </span>
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="my-profile">
                <a href="/user/userprofile">
                  <div className="profile-cols mt-5">
                    <h4>Account Settings</h4>
                    <p>Please provide your personal information so we can issue your receipt when you book a service. If you wish an invoice please add the information of the business you with to issue the invoice.</p>
                  </div>
                </a>
                <div className="profile-cols mt-4 active">
                  <h4>My Bookings</h4>
                  <p>Your bookings history all in one place. </p>
                </div>
                <a href={`/user/messages`}>
                  <div className="profile-cols mt-4 mb-4">
                    <h4>My Messages</h4>
                    <p>We are here for you. Please feel free to contact us any time. </p>
                  </div>
                </a>
                <a href="/user/userprofilethree">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Aditional Information/Preferences</h4>
                    <p>Let us know your favorite cuisines any additional information and if you have allergies, dietary or religious restrictions.</p>
                  </div>
                </a>
                <a href={`/user/notification/notification?id=${currentUserData.id}`}>
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Notification</h4>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form mt-4 tab-m-0  right-left-spacing">
                <div className="table-part mt-2">
                  <ul className="table_header_button_section text-lg-right">
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
                  <div className="table-box  scroll-remove mt-2">
                    {bookingUsers.length > 0 ? (
                      <table className="table table-borderless common_booking common_booking" id="user-table">
                        <thead>
                          <tr>
                            <th scope="col">Booking ID</th>
                            <th scope="col">Date Requested</th>
                            <th scope="col">Booking Date</th>
                            <th scope="col">Category</th>
                            {/* <th scope="col">Status</th> */}
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
                                <td onClick={(e) => getSingleBookingUser(e, user.booking_id)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ cursor: "pointer",color:'#d69c1f' }}>
                                  <p className="text-data-18" id="table-p">
                                    #{user.booking_id}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-data-18" id="table-p">
                                    {formatDate(user.latest_created_at)}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-data-18" id="table-p">
                                    {user.category == "onetime" ? formatDate(user.dates) : output}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-data-18" id="table-p">
                                    {user.category == "onetime" ? "One time" : "Mutiple Times"}
                                  </p>
                                </td>
                                {/* <td className={`booking-status-${user.booking_status}`}>{user.booking_status}</td> */}
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

                                      {/* {user.payment_status == "pending" && (
                                        <li>
                                          <a className="dropdown-item" href="#" onClick={(e) => getuserchefofferdata(e, user.booking_id, user.category)}>
                                            View Chef offer
                                          </a>
                                        </li>
                                      )} */}

                                      {user.payment_status == "pending" && user.appliedId === null && (
                                        <li>
                                          <a className="dropdown-item" href="#" onClick={(e) => editbooking(user.booking_id)}>
                                            Edit
                                          </a>
                                        </li>
                                      )}
                                      {user.payment_status == "pending" && (
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
                                      )}

                                      {user.payment_status == "completed" && (
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                              resetForm();
                                              editsetModalConfirm(true);
                                              setBookingId(user.booking_id);
                                              setChefID(user.chefId ?? "");
                                            }}
                                          >
                                            Review
                                          </a>
                                        </li>
                                      )}

                                      {user.payment_status == "completed" && (
                                        <li>
                                          <button className="btn btn-sm btn-success">Payment successfull</button>
                                        </li>
                                      )}
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
                        <PageFound iconClass={"fa-solid fa-book-open-reader"} heading={" No bookings "} subText={"available"} />
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
                                        chefoffer.map((chef, index) => (
                                          <div className="row" key={index}>
                                            <div className="col-5">
                                              <p className="chefs-name m-2">{chef.name}</p>
                                            </div>
                                            <div className="col-2">
                                              <p className="mony m-2">€{chef.amount}</p>
                                            </div>
                                            <div className="col-5">
                                              {chef.menu_names?.split(",").map((menu, index) => (
                                                <button className="table-btn btn-2 list-btn m-2" key={index}>
                                                  {menu.trim()}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                        ))
                                      ) : (
                                        <p className="mt-2">No Chef apply for this booking</p>
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
                                              {daybooking.breakfast === "yes" ? <button className="table-btn btn-2 list-btn">Breakfast</button> : null}
                                              {daybooking.lunch === "yes" ? <button className="table-btn btn-2 list-btn">Lunch</button> : null}
                                              {daybooking.dinner === "yes" ? <button className="table-btn btn-2 list-btn">Dinner</button> : null}
                                              {daybooking.breakfast !== "yes" && daybooking.lunch !== "yes" && daybooking.dinner !== "yes" && <span>No meal selected</span>}
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
                                          {booking.name} {booking.surname !== null && booking.surname !== "null" ? booking.surname : ""}
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

                               {/* invoice details */}
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="true"
                          aria-controls="collapseFour"
                        >
                          Invoice Details
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse show"
                        aria-labelledby="headingFour"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {menu.length > 0 ? (
                            <>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                    Menu Name:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getchefUser.menu_name}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">Starter</p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {menu.find(
                                      (item) => item.type === "starter"
                                    )?.item_name || ""}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                    First Course:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {menu.find(
                                      (item) => item.type === "firstcourse"
                                    )?.item_name || ""}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                    Main Course:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {menu.find(
                                      (item) => item.type === "maincourse"
                                    )?.item_name || ""}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">Desert:</p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {menu.find((item) => item.type === "desert")
                                      ?.item_name || ""}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                    Description:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getchefUser.description}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">Total:</p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getchefUser.amount
                                      ? `€${getchefUser.amount}`
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <p className="alert alert-warning">
                                <strong>Invoice cannot be generated.</strong> No
                                menu details or total amount available.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                     {/* Receipt details */}
                     <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFive">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFive"
                          aria-expanded="true"
                          aria-controls="collapseFive"
                        >
                          Receipt Details
                        </button>
                      </h2>
                      <div
                        id="collapseFive"
                        className="accordion-collapse show"
                        aria-labelledby="headingFive"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {getReceiptUser ? (
                            <>
                            <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                  Receipt Name:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getReceiptUser?.username}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                    Chef Name:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getReceiptUser?.chefname}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                  Order Date:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getReceiptUser?.orderdate}
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-1">
                                <div className="col-5 text-right">
                                  <p className="chefs-name name-12">
                                  Receipt Amount:
                                  </p>
                                </div>
                                <div className="col-7">
                                  <p className="mony">
                                    {getReceiptUser?.amount}
                                  </p>
                                </div>
                              </div>
                            </>
                        ) : (
                            <div className="text-center">
                              <p className="alert alert-warning">
                                <strong>Receipt cannot be generated of this booking.</strong> 
                              </p>
                            </div>
                          )} 
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
                        <p className="text-left">
                          {chef.userName} {chef.userSurname}
                        </p>
                      </td>
                      <td>{chef.address}</td>
                      <td>
                        {chef.menu_names?.split(",").map((menu, index) => (
                          <button className="table-btn btn-2 list-btn m-1" key={index} onClick={() => getSingleChefMenuData(chef.menu_id)}>
                            {menu.trim()}
                          </button>
                        ))}
                      </td>
                      <td>{chef.amount}</td>

                      <td>
                        <td>
                          <a
                            target="_blank"
                            id="btn_offer"
                            className="btn btn-success"
                            href={`/user/payment?booking_id=${chef.booking_id}&amount=${chef.amount}&chef_id=${chef.chef_id}&client_id=${currentUserData.id}&applied_id=${chef.applied_jobs_id}`}
                          >
                            Book
                          </a>
                        </td>

                        <td>
                          <button
                            id="btn_offer"
                            className="mx-2 btn-sm"
                            type="button"
                            onClick={() => {
                              setModalConfirmTwo(true);
                              setModalConfirm(false);
                              setChefID(chef.chef_id ?? ""); // Assign a default value of an empty string if chef.chef_id is undefined
                              setBookingId(chef.booking_id ?? ""); // Assign a default value of an empty string if chef.booking_id is undefined
                            }}
                          >
                            Contact
                          </button>
                        </td>
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

      <PopupModal show={modalConfirmThree} handleClose={modalConfirmThreeClose} staticClass="var-login">
        <h5 style={{ color: "#ff4e00d1" }}>Dishes</h5>
        <div className="all-form">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">First Course</th>
                <th scope="col">Desert</th>
                <th scope="col">Main Course</th>
                <th scope="col">Starter</th>
              </tr>
            </thead>
            <tbody>
              {menu.length > 0 ? (
                <tr>
                  <td>{menu.find((item) => item.type === "firstcourse")?.item_name || ""}</td>
                  <td>{menu.find((item) => item.type === "desert")?.item_name || ""}</td>
                  <td>{menu.find((item) => item.type === "maincourse")?.item_name || ""}</td>
                  <td>{menu.find((item) => item.type === "starter")?.item_name || ""}</td>
                </tr>
              ) : (
                <tr>
                  <td className="">No menu items available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </PopupModal>

      <PopupModalTwo show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
        <div className="all-form">
          <form onSubmit={handlMessageSubmit} className="common_form_error" id="menu_form">
            <div className="login_div">
              <label htmlFor="name">Message:</label>
              <textarea name="chatmessage" value={chatmessage} onChange={(e) => setChatMessage(e.target.value)} onBlur={handleMessageBlur}></textarea>

              {errors.chatmessage && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.chatmessage}</span>}
            </div>

            <button type="submit" className="btn-send w-100 mt-3">
              Submit
            </button>
          </form>
        </div>
      </PopupModalTwo>

      <PopupModalTwo show={editmodalConfirm} handleClose={editmodalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form className="common_form_error" id="menu_form" onSubmit={handlMenuSubmit}>
            <div className="login_div mb-4">
              <label htmlFor="Star">Choose Star:</label>
              <input type="hidden" name="stars" value={stars} onChange={handleChange} />

              <p className="star-list blue-star" id="star-color">
                {[1, 2, 3, 4, 5].map((num) => (
                  <i key={num} className={`fa${num <= stars ? "s" : "r"} fa-star`} onMouseEnter={() => handleStarHover(num)} onClick={() => setStar(num)} />
                ))}
              </p>
              {errors.stars && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.stars}</span>}
            </div>

            <div className="login_div">
              <label htmlFor="Description">Comment:</label>
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              {errors.description && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.description}</span>}
            </div>

            <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
              Submit
            </button>
          </form>
        </div>
      </PopupModalTwo>

      <ToastContainer />
    </>
  );
}
