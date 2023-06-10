import React, { useState, useEffect } from 'react'
import { getAllConciergeBookings } from "../../../lib/concierge"
import { getCurrentUserData } from '../../../lib/session'

export default function Dashboard() {

	interface User {
		id: number;
		name: string;
	}

	const [bookingcount, setBookingCount] = useState();
	const [totalchef, setTotalChef] = useState();
	const [pendingbooking, setPendingBooking] = useState({});
	const [completedbooking, setCompletedBooking] = useState({});
	const [weeklyusers, setWeeklyUsers] = useState();
	const [weeklybooking, setweeklybooking] = useState();
	const [totalamount, setTotalAmount] = useState();

	const [currentUserData, setCurrentUserData] = useState<User>({
		id: 0,
		name: "",
	});

	useEffect(() => {
		const fetchBookingCount = async () => {
			try {
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
				//console.log(count);
			} catch (error) {
			}
		};

		fetchBookingCount();
	}, [])

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
										<p>20% more than previous week</p>
									</div>
								</div>
								<div className="col-lg-4 col-md-4">
									<div className="box-today border-right m-view-border-bottom">
										<h4>Total Payments</h4>
										<h2>{totalamount}$</h2>
										<p>30% were pre-payed</p>
									</div>
								</div>
								<div className="col-lg-3 col-md-4">
									<div className="box-today">
										<h4>Chefs</h4>
										<h2>{totalchef}</h2>
										<p>10% were high-rated</p>
									</div>
								</div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col-lg-5 col-sm-5">

								<h3 className="f-30 mb-4">Weekly Stats </h3>
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div className="golden-box m-center">
											<div className="golden-box-2 m-center"></div>
											<h5>Bookings</h5>
											<h2>{weeklybooking}</h2>
											<h6>+8,3%</h6>
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="golden-box m-center">
											<div className="golden-box-2 m-center"></div>
											<h5>Customers</h5>
											<h2>{weeklyusers}</h2>
											<h6>+2,5%</h6>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-7 col-sm-12">
								<div className="table-box">
									<h4>Pending requests</h4>
									<table className="table table-borderless">
										<thead>
											<tr>
												<th scope="col">ID</th>
												<th scope="col">Order ID</th>
												<th scope="col">Total Cost</th>
												<th scope="col">Order Date</th>
											</tr>
										</thead>
										<tbody>
											{Array.isArray(pendingbooking) ? (
												pendingbooking.slice(0, 5).map((booking, index) => {
													const orderDate = new Date(booking.orderDate);
													return (
														<tr key={index}>
															<td>{index + 1}</td>
															<td>#{booking.bookingId}</td>
															<td>${booking.amount}</td>
															<td>{orderDate.toLocaleDateString()}</td>
														</tr>
													);
												})
											) : (
												<tr>
													<td>No pending bookings</td>
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
								completedbooking.slice(0, 2).map((booking, index) => {
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
												<a href="#"><i className="fa-solid fa-ellipsis"></i></a>
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
			</div>
		</>
	)
}