import React, { useState, useEffect, Component } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import swal from "sweetalert";
import { getCurrentUserData } from "../../lib/session"

export default function Step1() {

  interface UserData {
    "role": string;
  }
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const [onetimedate, setOneTimeDate] = useState(new Date());

  const [mutipletimedate, setMutipleTimeDate] = useState<Date[]>([]);
  const [servicetype, setSeriveType] = useState('onetime');
  const [currentrole, setCurrentRole] = useState<UserData>({ role: "" });

  const handleOneTimeDateChange = (selectedDates: Date[], instance: any) => {
    const date = selectedDates[0];
    setOneTimeDate(date);
  };
  
  const handleMutipleTimeDateChange = (selectedDates: Date[], dateStr: string, instance: any) => {
    if (selectedDates.length === 2) {
      const fromDate = selectedDates[0];
      const toDate = selectedDates[1];
      setMutipleTimeDate(selectedDates);
      // console.log(selectedDates);
    }
  };
  
  
  useEffect(() => {
    BookingStepOne();
    const userData = getCurrentUserData() as UserData;
    setCurrentRole({
      ...userData,
      role: userData.role,

    });
  }, []);
  
  const BookingStepOne = async () => {
      const serviceType = window.localStorage.getItem('servicetype');
      const time = window.localStorage.getItem('time');
      if(serviceType){
        setSeriveType(serviceType);
      }
      if (serviceType === "onetime") {
        const onetimedateString = time; // This string can be retrieved from the session
        if (onetimedateString) {
          const onetimedateArray = onetimedateString.split(",");
          const mutu = onetimedateArray.map((dateString) => new Date(dateString));
          setOneTimeDate(mutu[0]);

        }
      }
      
      if (serviceType === 'multipletimes') {
        const onetimedateString = time || ''; // This string can be retrieved from the session
        const onetimedateArray = onetimedateString.split(",");
        const mutu = onetimedateArray.map(dateString => new Date(dateString));
        console.log(mutu);
        setMutipleTimeDate(mutu);
      }
      
  }

  const Usertype = (type:any) => {

    if(type == 'service_error'){
      swal({
          title: 'Oops!',
          text: 'You need to select aleast one service and time for further proceduce',
          icon: 'info',
          
      });
    }


    if(type == 'onetime'){
      window.localStorage.setItem("servicetype", servicetype);
      window.localStorage.setItem("time", onetimedate?.toISOString() || "");
      window.location.href = '/bookings/step2';
    }
    

    if (type === 'mutipletime') {
      window.localStorage.setItem('servicetype', servicetype);
      const mutipletimedateString = mutipletimedate.map(date => date.toISOString()).join(',');
      window.localStorage.setItem('time', mutipletimedateString);
      window.location.href = '/bookings/step2';
    }
    
  
  }

  function showSwal() {
    swal({
      title: 'Oops!',
      text: 'We apologize,booking feature is not available for you.',
      icon: 'info',
    });
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
                      defaultDate: "today" // Set default date to today
                    }}
                    placeholder={formattedDate}
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
                {currentrole.role !== "chef" ? (
                  <a href="#" onClick={(e) => Usertype('onetime')}>
                    Next
                  </a>
                ) : (
                  <a style={{cursor:"pointer",color:"#fff"}} onClick={() => showSwal()}>Next</a>
                )}
              </div>
            ) : servicetype === "multipletimes" && mutipletimedate.length === 2 ? (
              <div className="view-more bg-golden mt-4" >
                {currentrole.role !== "chef" ? (
                  <a href="#" onClick={(e) => Usertype('mutipletime')}>
                    Next
                  </a>
                ) : (
                  <a style={{cursor:"pointer",color:"#fff"}} onClick={() => showSwal()}>Next</a>
                )}

              </div>
            ) : (
              <div className="view-more bg-golden mt-4 onalert">
                {currentrole.role !== "chef" ? (
                  <a href="#" onClick={(e) => Usertype('service_error')}>
                    Next
                  </a>
                ) : (
                  <a style={{cursor:"pointer",color:"#fff"}} onClick={() => showSwal()}>Next</a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
