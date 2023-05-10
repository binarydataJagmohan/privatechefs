import React, { useState ,useEffect} from 'react'
export default function Invoices() {
    return (
        <>
			<div className="table-part">
				<h2>Invoices</h2>
				<button className="table-btn">Total</button>
				<div className="table-box">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Company Name</th>
								<th scope="col">Address</th>
								<th scope="col">Postal Code</th>
								<th scope="col">VAT No</th>
								<th scope="col">Invoice Number</th>
								<th scope="col">Email</th>
								<th scope="col">Phone</th>
								<th scope="col">Total Amount</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2464 Royal Ln. Mesa...</td>
								<td>67080</td>
								<td>EE101906087</td>
								<td>#526520</td>
								<td>bill.sanders@example.com</td>
								<td>(270) 555-0117</td>
								<td>$2,805.3</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
        </>
    )
}