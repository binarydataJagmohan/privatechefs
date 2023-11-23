import React from 'react'
export default function Footer(): JSX.Element {
    return (
        <>
            <footer className="footer-main mt-5 mb-3">
                <div className="container-fluid">
                    <div className="footer-part ft-top-border text-center">
                        <h6 className="color-bs8639 ">Subscribe to our newsletter</h6>
                        <form className="email-part mt-2">
                            <input type="text" placeholder="Enter your email"/>
                        </form>
                        <ul className="ft-nav mt-3"> 
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Who we are</a></li>
                            <li><a href="#">Our Chefs</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                        <ul className="ft-social mt-3"> 
                            <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
                        </ul>
                        <p className="font-small color-bs8639 mt-3 mb-0">Copyright © 2021 Private Chefs All rights reserved</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
