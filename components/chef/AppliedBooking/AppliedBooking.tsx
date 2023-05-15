import React, { useState, useEffect,useRef} from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {getUserBookingId } from "../../../lib/adminapi";
import { getChefAppliedFilterByBooking,getChefAppliedBooking } from "../../../lib/chefapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

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

  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string;
	profile_status: string;
  }

  interface Errors {
	amount?: string;
	selectedmenu?:string;
  }


  const [bookingUsers, setBookingUser] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [sidebarConfirm,setSidebarConfirm] = useState(false);
  const [booking, setBooking] = useState<Booking>({});
  const [totalBooking, setTotalBooking] = useState([]);
  const [bookingdate, setBookingDate] = useState('');
  const [daysbooking, setDaysBooking] = useState<DaysBookingCheck[]>([]);
  const mapRef = useRef(null); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: '',
    name: '',
    email: '',
    pic: null,
    surname: '',
    role: '',
    approved_by_admin: '',
	profile_status:''
  });


  const pageSize = 10;
 

  useEffect(() => {
    const data = isPageVisibleToRole("chef-bookings");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
	const userData = getCurrentUserData() as CurrentUserData;
      if(userData.approved_by_admin == 'yes' && userData.profile_status == 'completed'){
		fetchChefAppliedBooking(userData.id,);
        setCurrentUserData({
          ...userData,
          id: userData.id,
          name: userData.name,
          pic: userData.pic,
          surname: userData.surname,
          role: userData.role,
          approved_by_admin: userData.approved_by_admin,
  
        });
      }else {
        window.location.href = "/404";
      }
	 
    }
    
	
  }, []);

  const fetchChefAppliedBooking = async (id:any) => {
    try {
      const res = await getChefAppliedBooking(id);
      if (res.status) {
		setTotalBooking(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setBookingUser(paginatedPosts);

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

  const onPageChange = (page:any) => {
    setCurrentPage(page);
    getChefAppliedBooking(currentUserData.id)
    .then(res => {
      if(res.status==true){
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

  const getSingleBookingUser = (e:any, id:any) => {
    e.preventDefault();
      getUserBookingId(id).then((res) => {
      setBooking(res.booking[0]);
	  setDaysBooking(res.days_booking);
      setSidebarConfirm(true);

	  if(res.days_booking.length == 1){
			setBookingDate(formatDate(res.booking[0].dates))
	  }else {
		const datesString = res.booking[0].dates;
		const dates = datesString.split(',').map((dateString:string) => formatDate(dateString));
		const startDate = dates[0];
		const endDate = dates[dates.length - 1];
		const output = `${startDate} to ${endDate}`;
		setBookingDate(output)
		
	  }

	  const loader = new Loader({
		apiKey: "AIzaSyBsHfzLkbQHTlW5mg3tyVFKCffTb1TfRaU",
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

  const formatDate = (value:any) => {
	return moment(value).format('D/M/YY');
  }
  
  const handleButtonClick = (index:any,type:string,id:string) => {
    setActiveIndex(index);
	if(type == 'all'){
		fetchChefAppliedBooking(id);
	}else {
		getChefAppliedFilterByBooking(id,type)
			.then(res => {
			if(res.status==true){
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

	  
  return (
    <>
    
      <div className="table-part">
        <h2 className="mb-4">Avaialable Bookings</h2>
		
		<ul className="table_header_button_section">
			<li>
				<button
				className={`table-btn ${activeIndex == 0 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(0,'all',currentUserData.id)}
				>
				Total
				</button>
			</li>
			<li>
				<button
				className={`table-btn ${activeIndex == 1 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(1,'upcoming',currentUserData.id)}
				>
				Upcoming
				</button>
			</li>
			<li>
				<button
				className={`table-btn ${activeIndex == 2 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(2,'cancelled',currentUserData.id)}
				>
				Cancelled
				</button>
			</li>
			<li>
				<button
				className={`table-btn ${activeIndex == 3 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(3,'completed',currentUserData.id)}
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
                <th scope="col">Booking Date</th>
                <th scope="col">Category</th>
                <th scope="col">Menu</th>
                <th scope="col">Amount</th>
                <th scope="col">Booking Status</th>
                <th scope="col">Applied Status</th>
                <th scope="col">Action</th>
                
              </tr>
            </thead>
            <tbody>
              {bookingUsers.map((user:any,index) =>  {

					const datesString = user.dates;
					const dates = datesString.split(',').map((dateString:string) => formatDate(dateString));
					const startDate = dates[0];
					const endDate = dates[dates.length - 1];
					const output = `${startDate} to ${endDate}`;

					return (
						<tr key={index}>
						<td>{index+1}</td>
						<td>{`${user.name} ${user.surname}`.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
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
						
						<td>{user.category == 'onetime' ? formatDate(user.dates) : output }</td>
						
						<td>{user.category == 'onetime' ? 'One time' : 'Mutiple Times'}</td>
                        <td>{user.menu_names}</td>
                        <td>{user.amount}</td>
                        <td>{user.booking_status}</td>
						
						<td>{user.applied_jobs_status}</td>

						
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
			<div className="offcanvas offcanvas-end"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
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
								<p className="chefs-name name-12">Days {index+1}:</p>
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
       
    
	  <ToastContainer/>
    </>
  );
}