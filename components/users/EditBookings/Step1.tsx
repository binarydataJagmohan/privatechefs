import React, { useState, useEffect, Component } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import swal from "sweetalert";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getCurrentUserData } from "../../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import {getEditBookingData} from "../../../lib/adminapi";
export default function Step1() {

  const [onetimedate, setOneTimeDate] = useState(new Date());

  const [mutipletimedate, setMutipleTimeDate] = useState<Date[]>([]);
  const [servicetype, setSeriveType] = useState('onetime');

  const handleOneTimeDateChange = (selectedDates: Date[], instance: any) => {
    const date = selectedDates[0];
    setOneTimeDate(date);
  };
  
  const handleMutipleTimeDateChange = (selectedDates: Date[], dateStr: string, instance: any) => {
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

    const data = isPageVisibleToRole("user");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const bookingId = window.localStorage.getItem('bookingid');
      if (bookingId) {

        fetchEditBookingDetails(bookingId)
  
      }else {
        window.location.href = '/user/booking';      
      }
    }
  
  }

  const fetchEditBookingDetails = async (id:any) => {
    try {
      const res = await getEditBookingData(id);
      if (res.status) {
        const category = res.data[0].category;
        const windowtime = window.localStorage.getItem("time");
        const windowcategory=  window.localStorage.getItem("servicetype");

        if(category == windowcategory || windowcategory == null){
         
          setSeriveType(category);

          if(category == 'multipletimes'){
           
            const MultifirstDate = new Date(res.data[0].date).toISOString();
            const MultilastDate = new Date(res.data[res.data.length - 1].date).toISOString();
            var bookingtime = MultifirstDate+','+MultilastDate;
  
            if(windowtime == null || windowtime == bookingtime){
  
              const mutipletimedateString = res.data.map((date:any) => new Date(date.date)).join(',');
              const mutipletimedateArray = mutipletimedateString.split(',');
              const firstDate = new Date(mutipletimedateArray[0]);
              const lastDate = new Date(mutipletimedateArray[mutipletimedateArray.length - 1]);
              const firstAndLastDates = [firstDate, lastDate];
              setMutipleTimeDate(firstAndLastDates);
              window.localStorage.setItem('time',bookingtime);

  
            }else {
            
              const mutipletimedateArray = windowtime.split(',');
              const firstDate = new Date(mutipletimedateArray[0]);
              const lastDate = new Date(mutipletimedateArray[mutipletimedateArray.length - 1]);
              const firstAndLastDates = [firstDate, lastDate];
              setMutipleTimeDate(firstAndLastDates);
  
            }
  
          }else {
  
            const windowsetonetimedata = new Date(res.data[0].date).toISOString();
          
            if(windowtime == null || windowtime == windowsetonetimedata){
            
              const onetimedateString = res.data.map((date:any) => new Date(date.date)).join(',');
              const onetimedateArray = onetimedateString.split(',');
              const firstDate = new Date(onetimedateArray[0]);
              setOneTimeDate(firstDate);
              window.localStorage.setItem('time', windowsetonetimedata);
  
            }else {
              
              if(windowtime){
                const firstDate = new Date(windowtime);
                setOneTimeDate(firstDate)
                window.localStorage.setItem('time', windowtime);
              }
            }
          }
         
        }else {
         
          setSeriveType(windowcategory || '');
          if(windowcategory == 'multipletimes'){

            const MultifirstDate = new Date(res.data[0].date).toISOString();
            const MultilastDate = new Date(res.data[res.data.length - 1].date).toISOString();
            var bookingtime = MultifirstDate+','+MultilastDate;
  
            if(windowtime == null || windowtime == bookingtime){
  
              const mutipletimedateString = res.data.map((date:any) => new Date(date.date)).join(',');
              const mutipletimedateArray = mutipletimedateString.split(',');
              const firstDate = new Date(mutipletimedateArray[0]);
              const lastDate = new Date(mutipletimedateArray[mutipletimedateArray.length - 1]);
              const firstAndLastDates = [firstDate, lastDate];
              setMutipleTimeDate(firstAndLastDates);
              window.localStorage.setItem('time',bookingtime);
              
        
            }else {
            
            
              const mutipletimedateArray = windowtime.split(',');
              const firstDate = new Date(mutipletimedateArray[0]);
              const lastDate = new Date(mutipletimedateArray[mutipletimedateArray.length - 1]);
              const firstAndLastDates = [firstDate, lastDate];
              setMutipleTimeDate(firstAndLastDates);
  
            }
            
  
          }else {

         

            const windowsetonetimedata = new Date(res.data[0].date).toISOString();
          
            if(windowtime == null || windowtime == windowsetonetimedata){
            
              const onetimedateString = res.data.map((date:any) => new Date(date.date)).join(',');
              const onetimedateArray = onetimedateString.split(',');
              const firstDate = new Date(onetimedateArray[0]);
              setOneTimeDate(firstDate);
              window.localStorage.setItem('time', windowsetonetimedata);
  
            }else {
              
              if(windowtime){
            
                const firstDate = new Date(windowtime);
                setOneTimeDate(firstDate)
                window.localStorage.setItem('time', windowtime);
              }
            }
          }
         
        }
      
       
        
	
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err:any) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const Usertype = (type:any) => {

    if(type == 'service_error'){
      swal({
          title: 'Oops!',
          text: 'You need to select aleast one service and time for further proceduce',
          icon: 'info',
          
      });
    }

    if(type == 'onetime'){
    
      if(window.localStorage.getItem("time") != onetimedate?.toISOString()){
        window.localStorage.removeItem("selectedMeals");
        window.localStorage.setItem("servicetype", servicetype);
        window.localStorage.setItem("time", onetimedate?.toISOString() || "");
      }else {
        window.localStorage.setItem("time", onetimedate?.toISOString() || "");
        window.localStorage.setItem("servicetype", servicetype);
      }

      window.location.href = '/user/edit-booking/step2';
    }
    
    if (type === 'mutipletime') {
    
      const mutipletimedateString = mutipletimedate.map(date => date.toISOString()).join(',');
    
      if(window.localStorage.getItem("time") != mutipletimedateString){
          window.localStorage.removeItem("selectedMeals");
          window.localStorage.setItem("servicetype", servicetype);
          window.localStorage.setItem('time', mutipletimedateString);
      }else {
        window.localStorage.setItem('time', mutipletimedateString);
        window.localStorage.setItem("servicetype", servicetype);
      }

      window.location.href = '/user/edit-booking/step2';
    }
  
  }

    return(
        <>
            <section className="userprofile-part">
                <div className="container-fluid">
                  <div className="my-profile mt-5 tab-m-0">
                    <h2> Edit Booking <span className="log-out"><a href="/user/booking">Back</a></span></h2>
                  </div>
                <div className="row">
                    <div className="col-lg-3 col-md-12">
                        <div className="my-profile">
                          <div className="profile-cols mt-4 active">
                            <h4>Step 1</h4>
                            <p>Edit Service Type</p>
                          </div>
                          <a href="/user/edit-booking/step2">
                            <div className="profile-cols mt-4 mb-4">
                              <h4>Step 2</h4>
                              <p>Edit Service</p>
                            </div>
                          </a>
                          <a href="/user/edit-booking/step3">
                            <div className="profile-cols mt-4 mb-4">
                              <h4>Step 3</h4>
                              <p>Edit Type Of Meal</p>
                            </div>
                          </a>
                          <a href="/user/edit-booking/step4">
                            <div className="profile-cols mt-4 mb-4">
                              <h4>Step 4</h4>
                              <p>Edit Type Of Cuisine</p>
                            </div>
                          </a>
                          <a href="/user/edit-booking/step5">
                            <div className="profile-cols mt-4 mb-4">
                              <h4>Step 5</h4>
                              <p>Edit Special Request</p>
                            </div>
                          </a>
                          <a href="/user/edit-booking/step6">
                            <div className="profile-cols mt-4 mb-4">
                              <h4>Step 6</h4>
                              <p>Edit Booking Details</p>
                            </div>
                          </a>
                          
                          
                        </div>
                     </div>
                    <div className="col-lg-9 col-md-12">
                        <div className="all-form mt-4 tab-m-0  right-left-spacing"> 
                                <div className="row mb-5">
                                  <div className="col-lg-6 col-md-12">
                                    <form action="">
                                      <div className="row edit_booking_tick_css">
                                      
                                        <div className="col-sm-6" >
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
                                        <div className="col-sm-6">
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
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="container-fluid mt-5">
                               
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
                    </div>
                </div>    
                </div>
            </section>
            <ToastContainer/>
        </>
    )
}