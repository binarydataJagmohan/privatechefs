import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {
  saveVilla,
  updateVilla,
  getVillas,
  getSingleVillas,
  deleteSingleVilla,
  getAdminVillaByBooking,
} from "../../../lib/adminapi";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "next/router";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "../../commoncomponents/Pagination";
import moment from "moment";
import swal from "sweetalert";
export default function Villas2(props: any) {
  const [name, setFullName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");
  const mapRef = useRef(null);
  const [bookingUsers, setBookingUser] = useState([]);
  const [totalBooking, setTotalBooking] = useState([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = isPageVisibleToRole("admin-villas");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      getSingleData(props.id);
      fetchBookingAdminDetails(props.id);
    }
  };

  const fetchBookingAdminDetails = async (id: any) => {
    try {
      const res = await getAdminVillaByBooking(id);
      if (res.status) {
        let filteredReceipts = res.data;
        if (router.query.booking_id) {
          filteredReceipts = res.data.filter(
            (receipt: any) => receipt.booking_id == router.query.booking_id
          );
        }

        setTotalBooking(filteredReceipts);
        const paginatedPosts = paginate(
          filteredReceipts,
          currentPage,
          pageSize
        );
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

  const formatDate = (value: any) => {
    return moment(value).format("D/M/YY");
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getAdminVillaByBooking(props.id)
      .then((res) => {
        if (res.status == true) {
          setTotalBooking(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setBookingUser(paginatedPosts);
        } else {
          // setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSingleData = async (id: any) => {
    getSingleVillas(id)
      .then((res) => {
        if (res.status == true) {
          setFullName(res.data.name);

          setImage(res.villaImg[0].image);
          setLat(res.lat);
          setLat(res.lng);

          const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
            version: "weekly",
            libraries: ["places"],
          });
          loader.load().then(() => {
            if (res.data) {
              if (mapRef.current) {
                const map = new google.maps.Map(mapRef.current, {
                  center: {
                    lat: parseFloat(res.data.lat),
                    lng: parseFloat(res.data.lng),
                  },
                  zoom: 12,
                });

                const marker = new google.maps.Marker({
                  position: {
                    lat: parseFloat(res.data.lat),
                    lng: parseFloat(res.data.lng),
                  },
                  map: map,
                  title: res.data.address,
                });
                //console.log(res.data[0].address);
              }
            } else {
              // handle case where res.data is undefined or empty
            }
          });
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSinglevilla = (id: any) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the villa",
      icon: "warning",
      //buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      //confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleVilla(id)
          .then((res) => {
            if (res.status == true) {
              swal("Your Villa has been deleted!", {
                icon: "success",
              });
              setTimeout(() => {
                window.location.href = "/admin/villas/";
              }, 1000);
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
          .catch((err) => {});
      } else {
      }
    });
  };

  return (
    <>
      <div className="table-part mt-3">
        <h2>
          {name}
          {/* <a href="#" className="t-icon">
            <i className="fa-solid fa-pencil"></i>
          </a>
          
          <button className="rating">
            4.8 <i className="fa-solid fa-star"></i>
          </button> */}

          <a href="#" className="t-icon">
            <i
              className="fa-solid fa-trash"
              onClick={(e) => deleteSinglevilla(props.id)}
            ></i>
          </a>
        </h2>

        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="table-box">
              {bookingUsers.length > 0 ? (
                <table className="table table-borderless common_booking common_booking">
                  <thead>
                    <tr>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Image</th>

                      <th scope="col">Booking Date</th>

                      <th scope="col">Category</th>
                      <th scope="col">Status</th>
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
                      const surname =
                        user.surname !== null && user.surname !== "null"
                          ? user.surname
                          : "";

                      return (
                        <tr key={index}>
                          <td>
                            <p className="text-data-18" id="table-p">
                              #{user.booking_id}
                            </p>
                          </td>
                          <td>
                            <p className="text-data-18" id="table-p">
                              {`${user.name} ${surname}`
                                .split(" ")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </p>
                          </td>
                          <td className="chefs_pic">
                            <p className="text-data-18" id="table-p">
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
                            </p>
                          </td>

                          <td>
                            <p className="text-data-18" id="table-p">
                              {user.category == "onetime"
                                ? formatDate(user.dates)
                                : output}
                            </p>
                          </td>

                          <td>
                            <p className="text-data-18" id="table-p">
                              {user.category == "onetime"
                                ? "One time"
                                : "Mutiple Times"}
                            </p>
                          </td>

                          <td
                            className={`booking-status-${user.booking_status}`}
                          >
                            {user.booking_status}
                          </td>

                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="book1" style={{ textAlign: "center" }}>
                  No Records Found.
                </p>
              )}
            </div>
            <Pagination
              items={totalBooking.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>

          <div className="col-lg-5  col-md-12">
            {image ? (
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/villas/images/${image}`}
                alt="villa"
                className="boder-img"
              />
            ) : (
              <img
                src={process.env.NEXT_PUBLIC_BASE_URL + "images/villa.png"}
                alt="villa"
                className="boder-img"
              />
            )}

            <div
              className="mt-4"
              ref={mapRef}
              style={{ height: "400px" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
