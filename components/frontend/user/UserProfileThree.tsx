import React, { useState ,useEffect} from 'react'
export default function UserProfileThree() {
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
                            <a href="/user/userprofiletwo">
                                <div className="profile-cols mt-4 ">
                                    <h4>My Bookings</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </a>
                            <div className="profile-cols active mt-4 mb-4">
                                <h4>Aditional Information/Preferences</h4>
                                <p>Halal, Kosher, Hindu.</p>
                            </div>
                        </div>
                     </div>
                    <div className="col-lg-9 col-md-12">
                      <h4 className="check-title mt-5">Any allergies?</h4>
                      <div className="row mt-3">
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-1.webp'} alt="f-1"/>
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div> 
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-3.webp'} alt="f-3"/> 
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-4.webp'} alt="f-4"/>
                                  <p className="plase-btn"><a href="#">Nuts</a></p>  
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-5.webp'} alt="f-5"/> 
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div> 
                      </div>

                      <h4 className="check-title  mt-5">Favorite kitchen?</h4>
                      <div className="row mt-3">
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-1.webp'} alt="f-1"/>
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-2.webp'} alt="f-2"/> 
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-3.webp'} alt="f-3"/> 
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-4.webp'} alt="f-4"/>
                                  <p className="plase-btn"><a href="#">Nuts</a></p>  
                              </div> 
                          </div> 
                      </div>
                      <div className="row mt-3">
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-1.webp'} alt="f-1"/>
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-2.webp'} alt="f-2"/> 
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-3.webp'} alt="f-3"/> 
                                  <p className="plase-btn"><a href="#">Nuts</a></p> 
                              </div> 
                          </div>
                          <div className="col-sm-3">
                              <div className="slider-img-plase">
                                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-4.webp'} alt="f-4"/>
                                  <p className="plase-btn"><a href="#">Nuts</a></p>  
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