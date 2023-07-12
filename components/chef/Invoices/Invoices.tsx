import React, { useState, useEffect } from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getAllChefBooking, saveInvoice, getChefInvoice, updateInvoice, getSingleInvoice, deleteInvoice } from '../../../lib/chefapi'
import { getCurrentUserData } from '../../../lib/session'
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Invoices() {


	interface SingleReceipt {
		invoiceID: number;
	}

	const [date, setDate] = useState("");
	const [booking_id, setBookingId] = useState("");
	const [invoice_no, setInvoiceNo] = useState("");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");

	const [getbooking, setGetBooking] = useState('');
	const [getinvoice, setGetInvoice] = useState('');
	const [errors, setErrors]: any = useState({});
	const [modalConfirm, setModalConfirm] = useState(false);
	const [editmodalConfirm, editsetModalConfirm] = useState(false);
	const [getsingleinvoice, setSingleInvoice] = useState<SingleReceipt>({ invoiceID: 0 });
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
			const userData: any = getCurrentUserData();
			getAllBookingData(userData.id);
			getInvoiceData(userData.id);
		}
	}

	const getSingleInvoiceData = async (id: any) => {
		getSingleInvoice(id)
			.then(res => {
				if (res.status == true) {
					modalConfirmClose();
					editmodalConfirmOpen();
					setSingleInvoice(res.data);
					setAmount(res.data.invoiceAmount);
					setBookingId(res.data.booking_id);
					setInvoiceNo(res.data.invoice_no);
					setDate(res.data.date);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const getInvoiceData = async (id: any) => {
		const userData: any = getCurrentUserData();
		getChefInvoice(userData.id)
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, currentPage, pageSize);
					setGetInvoice(paginatedPosts);
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
		const userData: any = getCurrentUserData();
		getChefInvoice(userData.id)
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, page, pageSize);
					setGetInvoice(paginatedPosts);
				} else {
					console.log(res.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	const getAllBookingData = async (id: any) => {
		const userData: any = getCurrentUserData();
		getAllChefBooking(userData.id)
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

	const handleReceiptSubmit = (e: any) => {
		e.preventDefault();
		const errors: any = {};

		if (!booking_id) {
			errors.booking_id = "Booking is required";
		}
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			setButtonState(true);
			const userData: any = getCurrentUserData();
			const data = {
				user_id: userData.id,
				booking_id: booking_id,
				amount: amount,
				description: description,
				date: date,
				invoice_no: invoice_no
			};

			saveInvoice(data)
				.then(res => {
					if (res.status == true) {
						console.log(res.status);
						getInvoiceData(userData.id)
						modalConfirmClose();
						setButtonState(false);
						toast.success(res.message, {
							position: toast.POSITION.TOP_RIGHT,
							closeButton: true,
							hideProgressBar: false,
							style: {
								background: '#ffff',
								borderLeft: '4px solid #ff4e00',
								color: '#454545',
								"--toastify-icon-color-success": "#ff4e00",
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

	const handleInvoiceUpdate = (e: any) => {
		e.preventDefault();
		setButtonState(true);
		const userData: any = getCurrentUserData();
		const id = getsingleinvoice.invoiceID;
		console.log(id);
		const data = {
			user_id: userData.id,
			booking_id: booking_id,
			amount: amount,
			description: description,
			date: date,
			invoice_no: invoice_no
		};
		updateInvoice(id, data)
			.then(res => {
				if (res.status == true) {
					console.log(res.status);
					getInvoiceData(userData.id);
					modalConfirmClose();
					editmodalConfirmClose();
					setButtonState(false);
					toast.success(res.message, {
						position: toast.POSITION.TOP_RIGHT,
						closeButton: true,
						hideProgressBar: false,
						style: {
							background: '#ffff',
							borderLeft: '4px solid #ff4e00',
							color: '#454545',
							"--toastify-icon-color-success": "#ff4e00",
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

	const deleteInvoiceData = (id: any) => {
		const userData: any = getCurrentUserData();
		swal({
			title: "Are you sure?",
			text: "You want to delete the invoice",
			icon: "warning",
			dangerMode: true,
			buttons: ["Cancel", "Yes, I am sure!"],
		}).then((willDelete) => {
			if (willDelete) {
				deleteInvoice(id)
					.then((res) => {
						if (res.status == true) {
							getInvoiceData(userData.id);
							swal("Your Invoice has been deleted!", {
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


	const resetFields = () => {
		setAmount("");
		setDescription("");
		setBookingId("");
		setInvoiceNo("");
	}

	return (
		<>
			<div className="table-part">
				<h2>Invoices</h2>
				<button className="table-btn" onClick={() => { modalConfirmOpen(); resetFields(); }}>Add</button>
				<div className="table-box" id="receipt_table">
					{getinvoice.length > 0 ?
						<table className="table table-borderless">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Order Id</th>
									<th scope="col">Customer Name</th>
									<th scope="col">Invoice No</th>
									<th scope="col">Date</th>
									<th scope="col">Amount</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{Array.isArray(getinvoice) && getinvoice.map((invoice, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>#{invoice.booking_id}</td>
										<td>{invoice.name} {invoice.surname}</td>
										<td>#{invoice.invoice_no}</td>
										<td>{invoice.date ? new Date(invoice.date).toLocaleDateString() : ''}</td>
										<td>{invoice.invoiceAmount}</td>
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
																getSingleInvoiceData(invoice.invoiceID);
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
																deleteInvoiceData(invoice.invoiceID)
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
						<p className='text-center'>No Records Found</p>
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
								<option value=''>Select Booking</option>
								{Array.isArray(getbooking) && getbooking.map((booking, index) => (
									<option key={booking.id} value={booking.id}>
										{`bookingid#${booking.booking_id} - booking_status#${booking.applystatus} -booking_date#${new Date(booking.applydate).toLocaleDateString()}`}
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
									<label htmlFor="date">Date:</label>
									<input
										type="date"
										name="date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
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
								</div>
							</div>
						</div>
						<div className="login_div">
							<label htmlFor="Description">Invoice No:</label>
							<input
								type="number"
								name="invoice_no"
								value={invoice_no}
								onChange={(e) => setInvoiceNo(e.target.value)}
							/>
						</div>
						{/* <div className="login_div">
							<label htmlFor="Description">Description:</label>
							<textarea
								id="form-description"
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div> */}
						<div className='mt-4'>
							<button
								type="submit"
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
						onSubmit={handleInvoiceUpdate}
					>
						<div className="login_div">
							<label htmlFor="booking">BookingId:</label>
							<select aria-label="Default select example" value={booking_id} onChange={(e) => setBookingId(e.target.value)}>
								<option value=''>Select Booking</option>
								{Array.isArray(getbooking) && getbooking.map((booking, index) => (
									<option key={booking.id} value={booking.id}>
										{`bookingid#${booking.id} - location#${booking.address} -booking_date#${new Date(booking.applydate).toLocaleDateString()}`}
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
									<label htmlFor="date">Date:</label>
									<input
										type="date"
										name="date"
										value={date}
										onChange={(e) => setDate(e.target.value)}
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
								</div>
							</div>
						</div>
						<div className="login_div">
							<label htmlFor="Description">Invoice No:</label>
							<input
								type="type"
								name="invoice_no"
								value={invoice_no}
								onChange={(e) => setInvoiceNo(e.target.value)}
							/>
						</div>
						{/* <div className="login_div">
							<label htmlFor="Description">Description:</label>
							<textarea
								id="form-description"
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div> */}
						<div className='mt-4'>
							<button
								type="submit"
								className="btn-send w-100"
								disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</PopupModal>

			<ToastContainer />
		</>
	)
}