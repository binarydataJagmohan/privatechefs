import React, { useState, useEffect, Component } from "react";
import "flatpickr/dist/themes/material_green.css";
import { getServiceDetails } from '../../lib/adminapi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

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

    const serviceType = window.localStorage.getItem('servicetype');
    const time = window.localStorage.getItem('time');
    const servicestyle = window.localStorage.getItem('servicestyle');
    const mealsSelected = window.localStorage.getItem("selectedMeals");
    if (serviceType && time) {
      fetchServiceDetails();
      setServiceType(serviceType);

      if (serviceType == 'multipletimes') {
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

      if (servicestyle) {
        setServieStyle(servicestyle);
      }
    } else {
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
      window.location.href = '/bookings/step3';
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
      <section className="journey-part">
        <div className="container size-real">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              {servicetype === 'multipletimes' ? (
                <h1>Multiple Time service</h1>
              ) : (
                <h1>One Time service</h1>
              )}

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
                        value={service.id}
                        className="step_radio_css"
                        checked={servicestyle === service.id.toString()}
                        onChange={(e) => setServieStyle(service.id.toString())}
                      />
                      <label htmlFor={`myCheckbox2_${service.id}`} className="step_label_css">
                        {service.image ?
                          <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/service/' + service.image} alt="step-img-1" />
                          : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="step-img-1" width={204} height={283} />
                        }

                        <p className="plase-btn"><a href="#" onClick={(e) => setServieStyle(service.id.toString())}>{service.service_name}</a></p>
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
      <ToastContainer />
    </>
  )
}