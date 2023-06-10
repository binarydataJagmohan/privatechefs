import React from 'react';
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  const excludeFooterRoutes = ['/user/messages'];

  // Check if the current route should exclude the footer
  const shouldExcludeFooter = excludeFooterRoutes.includes(router.pathname);

  // Render the footer only if shouldExcludeFooter is false
  if (shouldExcludeFooter) {
    return null;
  }

  return (
    <>
      <footer className="footer-main">
        <div className="container-fluid">
          <div className="footer-part ft-top-border text-center">
            <h6 className="color-bs8639 ">Subscribe to our newsletter</h6>
            <form className="email-part mt-2">
              <input type="text" placeholder="Enter your email" />
            </form>
            <ul className="ft-nav mt-3">
              <li><a href="/contact/#faq">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/whoweare">Who we are</a></li>
              <li><a href="/ourchefs">Our Chefs</a></li>
              <li><a href="/ourservices">Our Services</a></li>
              <li><a href="/location">Location</a></li>
              <li><a href="/privacypolicy">Privacy Policy</a></li>
              <li><a href="/termsconditions">Terms & Conditions</a></li>
            </ul>
            <ul className="ft-social mt-3">
              <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
            </ul>
            <p className="font-small color-bs8639 mt-3 mb-0">Copyright © 2023 Private Chefs All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
}
