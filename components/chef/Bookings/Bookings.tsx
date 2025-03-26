/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef, useMemo } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserBookingId } from "../../../lib/adminapi";
import {
  getUserChefByBooking,
  getUserChefFilterByBooking,
  getAllChefMenu,
  saveChefAppliedBookingJob,
} from "../../../lib/chefapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";
import { showToast } from "../../commoncomponents/toastUtils";
import { useRouter } from "next/router";
import PageFound from "../../pageFound";
import { log } from "console";

export default function Bookings() {
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
    profile_status: string;
    created_by: string;
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

  const [modalConfirm, setModalConfirm] = useState(false);
  const [sidebarConfirm, setSidebarConfirm] = useState(false);
  const [bookingUsers, setBookingUser] = useState([]);
  const [booking, setBooking] = useState<Booking>({});
  const [totalBooking, setTotalBooking] = useState([]);
  const [bookingdate, setBookingDate] = useState("");
  const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookingid, setBookingId]: any = useState("");
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: "",
    name: "",
    email: "",
    pic: null,
    surname: "",
    role: "",
    approved_by_admin: "",
    profile_status: "",
    created_by: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menu, setMenu] = useState<MenuData[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [amount, setAmount] = useState("");
  const [selectedmenu, setSelectedMenu] = useState<number[]>([]);

  const router = useRouter();
  const { booking_id } = router.query;

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

  const pageSize = 10;

  useEffect(() => {
    const loadData = async () => {
      const userData = getCurrentUserData() as CurrentUserData;
      const data = isPageVisibleToRole("chef-bookings");
      if (data == 1) {
        fetchBookingUserDetails(userData.id);
        getAllChefMenuData(userData.id);
        setCurrentUserData({
          ...userData,
          id: userData.id,
          name: userData.name,
          pic: userData.pic,
          surname: userData.surname,
          role: userData.role,
          approved_by_admin: userData.approved_by_admin,
        });
        localStorage.removeItem("bookingcurrentURL");
      }
      if (data == 2) {
        if (!userData?.id) {
          const BookingcurrentURL: any = getCurrentURL();
          localStorage.setItem("bookingcurrentURL", BookingcurrentURL);
        }
        window.location.href = "/"; // redirect to login if not logged in
      } else if (data == 0) {
        window.location.href = "/404"; // redirect to 404 if not authorized
      } else {
        // window.location.href = "/404";
      }
    };

    loadData();
  }, []);

  const getCurrentURL = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return null;
  };
  const fetchBookingUserDetails = async (id: any) => {
    try {
      const res = await getUserChefByBooking(id);

      if (res.status) {
        const filteredData = res.data.filter((record: any) => {
          return (
            record.chef_id != id &&
            record.applied_jobs_status != "hired" &&
            record.applied_jobs_status != "discussion" &&
            record.applied_jobs_status != "rejected"
          );
        });
        setTotalBooking(filteredData);
        const paginatedPosts = paginate(filteredData, currentPage, pageSize);
        setBookingUser(paginatedPosts);

        if (filteredData.booking_id == booking_id) {
          const openOffcanvas = () => {
            const viewBookingButton =
              document.getElementById("viewBookingButton");
            if (viewBookingButton) {
              viewBookingButton.click();
            }
          };
          openOffcanvas();
        }
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
    getUserChefByBooking(currentUserData.id)
      .then((res) => {
        if (res.status == true) {
          const filteredData = res.data.filter((record: any) => {
            return (
              record.chef_id != currentUserData.id &&
              record.applied_jobs_status != "hired" &&
              record.applied_jobs_status != "discussion" &&
              record.applied_jobs_status != "rejected"
            );
          });

          setTotalBooking(filteredData);
          const paginatedPosts = paginate(filteredData, page, pageSize);
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
      setBooking(res.booking[0]);

      setDaysBooking(res.days_booking);
      setSidebarConfirm(true);

      if (res.days_booking.length == 1) {
        setBookingDate(formatDate(res.booking[0].dates));
      } else {
        const datesString = res.booking[0].dates;
        const dates = datesString
          .split(",")
          .map((dateString: string) => formatDate(dateString));
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
            center: {
              lat: parseFloat(res.booking[0].lat),
              lng: parseFloat(res.booking[0].lng),
            },
            zoom: 12,
          });

          const marker = new google.maps.Marker({
            position: {
              lat: parseFloat(res.booking[0].lat),
              lng: parseFloat(res.booking[0].lng),
            },
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
    if (type == "all" || type == "upcoming") {
      fetchBookingUserDetails(id);
    } else {
      getUserChefFilterByBooking(id, type)
        .then((res) => {
          if (res.status == true) {
            const filteredData = res.data.filter((record: any) => {
              return (
                record.chef_id != id &&
                record.applied_jobs_status != "hired" &&
                record.applied_jobs_status != "discussion" &&
                record.applied_jobs_status != "rejected"
              );
            });
            setTotalBooking(filteredData);
            const paginatedPosts = paginate(
              filteredData,
              currentPage,
              pageSize
            );
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

  const getAllChefMenuData = async (id: any) => {
    getAllChefMenu(id)
      .then((res) => {
        if (res.status == true) {
          setMenu(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    setSelectedMenu((prevMenuItems: any) =>
      isChecked
        ? [...prevMenuItems, menuItemId]
        : prevMenuItems.filter((item: any) => item !== menuItemId)
    );
  };

  const handleMenuItemBlur = (event: any) => {};

  const handleBookingApplyJobSubmit = (event: any) => {
    event.preventDefault();

    if (isSubmitting) return; // Prevent multiple clicks

    setIsSubmitting(true); //

    // Validate form data
    const newErrors: Errors = {};

    if (!amount) {
      newErrors.amount = "Amount is required";
    }
    let isMenuOptional = false;

    if (Array.isArray(bookingUsers) && bookingUsers.length > 0) {
      isMenuOptional = bookingUsers.some(
        (booking: any) => booking?.isMenuOptional
      );
    }

    if (!isMenuOptional && (!selectedmenu || selectedmenu.length === 0)) {
      newErrors.selectedmenu = "Please select at least one menu item";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false); // ✅ Stop submit if errors exist
      return;
    }
    // if (!selectedmenu || selectedmenu.length === 0) {
    //   newErrors.selectedmenu = "Please select at least one menu item";
    // }

    setErrors(newErrors);

    // Submit form data if there are no errors
    // if (amount && selectedmenu.length >= 1) {
    if (amount && (isMenuOptional || selectedmenu.length >= 1)) {
      setIsSubmitting(true);
      const data = {
        amount: amount,
        // menu: selectedmenu.join(","),
        menu: selectedmenu.length > 0 ? selectedmenu.join(",") : null,
        booking_id: bookingid,
        chef_id: currentUserData.id,
      };
      saveChefAppliedBookingJob(data)
        .then((res) => {
          setIsSubmitting(false); // Move it here

          if (res.status == true) {
            setModalConfirm(false);
            fetchBookingUserDetails(currentUserData.id);
            showToast("success", res.message);
            setTimeout(() => {
              window.location.href = "/chef/applied-booking";
            }, 1500);
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
          console.log(err);
          setIsSubmitting(false);
        });
    }
  };

  const isMenuOptional = useMemo(() => {
    if (Array.isArray(bookingUsers) && bookingUsers.length > 0) {
      return bookingUsers.some((booking: any) => booking?.isMenuOptional);
    }
    return false;
  }, [bookingUsers]);

  const resetFields = () => {
    setAmount("");
    setSelectedMenu([]);
    console.log(selectedmenu);
  };

  return (
    <>
      <div className="table-part">
        <h2 className="mb-4">Available Jobs</h2>
        <ul className="table_header_button_section">
          <li>
            <button
              className={`table-btn ${activeIndex == 0 ? "active" : "btn-2"}`}
              onClick={() => handleButtonClick(0, "all", currentUserData.id)}
            >
              Total
            </button>
          </li>
          <li>
            <button
              className={`table-btn ${activeIndex == 1 ? "active" : "btn-2"}`}
              onClick={() =>
                handleButtonClick(1, "upcoming", currentUserData.id)
              }
            >
              Upcoming
            </button>
          </li>
          <li>
            <button
              className={`table-btn ${activeIndex == 2 ? "active" : "btn-2"}`}
              onClick={() =>
                handleButtonClick(2, "cancelled", currentUserData.id)
              }
            >
              Cancelled
            </button>
          </li>
          <li>
            <button
              className={`table-btn ${activeIndex == 3 ? "active" : "btn-2"}`}
              onClick={() =>
                handleButtonClick(3, "completed", currentUserData.id)
              }
            >
              Completed
            </button>
          </li>
        </ul>
        <div className="table-box mt-3">
          {bookingUsers.length > 0 ? (
            // <table className="table table-borderless common_booking common_booking">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Booking ID</th>
                  <th scope="col">Customer</th>
                  {/* <th scope="col">Image</th> */}
                  <th scope="col">Date Requested</th>
                  {/* <th scope="col">Booking Date</th> */}
                  {/* <th scope="col">Address</th> */}
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-sm-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingUsers.map((user: any, index) => {
                  const datesString = user.dates;
                  const dates = datesString
                    .split(",")
                    .map((dateString: string) => formatDate(dateString));
                  const startDate = dates[0];
                  const endDate = dates[dates.length - 1];
                  const output = `${startDate} to ${endDate}`;
                  return (
                    <tr key={index}>
                      <td
                        onClick={(e) =>
                          getSingleBookingUser(e, user.booking_id)
                        }
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                        style={{ cursor: "pointer", color: "#ce910d" }}
                      >
                        #{user.booking_id}
                      </td>
                      <td>
                        {`${user.name} ${
                          user.surname !== null && user.surname !== "null"
                            ? user.surname
                            : ""
                        }`
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </td>
                      {/* <td className="chefs_pic">
                        {user.pic ? (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              "/images/chef/users/" +
                              user.pic
                            }
                            alt=""
                          />
                        ) : (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              "/images/users.jpg"
                            }
                            alt=""
                          />
                        )}
                      </td> */}
                      <td>{formatDate(user.latest_created_at)}</td>
                      {/* <td>
                        {user.category == "onetime"
                          ? formatDate(user.dates)
                          : output}
                      </td> */}
                      {/* <td>{user.location}</td> */}
                      <td>
                        {user.category == "onetime"
                          ? "One time"
                          : "Mutiple Times"}
                      </td>
                      <td className={`booking-status-${user.booking_status}`}>
                        {user.booking_status}
                      </td>
                      <td>
                        <div className="dropdown" id="none-class">
                          <a
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i
                              className="fa-solid fa-ellipsis"
                              role="button"
                            ></i>
                          </a>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              {booking_id == user.booking_id ? (
                                <a
                                  className="dropdown-item "
                                  href="#"
                                  onClick={(e) =>
                                    getSingleBookingUser(e, user.booking_id)
                                  }
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasRight"
                                  aria-controls="offcanvasRight"
                                  id="viewBookingButton"
                                >
                                  View Booking
                                </a>
                              ) : (
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={(e) =>
                                    getSingleBookingUser(e, user.booking_id)
                                  }
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasRight"
                                  aria-controls="offcanvasRight"
                                >
                                  View Booking
                                </a>
                              )}
                            </li>
                            {user.booking_status != "Expired" && (
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => {
                                    setModalConfirm(true);
                                    setBookingId(user.booking_id);
                                    resetFields();
                                  }}
                                >
                                  Apply
                                </a>
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
            // <p className="book1">No Booking Records Found</p>
            <PageFound
              iconClass={"fa-solid fa-book-open-reader"}
              heading={" You don't have"}
              subText={"any active Available Jobs yet"}
            />
          )}
        </div>
      </div>

      <Pagination
        items={totalBooking.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />

      <div className="offcanvas-part">
        <div
          className="offcanvas offcanvas-end"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">Booking Details</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div>
              <button className="table-btn btn-2 date mr-sp">
                {bookingdate}
              </button>
              {booking.booking_status != "Expired" && (
                <button
                  className="table-btn"
                  style={{ color: "#fff" }}
                  onClick={() => {
                    setModalConfirm(true);
                    setBookingId(booking.booking_id);
                    resetFields();
                  }}
                >
                  Apply
                </button>
              )}
            </div>
            <div className="off-can">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      Service Details
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse show"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="row mt-1">
                        <div className="col-4">
                          <p className="chefs-name name-12">Service Type:</p>
                        </div>
                        <div className="col-8">
                          <p className="mony f-w-4">
                            {booking.category == "onetime"
                              ? "One time Service"
                              : "Mutiple Times Services"}{" "}
                          </p>
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
                              {daysbooking[0].breakfast === "yes" && (
                                <button className="table-btn btn-2 list-btn">
                                  Breakfast
                                </button>
                              )}
                              {daysbooking[0].lunch === "yes" && (
                                <button className="table-btn btn-2 list-btn">
                                  Lunch
                                </button>
                              )}
                              {daysbooking[0].dinner === "yes" && (
                                <button className="table-btn btn-2 list-btn">
                                  Dinner
                                </button>
                              )}
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
                            booking.cuisines
                              .split(",")
                              .map((cuisine, index) => (
                                <button
                                  key={index}
                                  className="table-btn btn-2 list-btn m-1 mb-2"
                                >
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
                            booking.allergies
                              .split(",")
                              .map((allergies, index) => (
                                <button
                                  key={index}
                                  className="table-btn btn-2 list-btn m-1 mb-2"
                                >
                                  {allergies.trim()}
                                </button>
                              ))}
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col-4">
                          <p className="chefs-name name-12">
                            Special Requests:
                          </p>
                        </div>
                        <div className="col-8">
                          {booking.notes !== null &&
                          booking.notes !== "null" ? (
                            <p className="mony f-w-4">{booking.notes}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {daysbooking.length > 1 && (
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo4">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo4"
                        aria-expanded="true"
                        aria-controls="collapseTwo4"
                      >
                        Days Overview
                      </button>
                    </h2>
                    <div
                      id="collapseTwo4"
                      className="accordion-collapse show"
                      aria-labelledby="headingTwo4"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {daysbooking.map((daybooking, index) => (
                          <div key={index} className="row mt-1">
                            <div className="col-4">
                              <p className="chefs-name name-12">
                                Days {index + 1}:
                              </p>
                            </div>
                            <div className="col-8">
                              <p className="mony f-w-4">
                                {daybooking.breakfast === "yes" ? (
                                  <button className="table-btn btn-2 list-btn">
                                    Breakfast
                                  </button>
                                ) : null}
                                {daybooking.lunch === "yes" ? (
                                  <button className="table-btn btn-2 list-btn">
                                    Lunch
                                  </button>
                                ) : null}
                                {daybooking.dinner === "yes" ? (
                                  <button className="table-btn btn-2 list-btn">
                                    Dinner
                                  </button>
                                ) : null}
                                {daybooking.breakfast !== "yes" &&
                                  daybooking.lunch !== "yes" &&
                                  daybooking.dinner !== "yes" && (
                                    <span>No meal selected</span>
                                  )}
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
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      Customer Details
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse show"
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
                            {booking.name}{" "}
                            {booking.surname !== null &&
                            booking.surname !== "null"
                              ? booking.surname
                              : ""}
                          </p>
                        </div>
                      </div>
                      {/* <div className="row mt-1">
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
                      </div> */}
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

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="popup-part new-modala">
          <h2 className="title-pop up-move">Booking #{bookingid}</h2>
          <div className="offers">
            <form
              onSubmit={handleBookingApplyJobSubmit}
              className="common_form_error"
              id=""
            >
              <div className="row">
                <div className="col-sm-6 col-12">
                  <div className="all-form">
                    <div className="login_div">
                      <label className="f-w-4">Chef’s Offer:</label>

                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onBlur={handleBookingApplyAmount}
                        placeholder="Enter Amount"
                      />
                      {errors.amount && (
                        <span className="small error text-danger mb-2 d-inline-block error_login1 ">
                          {errors.amount}
                        </span>
                      )}
                    </div>
                  </div>
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
                  <div className="login_div">
                    <div className="row px-4">
                      {menu.length ? (
                        menu.map((menuItem, index) => (
                          <div key={index} className="form-check col-6">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={menuItem.id}
                              id={`menuItem-${index}`}
                              onChange={(e) =>
                                handleMenuItemChange(e, menuItem.id)
                              }
                              onBlur={handleMenuItemBlur}
                              checked={selectedmenu.includes(menuItem.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`menuItem-${index}`}
                            >
                              {menuItem.menu_name}
                            </label>
                          </div>
                        ))
                      ) : (
                        <PageFound
                          iconClass={"fa-solid fa-book-open-reader"}
                          heading={" You don't have"}
                          subText={"any active Available Jobs yet"}
                        />
                      )}
                    </div>
                    {!isMenuOptional && errors.selectedmenu && (
                      <span className="small error text-danger mb-2 d-inline-block error_login1">
                        {errors.selectedmenu}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="banner-btn" id="bookid">
                      <button
                        id="btn_offer"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Send Request"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </PopupModal>
      <ToastContainer />
    </>
  );
}
