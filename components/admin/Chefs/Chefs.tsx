import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { getAllChefDetails } from '../../../lib/adminapi';
import { toast } from 'react-toastify';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";

export default function Chefs() {
	const [modalConfirm, setModalConfirm] = useState(false);
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

		const [chefs, setChefs] = useState([]);

		useEffect(() => {

			const data = isPageVisibleToRole('admin-chefs');
			if (data == 2) {
			  window.location.href = '/login'; // redirect to login if not logged in
			} else if (data == 0) {
			  window.location.href = '/404'; // redirect to 404 if not authorized
			}
		  
			getAllChefDetails()
			  .then((res) => {
				if (res.status) {
					console.log(res);
				  setChefs(res.data);
				} else {
				  toast.error(res.message, {
					position: toast.POSITION.TOP_RIGHT,
				  });
				}
			  })
			  .catch((err) => {
				toast.error(err.message, {
				  position: toast.POSITION.BOTTOM_RIGHT,
				});
			  });
		  }, []);
		

    return (
        <>
			<div className="table-part">
				<h2>Chefs</h2>
				<ul className="table_header_button_section p-r">
					<li><button className="table-btn">Total</button></li>
					<li className="right-li"><button className="table-btn border-radius round-white">Filter </button></li> 
					</ul> 

				
				<div className="table-box">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">Photo</th>
								<th scope="col">Name/Surname</th>
								<th scope="col">Current Location</th>
								<th scope="col">Cuisines</th>
								<th scope="col">Location</th>
								<th scope="col">Dietary restrictios</th>
								<th scope="col">Rating</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{chefs.map((chef, index) => (
							<tr key={index}>
								{chef.pic ? (
						<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_IMAGE_URL+'images/chef/users/' + chef.pic } alt=""/></td>
								) : ( 
						<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_IMAGE_URL+'/images/placeholder.jpg'} alt=""/></td>
									)}
						<td>{ chef.name+ " " +chef.surname }</td>
						<td>{ chef.address}</td>
						<td>
						<ul>
						<li>{chef.cuisine_name}</li>
						{/* <li>Italian</li>
						<li>+4</li> */}
						</ul>
						</td>
						<td>Ut pulvinar.</td>
						<td>Arcu nibh non.</td>
						<td>Eu nibh.</td>
						<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
						</tr>
                    ))}

						</tbody>
					</table>
				</div>
			</div>
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
				
			</PopupModal>
        </>
    )
}