import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import PopupModal from '../../../components/commoncomponents/PopupModal';

export default function Header() {
    const [modalConfirm, setModalConfirm] = useState(false);
	const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    }
    return (
        <>
            <header className="header-part">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-light bottom-border"> 
                        <a className="navbar-brand header-logo" href="/" ><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo"/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mt-2 ">
                                <li className="nav-item">
                                  <a className="nav-link active" aria-current="page" href="/covid19">COVID-19</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="/startjourney">Start your journey</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="/whoweare">Who we are</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="/ourchefs">Our Chefs</a>
                                </li>  
                                {/*<li className="user">
                                    <a className="nav-link" href="#"><img src="images/user.png" alt="user" className="user-header"/></a>
                                </li>*/} 
                                <li className="user">
                                    <a className="nav-link" href="#" onClick={modalConfirmOpen}>SignIn/SignUp</a>
                                </li>
                            </ul> 
                        </div> 
                    </nav>
                </div>
            </header>
            <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
                <div className="text-center popup-img">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
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
                    <div className="mt-2">
                        <a href="/admin/bookings" className="btn-send temprary_login_btn w-100">Login with Admin</a>
                    </div>
                    <div className="mt-2">
                        <a href="/chef/bookings" className="btn-send temprary_login_btn w-100">Login with Chef</a>
                    </div>
                    <div className="mt-2">
                        <a href="/concierge/bookings" className="btn-send temprary_login_btn w-100">Login with Concierge</a>
                    </div>
                    <div className="mt-2">
                        <a href="/user/userprofile" className="btn-send temprary_login_btn w-100">Login with User</a>
                    </div>
                    <div className="mt-2">
                        <a href="/bookings/step1" className="btn-send temprary_login_btn w-100">Bookings</a>
                    </div>
                    {/*<button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/g-logo.png'} alt="g-logo"/> Continue with Google</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/a-logo.jpg'} alt="a-logo"/> Continue with Apple</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-logo.png'} alt="f-logo"/> Continue with Facebook</button>*/}
                </div>
			</PopupModal>
        </>
  )
}
