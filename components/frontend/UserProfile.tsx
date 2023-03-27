import React, { useState ,useEffect} from 'react'
export default function UserProfile() {
    return(
        <>
            <section className="userprofile-part">
                <div className="container">
                  <div className="my-profile mt-5 tab-m-0">
                    <h2> My profile <span className="log-out"><a href="#">Log out</a></span></h2>
                  </div>
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        <div className="my-profile"> 
                         <div className="profile-cols mt-5 active">
                            <h4>Account Settings</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                         </div>
                         <div className="profile-cols mt-4">
                            <h4>My Bookings</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                         </div>
                         <div className="profile-cols mt-4 mb-4">
                            <h4>Preferences</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                         </div>
                        </div>
                     </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="all-form mt-4 tab-m-0  right-left-spacing"> 
                         <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <label>Name  </label>
                              <input type="text" placeholder="Name  " />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label>Surname</label>
                              <input type="text" placeholder="Surname" />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label>Surname</label>
                              <input type="text" placeholder="Surname" />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label>Phone</label>
                              <input type="number" placeholder="Phone" />
                            </div>
                         </div>
                        
                        <label>Adress</label>
                        <input type="text" placeholder="Email" />

                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <label>Timezone</label>
                              <input type="text" placeholder="Timezone" />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label>Currency</label>
                              <input type="text" placeholder="Currency" />
                            </div> 
                            <div className="col-lg-6 col-md-6">
                              <label>Birthday</label>
                              <input type="text" placeholder="Birthday" />
                            </div> 
                         </div>
                         <div className="checkbox-size text-left mt-3 mb-3">
                         <input type="checkbox" className="checkbox-" />
                         <label> I have a bike</label>
                         </div>
                         <label className="mt-3">Company Name</label>
                        <input type="text" placeholder="Company Name" />

                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <label>VAT Number</label>
                              <input type="text" placeholder="VAT Number" />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <label>TAX ID</label>
                              <input type="text" placeholder="TAX ID" />
                            </div>  
                         </div>
                        <div className="text-right mt-4">
                        <button className="btn-send">Send</button>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                        <div className="user-img mt-5 ">
                         <img src="images/user.png" alt="user" />
                         <label> <input type="file" /><i className="fa-solid fa-camera"></i></label>
                        </div> 
                    </div>
                </div>    
                </div>
            </section>

             
        </>
    )
}