import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
export default function Bookings() {
	const [modalConfirm, setModalConfirm] = useState(false);
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }
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
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
                                <td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
                                <td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></td>
								<td>Completed</td>
                                <td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
				<h5>Booking #98283</h5>
			</PopupModal>
        </>
    )
}