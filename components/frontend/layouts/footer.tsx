import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChefLocation from "../../../components/frontend/FooterLocation/ChefLocation";
import { subscribe } from "../../../lib/frontendapi";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { showToast } from "../../commoncomponents/toastUtils";
export default function Footer() {
  interface Location {
    id: number;
    pic: string;
    address: string;
    location_pic: string;
  }

  const router = useRouter();
  const excludeFooterRoutes = ["/user/messages"];
  const [locations, setLocations] = useState<Location[]>([]);

  // Check if the current route should exclude the footer
  const shouldExcludeFooter = excludeFooterRoutes.includes(router.pathname);

  // Render the footer only if shouldExcludeFooter is false
  if (shouldExcludeFooter) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [processing, setProcessing] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlesubmit = (event: any) => {
    event.preventDefault();
    swal({
      title: "GDPR Consent",
      text: "By clicking the 'Submit' button, you consent to Private Chefs World collecting and processing the personal data you provided for the purpose of registering and using our platform. Your data will be handled in accordance with our Privacy Policy and in compliance with the General Data Protection Regulation (GDPR)..\n\nWe may use your information to contact you regarding your account, provide updates on our services, and send important notifications. You have the right to access, rectify, or erase your personal data at any time. For more information on how we process and protect your data, please review our Privacy Policy..\n\nIf you have any questions or concerns about your privacy or data processing, please contact us at info@privatechefsworld.com",
      icon: "warning",
      //buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Submit"],
      //confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        setProcessing(true);
        subscribe(email)
          .then((res) => {
            if (res.status == true) {
              showToast("success", res.message);
              setProcessing(false);
              setEmail("");
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: "#ffff",
                  borderLeft: "4px solid #e74c3c",
                  color: "#454545",
                },
                progressStyle: {
                  background: "#ffff",
                },
              });
              setProcessing(false);
              setEmail("");
            }
          })
          .catch((err) => { });
      } else {
        setProcessing(false);
      }
    });
  };
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <footer className="footer-main">
        <div className="container-fluid">
          <div className="footer-part ft-top-border text-center">
            <section className="news-letter" id="News-letter">
              <div className="news ">
                <div className="container">
                  <h1 className="news-heading">
                    Subscribe To Get The Latest <br /> News About Us
                  </h1>
                  <p className="des how-de">
                    Discover the culinary genius behind our delicious dishes. Our chefs bring <br></br>creativity and passion to every meal, ensuring a memorable dining experience.
                  </p>
                  <form className=" mt-2 mb-4" onSubmit={handlesubmit}>
                    <input type="email" placeholder="Enter your email" value={email || ""} onChange={handleEmailChange} required maxLength={50} />
                    <button type="submit" className="bt" disabled={processing}>
                      {processing ? "please wait.." : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </section>
            {/* <h6 className="color-bs8639 ">Subscribe to our newsletter</h6>
            <form className="email-part mt-2 mb-4" onSubmit={handlesubmit}>
              <input type="email" placeholder="Enter your email" value={email || ''} onChange={handleEmailChange} required/>
              <button type="submit" className="btn-send w-10 mx-3 mt-3" style={{padding:'6px 14px'}} disabled={processing}>{processing ? 'please wait..' : 'Submit'}</button>
            </form> */}

            <ChefLocation />
            <ul className="ft-nav mt-3">
              <li>
                <Link href="/contact/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/whoweare">Who we are</Link>
              </li>
              <li>
                <Link href="/ourchefs">Our Chefs</Link>
              </li>
              {/* <li><Link href="/ourservices">Our Services</Link></li> */}
              <li>
                <Link href="/ourlocations">Locations</Link>
              </li>
              <li>
                <Link href="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/termsconditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
            <ul className="ft-social mt-3">
              <li>
                <Link href="https://www.facebook.com/" target="_blank">
                  <i className="fa-brands fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/" target="_blank">
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/"
                  target="
              "
                >
                  <i className="fa-brands fa-linkedin"></i>
                </Link>
              </li>
            </ul>
            <p className="font-small color-bs8639 mt-3 mb-0">Copyright © {year} Private Chefs All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
