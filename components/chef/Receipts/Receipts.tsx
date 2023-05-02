import React, { useState, useEffect } from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getAllBooking, saveReceipt ,getReceipt,getSingleReceipt} from '../../../lib/chefapi'
import { getCurrentUserData } from '../../../lib/session'
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Receipts() {

	const [total_cost, setTotalCost] = useState("");
	const [description, setDescription] = useState("");
	const [order_date, setOrderDate] = useState("");
	const [booking_id, setBookingId] = useState("");
	const [image, setImage] = useState('');
	const [currentuserdata, setCurrentUserData] = useState({});

	const [getbooking, setGetBooking] = useState('');
	const [getreceipt, setGetReceipt] = useState('');
	const [getsinglereceipt, setGetSingleReceipt] = useState('');
	const [modalConfirm, setModalConfirm] = useState(false);
	const [totalMenu, setTotalMenu] = useState({});
	const [buttonStatus, setButtonState] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const modalConfirmOpen = () => {
		setModalConfirm(true);
	}
	const modalConfirmClose = () => {
		setModalConfirm(false);
	}

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		const data = isPageVisibleToRole('receipt');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			const userid = getCurrentUserData();
			setCurrentUserData(userid);
			getAllBookingData();
			getReceiptData();
		}
	}

	const getAllBookingData = async () => {
		getAllBooking()
			.then(res => {
				if (res.status == true) {
					setGetBooking(res.data);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const getReceiptData = async () => {
		getReceipt()
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, currentPage, pageSize);
					setGetReceipt(paginatedPosts);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const getSingleReceiptData = async (id:any) => {
		getSingleReceipt(id)
			.then(res => {
				if (res.status == true) {
					setGetSingleReceipt(res.data);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const onPageChange = (page) => {
		setCurrentPage(page);
		getReceipt()
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, page, pageSize);
					setGetReceipt(paginatedPosts);
				} else {
					console.log(res.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleVillaSubmit = (e: any) => {
		e.preventDefault();
		setButtonState(true);
		// Call an API or perform some other action to register the user
		const data = {
			user_id: currentuserdata.id,
			booking_id: booking_id,
			total_cost: total_cost,
			description: description,
			order_date: order_date
		};

		saveReceipt(data, image)
			.then(res => {
				if (res.status == true) {
					console.log(res.status);
					getAllBookingData();
					setModalConfirm(false);
					setButtonState(false);
					toast.success(res.message, {
						position: toast.POSITION.TOP_RIGHT
					});

				} else {
					setButtonState(false);
					toast.error(res.message, {
						position: toast.POSITION.TOP_RIGHT
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleImageChange = (e: any) => {
		const files = Array.from(e.target.files);
		const imagesArray = [];

		for (let i = 0; i < files.length; i++) {
			imagesArray.push(files[i]);
		}

		setImage(imagesArray);
		console.log(imagesArray);
	};

	const resetFields = () => {
		setTotalCost("");
		setDescription("");
		setOrderDate("");
		setImage("");
		setBookingId("");
	}



	return (
		<>
			<div className="table-part">
				<h2>Receipts</h2>
				<button className="table-btn" onClick={() =>{modalConfirmOpen();resetFields();}}>Add</button>
				<div className="table-box" id="receipt_table">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Order ID</th>
								<th scope="col">Total Cost</th>
								{/* <th scope="col">Payment Details</th>
								<th scope="col">Payment Details</th> */}
								<th scope="col">Order Date</th>
								<th scope="col">Payment Date</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
						{Array.isArray(getreceipt) && getreceipt.map((receipt, index) => (
							<tr key={index}>
							    <td>{index + 1}</td>
								<td>#{receipt.booking_id}</td>
								<td>{receipt.total_cost}</td>
								<td>{new Date(receipt.order_date).toLocaleDateString()}</td>
								<td>{new Date(receipt.booking_date).toLocaleDateString()}</td>
								<td>
									<div className="dropdown" id="none-class">
										<a
											className="dropdown-toggle"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<i className="fa-solid fa-ellipsis"></i>
										</a>
										<ul
											className="dropdown-menu"
											aria-labelledby="dropdownMenuButton"
										>
											<li>
												<a
													className="dropdown-item"
													href="#"
													onClick={() => {
														getSingleReceiptData(receipt.id);
													}}
												>
													Edit
												</a>
											</li>
											<li>
												<a
													className="dropdown-item"
													href="#"
												>
													Delete
												</a>
											</li>
										</ul>
									</div>
								</td>
							</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<PopupModal
				show={modalConfirm}
				handleClose={modalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleVillaSubmit}
					>
						<div className="login_div">
							<label htmlFor="booking">BookingId:</label>
							<select aria-label="Default select example" value={booking_id} onChange={(e) => setBookingId(e.target.value)}>
								<option value=''>Select Booking</option>
								{Array.isArray(getbooking) && getbooking.map((booking, index) => (
									<option key={booking.id} value={booking.id}>
										{`bookingid#${booking.id} - location#${booking.location} - booking_status#${booking.booking_status} -booking_date#${new Date(booking.created_at).toLocaleDateString()}`}
									</option>
								))}
							</select>
						</div>

						<div className="login_div">
							<label htmlFor="date">Order date:</label>
							<input
								type="date"
								name="order_date"
								value={order_date}
								onChange={(e) => setOrderDate(e.target.value)}
							/>
						</div>
						<div className="login_div">
							<label htmlFor="amount">Amount:</label>
							<input
								type="number"
								name="total_cost"
								value={total_cost}
								onChange={(e) => setTotalCost(e.target.value)}
							/>
						</div>
						<div className="login_div">
							<label htmlFor="Description">Description:</label>
							<textarea
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className="login_div">
							<label htmlFor="Image">Image:</label>
							<input
								type="file"
								name="image"
								onChange={handleImageChange}
								accept="jpg,png"
								multiple
							/>

							<div className='row mt-3 g-3'>
								{image && image.map((image, index) => (
									image instanceof Blob || image instanceof File ? (
										<div className='col-md-4' key={index}>
											<div className='v-img'>
												<img src={URL.createObjectURL(image)} className="s-image" alt="selected image" width={100} height={100} />
											</div>
										</div>
									) : (
										null
									)
								))}
							</div>
						</div>
						<div className='mt-4'>
							<button
								type="submit"
								className="btn-send w-100"
							>
								Submit
							</button>
						</div>
					</form>
					<ToastContainer />
				</div>
			</PopupModal>
		</>
	)
}
