import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {
  saveVilla,
  updateVilla,
  getUserBookingId,
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
import PopupModal from "../../../components/commoncomponents/PopupModalLarge";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [partner_owner, setPartnerOwner] = useState("");
  const [capacity, setCapacity] = useState("");
  const [category, setCategory] = useState("");
  const [price_per_day, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [BBQ, setBBQ] = useState("");
  const [type_of_stove, setTypeStove] = useState("");
  const [equipment, setEquipment] = useState("");
  const [website, setWebsite] = useState("");
  const [consierge_phone, setConsiergePhone] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  const [instagram_link, setInstagramLink] = useState("");
  const [twitter_link, setTwitterLink] = useState("");
  const [linkedin_link, setLinkedinLink] = useState("");
  const [youtube_link, setYoutubeLink] = useState("");
  const [villa_img, setVillaImage] = useState("");

  const [booking, setBooking] = useState<Booking>({});

  const [chefoffer, setChefOffer] = useState<ChefOffer[]>([]);

  const [editmodalConfirm, editsetModalConfirm] = useState(false);

  const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);

  const [sidebarConfirm, setSidebarConfirm] = useState(false);

  const [bookingdate, setBookingDate] = useState('');

  const editmodalConfirmClose = () => {
    editsetModalConfirm(false);
  };

  const sidebarConfirmOpen = () => {
		setSidebarConfirm(true);
	};

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

  interface ChefOffer {
		name?: string;
		surname?: string;
		menu_names?: string;
		amount?: string;
		id?: number;
		chef_id?: number;
		client_amount?: string;
		admin_amount?: string;
		user_show?: string;
		applied_jobs_status: string;
		applied_jobs_id: string;

	}

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

          setVillaImage(res.villaImg[0].image);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setAddress(res.data.address);
          setCity(res.data.city);
          setState(res.data.state);
          setPartnerOwner(res.data.partner_owner);
          setCapacity(res.data.capacity);
          setCategory(res.data.category);
          setPrice(res.data.price_per_day);
          setBedrooms(res.data.bedrooms);
          setBathrooms(res.data.bathrooms);
          setBBQ(res.data.BBQ);
          setTypeStove(res.data.type_of_stove);
          setEquipment(res.data.equipment);
          setWebsite(res.data.website);
          setConsiergePhone(res.data.consierge_phone);
          setFacebookLink(res.data.facebook_link);
          setInstagramLink(res.data.instagram_link);
          setTwitterLink(res.data.twitter_link);
          setLinkedinLink(res.data.linkedin_link);
          setYoutubeLink(res.data.youtube_link);
          setImage(res.villaImg);
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


	const getSingleBookingUser = (e: any, id: any) => {
		e.preventDefault();
		getUserBookingId(id).then((res) => {
			setBooking(res.booking[0]);
			setChefOffer(res.chefoffer);
			setDaysBooking(res.days_booking);
			setSidebarConfirm(true);

			if (res.days_booking.length == 1) {
				setBookingDate(formatDate(res.booking[0].dates))
			} else {
				const datesString = res.booking[0].dates;
				const dates = datesString.split(',').map((dateString: string) => formatDate(dateString));
				const startDate = dates[0];
				const endDate = dates[dates.length - 1];
				const output = `${startDate} to ${endDate}`;
				setBookingDate(output)

			}
			// create a new map instance
			if (typeof google !== 'undefined' && mapRef.current !== null) {
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

          <a href="#" className="t-icon">
            <i
              className="fa-solid fa-eye"
              onClick={(e) => editsetModalConfirm(true)}
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
                          <td onClick={(e) => getSingleBookingUser(e, user.booking_id)}
																data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
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
            {villa_img ? (
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/villas/images/${villa_img}`}
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
      <PopupModal
        show={editmodalConfirm}
        handleClose={editmodalConfirmClose}
        staticClass="var-login"
      >
        <div className="all-form" id="form_id">
          <form className="common_form_error" id="menu_form">
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="name">Name:</label>
                  <input type="text" name="name" value={name || ""} disabled />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={email || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4 villa_div">
                <div className="login_div">
                  <label htmlFor="phone">Phone:</label>
                  <PhoneInput
                    country={"us"}
                    value={phone}
                    disabled
                    // add the required attribute here
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="address">Address:</label>
                  <input
                    id="address-input2"
                    type="text"
                    name="address"
                    value={address || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="city">City:</label>
                  <input type="text" name="city" value={city || ""} disabled />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    name="state"
                    value={state || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="partner_owner">Partner/Owner:</label>
                  <input
                    type="text"
                    name="state"
                    value={partner_owner || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="category">Category:</label>

                  <input
                    type="text"
                    name="state"
                    value={category || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="number"
                    name="capacity"
                    value={capacity || ""}
                    onChange={(e) => setCapacity(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="price_per_day">Price Per Day:</label>
                  <input
                    type="number"
                    name="price_per_day"
                    value={price_per_day || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="bedrooms">Bedrooms:</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={bedrooms || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="bathrooms">Bathrooms:</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={bathrooms || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="type_of_stove">Type of stove1:</label>

                  <input
                    type="text"
                    name="bathrooms"
                    className="text-capitalize"
                    value={type_of_stove || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="equipment">Equipment:</label>

                  <input
                    type="text"
                    name="bathrooms"
                    value={equipment || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="BBQ">BBQ:</label>

                  <input
                    type="text"
                    name="bathrooms"
                    value={BBQ || ""}
                    disabled
                    className="text-capitalize"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="consierge_phone">Consierge Phone:</label>
                  <input
                    type="text"
                    name="consierge_phone"
                    value={consierge_phone || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="website">Website:</label>
                  <input
                    type="url"
                    name="website"
                    value={website || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="facebook_link">Facebook Link:</label>
                  <input
                    type="url"
                    name="facebook_link"
                    value={facebook_link || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="instagram_link">Instagram Link:</label>
                  <input
                    type="url"
                    name="instagram_link"
                    value={instagram_link || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="twitter_link">Twitter Link:</label>
                  <input
                    type="url"
                    name="twitter_link"
                    value={twitter_link || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="linkedin_link">Linkedin Link:</label>
                  <input
                    type="url"
                    name="linkedin_link"
                    value={linkedin_link || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="login_div">
                  <label htmlFor="youtube_link">Youtube Link:</label>
                  <input
                    type="url"
                    name="youtube_link"
                    value={youtube_link}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="login_div">
                  <label htmlFor="Image">Image:</label>

                  <div className="row mt-3 g-3">
                    {image &&
                      image.map((images: any, index) =>
                        images instanceof Blob || images instanceof File ? (
                          <div className="col-md-2" key={index}>
                            <div className="">
                              <img
                                src={URL.createObjectURL(images)}
                                className="s-image"
                                alt="selected image"
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="col-md-2" key={index}>
                            <div className="">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  "/images/villas/images/" +
                                  images.image
                                }
                                alt="villa-image"
                                width={100}
                                height={100}
                                className="s-image"
                              />
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </PopupModal>

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

								<div className="accordion-item">
									<h2 className="accordion-header" id="headingOne">
										<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											Chefs offers
										</button>
									</h2>
									<div id="collapseOne" className="mt-2 accordion-collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
										<div className="accordion-body">
											{chefoffer.length > 0 ? (
												chefoffer.map((chef, index) => (
													<div className="row" key={index}>
														<div className="col-5">
															<p className="chefs-name m-2">{chef.name}</p>
														</div>
														<div className="col-2">
															<p className="mony m-2">${chef.amount}</p>
														</div>
														<div className="col-5">
															{chef.menu_names?.split(",").map((menu, index) => (
																<button className="table-btn btn-2 list-btn m-2" key={index}>{menu.trim()}</button>
															))}
														</div>
													</div>
												))
											) : (
												<p className="mt-2" style={{textAlign:"center"}}>No Chef apply for this booking</p>
											)}
										</div>
									</div>
								</div>


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
													<p className="mony f-w-4">{booking.category == 'onetime' ? 'One time Service' : 'Mutiple Times Services'} </p>
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
															{daysbooking[0].breakfast === 'yes' &&
																<button className="table-btn btn-2 list-btn">Breakfast</button>
															}
															{daysbooking[0].lunch === 'yes' &&
																<button className="table-btn btn-2 list-btn">Lunch</button>
															}
															{daysbooking[0].dinner === 'yes' &&
																<button className="table-btn btn-2 list-btn">Dinner</button>
															}
														</>
													</div>
												</div>
											)}

											<div className="row mt-1">
												<div className="col-4">
													<p className="chefs-name name-12">Cuisine:</p>
												</div>
												<div className="col-8">
													{booking && booking.cuisines && booking.cuisines.split(",").map((cuisine, index) => (
														<button key={index} className="table-btn btn-2 list-btn m-1 mb-2">{cuisine.trim()}</button>
													))}
												</div>
											</div>

											<div className="row mt-1">
												<div className="col-4">
													<p className="chefs-name name-12">Allergies:</p>
												</div>
												<div className="col-8">
													{booking && booking.allergies && booking.allergies.split(",").map((allergies, index) => (
														<button key={index} className="table-btn btn-2 list-btn m-1 mb-2">{allergies.trim()}</button>
													))}

												</div>
											</div>
											<div className="row mt-1">
												<div className="col-4">
													<p className="chefs-name name-12">Special Requests:</p>
												</div>
												<div className="col-8">
    											{booking.notes !== null && booking.notes !== 'null' ? (
                                                  <p className="mony f-w-4">{booking.notes}</p>
                                                ) : ''}

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
																{daybooking.breakfast === 'yes' ? (
																	<button className="table-btn btn-2 list-btn">Breakfast</button>
																) : null}
																{daybooking.lunch === 'yes' ? (
																	<button className="table-btn btn-2 list-btn">Lunch</button>
																) : null}
																{daybooking.dinner === 'yes' ? (
																	<button className="table-btn btn-2 list-btn">Dinner</button>
																) : null}
																{daybooking.breakfast !== 'yes' &&
																	daybooking.lunch !== 'yes' &&
																	daybooking.dinner !== 'yes' && (
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
													<p className="mony">{booking.name} {booking.surname !== null && booking.surname !== 'null' ? booking.surname : ''}</p>
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

    </>
  );
}
