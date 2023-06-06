import React, { useState ,useEffect} from 'react'
import swal from "sweetalert";

export default function Step7() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    BookingStepSeven();
  }, []);

  const BookingStepSeven = async () => {
    const bookingid = window.localStorage.getItem("bookingid");
   
    if (!bookingid) {
      window.location.href = "/bookings/step1";
    } 
  };

  function unAuthenticaltedAlert() {
    swal({
        title: 'Oops!',
        text: 'Your login details has been sent to your mail.Kindly login to view your booking.',
        icon: 'info',
    });
}

    return (
        <>
       <section className="journey-part">
         <div className="container size-real"> 
          <div className="conglatulations-part text-center">         
           <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/Conglatulations.jpg'} alt="Conglatulations" />
           <h3 className="mt-4 mb-3">Conglatulations!</h3>
           <p>Your booking was succesful! </p>
           <p>Our congierge team will contact you for any further details. Please be aware for any<br/> email about chef’s offers! </p>
           {isAuthenticated ?(
           <div className="text-center view-more mt-4"><a style={{cursor:"pointer"}} href="/user/booking">See booking details</a></div>
           ): (
           <div className="text-center view-more mt-4"><a style={{cursor:"pointer"}} onClick={unAuthenticaltedAlert}>See booking details</a></div>
           )}
          </div>  
         </div>  
       </section>
        
        </>
    )
}