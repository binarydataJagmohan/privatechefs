import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
export default function Chefs() {
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
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td className='chefs_pic'><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/chefs_profile_pic.png'} alt=""/></td>
								<td>Leslie Alexander</td>
								<td>Leslie Alexander</td>
								<td>
									<ul>
										<li>Greek</li>
										<li>Italian</li>
										<li>+4</li>
									</ul>
								</td>
								<td>Ut pulvinar.</td>
								<td>Arcu nibh non.</td>
								<td>Eu nibh.</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
				
			</PopupModal>
        </>
    )
}