import React, { useState, useEffect } from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getAllBooking, saveReceipt, getChefReceipt, getSingleReceipt, updateReceipt, deleteReceipt, updateReceiptImages } from '../../../lib/chefapi'
import { getCurrentUserData } from '../../../lib/session'
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Receipts() {

	interface User {
		id: string;
		name: string;
		surname: string;
		email: string;
		approved_by_admin: string;
		profile_status: string;
	}

	interface CurrentUserData {
		id: number;
		name: string;
	}

	interface SingleReceipt {
		id: number;
		receipt_id: number;
	}

	interface ImageObject {
		image: string;
	}

	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [order_date, setOrderDate] = useState("");
	const [booking_id, setBookingId] = useState("");
	const [image, setImage] = useState<Array<Blob | ImageObject>>([]);
	const [currentuserdata, setCurrentUserData] = useState<CurrentUserData>({ id: 0, name: "" });

	const [errors, setErrors]: any = useState({});
	const [getbooking, setGetBooking] = useState('');
	const [getreceipt, setGetReceipt] = useState('');
	const [getsinglereceipt, setGetSingleReceipt] = useState<SingleReceipt>({ id: 0, receipt_id: 0 });
	const [getreceiptimageid, setGetReceiptImageId] = useState('');
	const [modalConfirm, setModalConfirm] = useState(false);
	const [editmodalConfirm, editsetModalConfirm] = useState(false);
	const [editimagemodalConfirm, editimagesetModalConfirm] = useState(false);
	const [totalMenu, setTotalMenu]: any = useState({});
	const [buttonStatus, setButtonState] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const modalConfirmOpen = () => {
		setModalConfirm(true);
	}
	const modalConfirmClose = () => {
		setModalConfirm(false);
	}
	const editmodalConfirmOpen = () => {
		editsetModalConfirm(true);
	}
	const editmodalConfirmClose = () => {
		editsetModalConfirm(false);
	}
	const editimagemodalConfirmOpen = () => {
		editimagesetModalConfirm(true);
	}
	const editimagemodalConfirmClose = () => {
		editimagesetModalConfirm(false);
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
			const userData: User = getCurrentUserData() as User;
				getAllBookingData();
				getReceiptData();
		}
		else {
			window.location.href = "/404";
		}
	}

	const getAllBookingData = async () => {
		getAllBooking()
			.then(res => {
				if (res.status == true) {
					setGetBooking(res.data);
					console.log(res.data);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const getReceiptData = async () => {
		const userData: User = getCurrentUserData() as User;
		getChefReceipt(userData.id)
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

	const getSingleReceiptData = async (id: any) => {
		getSingleReceipt(id)
			.then(res => {
				if (res.status == true) {
					modalConfirmClose();
					editmodalConfirmOpen();
					setGetSingleReceipt(res.data);
					setAmount(res.data.amount);
					setDescription(res.data.description);
					setOrderDate(res.data.order_date);
					setBookingId(res.data.booking_id);
					setImage(res.receiptImg);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const getImageData = async (id: any) => {
		getSingleReceipt(id)
			.then(res => {
				if (res.status == true) {
					modalConfirmClose();
					editmodalConfirmClose();
					editimagemodalConfirmOpen();
					setGetSingleReceipt(res.data);
					setGetReceiptImageId(res.receiptImg);
					setImage(res.receiptImg);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const onPageChange = (page: any) => {
		setCurrentPage(page);
		const userData: User = getCurrentUserData() as User;
		getChefReceipt(userData.id)
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

	const handleReceiptSubmit = (e: any) => {
		e.preventDefault();
		const errors: any = {};

		if (!booking_id) {
			errors.booking_id = "Booking is required";
		}
		if (!amount) {
			errors.amount = "Amount is required";
		}
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			setButtonState(true);
			const userData: User = getCurrentUserData() as User;
			const data = {
				user_id: userData.id,
				booking_id: booking_id,
				amount: amount,
				description: description,
				order_date: order_date
			};

			saveReceipt(data)
				.then(res => {
					if (res.status == true) {
						console.log(res.status);
						getReceiptData();
						modalConfirmClose();
						editmodalConfirmClose();
						setButtonState(false);
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

					} else {
						setButtonState(false);
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
				});
		}
	};


	const handleReceiptUpdate = (e: any) => {
		e.preventDefault();
		setButtonState(true);
		const id = getsinglereceipt.id;
		const data = {
			// user_id: currentuserdata.id,
			booking_id: booking_id,
			amount: amount,
			description: description,
			order_date: order_date
		};

		updateReceipt(id, data)
			.then(res => {
				if (res.status == true) {
					console.log(res.status);
					getReceiptData();
					modalConfirmClose();
					editmodalConfirmClose();
					editimagemodalConfirmClose();
					setButtonState(false);
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

				} else {
					setButtonState(false);
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
			});
	};

	const handleReceiptImageUpdate = (e: any) => {
		e.preventDefault();
		setButtonState(true);
		const id = getsinglereceipt.id;
		console.log(id);
		const data = {
			receipt_id: getsinglereceipt.receipt_id,
			image: image
		};

		updateReceiptImages(id, data, image)
			.then(res => {
				if (res.status === true) {
					console.log(res.status);
					getReceiptData();
					modalConfirmClose();
					editmodalConfirmClose();
					editimagemodalConfirmClose();
					setButtonState(false);
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
				} else {
					setButtonState(false);
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
			});
	};


	const deleteReceiptData = (id: any) => {
		swal({
			title: "Are you sure?",
			text: "You want to delete the receipt",
			icon: "warning",
			dangerMode: true,
			buttons: ["Cancel", "Yes, I am sure!"],
		}).then((willDelete) => {
			if (willDelete) {
				deleteReceipt(id)
					.then((res) => {
						if (res.status == true) {
							getReceiptData();
							swal("Your Receipt has been deleted!", {
								icon: "success",
							});
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
					.catch((err) => { });
			} else {
			}
		});
	};
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);

		setImage(files);
		console.log(files);
	};

	const resetFields = () => {
		setAmount("");
		setDescription("");
		setOrderDate("");
		setImage([]);
		setBookingId("");
	}


	return (
		<>
			<div className="table-part">
				<h2>Receipts</h2>
				<button className="table-btn" onClick={() => { modalConfirmOpen(); resetFields(); }}>Add</button>
				<div className="table-box" id="receipt_table">
					{getreceipt.length > 0 ?
						<table className="table table-borderless">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Order ID</th>
									<th scope="col">Amount</th>
									{/* <th scope="col">Payment Details</th>
								<th scope="col">Payment Details</th> */}
									<th scope="col">Order Date</th>
									{/* <th scope="col">Booking Date</th> */}
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{Array.isArray(getreceipt) && getreceipt.map((receipt, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>#{receipt.booking_id}</td>
										<td>{receipt.amount}</td>
										<td>{receipt.order_date ? new Date(receipt.order_date).toLocaleDateString() : ''}</td>
										{/* <td>{new Date(receipt.booking_date).toLocaleDateString()}</td> */}
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
															onClick={() =>
																getImageData(receipt.id)
															}
														>
															Image
														</a>
													</li>
													<li>
														<a
															className="dropdown-item"
															href="#"
															onClick={() =>
																deleteReceiptData(receipt.id)
															}
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
						:
						<p className='book1 text-center'>No Records Found</p>
					}
				</div>
			</div>

			<Pagination
				items={totalMenu.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>

			<PopupModal
				show={modalConfirm}
				handleClose={modalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form" id="form_id">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleReceiptSubmit}
					>
						<div className="login_div">
							<label htmlFor="booking">BookingId:</label>
							<select aria-label="Default select example" value={booking_id} onChange={(e) => setBookingId(e.target.value)}>
								<option value='' disabled>Select Booking</option>
								{Array.isArray(getbooking) && getbooking.map((booking, index) => (
									<option key={booking.id} value={booking.id}>
										{`bookingid#${booking.id} - location#${booking.location}-booking_date#${new Date(booking.created_at).toLocaleDateString()}`}
									</option>
								))}
							</select>
							{errors.booking_id && (
								<span className="small error text-danger mb-2 d-inline-block error_login">
									{errors.booking_id}
								</span>
							)}
						</div>
						<div className='row'>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="date">Order date:</label>
									<input
										type="date"
										name="order_date"
										value={order_date}
										onChange={(e) => setOrderDate(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="amount">Amount:</label>
									<input
										type="number"
										name="amount"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
									/>
									{errors.amount && (
										<span className="small error text-danger mb-2 d-inline-block error_login">
											{errors.amount}
										</span>
									)}
								</div>
							</div>
						</div>
						<div className="login_div">
							<label htmlFor="Description">Description:</label>
							<textarea
								id="form-description"
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className='mt-4'>
							<button
								className="btn-send w-100"
								disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</PopupModal>

			<PopupModal
				show={editmodalConfirm}
				handleClose={editmodalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form" id="form_id">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleReceiptUpdate}
					>
						<div className="login_div">
							<label htmlFor="booking">BookingId:</label>
							<select aria-label="Default select example" value={booking_id} onChange={(e) => setBookingId(e.target.value)}>
								<option value='' disabled>Select Booking</option>
								{Array.isArray(getbooking) && getbooking.map((booking) => (
									<option key={booking.id} value={booking.id} defaultValue={booking.id === booking_id ? 'true' : undefined}>
										{`bookingid#${booking.id} - location#${booking.location} -booking_date#${new Date(booking.created_at).toLocaleDateString()}`}
									</option>
								))}
							</select>
						</div>
						<div className='row'>
							<div className='col-md-6'>
								<div className="login_div">
									<div className="login_div">
										<label htmlFor="date">Order date:</label>
										<input
											type="date"
											name="order_date"
											defaultValue={order_date}
											onChange={(e) => setOrderDate(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="amount">Amount:</label>
									<input
										type="number"
										name="amount"
										defaultValue={amount}
										onChange={(e) => setAmount(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="login_div">
							<label htmlFor="Description">Description:</label>
							<textarea
								id="form-description"
								name="description"
								defaultValue={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>
						<div className='mt-4'>
							<button
								className="btn-send w-100"
								disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Update'}
							</button>
						</div>
					</form>
				</div>
			</PopupModal>
			<PopupModal
				show={editimagemodalConfirm}
				handleClose={editimagemodalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form" id="form_id">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleReceiptImageUpdate}
					>
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
								{image && image.map((images, index) => (
									images instanceof Blob ? (
										<div className='col-md-4' key={index}>
											<div className="slider-img-plase">
												<div className='v-img'>
													<img src={URL.createObjectURL(images)} className="s-image" alt="selected image" width={100} height={100} />
												</div>
											</div>
										</div>
									) : (
										<div className='col-md-4' key={index}>
											<div className="slider-img-plase">
												<div className='v-img'>
													<img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/receipt/' + images.image} alt="villa-image" width={100} height={100} className="s-image" />
												</div>
											</div>
										</div>
									)
								))}
							</div>
						</div>
						<div className='mt-4'>
							<button
								className="btn-send w-100"
								disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Update'}
							</button>
						</div>
					</form>
				</div>
			</PopupModal>
			<ToastContainer />
		</>
	)
}
