import React, { useState, useEffect, useRef } from 'react'
import { getAllConciergeBookings } from "../../../lib/concierge"
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserBookingId } from "../../../lib/adminapi";
import { Loader } from "@googlemaps/js-api-loader";
import moment from 'moment';

export default function Dashboard() {

	interface User {
		id: number;
		name: string;
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

	interface DaysBookingCheck {
		breakfast?: string;
		lunch?: string;
		dinner?: string;
	}

	const [bookingcount, setBookingCount] = useState();
	const [totalchef, setTotalChef] = useState();
	const [pendingbooking, setPendingBooking] = useState({});
	const [completedbooking, setCompletedBooking] = useState({});
	const [weeklyusers, setWeeklyUsers] = useState();
	const [weeklybooking, setweeklybooking] = useState();
	const [totalamount, setTotalAmount] = useState();
	const [currentbookings, setCurrentbooking] = useState('');
	const [previousbookings, setPreviousbooking] = useState('');
	const [bookingprecentage, setBookingPrecentage] = useState('');
	const [currentusers, setCurrentusers] = useState('');
	const [previoususers, setPrevioususers] = useState('');
	const [usersprecentage, setUsersPrecentage] = useState('');

	const [currentUserData, setCurrentUserData] = useState<User>({
		id: 0,
		name: "",
	});

	const [booking, setBooking] = useState<Booking>({});
	const [chefoffer, setChefOffer] = useState<ChefOffer[]>([]);
	const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);
	const mapRef = useRef(null);
	const [sidebarConfirm, setSidebarConfirm] = useState(false);
	const [bookingdate, setBookingDate] = useState('');

	const sidebarConfirmOpen = () => {
		setSidebarConfirm(true);
	};

	useEffect(() => {
		const fetchBookingCount = async () => {
			try {
				const data = isPageVisibleToRole("concierge-dashboard");
				if (data == 2) {
					window.location.href = "/login"; // redirect to login if not logged in
				} else if (data == 0) {
					window.location.href = "/404"; // redirect to 404 if not authorized
				}
				if (data == 1) {
					const userData: User = getCurrentUserData() as User;
					setCurrentUserData(userData);
					const data = await getAllConciergeBookings(userData.id);
					setBookingCount(data.todayBookings);
					setPendingBooking(data.pendingBooking);
					setCompletedBooking(data.completedBooking);
					setWeeklyUsers(data.weeklyUsers);
					setweeklybooking(data.weeklyBooking);
					setTotalChef(data.totalChef);
					setTotalAmount(data.totalamount);
					setCurrentbooking(data.currentbookings);
					setPreviousbooking(data.previousbookings);
					setBookingPrecentage(data.bookingprecentage);
					setCurrentusers(data.currentusers);
					setPrevioususers(data.previoususers);
					setUsersPrecentage(data.usersprecentage);
					//console.log(count);
				} else {
					window.location.href = "/404";
				}
			} catch (error) {
			}
		};

		fetchBookingCount();
	}, [])

	const formatDate = (value: any) => {
		return moment(value).format('D/M/YY');
	}

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


	return (
		<>
			<div className="table-part">
				<div className="row">
					<div className="col-lg-9 col-md-12">
						<h2>Hello {currentUserData.name}!</h2>
						<div className="orders-box mt-4">
							<div className="row">
								<div className="col-lg-1 col-md-12"></div>
								<div className="col-lg-4 col-md-4">
									<div className="box-today border-right m-view-border-bottom">
										<h4>Orders today</h4>
										<h2>{bookingcount}</h2>
										{/* <p>20% more than previous week</p> */}
									</div>
								</div>
								<div className="col-lg-4 col-md-4">
									<div className="box-today border-right m-view-border-bottom">
										<h4>Total Payments</h4>
										<h2>{totalamount}€</h2>
										{/* <p>30% were pre-payed</p> */}
									</div>
								</div>
								<div className="col-lg-3 col-md-4">
									<div className="box-today">
										<h4>Chefs</h4>
										<h2>{totalchef}</h2>
										{/* <p>10% were high-rated</p> */}
									</div>
								</div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col-lg-5 col-sm-12 col-md-12">

								<h3 className="f-30 mb-4">Weekly Stats </h3>
								<div className="row">
									<div className="col-lg-6 col-md-6 col-6 ">
										<div className="golden-box m-center h-lg-100">
											<div className="golden-box-2 m-center"></div>
											<h5>Bookings</h5>
											<h2>{weeklybooking}</h2>
											<h6 style={{
												color: (Number(currentbookings) !== 0 || Number(previousbookings) !== 0)
													? (Number(currentbookings) >= Number(previousbookings) ? 'green' : 'red')
													: 'red'
											}}>
												{(Number(currentbookings) !== 0 || Number(previousbookings) !== 0)
													? (Number(currentbookings) >= Number(previousbookings)
														? '+' + bookingprecentage + '%'
														: '-' + bookingprecentage + '%')
													: '-0%'}
											</h6>
										</div>
									</div>
									<div className="col-lg-6 col-md-6 col-6 ">
										<div className="golden-box m-center h-lg-100">
											<div className="golden-box-2 m-center"></div>
											<h5>Customers</h5>
											<h2>{weeklyusers}</h2>
											<h6 style={{
												color: (Number(currentusers) !== 0 || Number(previoususers) !== 0)
													? (Number(currentusers) >= Number(previoususers) ? 'green' : 'red')
													: 'red'
											}}>
												{(Number(currentusers) !== 0 || Number(previoususers) !== 0)
													? (Number(currentusers) >= Number(previoususers)
														? '+' + usersprecentage + '%'
														: '-' + usersprecentage + '%')
													: '-0%'}
											</h6>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-7 col-sm-12">
								<div className="table-box concierge">
									<h4>Upcoming Requests</h4>
									<table className="table table-borderless common_booking">
										<thead>
											<tr>
												<th scope="col">ID</th>
												<th scope="col">Order ID</th>
												<th scope="col">Total Cost</th>
												<th scope="col">Order Date</th>
											</tr>
										</thead>
										<tbody>
											{Array.isArray(pendingbooking)  && pendingbooking.length > 0 ? (
												pendingbooking.slice(0, 5).map((booking, index) => {
													const orderDate = new Date(booking.orderDate);
													return (
														<tr key={index}>
															<td>{index + 1}</td>
															<td>#{booking.bookingId}</td>
															<td>€{booking.amount}</td>
															<td>{orderDate.toLocaleDateString()}</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td colSpan={4} style={{textAlign:"center"}}>No upcoming bookings</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-3 col-md-12">
						<div className="right-side">
							<h3 className="mt-5">Today’s Schedule</h3>
							{Array.isArray(completedbooking) && completedbooking.length > 0 ? (
								completedbooking.slice(0, 5).map((booking, index) => {
									const orderTime = new Date(booking.ordertime);
									const formattedTime = orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
									return (
										<div className="row mt-3" key={index}>
											<div className="col-3">
												<p className="time-part mt-3">{formattedTime}</p>
											</div>
											<div className="col-7">
												<div className="booking-text left-border-r">
													<p className="booking-16">Booking #{booking.bookingId}</p>
													<p className="l-c-14">Location: {booking.address}</p>
													<p className="l-c-14">Chef: {booking.name}</p>
												</div>
											</div>
											<div className="col-2">
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
																onClick={(e) => getSingleBookingUser(e, booking.bookingId)}
																data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
															>
																View Booking
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div className="row">
									<div className="col-12">
										<p>No bookings</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

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
																<p className="mony m-2">€{chef.amount}</p>
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

			</div>
		</>
	)
}