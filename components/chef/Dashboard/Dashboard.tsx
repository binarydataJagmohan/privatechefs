import React, { useState ,useEffect} from 'react'
export default function Dashboard() {
    return (
        <>
			<div className="table-part">
				 <div className="row">
				 <div className="col-lg-9 col-md-12">				  
				  <h2>Hello Alex!</h2> 	
				  <div className="orders-box mt-4">
				   <div className="row">
				   <div className="col-lg-1 col-md-12"></div>
				   <div className="col-lg-4 col-md-4">
						<div className="box-today border-right m-view-border-bottom">
							<h4>Orders today</h4>
							<h2>261</h2>
							<p>20% more than previous week</p>
						</div>
					</div>
					<div className="col-lg-4 col-md-4">
						<div className="box-today border-right m-view-border-bottom">
							<h4>Total Payments</h4>
							<h2>10.392$</h2>
							<p>30% were pre-payed</p>
						</div>
					</div>
					<div className="col-lg-3 col-md-4">
						<div className="box-today">
							<h4>Chefs</h4>
							<h2>20</h2>
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
								 <div className="golden-box">
								  <div className="golden-box-2"></div>
									<h5>Bookings</h5>
									<h2>1,382</h2>
									<h6>+8,3%</h6>
								 </div>
							</div>
							<div className="col-lg-6 col-md-6"> 
								 <div className="golden-box">
								  <div className="golden-box-2"></div>
									<h5>Customers</h5>
									<h2>234</h2>
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
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
								
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
								<tr>
									<td>2493</td>
									<td>5122389082</td>
									<td>$539.2</td>
									<td>8/21/15</td> 
								</tr>
							</tbody>
						</table>
					</div>
					</div>
				</div>

				 </div>

				 <div className="col-lg-3 col-md-12">
					<div className="right-side">
					 <h3 className="mt-5">Today’s Schedule</h3>
					 <div className="row">
						<div className="col-3">
							<p className="time-part mt-3">09:00</p>
						</div>
						<div className="col-7">
							<div className="booking-text left-border-r">
								<p className="booking-16">Booking #4838</p>
								<p className="l-c-14">Location</p>
								<p className="l-c-14">Chef</p>
							</div>
						</div>
						<div className="col-2">
						  <a href="#"><i className="fa-solid fa-ellipsis"></i></a>
						</div>
					  </div>

					  <div className="row mt-3">
						<div className="col-3">
							<p className="time-part mt-3">09:00</p>
						</div>
						<div className="col-7">
							<div className="booking-text left-border-r">
								<p className="booking-16">Booking #4838</p>
								<p className="l-c-14">Location</p>
								<p className="l-c-14">Chef</p>
							</div>
						</div>
						<div className="col-2">
						  <a href="#"><i className="fa-solid fa-ellipsis"></i></a>
						</div>
					  </div>

					  <div className="row mt-3">
						<div className="col-3">
							<p className="time-part mt-3">09:00</p>
						</div>
						<div className="col-7">
							<div className="booking-text left-border-r">
								<p className="booking-16">Booking #4838</p>
								<p className="l-c-14">Location</p>
								<p className="l-c-14">Chef</p>
							</div>
						</div>
						<div className="col-2">
						  <a href="#"><i className="fa-solid fa-ellipsis"></i></a>
						</div>
					  </div>

					  <div className="row mt-3">
						<div className="col-3">
							<p className="time-part mt-3">09:00</p>
						</div>
						<div className="col-7">
							<div className="booking-text left-border-r">
								<p className="booking-16">Booking #4838</p>
								<p className="l-c-14">Location</p>
								<p className="l-c-14">Chef</p>
							</div>
						</div>
						<div className="col-2">
						  <a href="#"><i className="fa-solid fa-ellipsis"></i></a>
						</div>
					  </div>

					  <div className="row mt-3">
						<div className="col-3">
							<p className="time-part mt-3">09:00</p>
						</div>
						<div className="col-7">
							<div className="booking-text left-border-r">
								<p className="booking-16">Booking #4838</p>
								<p className="l-c-14">Location</p>
								<p className="l-c-14">Chef</p>
							</div>
						</div>
						<div className="col-2">
						 	<a href="#"><i className="fa-solid fa-ellipsis"></i></a>
						</div>
					  </div>

					  
					</div>
				 </div>
				 </div>
			</div>
        </>
    )
}