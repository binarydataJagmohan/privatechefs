import React, { useState ,useEffect} from 'react'
export default function Chats() {
    return (
        <>
			<div className="table-part">
				<h2>Chats</h2>
				  
				  <div className="chats-box">
					<div className="d-flex">
						<div className="users-all">
							<div className="chats-btns">
								<ul className="table_header_button_section p-r ">
									<li><button className="table-btn  ">All</button></li>
									<li><button className="table-btn btn-2 ">Open </button></li>
									<li><button className="table-btn btn-2 ">Done</button></li>
									<li><button className="table-btn btn-2 ">Unread</button></li>
									<li className="right-li"><i className="fa-solid fa-plus"></i></li>
								</ul>
							</div>
						 <div className="chats-h">
							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile active mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user-groups.png'} alt="chats-user-groups" /> 
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Booking #2321</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							<div className="chats-user-profile mt-1">
								<div className="row">
									<div className="col-lg-3 col-md-3 col-3 pr-0">
										<a href="/" className="chats-user-a"> 
										  <img src={process.env. NEXT_PUBLIC_BASE_URL+'images/chats-user.png'} alt="chats-user" />
										  <i className="fa-solid fa-circle chats-circle"></i>
										</a>
									</div>
									<div className="col-lg-7 col-md-7 col-7">
										<div className="user-profile-chats mt-1">
											<h5>Savannah Nguyen</h5>
											<p>Egestas fames placerat sed ipsum.</p>
										</div>
									</div>
									<div className="col-lg-2 col-md-2 col-2 text-right">
									 <p className="f-12 mt-3">22m</p>
									</div> 
								</div>
							</div>

							</div>

						</div>
						<div className="users-chats">
						<div className="msg-head">
							<div className="row">
								<div className="col-lg-8 col-md-8 col-8"> 
									<h3>Booking #2321</h3>
								</div>
								<div className="col-lg-4 col-md-4 col-4 text-right">
								 <div className="icon-head-chats">
									<a href="#"><i className="fa-solid fa-pen"></i></a>
									<a href="#"><i className="fa-solid fa-circle-info"></i></a>
								 </div>
								</div>
							</div>
						</div>
						{/* msg-body */}
							<div className="msg-body">
								<div className="user-box">
									<ul className="user-mess">
										<li  className="reply"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/> <span className="bg-f1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend.</span></li>
										<li className="reply-two"> <span className="bg-f1">Lorem ipsum dolor sit amet, consectetur interdum.</span> <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/></li>
									 
									</ul>
								</div>
								<div className="send-box">
									<div className="row">
										<div className="col-sm-10 col-9">
										    <form className="form-Search send-message">
											  <input type="text" placeholder="Write a message"/>
											</form>
										</div>
										<div className="col-sm-2 col-3">
											<div className="send-part">
												<a href="#"><i className="fa-solid fa-paper-plane"></i></a>
												<a href="#"><i className="fa-solid fa-paperclip"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="users-groups">
						<ul className="nav nav-pills mt-3 mb-3" id="pills-tab" role="tablist">
							<li className="nav-item" role="presentation">
								<button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Chat Members</button>
							</li>
							<li className="nav-item" role="presentation">
								<button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Shared files</button>
							</li> 
							</ul>
							<div className="tab-content" id="pills-tabContent">
							<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
							 <div className="sp-4">
								<p className="g-text"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/> <span>Theresa Webb</span></p>
								
								<p className="g-text"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking_chef_pic.png'} alt=""/>  <span>Theresa Webb</span></p>
							 </div>
							</div>
							<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
							 <div className="sp-4">
							  .........
							 </div>
							</div> 
							</div>							
						</div>
					</div>
				  </div>
				 
			</div>
        </>
    )
}