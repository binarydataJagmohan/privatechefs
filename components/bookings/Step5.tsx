import React, { useState ,useEffect} from 'react'
import { getAllergyDetails } from 'lib/adminapi';
import { ToastContainer,toast } from 'react-toastify';
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
export default function Step5() {

  const [allergiesdata, setAllergies] = useState([]);
  const [selectedallergies, setSelectedAllergies] = useState([]);

  const [additionalnotes, setAdditionalNotes] = useState([]);

  useEffect(() => {
    BookingStepFive();
  }, []);

  const BookingStepFive = async () => {
    
    const serviceType = window.localStorage.getItem('servicetype');
    const time = window.localStorage.getItem('time');
    const servicestyle = window.localStorage.getItem('servicestyle');
    const mealsSelected = window.localStorage.getItem("selectedMeals");
    const storedCuisine = window.localStorage.getItem("selectedcuisine");
    const storeallergies = window.localStorage.getItem("selectedallergies");
    const getadditionalnotes = window.localStorage.getItem("additionalnotes");

    if(serviceType && time) {
        if(servicestyle) {
           
            if(!mealsSelected){
              window.location.href = '/bookings/step3';
            }else {

              if(!storedCuisine){
                window.location.href = '/bookings/step4';
              }else {
                getAllergyDetailsData();
                if (storeallergies) {
                  const selectedAllergiesArray = JSON.parse(storeallergies);
                  setSelectedAllergies(selectedAllergiesArray);
                }
                setAdditionalNotes(getadditionalnotes);
              }

            }
            
        }else {
          window.location.href = '/bookings/step2';
        }
    }else {
      window.location.href = '/bookings/step1';
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
      });
      }
    } catch (err) {
      toast.error(err.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
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

    const CheckStepFive = () => {

      window.localStorage.setItem("selectedallergies", JSON.stringify(selectedallergies));
      window.localStorage.setItem("additionalnotes", additionalnotes);
      window.location.href = '/bookings/step6';
    }

    return (
        <>
          <section className="journey-part">
            <div className="container size-real">
                <div className="row">
                <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                    <h1>Special requests</h1>
                    <h1 className="awaits mb-0">a great experience awaits</h1>
                    <div className="text-areya-srep dummy-up text-center"> 
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac egestas et enim porttitor urna amet, amet. Turpis aenean dolor risus vel mattis enim, scelerisque egestas fermentum. Quis senectus dictum vitae pretium commodo. Nunc congue sed sed penatibus. Accumsan, sit sit id enim sed sed ullamcorper. Ultrices scelerisque ac fermentum enim.</p>  
                      </div>
                    </div>
                </div>

                <div className="row mb-2">
                  <div className="col-lg-1 col-md-12"></div>
                  <div className="col-lg-11 col-md-12">
                  <h4 className="title-20">Any allergies?</h4> 
                  </div>
                </div>
                <div className="row mb-5">
                <div className="col-lg-1 col-md-12"></div>
                <div className="col-lg-11 col-md-12">
                    <div className="row"> 
                    <Slider {...settings} className="mt-2">
                    {allergiesdata.map((allergies) => (
                      <div className="col-sm-3" key={allergies.id}>
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
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL+'/images/admin/allergy/'+allergies.image} alt="1" /> 
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
                  <div className="col-lg-1 col-md-12"></div>
                  <div className="col-lg-11 col-md-12"> 
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h4 className="title-20">Any special requests?</h4> 
                        <textarea className="textarea-part mt-3"  onChange={(e) => setAdditionalNotes(e.target.value)} placeholder="Let us know more about your prefferences.."></textarea>
                    </div>
                    
                  </div>
                  </div>
                </div>
                </div>
                <div className="container-fluid mt-5">
                <div className="d-flx-step">
                <div className="view-more  mt-4"><a href="/bookings/step4">Back</a></div>
                <div className="view-more bg-golden mt-4"><a href="#" onClick={(e) => CheckStepFive()}>Next</a></div>    
                </div> 
                <div className="rotate-box"> <h4 className="rotate-text">enter any special requests</h4></div>
              </div>  
          </section>
        </>
    )
}