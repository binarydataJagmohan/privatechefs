import React, { useState ,useEffect} from 'react'
import { ToastContainer,toast } from 'react-toastify';
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import {getEditBookingData,getAllCuisine} from '../../../lib/adminapi';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
export default function Step4() {

    
    type Cuisine = {
      id: number;
      name: string;
      image: string;
     
    };

    const [cuisinedata, setCuisine] = useState<Cuisine[]>([]);
    const [selectedcuisine, setSelectedCuisine] = useState<string[]>([]);

    useEffect(() => {
       BookingStepFour();
	  }, []);

    const BookingStepFour = async () => {

      const data = isPageVisibleToRole("user");
      if (data == 2) {
        window.location.href = "/login"; // redirect to login if not logged in
      } else if (data == 0) {
        window.location.href = "/404"; // redirect to 404 if not authorized
      }
      if (data == 1) {
        const bookingId = window.localStorage.getItem('bookingid');
        if (bookingId) {
          getAllCuisineData();
          fetchEditBookingDetails(bookingId)
    
        }else {
          window.location.href = '/user/booking';      
        }
      }

    };

    const fetchEditBookingDetails = async (id:any) => {
      try {
        const res = await getEditBookingData(id);
        if (res.status) {
          const cuisine_id = res.data[0].cuisine_id;
          const storedCuisine = window.localStorage.getItem("selectedcuisine");
          if(storedCuisine){
            setSelectedCuisine(JSON.parse(storedCuisine));
          }else {
            setSelectedCuisine(cuisine_id ? cuisine_id.split(",") : []);
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


    const getAllCuisineData = async () => {
      try {
        const res = await getAllCuisine();
        if (res.status) {
          setCuisine(res.data);
         
        } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        }
      } catch (err) {
        toast.error((err as Error).message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          });
      }
    };

    const settings = {
      rows:2,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      variableWidth: false,
      autoplay:true,
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

    const CheckStepFour = () => {

      if (selectedcuisine.length === 0) {
            swal({
              title: 'Oops!',
              text: 'You need to select aleast one cuisine further proceduce',
              icon: 'info',
          });
      }else {
          window.localStorage.setItem("selectedcuisine", JSON.stringify(selectedcuisine));
          window.location.href = '/user/edit-booking/step5';
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
                          <a href="/user/edit-booking/step1">
                            <div className="profile-cols mt-4 mb-4">
                              <h4>Step 1</h4>
                              <p>Edit Service Type</p>
                            </div>
                          </a>
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
                          <div className="profile-cols mt-4 active">
                            <h4>Step 4</h4>
                            <p>Edit Type Of Cuisine</p>
                          </div>
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
                              <div className="col-lg-12 col-md-12">
                                  <div className="row edit_booking_tick_css"> 
                                  <Slider {...settings} className="mt-2">
                                      {cuisinedata.map((cuisine) => (
                                        <div className="col-sm-3" key={cuisine.id}>
                                          <div className="slider-img-plase">
                                            <input
                                              type="checkbox"
                                              id={`myCheckbox2_${cuisine.id}`}
                                              name="cuisine_type"
                                              value={cuisine.id}
                                              className="step_radio_css"
                                              onChange={(e) => {
                                                const { value } = e.target;
                                                setSelectedCuisine((prevSelectedCuisine) => {
                                                  if (prevSelectedCuisine.includes(String(value))) {
                                                    return prevSelectedCuisine.filter((c) => c !== String(value));
                                                  } else {
                                                    return [...prevSelectedCuisine, String(value)];
                                                  }
                                                });
                                              }}
                                              checked={selectedcuisine.includes(String(cuisine.id))}
                                            />

                                            <label htmlFor={`myCheckbox2_${cuisine.id}`} className="step_label_css">

                                            {cuisine.image ? 
                                              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/cuisines/'+cuisine.image} alt="step-img-1" /> 
                                            :  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="step-img-1"  width={245} height={245}/> 
                                            }
                                              <p className="plase-btn"><a href="#">{cuisine.name}</a></p>
                                            </label>
                                          </div>
                                        </div>
                                      ))}
                                    </Slider>
                                  </div>
                                  
                              </div>  
                              </div> 
                              </div>
                              <div className="container-fluid mt-5">
                              <div className="d-flx-step">
                              <div className="view-more  mt-4"><a href="/user/edit-booking/step3">Back</a></div>
                              <div className="view-more bg-golden mt-4"><a href="#" onClick={(e) => CheckStepFour()}>Next</a></div>    
                          </div> 
                              
                    </div>
                    </div>
                </div>    
                </div>
            </section>
        </>
    )
}