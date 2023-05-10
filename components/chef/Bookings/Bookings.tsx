import React, { useState, useEffect,useRef} from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {getUserBookingId } from "../../../lib/adminapi";
import { getUserChefByBooking } from "../../../lib/chefapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { Loader } from "@googlemaps/js-api-loader";

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
	phone?:string;
 }

 interface DaysBookingCheck {
    breakfast?: string;
    lunch?:string;
	dinner?:string;
  }


  const [bookingUsers, setBookingUser] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [sidebarConfirm,setSidebarConfirm] = useState(false);
  const [booking, setBooking] = useState<Booking>({});
  const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);
  const mapRef = useRef(null); 

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
 

  useEffect(() => {
    const data = isPageVisibleToRole("chef-bookings");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
		
    }
    fetchBookingUserDetails();
	
  }, []);

  const fetchBookingUserDetails = async () => {
    try {
      const res = await getUserChefByBooking();
      if (res.status) {
        setBookingUser(res.data);
		
        //const paginatedPosts = paginate(res.data, currentPage, pageSize);
        //setAllergis(paginatedPosts);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err:any) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const getSingleBookingUser = (e:any, id:any) => {
    e.preventDefault();
      getUserBookingId(id).then((res) => {
		//   console.log(res.booking[0]);
      setBooking(res.booking[0]);
	  setDaysBooking(res.days_booking);
      setSidebarConfirm(true);

	  const loader = new Loader({
		apiKey: "AIzaSyBsHfzLkbQHTlW5mg3tyVFKCffTb1TfRaU",
		version: "weekly",
	  });

	  loader.load().then(() => {
		// create a new map instance
		const map = new google.maps.Map(mapRef.current, {
		  center: { lat: parseFloat(res.booking[0].lat), lng: parseFloat(res.booking[0].lng) }, // set the initial location of the map
		  zoom: 12, // set the initial zoom level
		});
  
		// create a new marker instance
		const marker = new google.maps.Marker({
		  position: { lat: parseFloat(res.booking[0].lat), lng: parseFloat(res.booking[0].lng) }, // set the position of the marker
		  map: map, // set the map where the marker should be displayed
		  title: res.booking[0].location, // set the title of the marker
		});
	  });
		

    });
  };

  const formatDate = (value:any) => {
	return moment(value).format('D/M/YY');
  }
  

  return (
    <>
      <div className="table-part">
        <h2>Bookings</h2>
		
        <ul className="table_header_button_section">
          <li>
            <button className="table-btn active">Total</button>
          </li>
          <li>
            <button className="table-btn btn-2">Upcoming</button>
          </li>
          <li>
            <button className="table-btn btn-2">Cancelled</button>
          </li>
          <li>
            <button className="table-btn btn-2" >
              Completed
            </button>
          </li>
        </ul>
        <div className="table-box">
          <table className="table table-borderless common_booking">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Customer</th>
                <th scope="col">Date Requested</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Address</th>
                <th scope="col">Category</th>
                <th scope="col">User</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingUsers.map((user:any,index) =>  {

					const datesString = user.dates;
					const dates = datesString.split(',').map(dateString => formatDate(dateString));
					const startDate = dates[0];
					const endDate = dates[dates.length - 1];
					const output = `${startDate} to ${endDate}`;

					return (
						<tr key={index}>
						<td>{index+1}</td>
						<td>{`${user.name} ${user.surname}`.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>

						<td>{formatDate(user.latest_created_at)}</td>
						
						<td>{user.category == 'onetime' ? formatDate(user.dates) : output }</td>
						<td>{user.location}</td>	
						<td>{user.category == 'onetime' ? 'One time' : 'Mutiple Times'}</td>
						<td className="chefs_pic">
							{user.pic ?  <img
							src={
								process.env.NEXT_PUBLIC_IMAGE_URL +
								"/images/users/"+user.pic
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
						<td>{user.booking_status}</td>

						
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
											onClick={(e)=>getSingleBookingUser(e,user.booking_id)}
											data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
										>
											View Booking
										</a>
									</li>
									
									<li>
										<a
											className="dropdown-item"
											href="#"
											
										>
											Apply
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
        </div>
      </div>

      
	  <div className="offcanvas-part"> 
			<div className="offcanvas offcanvas-end"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
			<div className="offcanvas-header">
				<h5 id="offcanvasRightLabel">Booking Details</h5>
				<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div className="offcanvas-body">
				<div>
				<button className="table-btn btn-2 date mr-sp">{formatDate(booking.dates)}</button> 
				
				</div>
				<div className="off-can">
				<div className="accordion" id="accordionExample">
				
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

							{daysbooking.length !== 1 && (
							<p>No bookings found.</p>
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
          <h2 className="title-pop up-move">Booking #98283</h2>
          <div className="offers">
            <div className="row">
              <div className="col-sm-6 col-12">
                <div className="all-form">
                  <label className="f-w-4">Chef’s Offer:</label>
                  <input
                    type="text"
                    placeholder="432$"
                    className="placeholder-goldan-text"
                  />
                </div>
              </div>
              <div className="col-sm-2  col-6">
                <button className="pop-btn ">Menu 1</button>
              </div>
              <div className="col-sm-2  col-6">
                <button className="pop-btn">Menu 2</button>
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
                <div className="pop-border-box">
                  <div className="faq-part">
                    <div className="accordion-part ">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              How does Private Chef Work?
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Private Chefs allows you to enjoy the experience
                              of having a private chef anywhere in the world. As
                              a guest,
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Who is the team behind Private Chefs?
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Private Chefs allows you to enjoy the experience
                              of having a private chef anywhere in the world. As
                              a guest...
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              How can I contact Private Chefs?
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Private Chefs allows you to enjoy the experience
                              of having a private chef anywhere in the world.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="banner-btn">
                    <a href="#">Start your journey</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopupModal>
    </>
  );
}