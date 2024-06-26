import React, { useState, useEffect, Component } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import swal from "sweetalert";
import { getCurrentUserData } from "../../lib/session"
import Head from 'next/head';


export default function Step1(props: any) {

  interface UserData {
    "role": string;
  }

  interface PageSlug {
    name: string;
    slug: string;
    meta_desc: string;
    meta_tag: string;
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

  const [pageslug, setSlug] = useState<PageSlug | null>(null);

  useEffect(() => {
    if (props) {
      setSlug(props.pages.data);
    }

  }, []);

  const handleOneTimeDateChange = (selectedDates: Date[], instance: any) => {
    const date = selectedDates[0];
    setOneTimeDate(date);
  };

  const handleMutipleTimeDateChange = (selectedDates: Date[], dateStr: string, instance: any) => {
    if (selectedDates.length === 2) {
      const today = new Date();
      const fromDate = selectedDates[0];
      const toDate = selectedDates[1];
      //setMutipleTimeDate(selectedDates);
      if (toDate <= fromDate) {
        // Adjust end date to be after today
        const adjustedEndDate = new Date(fromDate);
        adjustedEndDate.setDate(fromDate.getDate() + 1);
        setMutipleTimeDate([fromDate, adjustedEndDate]);
      } else {
        setMutipleTimeDate(selectedDates);
      }
      // console.log(selectedDates);
    } else {
      setMutipleTimeDate(selectedDates);
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
    if (serviceType) {
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

  const Usertype = (type: any) => {

    if (type == 'service_error') {
      swal({
        title: 'Oops!',
        text: 'You need to select valid booking date!',
        icon: 'info',

      });
    }


    if (type == 'onetime') {
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
      <Head>
        <title>{pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}</title>
        <meta name="description" content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`} />
      </Head>
      <section className="journey-part">
        <div className="container size-real">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h1>Start your journey</h1>
              <h1 className="awaits">a great experience awaits</h1>
            </div>
          </div>


          {/* <div className="row mb-5"> */}
          <div className="row mb-0 set-scroll-down">
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
                        <a href="javascript:void(0);" onClick={(e) => setSeriveType('onetime')}>One time experience</a>
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
                        <a href="javascript:void(0);" onClick={(e) => setSeriveType('multipletimes')}>Multiple experiences</a>
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
                  <p className="golden-mini-title">One time experience</p>
                  <p>
                  For that special occasion or a unique dining experience, our chefs are here to transform your event into a memorable journey. We focus on every detail, from creating the perfect menu to setting the ideal ambiance. Your exceptional dining experience begins with a simple choice. Let us craft moments that will linger in your memory long after the last bite.
                  </p>
                  <p className="fild-text">Date</p>
                  <Flatpickr
                    value={onetimedate}
                    onChange={(selectedDates, dateStr, instance) => handleOneTimeDateChange(selectedDates, instance)}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      defaultDate: "today",// Set default date to today
                      minDate: "today"
                    }}
                  />

                </div>
              </div>
            )}
            {servicetype === "multipletimes" && (
              <div className="col-lg-6 col-md-12" id="mutiple_time_service">
                <div className="text-areya-srep">
                  <p className="golden-mini-title">Mutiple experiences</p>
                  <p>
                  Get ready for a culinary experience that's beyond the ordinary. Our talented chefs are your passport to a world of exciting flavors. From sunrise to sunset, they craft exquisite dishes that will leave you craving more. Whether it's breakfast, lunch, or dinner, our chefs are dedicated to making each moment exciting for your palate. So, sit back, relax, and let us take you on a culinary adventure that transforms every meal into a delicious celebration.
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
                      defaultDate: "today", // Set default date to today
                      minDate: "today"
                    }}
                    placeholder={formattedDate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container size-real mt-5">
          <h4 className="rotate-text">select service type</h4>
          <div className="d-flx-step">
            <div className="view-more opec-v mt-4">
              <a href="#">Back</a>
            </div>
            {servicetype === "onetime" && onetimedate ? (
              <div className="view-more bg-golden mt-4">
                {currentrole.role !== "chef" ? (
                  <a href="#" onClick={(e) => Usertype('onetime')}>
                    Save and Continue
                  </a>
                ) : (
                  <a style={{ cursor: "pointer", color: "#fff" }} onClick={() => showSwal()}>Save and Continue</a>
                )}
              </div>
            ) : servicetype === "multipletimes" && mutipletimedate.length === 2 ? (
              <div className="view-more bg-golden mt-4" >
                {currentrole.role !== "chef" ? (
                  <a href="#" onClick={(e) => Usertype('mutipletime')}>
                    Save and Continue
                  </a>
                ) : (
                  <a style={{ cursor: "pointer", color: "#fff" }} onClick={() => showSwal()}>Save and Continue</a>
                )}

              </div>
            ) : (
              <div className="view-more bg-golden mt-4 onalert">
                {currentrole.role !== "chef" ? (
                  <a href="#" onClick={(e) => Usertype('service_error')}>
                    Save and Continue
                  </a>
                ) : (
                  <a style={{ cursor: "pointer", color: "#fff" }} onClick={() => showSwal()}>Save and Continue</a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
