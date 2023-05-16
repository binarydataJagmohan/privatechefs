import React, { useState ,useEffect} from 'react'
import { getAllergyDetails,getAllCuisine } from '@/lib/adminapi';
import { ToastContainer,toast } from 'react-toastify';
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import axios from 'axios'
import { getToken, getCurrentUserData } from "../../../lib/session";

export default function UserProfileThree() {

    const [allergiesdata, setAllergies] = useState<Allergies[]>([]);
    const [selectedallergies, setSelectedAllergies] = useState<string[]>([]);
    const [cuisinedata, setCuisine] = useState<Cuisine[]>([]);
    const [selectedcuisine, setSelectedCuisine] = useState<string[]>([]);

    useEffect(() => {
        getAllergyDetailsData();
        getAllCuisineData();
      }, []);

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
          toast.error((err as Error).message, {
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

      // const handleCheckboxClick = (value) => {
      //   const data = {
      //     selectedAllergies: value,
      //     selectedcuisine:value
      //   };

      const handleCheckboxClick = (allergies, cuisine) => {
        const data = {
          selectedallergies: allergies,
          selectedcuisine: cuisine
        };
        const userData = getCurrentUserData();
         const id = userData.id;
         const url = `http://127.0.0.1:8000/api/updateAllergyCusine/${id}`;

         axios.post(url, data)
       .then((response) => {
      // alert(selectedallergies)
       window.localStorage.setItem("selectedcuisine", JSON.stringify(selectedallergies));
       window.localStorage.setItem("selectedcuisine", JSON.stringify(selectedcuisine));
       })
     .catch((error) => {
    // Handle error if needed
     });
}

    return(
        <>
            <section className="userprofile-part">
                <div className="container">
                  <div className="my-profile mt-5 tab-m-0">
                    <h2> My profile <span className="log-out"><a href="#">Log out</a></span></h2>
                  </div>
                <div className="row">

                    <div className="col-lg-3 col-md-12">
                        <div className="my-profile"> 
                            <a href="/user/userprofile">
                                <div className="profile-cols mt-5">
                                    <h4>Account Settings</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </a>
                            <a href="/user/booking">
                                <div className="profile-cols mt-4 ">
                                    <h4>My Bookings</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </a>
                            <div className="profile-cols active mt-4 mb-4">
                                <h4>Aditional Information/Preferences</h4>
                                <p>Halal, Kosher, Hindu.</p>
                            </div>
                        </div>
                     </div>
                    <div className="col-lg-9 col-md-12">
                      <h4 className="check-title mt-5">Any allergies?</h4>

                      <div className="row mt-3">
                    <Slider {...settings} className="mt-2">
                    {allergiesdata.map((allergies,index) => (
                      <div className="col-sm-3" key={index}>
                        <div className="slider-img-plase">
                          <input
                            type="checkbox"
                            id={`myCheckbox2_${allergies.id}`}
                            name="allergy_type"
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
                              handleCheckboxClick(selectedallergies, selectedcuisine);
                            }}
                            checked={selectedallergies.includes(String(allergies.id))}
                          />
                          <label htmlFor={`myCheckbox2_${allergies.id}`} className="step_label_css">
                          {allergies.image ? 
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/allergy/'+allergies.image} alt="step-img-1" /> 
                          :  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="step-img-1"  width={245} height={190}/> 
                          }
                            
                            <p className="plase-btn"><a href="#">{allergies.allergy_name}</a></p>
                          </label>
                        </div>
                      </div>
                    ))}
                    </Slider>
                      </div>

                      <h4 className="check-title  mt-5">Favorite kitchen?</h4>
                    
                      <div className="row mt-3">
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
                              handleCheckboxClick(selectedallergies, selectedcuisine);
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

                      <div className="row mt-3">
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
                              handleCheckboxClick(selectedallergies, selectedcuisine);
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
            </section> 
        </>
    )
}