import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ChefLocation from '../../../components/frontend/FooterLocation/ChefLocation'
import { subscribe } from "../../../lib/frontendapi"
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
export default function Footer() {

  interface Location {
    id: number;
    pic: string;
    address: string;
    location_pic: string;
}

  const router = useRouter();
  const excludeFooterRoutes = ['/user/messages'];
  const [locations, setLocations] = useState<Location[]>([]);

  // Check if the current route should exclude the footer
  const shouldExcludeFooter = excludeFooterRoutes.includes(router.pathname);

  // Render the footer only if shouldExcludeFooter is false
  if (shouldExcludeFooter) {
    return null;
  }

  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
  };

  const handlesubmit = (event: any) => {
    event.preventDefault();
		swal({
			title: "GDPR Consent",
			text: "By clicking the 'Submit' button, you consent to Private Chefs Worldwide collecting and processing the personal data you provided for the purpose of registering and using our platform. Your data will be handled in accordance with our Privacy Policy and in compliance with the General Data Protection Regulation (GDPR)..\n\nWe may use your information to contact you regarding your account, provide updates on our services, and send important notifications. You have the right to access, rectify, or erase your personal data at any time. For more information on how we process and protect your data, please review our Privacy Policy..\n\nIf you have any questions or concerns about your privacy or data processing, please contact us at info@privatechefsworld.com",
			icon: "warning",
			//buttons: true,
			dangerMode: true,
			buttons: ["Cancel", "Submit"],
			//confirmButtonColor: "#062B60",
		}).then((willDelete) => {
			if (willDelete) {

				subscribe(email)
					.then((res) => {
						if (res.status == true) {
              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: '#ffff',
                  borderLeft: '4px solid #ff4e00d1',
                  color: '#454545',
                  "--toastify-icon-color-success": "#ff4e00d1",
                },
                progressStyle: {
                  background: '#ffff',
                },
              });
              setEmail("");
						} else {
							toast.error(res.message, {
								position: toast.POSITION.TOP_RIGHT,
								closeButton: true,
								hideProgressBar: false,
								style: {
									background: '#ffff',
									borderLeft: '4px solid #e74c3c',
									color: '#454545',
								},
								progressStyle: {
									background: '#ffff',
								},
							});
              setEmail("")
						}
					})
					.catch((err) => { });
			} else {
			}
		});
	};

  return (
    <>
      <footer className="footer-main">
        <div className="container-fluid">
          <div className="footer-part ft-top-border text-center">
            <h6 className="color-bs8639 ">Subscribe to our newsletter</h6>
            <form className="email-part mt-2" onSubmit={handlesubmit}>
              <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required/>
              <button type="submit" className="btn-send w-10 mx-3 mt-3" style={{padding:'6px 14px'}}>Submit</button>
            </form>
          
            < ChefLocation />
            <ul className="ft-nav mt-3">
              <li><a href="/contact/#faq">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/whoweare">Who we are</a></li>
              <li><a href="/ourchefs">Our Chefs</a></li>
              <li><a href="/ourservices">Our Services</a></li>
              <li><a href="/ourlocations">Locations</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/termsconditions">Terms & Conditions</a></li>
              <li><a href="/cookies">Cookies</a></li>

            </ul>
            <ul className="ft-social mt-3">
              <li><a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook"></i></a></li>
              <li><a href="https://www.instagram.com/" target="_blank"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="https://www.linkedin.com/" target="
              "><i className="fa-brands fa-linkedin"></i></a></li>
            </ul>
            <p className="font-small color-bs8639 mt-3 mb-0">Copyright © 2023 Private Chefs All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
