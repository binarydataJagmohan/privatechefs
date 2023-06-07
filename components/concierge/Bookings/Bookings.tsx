import React, { useState, useEffect, useRef } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModalXtraLarge";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserBookingId, getSingleUserAssignBooking, UpdatedAppliedBookingByKeyValue, getAdminChefFilterByBooking, deleteBooking } from "../../../lib/adminapi";
import { getConciergeChefByBooking} from "../../../lib/concierge";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";
import swal from "sweetalert";

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
		approved_by_admin: string

	}


	interface Errors {
		chefid?: string;
	}


	const [bookingUsers, setBookingUser] = useState([]);
	const [modalConfirm, setModalConfirm] = useState(false);
	const [sidebarConfirm, setSidebarConfirm] = useState(false);
	const [booking, setBooking] = useState<Booking>({});
	const [totalBooking, setTotalBooking] = useState([]);
	const [bookingdate, setBookingDate] = useState('');
	const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);
	const mapRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [errorMessage, setErrorMessage] = useState('');
	const [bookingid, setBookingId] = useState('');
	const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
		id: '',
		name: '',
		email: '',
		pic: null,
		surname: '',
		role: '',
		approved_by_admin: ''
	});

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


	const [errors, setErrors] = useState<Errors>({});

	const [amount, setAmount] = useState('');

	const [selectedmenu, setSelectedMenu] = useState<number[]>([]);

	const [chefoffer, setChefOffer] = useState<ChefOffer[]>([]);

	const radioRef = useRef<HTMLInputElement>(null);


	const [appliedid, setAppliedId] = useState('');
	const [appliedkey, setAppliedKey] = useState('');
	const [appliedValue, setAppliedValue] = useState('');

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
		const data = isPageVisibleToRole("concierge-bookings");
		if (data == 2) {
			window.location.href = "/login"; // redirect to login if not logged in
		} else if (data == 0) {
			window.location.href = "/404"; // redirect to 404 if not authorized
		}
		if (data == 1) {
			const userData = getCurrentUserData() as CurrentUserData;
			fetchBookingAdminDetails(userData.id);
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

	const fetchBookingAdminDetails = async (id:any) => {
		try {
			const userData = getCurrentUserData() as CurrentUserData;
			const res = await getConciergeChefByBooking(userData.id);
			if (res.status) {

				setTotalBooking(res.data);
				const paginatedPosts = paginate(res.data, currentPage, pageSize);
				setBookingUser(paginatedPosts);

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
		getConciergeChefByBooking()
			.then(res => {
				if (res.status == true) {

					setTotalBooking(res.data);
					const paginatedPosts = paginate(res.data, page, pageSize);
					setBookingUser(paginatedPosts);


				} else {
					setErrorMessage(res.message);
				}
			})
			.catch(err => {
				console.log(err);
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

	const getSingleUserAssignBookingData = (id: any) => {

		getSingleUserAssignBooking(id)
			.then(res => {
				if (res.status == true) {
					setChefOffer(res.data);
					// console.log(res.data);
					res.data.forEach((item: any) => {
						// 
						if (item.applied_jobs_status == "hired") {
							setAppliedId(item.applied_jobs_id);
						}
					});

				} else {
					setErrorMessage(res.message);
				}
			})
			.catch(err => {
				console.log(err);
			});


	};


	const formatDate = (value: any) => {
		return moment(value).format('D/M/YY');
	}

	const handleButtonClick = (index: any, type: string) => {
		setActiveIndex(index);
		if (type == 'all') {
			const userData = getCurrentUserData() as CurrentUserData;
			fetchBookingAdminDetails(userData.id);
		} else {
			getAdminChefFilterByBooking(type)
				.then(res => {
					if (res.status == true) {

						setTotalBooking(res.data);
						const paginatedPosts = paginate(res.data, currentPage, pageSize);
						setBookingUser(paginatedPosts);
					} else {
						setErrorMessage(res.message);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};



	const handleBookingAssignJobSubmit = (event: any) => {
		event.preventDefault();

		var client = $('#client_amount_' + appliedid).val();
		var admin = $('#admin_amount_' + appliedid).val();
		var user_show = $('#user_show_' + appliedid).val();

		if (!appliedid) {

			swal({
				title: 'Oops!',
				text: 'please choose one user to assign this booking',
				icon: 'info',

			});
		} else {

			if (client && admin && user_show == 'visible') {
				const userData = getCurrentUserData() as CurrentUserData;
				const data = {
					id: appliedid,
					key: 'status',
					value: 'hired',
					message: 'assign',
				}
				UpdatedAppliedBookingByKeyValue(data)
					.then(res => {
						if (res.status == true) {

							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT
							});

							setModalConfirm(false);

							getSingleUserAssignBookingData(bookingid)
							fetchBookingAdminDetails(userData.id);
						} else {

							toast.error(res.message, {
								position: toast.POSITION.TOP_RIGHT
							});

						}
					})
					.catch(err => {
						console.log(err);
					});

			} else {
				swal({
					title: 'Oops!',
					text: 'Please enter admin amount,client amount and select user status is visible',
					icon: 'info',

				});
			}
		}

	};

	function handleChange(event: any) {
		const name = event.target.name;
		const value = event.target.value;
		const id = name.split('_')[2];

		if (name == 'id') {
			setAppliedId(value);
			setAppliedKey(name);
		} else {
			setAppliedId(id);
			setAppliedKey(name.split('_').slice(0, -1).join('_'));
		}


		setAppliedValue(value);

		// console.log(chefId);
	}

	function handleBlur(event: any) {

		if (appliedkey != 'id') {

			const data = {
				id: appliedid,
				key: appliedkey,
				value: appliedValue,
				message: 'data',
			}
			UpdatedAppliedBookingByKeyValue(data)
				.then(res => {
					if (res.status == true) {

						// toast.success(res.message, {
						// 	position: toast.POSITION.TOP_RIGHT
						// });

						getSingleUserAssignBookingData(bookingid)
					} else {

						toast.error(res.message, {
							position: toast.POSITION.TOP_RIGHT
						});

					}
				})
				.catch(err => {
					console.log(err);
				});

		}


	}

	const resetFields = () => {
		setAmount('');
		setSelectedMenu([]);
		console.log(selectedmenu);
	}

	const handleClear = () => {
		if (radioRef.current) {
			radioRef.current.checked = false;
		}
	};

	const deleteBookingByAdmin = (id: any) => {
		const userData = getCurrentUserData() as CurrentUserData;
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
							fetchBookingAdminDetails(userData.id);

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
		window.location.href = '/admin/edit-booking/step1';
	}


	return (
		<>
			<div className="table-part">
				<h2 className="mb-4">Available Jobs</h2>

				<ul className="table_header_button_section">
					<li>
						<button
							className={`table-btn ${activeIndex == 0 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(0, 'all')}
						>
							Total
						</button>
					</li>
					<li>
						<button
							className={`table-btn ${activeIndex == 1 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(1, 'upcoming')}
						>
							Upcoming
						</button>
					</li>
					<li>
						<button
							className={`table-btn ${activeIndex == 2 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(2, 'cancelled')}
						>
							Cancelled
						</button>
					</li>
					<li>
						<button
							className={`table-btn ${activeIndex == 3 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(3, 'completed')}
						>
							Completed
						</button>
					</li>
				</ul>
				<div className="table-box">
					{bookingUsers.length > 0 ?
						<table className="table table-borderless common_booking">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Customer</th>
									<th scope="col">User</th>
									<th scope="col">Date Requested</th>
									<th scope="col">Booking Date</th>
									<th scope="col">Address</th>
									<th scope="col">Category</th>

									<th scope="col">Status</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>

								{bookingUsers.map((user: any, index) => {

									const datesString = user.dates;
									const dates = datesString.split(',').map((dateString: string) => formatDate(dateString));
									const startDate = dates[0];
									const endDate = dates[dates.length - 1];
									const output = `${startDate} to ${endDate}`;
									const surname = user && user.surname ? user.surname : '';

									return (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{`${user.name} ${surname}`.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
											<td className="chefs_pic">
												{user.pic ? <img
													src={
														process.env.NEXT_PUBLIC_IMAGE_URL +
														"/images/chef/users/" + user.pic
													}
													alt=""
												/> : <img
													src={
														process.env.NEXT_PUBLIC_IMAGE_URL +
														"/images/users.jpg"
													}
													alt=""
												/>}

											</td>
											<td>{formatDate(user.latest_created_at)}</td>

											<td>{user.category == 'onetime' ? formatDate(user.dates) : output}</td>
											<td>{user.location}</td>
											<td>{user.category == 'onetime' ? 'One time' : 'Mutiple Times'}</td>

											<td className={`booking-status-${user.booking_status}`}>{user.booking_status}</td>

											<td>
												<div className="dropdown" id="none-class">
													<a
														className="dropdown-toggle"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i className="fa-solid fa-ellipsis" role="button"></i>
													</a>
													<ul
														className="dropdown-menu"
														aria-labelledby="dropdownMenuButton"
													>
														<li>
															<a
																className="dropdown-item"
																href="#"
																onClick={(e) => getSingleBookingUser(e, user.booking_id)}
																data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
															>
																View Booking
															</a>
														</li>

														{user.category == 'multipletimes' && (<li>
															<a
																className="dropdown-item"
																href="#"
																onClick={(e) => { setModalConfirm(true); getSingleUserAssignBookingData(user.booking_id); setBookingId(user.booking_id); resetFields() }}
															>
																Assign Booking
															</a>
														</li>)}


														<li>
															<a
																className="dropdown-item"
																href="#"
																onClick={(e) => editbooking(user.booking_id)}
															>
																Edit
															</a>
														</li>
														<li>
															<a
																className="dropdown-item"
																href="#"
																onClick={() => { deleteBookingByAdmin(user.booking_id); }}
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
						:
						<p>No Booking Records Found</p>
					}
				</div>
			</div>

			<Pagination
				items={totalBooking.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>


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
												<p className="mt-2">No Chef apply for this booking</p>
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
																{daybooking.breakfast === 'yes' &&
																	<button className="table-btn btn-2 list-btn">Breakfast</button>

																}
																{daybooking.lunch === 'yes' &&
																	<button className="table-btn btn-2 list-btn">Lunch</button>
																}
																{daybooking.dinner === 'yes' &&
																	<button className="table-btn btn-2 list-btn">Dinner</button>
																}
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
													<p className="mony">{booking.name} {booking.surname}</p>
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


			<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
				<div className="popup-part new-modala">
					<h2 className="title-pop up-move mt-2">Booking id #{bookingid}</h2>
					<div className="offers">
						<form onSubmit={handleBookingAssignJobSubmit} className="common_form_error" id="">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Chef's Name</th>
										<th scope="col-2">Menu</th>
										<th scope="col">Amount</th>
										<th scope="col">Client Amount</th>
										<th scope="col">Admin Amount</th>
										<th scope="col">Show to user</th>
									</tr>
								</thead>
								<tbody>
									{chefoffer.length > 0 ? (
										chefoffer.map((chef, index) => (
											<tr key={index}>
												<th scope="row">
													<div className="form-check">
														<input
															className="form-check-input"
															type="radio"
															name="id"
															defaultValue={chef.applied_jobs_id}
															onChange={handleChange}
															onBlur={handleBlur}
															ref={radioRef}
															defaultChecked={chef.applied_jobs_status == 'hired'}
														/>
													</div>
												</th>
												<td>{chef.name} {chef.surname}</td>
												<td>
													{chef.menu_names?.split(",").map((menu, index) => (
														<button className="table-btn btn-2 list-btn mb-1" key={index}>
															{menu.trim()}
														</button>
													))}
												</td>
												<td>{chef.amount}</td>
												<td>
													<div className="all-form p-0">
														<div className="login_div">
															<input
																type="number"
																id={`client_amount_${chef.applied_jobs_id}`}
																name={`client_amount_${chef.applied_jobs_id}`}
																placeholder="Client Amount"
																onChange={handleChange}
																onBlur={handleBlur}
																defaultValue={chef.client_amount}
															/>
														</div>
													</div>
												</td>
												<td>
													<div className="all-form p-0">
														<div className="login_div">
															<input
																type="number"
																id={`admin_amount_${chef.applied_jobs_id}`}
																name={`admin_amount_${chef.applied_jobs_id}`}
																placeholder="Admin Amount"
																onChange={handleChange}
																onBlur={handleBlur}
																defaultValue={chef.admin_amount}
															/>
														</div>
													</div>
												</td>
												<td>
													<div className="all-form p-0">
														<div className="login_div">
															<select name={`user_show_${chef.applied_jobs_id}`} onChange={handleChange}
																onBlur={handleBlur} defaultValue={chef.user_show} id={`user_show_${chef.applied_jobs_id}`}>
																<option value="">Choose Option</option>
																<option value="visible">Visible</option>
																<option value="invisible">Invisible</option>
															</select>
														</div>
													</div>
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
							<div className="text-right">
								<div className="banner-btn">
									<button id="btn_offer" className="mx-2" type="button" onClick={handleClear}>
										Clear
									</button>
									<button id="btn_offer" type="submit">
										Assign Booking
									</button>
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