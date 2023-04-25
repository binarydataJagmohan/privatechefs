import React, { useState, useEffect, Component } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import swal from "sweetalert";
export default function Step1() {

  const [onetimedate, setOneTimeDate] = useState(null);
  const [mutipletimedate, setMutipleTimeDate] = useState([]);
  const [servicetype, setSeriveType] = useState('onetime');

  const handleOneTimeDateChange = (selectedDates, instance) => {
    const date = selectedDates[0];
    setOneTimeDate(date);
  };
  
  const handleMutipleTimeDateChange = (selectedDates, dateStr, instance) => {
    if (selectedDates.length === 2) {
      const fromDate = selectedDates[0];
      const toDate = selectedDates[1];
      setMutipleTimeDate(selectedDates);
     
    }
  };
  
  useEffect(() => {
    BookingStepOne();
  }, []);
  
  const BookingStepOne = async () => {
      const serviceType = window.localStorage.getItem('servicetype');
      const time = window.localStorage.getItem('time');
      if(serviceType){
        setSeriveType(serviceType);
      }
      if(serviceType == 'onetime'){
        const onetimedateString = time; // This string can be retrieved from the session
        const onetimedateArray = onetimedateString.split(",");
        const mutu = onetimedateArray.map(dateString => new Date(dateString));
        setOneTimeDate(mutu);
      }

      if(serviceType == 'multipletimes'){
    
        const onetimedateString = time; // This string can be retrieved from the session
        const onetimedateArray = onetimedateString.split(",");
        const mutu = onetimedateArray.map(dateString => new Date(dateString));
        console.log(mutu);
        setMutipleTimeDate(mutu);
      }
  }

  const Usertype = (type) => {

    if(type == 'service_error'){
      swal({
          title: 'Oops!',
          text: 'You need to select aleast one service and time for further proceduce',
          icon: 'info',
          confirmButtonText: 'Ok',
          customClass: {
              confirmButton: 'confirm-button-class'
          }
      });
    }


    if(type == 'onetime'){
      window.localStorage.setItem("servicetype", servicetype);
      window.localStorage.setItem("time", onetimedate);
      window.location.href = '/bookings/step2';
    }

    if(type == 'mutipletime'){
      window.localStorage.setItem("servicetype", servicetype);
      window.localStorage.setItem("time", mutipletimedate);
      window.location.href = '/bookings/step2';
    }
  
  }

  return (
    <>
      <section className="journey-part">
        <div className="container size-real">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h1>Start your journey</h1>
              <h1 className="awaits">a great experience awaits</h1>
            </div>
          </div>


          <div className="row mb-5">
            <div className="col-lg-6 col-md-12">
              <form action="">
                <div className="row">
                  <div className="col-sm-1"></div>

                  <div className="col-sm-5">
                    <div className="slider-img-plase">
                      <input
                        type="radio"
                        id="myCheckbox1"
                        name="service_type"
                        value={"onetime"}
                        className="step_radio_css"
                        checked={servicetype === 'onetime'}
                        onChange={(e) => setSeriveType('onetime')}  
                        
                      />
                      <label htmlFor="myCheckbox1" className="step_label_css">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "images/step-img-1.jpg"
                          }
                          alt="step-img-1"
                        />
                      </label>
                      <p className="plase-btn">
                        <a href="#">One Time Service</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="slider-img-plase">
                      <input
                        type="radio"
                        id="myCheckbox2"
                        name="service_type"
                        value={"multipletimes"}
                        className="step_radio_css"
                        checked={servicetype === 'multipletimes'}
                        onChange={(e) => setSeriveType('multipletimes')}
                      />
                      <label htmlFor="myCheckbox2" className="step_label_css">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "images/step-img-2.jpg"
                          }
                          alt="step-img-2"
                        />
                      </label>
                      <p className="plase-btn">
                        <a href="#">Multiple Time Services</a>
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-1"></div>
                </div>
              </form>
            </div>
            {servicetype === "onetime" && (
                <div className="col-lg-6 col-md-12" id="one_time_service">
                  <div className="text-areya-srep">
                    <p className="golden-mini-title">One time service</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
                      egestas et enim porttitor urna amet, amet. Turpis aenean dolor
                      risus vel mattis enim, scelerisque egestas fermentum. Quis
                      senectus dictum vitae pretium commodo. Nunc congue sed sed
                      penatibus. Accumsan, sit sit id enim sed sed ullamcorper.
                      Ultrices scelerisque ac fermentum enim.
                    </p>
                    <p className="fild-text">Date</p>
                    <Flatpickr
                      value={onetimedate}
                      onChange={(selectedDates, dateStr, instance) => handleOneTimeDateChange(selectedDates, instance)}
                      options={{
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "Y-m-d",
                        theme: "lightblue",
                        defaultDate: "today" // Set default date to today
                      }}
                    />
                    
                  </div>
                </div>
            )}
             {servicetype === "multipletimes" && (
              <div className="col-lg-6 col-md-12" id="mutiple_time_service">
                <div className="text-areya-srep">
                  <p className="golden-mini-title">Mutiple time service</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac
                    egestas et enim porttitor urna amet, amet. Turpis aenean dolor
                    risus vel mattis enim, scelerisque egestas fermentum. Quis
                    senectus dictum vitae pretium commodo. Nunc congue sed sed
                    penatibus. Accumsan, sit sit id enim sed sed ullamcorper.
                    Ultrices scelerisque ac fermentum enim.
                  </p>
                  <p className="fild-text">Date</p>
                  <Flatpickr
                    value={mutipletimedate}
                    onChange={handleMutipleTimeDateChange}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      mode: "range",
                      theme: "lightblue",
                      defaultDate: "today" // Set default date to today
                    }}
                  />
                </div>
              </div>
             )}
          </div>
        </div>
        <div className="container-fluid mt-5">
          <h4 className="rotate-text">selecy service type</h4>
          <div className="d-flx-step">
            <div className="view-more opec-v mt-4">
              <a href="#">Back</a>
            </div>
            
           
              {servicetype === "onetime" && onetimedate ? (
                <div className="view-more bg-golden mt-4">
                  <a href="#" onClick={(e) => Usertype('onetime')}>
                    Next
                  </a>
                </div>
              ) : servicetype === "multipletimes" && mutipletimedate.length === 2 ? (
                <div className="view-more bg-golden mt-4" >
                  <a href="#" onClick={(e) => Usertype('mutipletime')}>
                    Next
                  </a>
                </div>
              ) : (
                <div className="view-more bg-golden mt-4 onalert">
                  <a href="#" onClick={(e) => Usertype('service_error')}>Next</a>
                </div>
              )}
          
          </div>
        </div>
      </section>
    </>
  );
}
