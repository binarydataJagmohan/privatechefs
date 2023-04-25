import React, { useState, useEffect, Component } from "react";
import "flatpickr/dist/themes/material_green.css";
import { getServiceDetails } from 'lib/adminapi';
import { ToastContainer,toast } from 'react-toastify';
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
export default function Step2() {

  const [services, setService] = useState([]);
  const [servicetype, setServiceType] = useState([]);
  const [servicestyle, setServieStyle] = useState('familystyle');

  useEffect(() => {
    BookingStepTwo();
	  }, []);

    const BookingStepTwo = async () => {
    
      const serviceType = window.localStorage.getItem('servicetype');
      const time = window.localStorage.getItem('time');
      const servicestyle = window.localStorage.getItem('servicestyle');
      const mealsSelected = window.localStorage.getItem("selectedMeals");
      if(serviceType && time){
        fetchServiceDetails();
        setServiceType(serviceType);

        if(serviceType == 'multipletimes'){
          if (mealsSelected) {
            try {
              const parsedMeals = JSON.parse(mealsSelected);
              if (parsedMeals.breakfast !== undefined && parsedMeals.lunch !== undefined && parsedMeals.dinner !== undefined) {
                window.localStorage.removeItem("selectedMeals");
              }
            } catch (error) {
              console.log("Error parsing selectedMeals from localStorage", error);
            }
          }
        }

        if (serviceType === 'onetime') {
          const mealsSelected = window.localStorage.getItem("selectedMeals");
          if (mealsSelected) {
            try {
              const parsedMeals = JSON.parse(mealsSelected);
              if (Array.isArray(parsedMeals)) {
                parsedMeals.forEach((meal) => {
                  if (meal.date !== undefined && meal.breakfast !== undefined && meal.lunch !== undefined && meal.dinner !== undefined) {
                    window.localStorage.removeItem("selectedMeals");
                  }
                });
              } else if (parsedMeals.date !== undefined && parsedMeals.breakfast !== undefined && parsedMeals.lunch !== undefined && parsedMeals.dinner !== undefined) {
                window.localStorage.removeItem("selectedMeals");
              }
            } catch (error) {
              console.log("Error parsing selectedMeals from localStorage", error);
            }
          }
        }

        if(servicestyle){
          setServieStyle(servicestyle);
        }
      }else {
        window.location.href = '/bookings/step1';
      }
    };

  
	  const fetchServiceDetails = async () => {
		try {
		  const res = await getServiceDetails();
		  if (res.status) {
			  setService(res.data);
		  } else {
			toast.error(res.message, {
			  position: toast.POSITION.TOP_RIGHT,
			});
		  }
		} catch (err) {
		  toast.error(err.message, {
			position: toast.POSITION.BOTTOM_RIGHT,
		  });
		}
	  };

    const CheckStepTwo = () => {

      if(servicestyle || 'familystyle' || servicestyle || 'standardstyle' || servicestyle || 'premiumstyle'){
        window.localStorage.setItem("servicestyle", servicestyle);
        window.location.href = '/bookings/step3';
        
        // window.localStorage.removeItem("selectedMeals");
      }  
    }

    return (
        <>
       <section className="journey-part">
         <div className="container size-real">
            <div className="row">
             <div className="col-sm-1"></div>
                <div className="col-sm-10">
                <h1>One time service</h1>
                <h1 className="awaits mb-0">a great experience awaits</h1>
                <div className="text-areya-srep dummy-up text-center"> 
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac egestas et enim porttitor urna amet, amet. Turpis aenean dolor risus vel mattis enim, scelerisque egestas fermentum. Quis senectus dictum vitae pretium commodo. Nunc congue sed sed penatibus. Accumsan, sit sit id enim sed sed ullamcorper. Ultrices scelerisque ac fermentum enim.</p>  
                   </div>
                </div>
            </div> 
          
            <div className="row mb-5">
             <div className="col-lg-10 col-md-12">
                <div className="row">
                   <div className="col-sm-1"></div>
                   {services.length > 0 ? services.sort((a, b) => a.id - b.id).map((service, index) => (
                    <div className="col-sm-3" key={index}>
                      <div className="slider-img-plase">
                      <input
                        type="radio"
                        id={`myCheckbox2_${service.id}`}
                        name="service_type"
                        value={service.service_name.toLowerCase().replace(' ', '')}
                        className="step_radio_css"
                        checked={servicestyle === service.service_name.toLowerCase().replace(' ', '')}
                        onChange={(e) => setServieStyle(service.service_name.toLowerCase().replace(' ', ''))}
                      />
                      <label htmlFor={`myCheckbox2_${service.id}`} className="step_label_css">
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/service/'+service.image} alt="step-img-1" /> 
                        <p className="plase-btn"><a href="#">{service.service_name}</a></p>
                        </label>
                      </div>
                    </div>
                  )) : null}

                </div>
             </div> 
            </div> 
           
            </div>
            <div className="container-fluid mt-5">
            <div className="d-flx-step">
            <div className="view-more  mt-4"><a href="/bookings/step1">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="#" onClick={(e) => CheckStepTwo()}>Next</a></div>    
            </div> 
            <div className="rotate-box"> <h4 className="rotate-text">select services</h4></div>
           </div>  
       </section>
          
        </>
    )
}