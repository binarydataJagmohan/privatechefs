import React, { useState, useEffect, Component } from "react";
import "flatpickr/dist/themes/material_green.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import { getServiceDetails, getEditBookingData } from '../../../lib/adminapi';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
export default function Step2() {


  type Service = {
    id: number;
    image: string;
    service_name: string;
    // add other properties as needed
  };

  const [services, setService] = useState<Service[]>([]);

  const [servicetype, setServiceType] = useState('');
  const [servicestyle, setServieStyle] = useState('');

  useEffect(() => {
    BookingStepTwo();

  }, []);

  const BookingStepTwo = async () => {

    const data = isPageVisibleToRole("user");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const bookingId = window.localStorage.getItem('bookingid');
      if (bookingId) {
        fetchServiceDetails();
        fetchEditBookingDetails(bookingId)

      } else {
        window.location.href = '/user/booking';
      }
    }

  };

  const fetchEditBookingDetails = async (id: any) => {
    try {
      const res = await getEditBookingData(id);
      if (res.status) {
        const booking_id = res.data[0].booking_id;
        const servicestyle = res.data[0].service_id;
        const window_servicestyle = window.localStorage.getItem('servicestyle');
        const window_booking_id = window.localStorage.getItem('bookingid');


        if (window_servicestyle == '' || servicestyle == window_servicestyle) {

          setServieStyle(res.data[0].service_id);
          window.localStorage.setItem("servicestyle", res.data[0].service_id);

        } else {
          setServieStyle(window_servicestyle || '');
          window.localStorage.setItem("servicestyle", window_servicestyle || '');
        }


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
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
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
    }
  };


  const fetchServiceDetails = async () => {
    try {
      const res = await getServiceDetails();
      if (res.status) {
        const window_servicestyle = window.localStorage.getItem('servicestyle');
        if (window_servicestyle == '' || servicestyle == window_servicestyle) {

          setServieStyle(res.data[0].service_id);
          window.localStorage.setItem("servicestyle", res.data[0].service_id);

        } else {
          setServieStyle(window_servicestyle || '');
          window.localStorage.setItem("servicestyle", window_servicestyle || '');
        }
        setService(res.data);
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
      }
    } catch (err) {
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
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
    }
  };

  const CheckStepTwo = () => {

    if (servicestyle) {
      window.localStorage.setItem("servicestyle", servicestyle);
      window.location.href = '/user/edit-booking/step3';
    } else {
      swal({
        title: 'Oops!',
        text: 'You need to select aleast one service and time for further proceduce',
        icon: 'info',
      });
    }
  }

  return (
    <>
      <section className="userprofile-part">
        <div className="container-fluid">
          <div className="my-profile mt-5 tab-m-0">
            <h2> Edit Booking <span className="log-out"><a href="/user/booking">Back</a></span></h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="my-profile">
                <a href="/user/edit-booking/step1">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 1</h4>
                    <p>Edit Service Type</p>
                  </div>
                </a>
                <div className="profile-cols mt-4 active">
                  <h4>Step 2</h4>
                  <p>Edit Service</p>
                </div>
                {/* <a href="/user/edit-booking/step3"> */}
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 3</h4>
                    <p>Edit Type Of Meal</p>
                  </div>
                {/* </a>
                <a href="/user/edit-booking/step4"> */}
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 4</h4>
                    <p>Edit Type Of Cuisine</p>
                  </div>
                {/* </a>
                <a href="/user/edit-booking/step5"> */}
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 5</h4>
                    <p>Edit Special Request</p>
                  </div>
                {/* </a>
                <a href="/user/edit-booking/step6"> */}
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 6</h4>
                    <p>Edit Booking Details</p>
                  </div>
                {/* </a> */}


              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form mt-4 tab-m-0  right-left-spacing">
                <div className="row edit_booking_tick_css">

                  {services.length > 0 ? services.sort((a, b) => a.id - b.id).map((service, index) => (
                    <div className="col-sm-3" key={index}>
                      <div className="slider-img-plase">
                        <input
                          type="radio"
                          id={`myCheckbox2_${service.id}`}
                          name="service_type"
                          value={service.id}
                          className="step_radio_css"
                          checked={servicestyle === service.id.toString()}
                          onChange={(e) => setServieStyle(service.id.toString())}
                        />
                        <label htmlFor={`myCheckbox2_${service.id}`} className="step_label_css">
                          {service.image ?
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/service/' + service.image} alt="step-img-1" width={204} height={315} />
                            : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="step-img-1" width={204} height={315} />
                          }

                          <p className="plase-btn"><a href="#">{service.service_name}</a></p>
                        </label>
                      </div>
                    </div>
                  )) : null}

                </div>
              </div>
              <div className="container-fluid mt-5">
                <div className="d-flx-step">
                  <div className="view-more  mt-4"><a href="/user/edit-booking/step1">Back</a></div>
                  <div className="view-more bg-golden mt-4"><a href="#" onClick={(e) => CheckStepTwo()}>Next</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}