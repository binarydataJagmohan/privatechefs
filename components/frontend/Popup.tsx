import React, { useState ,useEffect} from 'react'
export default function Popup() {
    return(
        <>
            <section className="userprofile-part">
                <div className="container"> 
                <button className="table-btn btn-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">Sign In</button>
                <div className="popup-part ">
                    <div className="modal fade" id="exampleModal2"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog ">
                        <div className="modal-content">
                          <div className="modal-header">                             
                          </div>
                          <div className="modal-body">
                              <div className="text-center popup-img">
                              <img src="images/logo.png" alt="logo" />
                              </div>
                              <div className="all-form"> 
                                <label>Email</label>
                                <input type="text" placeholder="Email" />
                                <label>Password</label>
                                <input type="password" placeholder="........." /> 
                                <p className="text-link text-left"><a href="#">Forgot password?</a></p>
                                <div className="text-right mt-2">
                                <button className="btn-send w-100">Continue</button>
                                </div>
                                <p className="text-link text-left my-2"><a href="#">Don’t have an account? <span>Sign up</span></a></p>

                                <div className="or"><p>OR</p></div>
                                <button className="btn-g"><img src="images/g-logo.png" alt="g-logo"/> Continue with Google</button>
                                <button className="btn-g"><img src="images/a-logo.jpg" alt="a-logo"/> Continue with Apple</button>
                                <button className="btn-g"><img src="images/f-logo.png" alt="f-logo"/> Continue with Facebook</button>
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