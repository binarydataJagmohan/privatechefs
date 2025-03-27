import React, { useState, useEffect } from "react";
import {
  getSingleUserProfile,
  updateUsersImage,
  getUserBookingPayment,
} from "../../../lib/userapi";
import {
  getUserBookingById,
  getAllergyDetails,
  getAllCuisine,
  UpdateSetting,
  userDeactivate,
  userDelete,
  getSingleReceiptAdmin
} from "../../../lib/adminapi";
import { notificationForUserAdmin } from "../../../lib/notificationapi";
import moment from "moment";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../commoncomponents/toastUtils";
import swal from "sweetalert";
import { useRouter } from "next/router";
import { getSingleInvoice } from "../../../lib/adminapi";

export default function MyProfile(props: any) {
  interface User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    timezone: string;
    currency: string;
    birthday: string;
    pic: string;
    city: string;
    country: string;
    post_code: string;
    business_email: string;
    business_phoneno: number;
    company_name: string;
    vat_no: string;
    tax_id: string;
    address: string;
    user_address: string;
    user_city: string;
    user_country: string;
    user_post_code: string;
    allergy_id: string;
    additional_notes: string;
    cuisine_id: string;
    role: string;
  }

  const [getUsers, setUsers] = useState<User>();
  const [getReceiptUser, setReceiptUsers] = useState<any>();

  interface Allergies {
    id: string;
    allergy_name: string;
    image: string | null;
  }

  type Cuisine = {
    id: number;
    name: string;
    image: string;
  };

  const [bookingUsers, setBookingUser] = useState([]);
  const [totalMenu, setTotalMenu]: any = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [allergiesdata, setAllergies] = useState<Allergies[]>([]);
  const [cuisinedata, setCuisine] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [userNotifications, setUserNotifications] = useState([]);
  const router = useRouter();
  const [userBookingPayment, setUserBookingPayment] = useState([]);
  const [totalBookingPayment, setTotalBookingPayment] = useState([]);
  const pageSize = 10;
  let id = props.userId;
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [getchefUser, setChefUser] = useState<any>({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getSingleUserProfile(id);
        setUsers(userData.data);
        setFullName(userData.data.name);
        setPhone(userData.data.phone);
        setEmail(userData.data.email);
        setPassword(userData.data.view_password);

        // Move the getAllergyDetailsData call here
        await getAllergyDetailsData();

        // Continue with other operations after both data sets are fetched
        await getAllCuisineData();
        getSingleBookingUser(id);
        getSingleUserNotifications(id);
        userBookingPayments(id);
      } catch (err) {
        // Handle errors here
        toast.error((err as Error).message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    };

    fetchData();
    initializeTabs();
  }, [id]);

  const getAllergyDetailsData = async () => {
    try {
      const res = await getAllergyDetails();
      if (res.status) {
        setAllergies(res.data);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const getAllCuisineData = async () => {
    try {
      const res = await getAllCuisine();
      if (res.status) {
        setCuisine(res.data);
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
    } catch (err) {
      toast.error((err as Error).message, {
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

  const getSingleBookingUser = async (id: any) => {
    const res = await getUserBookingById(id);
    if (res.status) {
      setTotalMenu(res.data);
      const paginatedPosts = paginate(res.data, currentPage, pageSize);
      setBookingUser(paginatedPosts);
      // setBookingUser(res.data);
      setLoading(false);
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
      setLoading(true);
    }
  };

  const getSingleUserNotifications = async (id: any) => {
    const res = await notificationForUserAdmin(id);
    if (res.status) {
      setUserNotifications(res.data);
      setLoading(false);
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
      setLoading(true);
    }
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getUserBookingById(id)
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setBookingUser(paginatedPosts);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getUserBookingPayment(id)
      .then((res) => {
        if (res.status == true) {
          setTotalBookingPayment(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setUserBookingPayment(paginatedPosts);
          setLoading(false);
        } else {
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (value: any) => {
    return moment(value).format("D/M/YY");
  };

  const openCity = (evt: any, cityName: string) => {
    var i: number,
      tabcontent: HTMLCollectionOf<Element>,
      tablinks: HTMLCollectionOf<Element>;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    const cityElement = document.getElementById(cityName);
    if (cityElement) {
      (cityElement as HTMLElement).style.display = "block";
    }

    if (evt.currentTarget instanceof HTMLElement) {
      evt.currentTarget.className += " active";
    }
  };

  const initializeTabs = () => {
    const tablinks = document.getElementsByClassName("tablinks");
    if (tablinks.length > 0) {
      const firstTab = tablinks[0];
      if (firstTab instanceof HTMLElement) {
        firstTab.click();
      }
    }
  };
  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    const userid = getUsers?.id;

    const data = {
      name: name || "",
      email: email,
      phone: phone || "",
      password: password,
    };
    UpdateSetting(userid, data)
      .then((res: any) => {
        toast.success("Profile Information updated successfully.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err: any) => {
        toast.error("Error occurred", {
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
  };

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    updateUsersImage(getUsers?.id, file)
      .then((res: any) => {
        //window.localStorage.setItem("pic", res.data.pic);
        showToast("success", res.message);
        // window.location.reload();
      })
      .catch((error: any) => {
        console.error(error);
        toast.error("Invalid file format", {
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
      });
  };
  const userAccountDeactivate = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to deactivate the User account",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willDelete) => {
      if (willDelete) {
        userDeactivate(id)
          .then((res) => {
            if (res.status === true) {
              swal("Account has been deactivate!", {
                icon: "success",
              });
              //router.push("/admin/users");
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
  const userAccountDelete = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the User account",
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
              router.push("/admin/users");
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
  const userBookingPayments = async (id: any) => {
    try {
      const res = await getUserBookingPayment(id);
      if (res.status) {
        //setUserBookingPayment(res.data);
        setTotalBookingPayment(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setUserBookingPayment(paginatedPosts);
        setLoading(false);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(true);
      }
    } catch (err: any) {
      // toast.error(err.message, {
      //     position: toast.POSITION.BOTTOM_RIGHT,
      // });
    }
  };

  const handleOpenModal = (bookingId: number) => {
    const booking = bookingUsers.find(
      (user: any) => user.booking_id === bookingId
    );
    setSelectedBooking(booking || null);
    setModalConfirm(true);
    getReceiptData(bookingId);
    GetSingleReceiptAdmin(bookingId);
  };

  const getReceiptData = async (bookingId: number) => {
    getSingleInvoice(bookingId)
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

  const GetSingleReceiptAdmin = async (id: number) => {
    try {
      const res = await getSingleReceiptAdmin(id);
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
      <Link href="/admin/users">
        <button className="table-btn mb-4">Back</button>
      </Link>
      <h5 style={{ color: "#ff4e00d1" }}>User Detail</h5>
      {/* <div className="row user-class pt-5"> */}
      <div className="row pt-5">
        <div className="col-sm-2 chef-img-set">
          {getUsers?.pic ? (
            <img
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                "/images/chef/users/" +
                getUsers.pic
              }
              alt=""
              width={300}
              height={180}
              style={{ borderRadius: "10px" }}
            />
          ) : (
            <img
              src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"}
              alt=""
              width={300}
              height={180}
              style={{ borderRadius: "10px" }}
            />
          )}
        </div>
        <div className="col-sm-7">
          <h2 style={{ fontSize: "22px", fontWeight: 600 }}>
            {getUsers?.name} {getUsers?.surname}
          </h2>
          <ul
            style={{
              listStyle: "none",
              paddingBottom: "20px",
              display: "inline-flex",
            }}
          >
            {getUsers?.role ? (
              <li style={{ paddingRight: "10px", textTransform: "capitalize" }}>
                <i
                  className="fa fa-address-card"
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#ff4e00d1",
                  }}
                ></i>
                {getUsers.role}
              </li>
            ) : (
              ""
            )}
            {getUsers?.currency ? (
              <li style={{ paddingRight: "10px" }}>
                <i
                  className="fa fa-sack-dollar"
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#ff4e00d1",
                  }}
                ></i>
                {getUsers.currency}
              </li>
            ) : (
              ""
            )}
            {getUsers?.address ? (
              <li style={{ paddingRight: "10px" }}>
                <i
                  className="fa fa-location-dot"
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#ff4e00d1",
                  }}
                ></i>
                {getUsers.address}
              </li>
            ) : (
              ""
            )}
            {getUsers?.city ? (
              <li style={{ paddingRight: "10px" }}>
                <i
                  className="fa fa-city"
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#ff4e00d1",
                  }}
                ></i>
                {getUsers.city}
              </li>
            ) : (
              ""
            )}
            {getUsers?.country ? (
              <li style={{ paddingRight: "10px" }}>
                <i
                  className="fa fa-flag"
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#ff4e00d1",
                  }}
                ></i>
                {getUsers.country}
              </li>
            ) : (
              ""
            )}
            {getUsers?.post_code ? (
              <li style={{ paddingRight: "10px" }}>
                <i
                  className="fa fa-map-pin"
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px",
                    color: "#ff4e00d1",
                  }}
                ></i>
                {getUsers.post_code}
              </li>
            ) : (
              ""
            )}
          </ul>
          {getUsers?.phone ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-phone"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">Phone</span> : {getUsers.phone}
            </p>
          ) : null}
          {getUsers?.email ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-envelope"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">Email</span> : {getUsers.email}
            </p>
          ) : null}
          {getUsers?.birthday ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-birthday-cake"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">Birthday</span> : {getUsers.birthday}
            </p>
          ) : null}
          {getUsers?.timezone ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-clock"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">TimeZone</span> : {getUsers.timezone}
            </p>
          ) : null}
        </div>
        <div className="col-sm-3">
          <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#ff4e00d1" }}>
            Business Information
          </h2>
          {getUsers?.business_email ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-envelope"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">Email</span> : {getUsers.business_email}
            </p>
          ) : null}
          {getUsers?.business_phoneno ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-phone"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">Phone</span> : {getUsers.business_phoneno}
            </p>
          ) : null}
          {getUsers?.company_name ? (
            <p style={{ paddingBottom: "10px" }}>
              <i
                className="fa fa-building"
                style={{
                  paddingRight: "10px",
                  fontSize: "14px",
                  color: "#ff4e00d1",
                }}
              ></i>
              <span id="book-user">Company Name</span> : {getUsers.company_name}
            </p>
          ) : null}
        </div>
        <hr style={{ marginTop: "20px", marginBottom: "10px" }} />
        <div className="tab">
          <button
            className="tablinks"
            onClick={(event) => openCity(event, "Booking")}
          >
            Booking
          </button>
          <button
            className="tablinks"
            onClick={(event) => openCity(event, "Payments")}
          >
            Payments
          </button>
          <button
            className="tablinks"
            onClick={(event) => openCity(event, "Notifications")}
          >
            Notifications
          </button>
          <button
            className="tablinks"
            onClick={(event) => openCity(event, "Edit profile")}
          >
            Edit profile
          </button>
          <button
            className="tablinks"
            onClick={(event) => openCity(event, "Profile status")}
          >
            Profile status
          </button>
        </div>
      </div>
      <div id="Booking" className="tabcontent">
        <div className="table-box">
          {loading == false ? (
            bookingUsers.length > 0 ? (
              // <table className="table table-borderless common_booking common_booking">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">BookingID</th>
                    <th scope="col">Date Requested</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Address</th>
                    <th scope="col">Category</th>
                    <th scope="col">Booking Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingUsers.map((user: any, index) => {
                    const datesString = user.dates;
                    const dates: Date[] = datesString
                      .split(",")
                      .map((dateString: string) => formatDate(dateString));
                    const startDate = dates[0];
                    const endDate = dates[dates.length - 1];
                    const output = `${startDate} to ${endDate}`;

                    return (
                      <tr key={index}>
                        <td>#{user.booking_id}</td>
                        <td>{formatDate(user.latest_created_at)}</td>
                        <td>
                          {user.category == "onetime"
                            ? formatDate(user.dates)
                            : output}
                        </td>
                        <td>{user.location}</td>
                        <td>
                          {user.category == "onetime"
                            ? "One time"
                            : "Mutiple Times"}
                        </td>
                        <td style={{ paddingLeft: "25px" }}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleOpenModal(user.booking_id);
                            }}
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </a>
                        </td>{" "}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="book1 text-center">No Booking Records Found</p>
            )
          ) : (
            <div className="text-center">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/chef_loading_img_3.gif`}
                width={50}
              />
              <p>Loading</p>
            </div>
          )}
        </div>
        <Pagination
          items={totalMenu.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>

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
            {selectedBooking ? (
              <>
                <div>
                  <button className="table-btn btn-2 date mr-sp">
                    {selectedBooking.dates}
                  </button>
                </div>
                <div className="off-can">
                  <div className="accordion" id="accordionExample">
                    {/* Service Details */}
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
                              <p className="chefs-name name-12">
                                Service Type:
                              </p>
                            </div>
                            <div className="col-8">
                              <p className="mony f-w-4">
                                {selectedBooking.category === "onetime"
                                  ? "One-time Service"
                                  : "Multiple Times Services"}
                              </p>
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-4">
                              <p className="chefs-name name-12">Services</p>
                            </div>
                            <div className="col-8">
                              <p className="mony f-w-4">
                                {selectedBooking.service_name}
                              </p>
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-4">
                              <p className="chefs-name name-12">Meal:</p>
                            </div>
                            <div className="col-8">
                              {selectedBooking.breakfast === "yes" && (
                                <button className="table-btn btn-2 list-btn">
                                  Breakfast
                                </button>
                              )}
                              {selectedBooking.lunch === "yes" && (
                                <button className="table-btn btn-2 list-btn">
                                  Lunch
                                </button>
                              )}
                              {selectedBooking.dinner === "yes" && (
                                <button className="table-btn btn-2 list-btn">
                                  Dinner
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-4">
                              <p className="chefs-name name-12">Cuisine:</p>
                            </div>
                            <div className="col-8">
                              {selectedBooking.cuisine_names
                                ?.split(",")
                                .map((cuisine: any, index: any) => (
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
                              {selectedBooking.allergy_names
                                ?.split(",")
                                .map((allergy: any, index: any) => (
                                  <button
                                    key={index}
                                    className="table-btn btn-2 list-btn m-1 mb-2"
                                  >
                                    {allergy.trim()}
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
                              {selectedBooking.notes ? (
                                <p className="mony f-w-4">
                                  {selectedBooking.notes}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Customer Details */}
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
                              <p className="mony">{selectedBooking.adults}</p>
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-5 text-right">
                              <p className="chefs-name name-12">Teens:</p>
                            </div>
                            <div className="col-7">
                              <p className="mony">{selectedBooking.teens}</p>
                            </div>
                          </div>
                          <div className="row mt-1">
                            <div className="col-5 text-right">
                              <p className="chefs-name name-12">Children:</p>
                            </div>
                            <div className="col-7">
                              <p className="mony">
                                {selectedBooking.childrens}
                              </p>
                            </div>
                          </div>
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
              </>
            ) : (
              <p>No booking selected</p>
            )}
          </div>
        </div>
      </div>

      <div id="Payments" className="tabcontent">
        <div className="table-box">
          {loading == false ? (
            userBookingPayment.length > 0 ? (
              <table className="table table-borderless common_booking common_booking">
                <thead>
                  <tr>
                    <th scope="col">BookingID</th>
                    <th scope="col">ChargeID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Address</th>
                    <th scope="col">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookingPayment.map((user: any, index) => {
                    return (
                      <tr key={index}>
                        <td>#{user.id}</td>
                        <td>{user.charge_id ? user.charge_id : "N/A"}</td>
                        <td>
                          {user.charge_amount
                            ? "€" + user.charge_amount
                            : "N/A"}
                        </td>
                        <td>{user.location}</td>
                        <td>
                          {user.category == "onetime"
                            ? "One time"
                            : "Mutiple Times"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p className="book1 text-center">No Payments Records Found</p>
            )
          ) : (
            <div className="text-center">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/chef_loading_img_3.gif`}
                width={50}
              />
              <p>Loading</p>
            </div>
          )}
        </div>

        <Pagination
          items={totalBookingPayment.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <div id="Notifications" className="tabcontent">
        <div className="notifications-container">
          <div className="row header">
            <div className="col-7">
              <p className="title">
                Notifications
                <span className="unread-notifications-number">
                  {userNotifications.length}
                </span>
              </p>
            </div>
          </div>
          <div className="row notifications">
            <div className="col-12">
              {loading == false ? (
                userNotifications.length > 0 ? (
                  userNotifications.map((notification: any) => {
                    return (
                      <div
                        className={`row ${
                          notification?.description
                            ? "single-notification-box unread"
                            : ""
                        }`}
                        key={notification.id}
                      >
                        <div className="col-11 notification-text">
                          <p>
                            <span className="description">
                              {notification?.description}
                            </span>

                            {notification?.notifications_status == "unseen" &&
                            notification?.description ? (
                              <span className="unread-symbol">•</span>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="book1 text-center">No any notification Found</p>
                )
              ) : (
                <div className="text-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/chef_loading_img_3.gif`}
                    width={50}
                  />
                  <p>Loading</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="Edit profile" className="tabcontent">
        <form onSubmit={handleUpdateProfile}>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="user-img" id="admin-profile">
                {getUsers?.pic ? (
                  <img
                    src={
                      image && typeof image !== "string"
                        ? URL.createObjectURL(image)
                        : getUsers.pic
                        ? process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/chef/users/" +
                          getUsers.pic
                        : ""
                    }
                    style={{ objectFit: "contain" }}
                    alt=""
                  />
                ) : (
                  <img
                    src={
                      image && typeof image !== "string"
                        ? URL.createObjectURL(image)
                        : process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/users.jpg"
                    }
                    style={{ objectFit: "contain" }}
                    alt=""
                  />
                )}
                <label>
                  {" "}
                  <input
                    type="file"
                    name="image"
                    id="uploadfile"
                    className="d-none"
                    onChange={imageChange}
                    accept=".jpg, .jpeg, .gif, .png, .webp"
                  />
                  <i className="fa-solid fa-camera"></i>
                </label>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form tab-m-0 pt-0 right-left-spacing">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-6">
                    <label>Name </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={name || ""}
                      placeholder="Name "
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <label>Email</label>
                    <input
                      type="email"
                      defaultValue="email"
                      value={email || ""}
                      placeholder="example@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <label>Password</label>
                    <input
                      type="password"
                      id="loginpassword"
                      name="password"
                      value={password || ""}
                      placeholder="*******"
                      onChange={(e) => setPassword(e.target.value)}
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <label>Phone</label>
                    <input
                      type="text"
                      defaultValue="phone"
                      maxLength={10}
                      value={phone || ""}
                      placeholder="Phone"
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === "" || re.test(e.target.value)) {
                          setPhone(e.target.value);
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="text-right mt-5">
                    <button className="table-btn">
                      Update User Profile Information
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div id="Profile status" className="tabcontent">
        <div className="row">
          <div className="col-sm-6">
            <p className="text-center mb-3">
              If you want to deactivate account. Please Click on this button
            </p>
            <div className="text-center">
              <button
                className="table-btn"
                onClick={(e: any) => userAccountDeactivate(e, getUsers?.id)}
              >
                Deactivate Account
              </button>
            </div>
          </div>
          <div className="col-sm-6">
            <p className="text-center  mb-3">
              If you want to delete account. Please Click on this button
            </p>
            <div className="text-center">
              <button
                className="table-btn"
                onClick={(e: any) => userAccountDelete(e, getUsers?.id)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
