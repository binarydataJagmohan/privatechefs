import React, { useState ,useEffect} from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
export default function Receipts() {
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
				<h2>Receipts</h2>
				<button className="table-btn">Total</button>
				<div className="table-box">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Order ID</th>
								<th scope="col">Total Cost</th>
								<th scope="col">Payment Details</th>
								<th scope="col">Payment Details</th>
								<th scope="col">Order Date</th>
								<th scope="col">Payment Date</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"  onClick={modalConfirmOpen}><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td>
								<td>Paypal</td>
								<td>8/21/15</td>
								<td>12/4/17</td>
								<td><a href="#"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
 
			<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
				<h5 className="title-pop up-move">Booking #98283</h5> 
                    <ul className="nav nav-pills mt-4 mb-4 popup-align-left" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Photos</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Receipts</button>
                        </li>
                      <li className="add-plus-li"><a href="#"  className="add-plus"><i className="fa-solid fa-plus"></i> Add new</a></li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"  aria-labelledby="pills-home-tab">
						<div className="row mt-4"> 
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
								<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" />  
							</div>
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							
						</div>
						<div className="row mt-4"> 
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
								<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" />  
							</div>
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							
						</div>
						<div className="row mt-4"> 
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
								<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" />  
							</div>
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							
						</div>
						<div className="row mt-4"> 
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
								<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" />  
							</div>
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							<div className="col-sm-4"> 
							<div className="slider-img-plase"> 
							<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food-pop-img.jpg'} alt="food-pop-img" /> 
							</div> 
							</div>
							
						</div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
						<div className="table-box">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">Field 1</th>
								<th scope="col">Field 2</th>
								<th scope="col">Field 3</th>
								<th scope="col">Field 4</th>
								<th scope="col">Field 5</th> 
							</tr>
						</thead>
						<tbody>
						    <tr>
								<td><input type="text" placeholder="10/11/21" className="placeholder-goldan-text width-100"/></td>
								<td><input type="text" placeholder="10/11/21" className="placeholder-goldan-text width-100" /></td>
								<td><input type="text" placeholder="10/11/21" className="placeholder-goldan-text width-100" /></td>
								<td><input type="text" placeholder="10/11/21" className="placeholder-goldan-text width-100" /></td>
								 <td>
									<div className="row">
									 <div className="col-9">
										<input type="text" placeholder="10/11/21" className="placeholder-goldan-text width-100" />
								     </div>
										<div className="col-3 pl-0 pr-0 icon-des">
										 <i className="fa-solid fa-check"></i> 
										 <i className="fa-solid fa-xmark"></i>
										</div> 
									</div>
								</td>
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>
							<tr>
								<td>2493</td>
								<td>5122389082</td>
								<td>$539.2</td>
								<td>$539.2</td>
								<td>XXXX XXXX XXXX 2459</td> 
							</tr>

						 
						</tbody>
					</table>
				</div>	
                        </div>
                      
                    </div> 
 

				


				 
			</PopupModal>
        </>
    )
}
