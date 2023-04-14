import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic'
import Login from '../../../components/auth/Login';
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Header({}) {

    const [modalConfirm, setModalConfirm] = useState(false);

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
                                {/* <li className="nav-item">
                                  <a className="nav-link active" aria-current="page" href="/covid19">COVID-19</a>
                                </li> */}
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
                                    <a className="nav-link" href="#" onClick={() => setModalConfirm(true)}>SignIn/SignUp</a>
                                </li>
                            </ul> 
                        </div> 
                    </nav>
                </div>
            </header>
            <ToastContainer/>                  
            <Login modalConfirm={modalConfirm} setModalConfirm={setModalConfirm} />  
                                
        </>
  )
}
