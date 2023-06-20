import React, { useState, useEffect } from 'react'
import { getAllergyDetails, getEditBookingData } from '../../../lib/adminapi';
import { ToastContainer, toast } from 'react-toastify';
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
export default function Step5() {

  type Allergies = {
    id: number;
    image: string;
    allergy_name: string;
    // add other properties as needed
  };

  const [allergiesdata, setAllergies] = useState<Allergies[]>([]);
  const [selectedallergies, setSelectedAllergies] = useState<string[]>([]);
  const [additionalnotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    BookingStepFive();
  }, []);

  const BookingStepFive = async () => {

    const data = isPageVisibleToRole("concierge");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const bookingId = window.localStorage.getItem('bookingid');
      if (bookingId) {
        getAllergyDetailsData();
        fetchEditBookingDetails(bookingId)

      } else {
        window.location.href = '/concierge/booking';
      }
    }

  };

  const fetchEditBookingDetails = async (id: any) => {
    try {
      const res = await getEditBookingData(id);
      if (res.status) {
        const allergies_id = res.data[0].allergies_id;
        const allergies_notes = res.data[0].notes;
        const storeallergies = window.localStorage.getItem("selectedallergies");
        const getadditionalnotes = window.localStorage.getItem("additionalnotes");
        if (storeallergies) {
          setSelectedAllergies(JSON.parse(storeallergies));
          setAdditionalNotes(getadditionalnotes || '');
        } else {
          setSelectedAllergies(allergies_id.split(","));
          setAdditionalNotes(allergies_notes);
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


  const getAllergyDetailsData = async () => {
    try {
      const res = await getAllergyDetails();
      if (res.status) {
        setAllergies(res.data);

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

  const settings = {
    rows: 1,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
    autoplay: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        }
      }
    ]
  }

  const CheckStepFive = () => {

    window.localStorage.setItem("selectedallergies", JSON.stringify(selectedallergies));
    window.localStorage.setItem("additionalnotes", additionalnotes);
    window.location.href = '/concierge/edit-booking/step6';
  }


  return (
    <>
      <section className="userprofile-part">
        <div className="container-fluid">
          <div className="my-profile mt-5 tab-m-0">
            <h2> Edit Booking <span className="log-out"><a href="/concierge/booking">Back</a></span></h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="my-profile">
                <a href="/concierge/edit-booking/step1">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 1</h4>
                    <p>Edit Service Type</p>
                  </div>
                </a>
                <a href="/concierge/edit-booking/step2">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 2</h4>
                    <p>Edit Service</p>
                  </div>
                </a>
                <a href="/concierge/edit-booking/step3">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 3</h4>
                    <p>Edit Type Of Meal</p>
                  </div>
                </a>
                <a href="/concierge/edit-booking/step4">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 4</h4>
                    <p>Edit Type Of Cuisine</p>
                  </div>
                </a>
                <div className="profile-cols mt-4 active">
                  <h4>Step 5</h4>
                  <p>Edit Special Request</p>
                </div>
                <a href="/concierge/edit-booking/step6">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 6</h4>
                    <p>Edit Booking Details</p>
                  </div>
                </a>


              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form mt-4 tab-m-0  right-left-spacing">


                <div className="row mb-5 edit_booking_tick_css">

                  <div className="col-lg-12 col-md-12">
                    <div className="row">
                      <Slider {...settings} className="mt-2">
                        {allergiesdata.map((allergies, index) => (
                          <div className="col-sm-3" key={index}>
                            <div className="slider-img-plase">
                              <input
                                type="checkbox"
                                id={`myCheckbox2_${allergies.id}`}
                                name="cuisine_type"
                                value={allergies.id}
                                className="step_radio_css"
                                onChange={(e) => {
                                  const { value } = e.target;
                                  setSelectedAllergies((prevSelectedCuisine) => {
                                    if (prevSelectedCuisine.includes(String(value))) {
                                      return prevSelectedCuisine.filter((c) => c !== String(value));
                                    } else {
                                      return [...prevSelectedCuisine, String(value)];
                                    }
                                  });
                                }}
                                checked={selectedallergies.includes(String(allergies.id))}
                              />
                              <label htmlFor={`myCheckbox2_${allergies.id}`} className="step_label_css">
                                {allergies.image ?
                                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/allergy/' + allergies.image} alt="step-img-1" width={250} height={250} />
                                  : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="step-img-1" width={250} height={250} />
                                }

                                <p className="plase-btn"><a href="#">{allergies.allergy_name}</a></p>
                              </label>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
                <div className="row mb-2">


                  <div className="col-lg-12 col-md-12">
                    <h4 className="title-20">Any special requests?</h4>
                    <textarea className="textarea-part mt-3" value={additionalnotes} onChange={(e) => setAdditionalNotes(e.target.value)} placeholder="Let us know more about your prefferences.."></textarea>

                  </div>
                </div>
              </div>
              <div className="container-fluid mt-5">
                <div className="d-flx-step">
                  <div className="view-more  mt-4"><a href="/concierge/edit-booking/step4">Back</a></div>
                  <div className="view-more bg-golden mt-4"><a href="#" onClick={(e) => CheckStepFive()}>Next</a></div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}