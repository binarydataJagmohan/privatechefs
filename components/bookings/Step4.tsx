import React, { useState, useEffect } from 'react'
import { getAllCuisine } from '../../lib/adminapi';
import { ToastContainer, toast } from 'react-toastify';
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
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

    const serviceType = window.localStorage.getItem('servicetype');
    const time = window.localStorage.getItem('time');
    const servicestyle = window.localStorage.getItem('servicestyle');
    const mealsSelected = window.localStorage.getItem("selectedMeals");
    const storedCuisine = window.localStorage.getItem("selectedcuisine");


    if (serviceType && time) {
      if (servicestyle) {

        if (!mealsSelected) {
          window.location.href = '/bookings/step3';
        } else {

          getAllCuisineData();
          if (storedCuisine) {
            const selectedCuisineArray = JSON.parse(storedCuisine);
            console.log(selectedCuisineArray);
            setSelectedCuisine(selectedCuisineArray);
          }

        }


      } else {
        window.location.href = '/bookings/step2';
      }
    } else {
      window.location.href = '/bookings/step1';
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
    rows: 2,
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

  const CheckStepFour = () => {

    if (selectedcuisine.length === 0) {
      swal({
        title: 'Oops!',
        text: 'You need to select aleast one cuisine further proceduce',
        icon: 'info',
      });
    } else {
      window.localStorage.setItem("selectedcuisine", JSON.stringify(selectedcuisine));
      window.location.href = '/bookings/step5';
    }

  }

  return (
    <>

      <section className="journey-part">
        <div className="container size-real">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h1>Taste the World</h1>
              <h1 className="awaits mb-0">a great experience awaits</h1>
              <div className="text-areya-srep dummy-up text-center mb-2">
                <p>Get ready to ignite your taste buds and allow us to take you on a global culinary journey, where every dish is a flavorful adventure. From the fiery zest of Mexican cuisine to the comforting embrace of Italian classics, the world's flavors are at your fingertips. It's not just a meal; it's a cultural exploration. So, get set to savor your way around the world – choose your preferred cuisine, and let the taste-filled adventure begin</p>
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-lg-1 col-md-12"></div>
            <div className="col-lg-11 col-md-12">
              <div className="row">
                
                  <Slider {...settings} className="mt-2 custom-slider-te">
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
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/cuisines/' + cuisine.image} alt="step-img-1" />
                            : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="step-img-1" width={245} height={245} />
                          }
                          {/* <p className="plase-btn"><a href="#" >{cuisine.name} </a></p> */}
                          <p className="plase-btn">
                            <a
                              href="#"
                              data-value={cuisine.id}  // Set the custom data attribute
                              onClick={(e) => {
                                e.preventDefault();  // Prevent the default link behavior
                                const value = e.currentTarget.getAttribute('data-value'); // Access the custom data attribute
                                setSelectedCuisine((prevSelectedCuisine) => {
                                  if (prevSelectedCuisine.includes(String(value))) {
                                    return prevSelectedCuisine.filter((c) => c !== String(value));
                                  } else {
                                    return [...prevSelectedCuisine, String(value)];
                                  }
                                });
                              }}
                            >
                              {cuisine.name}
                            </a>
                          </p>

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
            <div className="view-more  mt-4"><a href="/bookings/step3">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="#" onClick={(e) => CheckStepFour()}>Next</a></div>
          </div>
          <div className="rotate-box"> <h4 className="rotate-text">select type of cuisine</h4></div>
        </div>
      
      </section>
      <ToastContainer />
    </>
  )
}