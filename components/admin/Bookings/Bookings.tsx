import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {
	getUserBybooking
  } from "../../../lib/adminapi";
  import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

export default function Bookings() {
   
    const [bookingUsers,setBookingUser] = useState([]);

	const [modalConfirm, setModalConfirm] = useState(false);
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

	useEffect(() => {

		const data = isPageVisibleToRole('admin-bookings');
				if (data == 2) {
				  window.location.href = '/login'; // redirect to login if not logged in
				} else if (data == 0) {
				  window.location.href = '/404'; // redirect to 404 if not authorized
				}
		  if (data == 1) {
			
		  }
		  fetchBookingUserDetails();
	  }, []);

	  const fetchBookingUserDetails = async () => {
		try {
		  const res = await getUserBybooking();
		  if (res.status) {
			setBookingUser(res.data);
			//const paginatedPosts = paginate(res.data, currentPage, pageSize);
			//setAllergis(paginatedPosts);
		  } else {
			toast.error(res.message, {
			  position: toast.POSITION.TOP_RIGHT,
			});
		  }
		} catch (err) {
		  toast.error(err.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		  });
		}
	  };
    return (
        <>
			<div className="table-part">
				<h2>Bookings</h2>
                <ul className="table_header_button_section">
                    <li><button className="table-btn active">Total</button></li>
				    <li><button className="table-btn btn-2">Upcoming</button></li>
                    <li><button className="table-btn btn-2">Cancelled</button></li>
                    <li><button className="table-btn btn-2" onClick={modalConfirmOpen}>Completed</button></li>
                </ul>
				<div className="table-box">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Customer</th>
								<th scope="col">Date Requested</th>
								<th scope="col">Booking Date</th>
								<th scope="col">Address</th>
								<th scope="col">Category</th>
								<th scope="col">Chef</th>
                                <th scope="col">Status</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
						{bookingUsers.map((user) => (
							<tr>
								<td>{user.id}</td>
								<td>{user.name+" "+user.surname}</td>
								<td>{user.date}</td>
								<td>2/11/12</td>
								<td>{user.address}</td>
								<td>{user.category}</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>{user.booking_status}</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							 ))}
						</tbody>
					</table>
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
								<input type="text" placeholder="432$" className="placeholder-goldan-text"/>
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
								<p className="f-10">Please pick one to send to the customer</p>
							</div> 
							<div className="pop-border-box">
							<div className="faq-part">  
								<div className="accordion-part ">
								<div className="accordion" id="accordionExample">
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingOne">
										<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										How does Private Chef Work?
										</button>
										</h2>
										<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
										<div className="accordion-body">
										Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, 
										</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingTwo">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
										Who is the team behind Private Chefs? 
										</button>
										</h2>
										<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
										<div className="accordion-body">
										Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest...
										</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingThree">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
										How can I contact Private Chefs? 
										</button>
										</h2>
										<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
										<div className="accordion-body">
										Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. 
										</div>
										</div>
									</div> 
								</div>
							</div> 
							</div>
							</div>
							<div className="text-right">
							 <div className="banner-btn"><a href="#">Start your journey</a></div>
							</div>
						</div> 
					</div>

				  </div>
				</div>
			</PopupModal>
        </>
    )
}