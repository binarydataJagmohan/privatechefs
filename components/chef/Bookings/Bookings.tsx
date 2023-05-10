import React, { useState, useEffect,useRef} from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {getUserBookingId } from "../../../lib/adminapi";
import { getUserChefByBooking,getUserChefFilterByBooking,getAllChefMenu } from "../../../lib/chefapi";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { Loader } from "@googlemaps/js-api-loader";
import Pagination from "../../commoncomponents/Pagination";

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
    approved_by_admin: string
  }


  interface MenuData {
    id: number;
    name?:string;
    menu_name?:string;
    image?:string;

  }

  interface Errors {
	amount?: string;
	menu?:string;
  }


  const [bookingUsers, setBookingUser] = useState([]);
  const [modalConfirm, setModalConfirm] = useState(true);
  const [sidebarConfirm,setSidebarConfirm] = useState(false);
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

  const [menu, setMenu] = useState<MenuData[]>([]);

  const [errors, setErrors] = useState<Errors>({});

  const [amount, setAmount] = useState('');

  const [menuItems, setMenuItems] = useState([]);
  
  
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
    const data = isPageVisibleToRole("chef-bookings");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
	const userData = getCurrentUserData() as CurrentUserData;
      if(userData.approved_by_admin == 'yes'){
		fetchBookingUserDetails();
        getAllChefMenuData(userData.id)
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

  const fetchBookingUserDetails = async () => {
    try {
      const res = await getUserChefByBooking();
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
    getUserChefByBooking()
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
		//   console.log(res.booking[0]);
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
  
  const handleButtonClick = (index:any,type:string) => {
    setActiveIndex(index);
	if(type == 'all'){
		fetchBookingUserDetails();
	}else {
		getUserChefFilterByBooking(type)
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

  	const getAllChefMenuData = async (id:any) => {
		getAllChefMenu(id)
		.then(res => {
		if(res.status==true){
			setMenu(res.data);
		} 
		})
		.catch(err => {
			console.log(err);
		});
	}

	const handleBookingApplyJobSubmit = (event:any) => {
        event.preventDefault();
    
        // Validate form data
        const newErrors: Errors = {};
		alert("sdf")
        // if (!amount) {
        //   newErrors.amount = "Amount is required";
        // } else if (menuItems.length) {
        //   newErrors.menuItems = "Please choose alteast one Menu";
        // }
        

        setErrors(errors);
    
        // Submit form data if there are no errors
        if (Object.keys(errors).length === 0) {
          // setButtonState(true);
           // Call an API or perform some other action to register the user
           const data = {
             amount: amount,
             menu: menu,
           };
        //    login(data)
		// 	.then(res => {
		// 		if(res.status==true){
					
		// 		} else {
		// 			toast.info(res.message, {
		// 				position: toast.POSITION.TOP_RIGHT
		// 			});
				
		// 		}
		// 	})
         	
        }
        
    };

	const handleBookingApplyAmount = (e:any) => {
		const { name, value } = e.target;
		let errorsCopy = { ...errors };
		switch (name) {
		  case "amount":
			if (value.trim() === "") {
			  errorsCopy.amount = "Amount is required";
			} else if (!/^\d+$/.test(value.trim())) {
			  errorsCopy.amount = "Amount should be a number";
			} else {
			  delete errorsCopy.amount;
			}
			break;
		  default:
			break;
		}
		setErrors(errorsCopy);
	};
	  
	const handleMenuItemChange = (event:any, menuItemId:any) => {
		const isChecked = event.target.checked;
		setMenuItems((prevMenuItems:any) =>
		  isChecked
			? [...prevMenuItems, menuItemId]
			: prevMenuItems.filter((item:any) => item !== menuItemId)
		);
		
	  };
	  
	  const handleMenuItemBlur = (event:any) => {
		const { name, value } = event.target;
		let error = "";
	  
		if (!value.trim()) {
		  error = "Please select at least one menu item";
		}
	  
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
	  };
	  

  return (
    <>
      <div className="table-part">
        <h2>Bookings</h2>
		
		<ul className="table_header_button_section">
			<li>
				<button
				className={`table-btn ${activeIndex == 0 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(0,'all')}
				>
				Total
				</button>
			</li>
			<li>
				<button
				className={`table-btn ${activeIndex == 1 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(1,'upcoming')}
				>
				Upcoming
				</button>
			</li>
			<li>
				<button
				className={`table-btn ${activeIndex == 2 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(2,'cancelled')}
				>
				Cancelled
				</button>
			</li>
			<li>
				<button
				className={`table-btn ${activeIndex == 3 ? "active" : "btn-2"}`}
				onClick={() => handleButtonClick(3,'completed')}
				>
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
					const dates = datesString.split(',').map((dateString:string) => formatDate(dateString));
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
											onClick={() => { setModalConfirm(true); setBookingId(user.booking_id); }}
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
       
     

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="popup-part new-modala">
          <h2 className="title-pop up-move">Booking #{bookingid}</h2>
          	<div className="offers">
			  <form onSubmit={handleBookingApplyJobSubmit} className="common_form_error" id="login_form">  
            	<div className="row">
					<div className="col-sm-6 col-12">
						<div className="all-form">
						<div className='login_div'>
							<label className="f-w-4">Chef’s Offer:</label>
							
							<input type="text" id="name" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} onBlur={handleBookingApplyAmount} placeholder="Enter Amount"/>
								{errors.amount && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.amount}</span>}
									</div>
						</div>
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

						<div className="row px-4">
						{menu.length ? (
								menu.map((menuItem, index) => (
									<div key={index} className="form-check col-6">
									<input
										className="form-check-input"
										type="checkbox"
										value={menuItem.id}
										id={`menuItem-${index}`}
										onChange={(e) => handleMenuItemChange(e, menuItem.id)}
										onBlur={handleMenuItemBlur}
									/>
									<label className="form-check-label" htmlFor={`menuItem-${index}`}>
										{menuItem.menu_name}
									</label>
									
									</div>
								))
								) : (
								<p>No menu items found</p>
						)}
						
						</div>
						<div className="text-right">
						<div className="banner-btn">
							{/* <a href="#">Send Request</a> */}
							<button id="btn_offer" type="submit">Send Request</button>
						</div>
						</div>
					</div>
				</div>
				</form>
          	</div>
        </div>
      </PopupModal>
    </>
  );
}