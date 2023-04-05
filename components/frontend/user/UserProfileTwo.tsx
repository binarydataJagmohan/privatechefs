import React, { useState ,useEffect} from 'react'
export default function UserProfileTwo() {
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
                          <a href="/user/userprofile">
                            <div className="profile-cols mt-5">
                              <h4>Account Settings</h4>
                              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                          </a>
                          <div className="profile-cols mt-4 active">
                            <h4>My Bookings</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          </div>
                          <a href="/user/userprofilethree">
                            <div className="profile-cols mt-4 mb-4">
                            <h4>Aditional Information/Preferences</h4>
                                <p>Halal, Kosher, Hindu.</p>
                            </div>
                          </a>
                        </div>
                     </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="all-form mt-4 tab-m-0  right-left-spacing"> 
                          <div className="table-part mt-2"> 
                                    <ul className="table_header_button_section text-right">
                                        <li><button className="table-btn active">Total</button></li>
                                        <li><button className="table-btn btn-2">Upcoming</button></li>
                                        <li><button className="table-btn btn-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Cancelled</button></li> 
                                    </ul>  
                                    <div className="popup-part ">
                                      <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog ">
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5 className="modal-title" id="exampleModalLabel"> </h5>
                                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark"></i></button>
                                            </div>
                                            <div className="modal-body">
                                               <div className="text-center popup-img">
                                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/pop.jpg'} alt="pop" />
                                               </div>
                                               <p><b>Are you sure you want to cancel this booking?</b></p> 
                                                <div className="text-right">
                                                  <button className="btn-send cencel">Cancel booking</button>
                                                  <button className="btn-send">No, I want a chef</button>
                                                </div>
                                            </div> 
                                          </div>
                                        </div>
                                      </div>
                                     </div>
                            <div className="table-box">
                              <table className="table table-borderless"> 
                                <tbody>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">$21330</a></p></td> 
                                  </tr> 
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div className="month">
                                        <h3>30</h3>
                                        <p>Sep</p>
                                      </div>
                                    </td>
                                    <td><p className="text-data-18">Esther Howard</p></td>
                                    <td><p className="text-data-18">3517 W. Gray St. Utica...</p></td>
                                    <td><p className="text-data-18">One time service</p></td>
                                    <td><p><a href="#" className="popup">$21330</a></p></td>
                                  </tr> 
                                </tbody>
                              </table>

                              <div className="offcanvas-part"> 
                                      <div className="offcanvas offcanvas-end"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                        <div className="offcanvas-header">
                                          <h5 id="offcanvasRightLabel">Booking Details <button>Cancel</button></h5>
                                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body">
                                          <div>
                                           <button className="table-btn btn-2 date mr-sp">10/11/21</button> 
                                           <button className="table-btn btn-2 Pending">Pending</button> 
                                          </div>
                                          <div className="off-can">
                                          <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                              <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Chefs offers
                                                </button>
                                              </h2>
                                              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                      <p className="chefs-name">Chefs Name</p>
                                                    </div>
                                                    <div className="col-3">
                                                      <p className="mony">$746.66</p>
                                                    </div>
                                                    <div className="col-5">
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    </div>
                                                  </div>
                                                  <div className="row mt-1">
                                                    <div className="col-4">
                                                      <p className="chefs-name">Chefs Name</p>
                                                    </div>
                                                    <div className="col-3">
                                                      <p className="mony">$746.66</p>
                                                    </div>
                                                    <div className="col-5">
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    </div>
                                                  </div>
                                                  <div className="row mt-1">
                                                    <div className="col-4">
                                                      <p className="chefs-name">Chefs Name</p>
                                                    </div>
                                                    <div className="col-3">
                                                      <p className="mony">$746.66</p>
                                                    </div>
                                                    <div className="col-5">
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    </div>
                                                  </div>
                                                  <div className="row mt-1">
                                                    <div className="col-4">
                                                      <p className="chefs-name">Chefs Name</p>
                                                    </div>
                                                    <div className="col-3">
                                                      <p className="mony">$746.66</p>
                                                    </div>
                                                    <div className="col-5">
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    </div>
                                                  </div>
                                                  <div className="row mt-1">
                                                    <div className="col-4">
                                                      <p className="chefs-name">Chefs Name</p>
                                                    </div>
                                                    <div className="col-3">
                                                      <p className="mony">$746.66</p>
                                                    </div>
                                                    <div className="col-5">
                                                     <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    </div>
                                                  </div>
                                                  <div className="row mt-1">
                                                    <div className="col-4">
                                                      <p className="chefs-name">Chefs Name</p>
                                                    </div>
                                                    <div className="col-3">
                                                      <p className="mony">$746.66</p>
                                                    </div>
                                                    <div className="col-5">
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    <button className="table-btn btn-2 list-btn">Menu</button> 
                                                    </div>
                                                  </div>

                                                </div>
                                              </div>
                                            </div>
                                            <div className="accordion-item">
                                              <h2 className="accordion-header" id="headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Service Details
                                                </button>
                                              </h2>
                                              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                   <div className="row mt-1">
                                                      <div className="col-4">
                                                        <p className="chefs-name name-12">Service Type:</p>
                                                      </div>
                                                      <div className="col-8">
                                                        <p className="mony f-w-4">One Time Service</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-4">
                                                        <p className="chefs-name name-12">Service </p>
                                                      </div>
                                                      <div className="col-8">
                                                        <p className="mony f-w-4">Family Style</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-4">
                                                        <p className="chefs-name name-12">Meal:</p>
                                                      </div>
                                                      <div className="col-8">
                                                      <button className="table-btn btn-2 list-btn">Breakfast</button>
                                                      <button className="table-btn btn-2 list-btn">Lunch</button> 
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-4">
                                                        <p className="chefs-name name-12">Meal:</p>
                                                      </div>
                                                      <div className="col-8">
                                                      <button className="table-btn btn-2 list-btn">Breakfast</button>
                                                      <button className="table-btn btn-2 list-btn">Lunch</button> 
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-4">
                                                        <p className="chefs-name name-12">Meal:</p>
                                                      </div>
                                                      <div className="col-8">
                                                      <button className="table-btn btn-2 list-btn">Breakfast</button>
                                                      <button className="table-btn btn-2 list-btn">Lunch</button> 
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-4">
                                                        <p className="chefs-name name-12">Special Requests:</p>
                                                      </div>
                                                      <div className="col-8">
                                                        <p className="mony f-w-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit neque diam neque facilisis.</p>
                                                      </div> 
                                                    </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="accordion-item">
                                              <h2 className="accordion-header" id="headingThree">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Customer Details
                                                </button>
                                              </h2>
                                              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <div className="row mt-1">
                                                      <div className="col-5 text-right">
                                                        <p className="chefs-name name-12">Number of people:</p>
                                                      </div>
                                                      <div className="col-7"></div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5 text-right">
                                                        <p className="chefs-name name-12">text-right</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">2</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5 text-right">
                                                        <p className="chefs-name name-12">Teens:</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">1</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5 text-right">
                                                        <p className="chefs-name name-12">Children:</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">1</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5">
                                                        <p className="chefs-name name-12">Full Name:</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">Kathryn Murphy</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5">
                                                        <p className="chefs-name name-12">Email:</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">bill.sanders@example.com</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5">
                                                        <p className="chefs-name name-12">Phone Number:</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">(480) 555-0103</p>
                                                      </div> 
                                                    </div>
                                                    <div className="row mt-1">
                                                      <div className="col-5">
                                                        <p className="chefs-name name-12">Location:</p>
                                                      </div>
                                                      <div className="col-7">
                                                        <p className="mony">1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                                                      </div> 
                                                    </div>
                                                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/map.png'} alt="map"/>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          </div>
                                        </div>
                                        </div>
                                    </div> 
                            </div>
                          </div>
                        </div>
                    </div>
                </div>    
                </div>
            </section>
        </>
    )
}