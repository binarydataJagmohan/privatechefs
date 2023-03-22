import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";

export default function Header() {
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
                                <li className="user">
                                    <a className="nav-link" href="#"><img src="images/user.png" alt="user" className="user-header"/></a>
                                </li> 
                            </ul> 
                        </div> 
                    </nav>
                </div>
            </header>
        </>
  )
}
