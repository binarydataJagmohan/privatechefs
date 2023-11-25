import React, { useState, useEffect, useRef } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModalXtraLarge";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserBookingId, getSingleUserAssignBooking, UpdatedAppliedBookingByKeyValue, deleteBooking,AssignedBookingByAdminWithoutDatabse } from "../../../lib/adminapi";
import { getConciergeChefByBooking,getConciergeFilterByBooking} from "../../../lib/concierge";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";
import swal from "sweetalert";
import { useRouter } from 'next/router';

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

	const [assignselectedchef, setAsssignSelectedChef] = useState<Number>(null);
	const [checkassignselectedchef, setCheckAsssignSelectedChef] = useState<Number>(null);
	const [payment_status, setPaymentStatus] = useState('pending');

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


	const [isSubmitting, setIsSubmitting] = useState(false);

	const fetchBookingAdminDetails = async (id: any) => {
		try {
			const userData = getCurrentUserData() as CurrentUserData;
			const res = await getConciergeChefByBooking(userData.id);
			if (res.status) {

				// const filteredData = res.data.filter((record: any) => {
				// 	return (
				// 		record.chef_id != id &&
				// 		record.applied_jobs_status != 'hired' &&
				// 		record.applied_jobs_status != 'discussion' &&
				// 		record.applied_jobs_status != 'rejected'
				// 	);
				// });

				setTotalBooking(res.data);
				const paginatedPosts = paginate(res.data, currentPage, pageSize);
				setBookingUser(paginatedPosts);

			} else {
				toast.error(res.message, {
					position: toast.POSITION.TOP_RIGHT,
					closeButton: true,
					hideProgressBar: false,
					style: {
						background: '#ffff',
						borderLeft: '4px solid #e74c3c',
						color: '#454545',
					},
					progressStyle: {
						background: '#ffff',
					},
				});
			}
		} catch (err: any) {
			toast.error(err.message, {
				position: toast.POSITION.BOTTOM_RIGHT,
				closeButton: true,
				hideProgressBar: false,
				style: {
					background: '#ffff',
					borderLeft: '4px solid #e74c3c',
					color: '#454545',
				},
				progressStyle: {
					background: '#ffff',
				},
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
					// res.data.forEach((item: any) => {
					// 	// 
					// 	if (item.applied_jobs_status == "hired") {
					// 		setAppliedId(item.applied_jobs_id);
					// 	}
					// });

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

	const handleButtonClick = (index: any, type: string,id: string) => {
		setActiveIndex(index);
		const userData = getCurrentUserData() as CurrentUserData;
		if (type == 'all') {
			fetchBookingAdminDetails(userData.id);
		} else {
			getConciergeFilterByBooking(userData.id,type)
				.then(res => {
					if (res.status == true) {

						// const filteredData = res.data.filter((record: any) => {
						// 	return (
						// 		record.chef_id != id &&
						// 		record.applied_jobs_status != 'hired' &&
						// 		record.applied_jobs_status != 'discussion' &&
						// 		record.applied_jobs_status != 'rejected'
						// 	);
						// });

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
		// var user_show = $('#user_show_' + appliedid).val();

		if (!assignselectedchef) {

			swal({
				title: 'Oops!',
				text: 'please choose one user to assign this booking',
				icon: 'info',

			});
		} else {
			
			if (client && admin) {
				setIsSubmitting(true)
				const data = {
					booking_id :bookingid,
					id: appliedid,
					chef_id:assignselectedchef,
					client_amount:client,
					payment_status:payment_status
				}

				// console.log(data);

				AssignedBookingByAdminWithoutDatabse(data)
					.then(res => {
						if (res.status == true) {

							toast.success(res.message, {
								position: toast.POSITION.TOP_RIGHT,
								closeButton: true,
								hideProgressBar: false,
								style: {
									background: '#ffff',
									borderLeft: '4px solid #ff4e00d1',
									color: '#454545',
									"--toastify-icon-color-success": "#ff4e00d1",
								},
								progressStyle: {
									background: '#ffff',
								},
							});

							setModalConfirm(false);

							getSingleUserAssignBookingData(bookingid)
							fetchBookingAdminDetails(currentUserData.id);
						} else {

							toast.error(res.message, {
								position: toast.POSITION.TOP_RIGHT,
								closeButton: true,
								hideProgressBar: false,
								style: {
									background: '#ffff',
									borderLeft: '4px solid #e74c3c',
									color: '#454545',
								},
								progressStyle: {
									background: '#ffff',
								},
							});

						}
					})
					.catch(err => {
						console.log(err);
					})
					.finally(() => {
						setIsSubmitting(false); // Always set isSubmitting to false, whether the submission succeeds or fails.
					});

			} else {
				swal({
					title: 'Oops!',
					text: 'Please enter admin amount & client amount',
					icon: 'info',

				});
			}
		}

	};

	function handleChange(event: any) {
		const key = event.target.name
		const name = event.target.name.split('_').slice(0, -1).join('_');
		const value = event.target.value;
		const id = key.split('_')[2];

		const data = {
			id: id,
			key: name,
			value: value,
		}
		UpdatedAppliedBookingByKeyValue(data)
			.then(res => {
				if (res.status == true) {

					// toast.success(res.message, {
					// 	position: toast.POSITION.TOP_RIGHT
					// });

					getSingleUserAssignBookingData(bookingid)
				} else {

					// toast.error(res.message, {
					// 	position: toast.POSITION.TOP_RIGHT,
					// 	closeButton: true,
					// 	hideProgressBar: false,
					// 	style: {
					// 		background: '#ffff',
					// 		borderLeft: '4px solid #e74c3c',
					// 		color: '#454545',
					// 	},
					// 	progressStyle: {
					// 		background: '#ffff',
					// 	},
					// });

				}
			})
			.catch(err => {
				console.log(err);
			})

	}

	// function handleBlur(event: any) {

	// 	if (appliedkey != 'id') {
	// 		const userData = getCurrentUserData() as CurrentUserData;
	// 		const data = {
	// 			id: appliedid,
	// 			key: appliedkey,
	// 			value: appliedValue,
	// 			message: 'data',
	// 			created_by : userData.id
	// 		}
	// 		UpdatedAppliedBookingByKeyValue(data)
	// 			.then(res => {
	// 				if (res.status == true) {

	// 					// toast.success(res.message, {
	// 					// 	position: toast.POSITION.TOP_RIGHT
	// 					// });

	// 					getSingleUserAssignBookingData(bookingid)
	// 				} else {

	// 					toast.error(res.message, {
	// 						position: toast.POSITION.TOP_RIGHT,
	// 						closeButton: true,
	// 						hideProgressBar: false,
	// 						style: {
	// 							background: '#ffff',
	// 							borderLeft: '4px solid #e74c3c',
	// 							color: '#454545',
	// 						},
	// 						progressStyle: {
	// 							background: '#ffff',
	// 						},
	// 					});

	// 				}
	// 			})
	// 			.catch(err => {
	// 				console.log(err);
	// 			});

	// 	}


	// }

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

	const handleRadioChange = (chef:number,appliedid:any) => {
		
		setAsssignSelectedChef(Number(chef));
		setAppliedId(appliedid);
	};

	return (
		<>
			<div className="table-part">
				<h2 className="mb-4">Available Bookings</h2>

				<ul className="table_header_button_section">
					<li>
						<button
							className={`table-btn ${activeIndex == 0 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(0, 'all', currentUserData.id)}
						>
							Total
						</button>
					</li>
					<li>
						<button
							className={`table-btn ${activeIndex == 1 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(1, 'upcoming', currentUserData.id)}
						>
							Upcoming
						</button>
					</li>
					<li>
						<button
							className={`table-btn ${activeIndex == 2 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(2, 'cancelled', currentUserData.id)}
						>
							Cancelled
						</button>
					</li>
					<li>
						<button
							className={`table-btn ${activeIndex == 3 ? "active" : "btn-2"}`}
							onClick={() => handleButtonClick(3, 'completed', currentUserData.id)}
						>
							Completed
						</button>
					</li>
				</ul>
				<div className="table-box">
				{bookingUsers.length > 0 ?
						<table className="table table-borderless common_booking common_booking">
							<thead>
								<tr>
									<th scope="col">Booking ID</th>
									<th scope="col">Customer</th>
									<th scope="col">Image</th>
									<th scope="col">Date Requested</th>
									<th scope="col">Booking Date</th>
									<th scope="col">Address</th>
									<th scope="col">Category</th>
									<th scope="col">Payment Status</th>
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
									const surname = user.surname !== null && user.surname !== 'null' ? user.surname : '';

									return (
										<tr key={index}>
											<td><p className="text-data-18" id="table-p">#{user.booking_id}</p></td>
											<td><p className="text-data-18" id="table-p">{`${user.name} ${surname}`.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p></td>
											<td className="chefs_pic"><p className="text-data-18" id="table-p">
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
											</p>
											</td>
											<td><p className="text-data-18" id="table-p">{formatDate(user.latest_created_at)}</p></td>

											<td><p className="text-data-18" id="table-p">{user.category == 'onetime' ? formatDate(user.dates) : output}</p></td>
													

											<td><p className="text-data-18" id="table-p">{user.location}</p></td>
											<td><p className="text-data-18" id="table-p">{user.category == 'onetime' ? 'One time' : 'Mutiple Times'}</p></td>

											<td><p className="text-data-18" id="table-p">{user.payment_status}</p></td>		

											<td className={`booking-status-${user.booking_status}`}>{user.booking_status}</td>

											{/* <td className={`booking-status-${user.booking_status}`}>
												{isBookingUpcoming(user.dates)}
											</td> */}

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

														{/* {user.payment_status} */}

														{user.category == 'multipletimes'  && (<li>
															<a
																className="dropdown-item"
																href="#"
																onClick={(e) => { setModalConfirm(true); getSingleUserAssignBookingData(user.booking_id); setBookingId(user.booking_id); resetFields();setCheckAsssignSelectedChef(user.assigned_to_user_id);setPaymentStatus(user.payment_status)}}
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
						<p className="book1" style={{textAlign:"center"}}>No Booking Records Found.</p>
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
										<th scope="col">Chef's Amount</th>
										<th scope="col">Client Amount</th>
										<th scope="col">Admin Amount</th>
										{/* <th scope="col">Show to user</th> */}
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
															id={`chef_id_${chef.chef_id}`}
															name={`chef_id_${chef.chef_id}`}
															onChange={() => handleRadioChange(Number(chef.chef_id),chef.applied_jobs_id)} // Add this line
        													checked={assignselectedchef == chef.chef_id} 
														/>
													</div>
													
												</th>
												<td>{chef.name} {chef.surname}
												
												{payment_status === 'completed' && checkassignselectedchef == chef.chef_id && (
														<button type="button" className="btn btn-sm btn-success mx-2">Paid</button>
													)}
												{chef.applied_jobs_status == 'discussion' && checkassignselectedchef == chef.chef_id && (
														<button type="button" className="btn btn-sm btn-info text-white">Assigned</button>
													)}

												</td>
												<td>
													{chef.menu_names?.split(",").map((menu, index) => (
														<button className="table-btn btn-2 list-btn mb-1" key={index}>
															{menu.trim()}
														</button>
													))}
													
													
												</td>
												<td>{chef.amount}</td>
												<td>
													<div className="all-form p-0 add-w">
														<div className="login_div">
															<input
																type="number"
																id={`client_amount_${chef.applied_jobs_id}`}
																name={`client_amount_${chef.applied_jobs_id}`}
																placeholder="Client Amount"
																onChange={handleChange}
																// onBlur={handleBlur}
																value={chef.client_amount}
															/>
														</div>
													</div>
												</td>
												<td>
													<div className="all-form p-0 add-w">
														<div className="login_div">
															<input
																type="number"
																id={`admin_amount_${chef.applied_jobs_id}`}
																name={`admin_amount_${chef.applied_jobs_id}`}
																placeholder="Admin Amount"
																onChange={handleChange}
																// onBlur={handleBlur}
																value={chef.admin_amount}
															/>
														</div>
													</div>
												</td>
												{/* <td>
													<div className="all-form p-0 add-w">
														<div className="login_div">
															<select name={`user_show_${chef.applied_jobs_id}`} onChange={handleChange}
																onBlur={handleBlur} defaultValue={chef.user_show} id={`user_show_${chef.applied_jobs_id}`}>
																<option value="">Choose Option</option>
																<option value="visible">Visible</option>
																<option value="invisible">Invisible</option>
															</select>
														</div>
													</div>
												</td> */}
											</tr>
										))
									) : (
										<tr>
											<td className="" colSpan={7} style={{textAlign:"center" ,paddingTop: "5%",border:"unset",fontSize:"16px"}}><p style={{fontSize:"16px"}}>No Chef apply for this booking</p></td>
										</tr>
									)}
								</tbody>
							</table>
							<div className="row">
								<div className="col-md-6">
									
								</div>
								{/* <div className="text-right"> */}
								<div className="col-md-6">
									<div className="text-right">
										<div className="banner-btn">
											<button id="btn_offer" className="mx-2" type="button" onClick={handleClear}>
												Clear
											</button>
											<button
												id="btn_offer"
												type="submit"
												disabled={isSubmitting}
											>
												{isSubmitting ? "Submitting..." : "Assign Booking"}
											</button>
										</div>
									</div>
									{/* </div> */}
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