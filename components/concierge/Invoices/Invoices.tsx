import React, { useState, useEffect } from 'react'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getInvoice } from '../../../lib/adminapi'
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import swal from "sweetalert";

export default function Invoices() {

	const [getinvoice, setGetInvoice] = useState('');
	const [totalMenu, setTotalMenu]: any = useState({});
	const [buttonStatus, setButtonState] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		const data = isPageVisibleToRole('concierge-invoice');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			getInvoicesData();
		}
	}

	const getInvoicesData = async () => {
		getInvoice()
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
		getInvoice()
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


	return (
		<>
			<div className="table-part">
				<h2>Invoices</h2>
				<button className="table-btn">Total</button>
				<div className="table-box">
					{getinvoice.length > 0 ?
						<table className="table table-borderless">
							<thead>
								<tr>
									<th scope="col">ID</th>
									<th scope="col">Order Id</th>
									<th scope="col">User Name</th>
									<th scope="col">Chef Name</th>
									<th scope="col">Invoice Number</th>
									<th scope="col">Date</th>
									<th scope="col">Total Amount</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{Array.isArray(getinvoice) && getinvoice.map((invoice, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>#{invoice.booking_id}</td>
										<td>{invoice.username}{invoice.usersurname}</td>
										<td>{invoice.chefname}{invoice.chefsurname}</td>
										<td>{invoice.invoice_no}</td>
										<td>{invoice.date ? new Date(invoice.date).toLocaleDateString() : ''}</td>
										<td>{invoice.invoiceAmount}</td>
										<td><a href={process.env.NEXT_PUBLIC_BASE_URL + 'concierge/invoices/' + invoice.id}><i className="fa fa-eye" aria-hidden="true"></i></a></td>
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
		</>
	)
}