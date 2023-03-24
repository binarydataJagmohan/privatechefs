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
                        <a className="navbar-brand header-logo" href="#" ><img src="images/logo.png" alt="logo"/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mt-2 ">
                                <li className="nav-item">
                                  <a className="nav-link active" aria-current="page" href="#">COVID-19</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="#">Start your journey</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Who we are</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Our Chefs</a>
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
            {/*<PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
                <div className="popup_logo_section"><img src="images/logo.png" alt="logo"/></div>
                <div className="row">
                    <form>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input className="form-control" type="email" name="email" id="email" placeholder="Enter email" aria-describedby="emailHelp"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label" for="exampleCheck1">Forgot Password?</label>
                        </div>
                        <button type="button" className="btn btn-primary">Continue</button>
                    </form>
                </div>
			</PopupModal>*/}
        </>
  )
}
