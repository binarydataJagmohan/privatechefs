import React, { useState ,useEffect} from 'react'
export default function MyProfile() {
    return (
        <>
			<div className="table-part">
				<h2>My Profile</h2>
				
				  <div className="tab-part change-btn-colors">
				       <div className="border-bottom pb-3">
							<ul className="nav nav-pills text-left-j " id="pills-tab" role="tablist">
								<li className="nav-item" role="presentation">
									<button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
								</li>
								<li className="right-li"><button className="table-btn">Save</button></li>
							</ul>
						</div>
						<div className="tab-content mt-4" id="pills-tabContent">
						<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
							<div className="row">
							   <div className="col-lg-4 col-md-12">
								 <div className="text-left">
									<h5>Personal Information</h5>
									<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
									<div className="picture-profile">
										<div className="row">
											<div className="col-lg-4 col-md-5 col-4 pr-0">
												<a href="/">
													<img src={process.env.NEXT_PUBLIC_BASE_URL+'images/user.png'} alt=""/>
												</a>
											</div>
											<div className="col-lg-8 col-md-7 col-8">
												<div className="user-profile-collapsed mt-3">
													<h6>Profile Picture</h6>
													<p className="f-10-2">Upload lalalalalalallalalalalala alalalalalallalalalala</p>
												</div>
											</div>
										</div>
									</div>
								 </div>
							   </div>
							   <div className="col-lg-8 col-md-12">
							   <div className="all-form"> 
							     <div className="row">
								 <div className="col-lg-4 col-md-6">
                                    <label>Name</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-6">
                                    <label>Surname</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-6">
                                    <label>Email</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-6">
                                    <label>Phone Number</label>
									<input type="number"/>
								 </div>
								 <div className="col-lg-5 col-md-6">
                                    <label>Adress</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-3 col-md-6">
                                    <label>ID/Passport Number</label>
									<input type="text"/>
								 </div>
								 </div> 
							   </div>
							   </div>
							</div>
							<hr/>
							<div className="row">
							   <div className="col-lg-4 col-md-12">
								 <div className="text-left">
									<h5>Bank Details</h5>
									<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p> 
								 </div>
							   </div>
							   <div className="col-lg-8 col-md-12">
							   <div className="all-form"> 
							     <div className="row">
								 <div className="col-lg-4 col-md-6">
                                    <label>IBAN</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-8 col-md-6">
                                    <label>BIC</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-8 col-md-7">
                                    <label>Bank Adress</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-5">
                                    <label>Bank Name</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-8 col-md-7">
                                    <label>Adress</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-5">
                                    <label>ID/Passport Number</label>
									<input type="text"/>
								 </div>
								 </div> 
							   </div>
							   </div>
							</div>

							<hr/>
							<div className="row">
							   <div className="col-lg-4 col-md-12">
								 <div className="text-left">
									<h5>Services</h5>
									<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p> 
								 </div>
							   </div>
							   <div className="col-lg-8 col-md-12">
							   <div className="all-form"> 
							     <div className="row">
								 <div className="col-lg-12 col-md-12">
                                    <label>Type of cusines</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-8 col-md-6">
                                    <label>Bank Adress</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-7">
                                    <label>Bank Name</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-8 col-md-5">
                                    <label>Bank Account Holder Name</label>
									<input type="text"/>
								 </div>
								 <div className="col-lg-4 col-md-7">
                                    <label>Currency</label>
									<input type="text"/>
								 </div> 
								 </div> 
							   </div>
							   </div>
							</div>
						</div>
						<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
						<div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
						</div>
				  </div>
			</div>
        </>
    )
}