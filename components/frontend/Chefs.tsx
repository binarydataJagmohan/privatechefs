import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { getSingleChefProfile } from "../../lib/userapi";

import { getAllChefDishGallery, getAllChefReview } from "../../lib/chefapi";

  

export default function Chefs(props: any) {
  interface User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    BIC: string;
    IBAN: string;
    address: string;
    bank_address: string;
    bank_name: string;
    holder_name: string;
    passport_no: string;
    pic: string;
    tax_id: string;
    vat_no: string;
    about: string;
    description: string;
    services_type: string;
    favorite_dishes: string;
    languages: string;
    love_cooking: string;
    experience: string;
    favorite_chef: string;
    skills: string;
    addresses: string;
  }

  const [getUsers, setUsers] = useState<User>({
    id: 0,
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    BIC: "",
    IBAN: "",
    bank_address: "",
    bank_name: "",
    holder_name: "",
    passport_no: "",
    pic: "",
    tax_id: "",
    vat_no: "",
    about: "",
    description: "",
    services_type: "",
    favorite_dishes: "",
    languages: "",
    love_cooking: "",
    experience: "",
    favorite_chef: "",
    skills: "",
    addresses: "",
  });
  let id = props.userId;

  const [totalDishes, setTotalDishes] = useState<any>([]);

  const [reviews, setTotalReview] = useState<any>([]);

  const [average_rating, setAverageRating] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getSingleChefProfile(id);
      setUsers(userData.data);
    };
    fetchUserData();

    getAllChefMenuData(id);

    getAllChefReviewData(id);
  }, []);

  const getAllChefMenuData = async (id: any) => {
    getAllChefDishGallery(id)
      .then((res: any) => {
        if (res.status == true) {
          setTotalDishes(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getAllChefReviewData = async (id: any) => {
    getAllChefReview(id)
      .then((res: any) => {
        if (res.status == true) {
          setTotalReview(res.data);
          setAverageRating(res.averageRating);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const settings = {
    rows: 1,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    //slidesToScroll: 1,
    centerMode: false,
    variableWidth: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  };
  return (
    <>

  <section className="banner-part-chef text-center">
  <div className="overlay-black">
    <div className="container">
      <h1>Chef Xenofon Samoilis</h1>
      <p>Private Chef In Corfu</p>
    </div>
  </div>
  </section>

  <section className="get-know">
  <div className="container">
    <div className="me-better">
      <div className="row">
        <div className="col-lg-4 col-md-12">
         <h2>Get to know me better</h2>
         <q>Perfection and extraordinary taste is my goal in every dish</q>  
            <a href="#" className="btn-design">Book Now</a>
           
        </div>
        <div className="col-lg-4 col-md-12">
          <p>Hello everyone, I'm Chef Nikos and my world revolves around the magic of cooking. Ever since I was young, I've been captivated by the artistry that goes into creating a dish. To me, a kitchen is more than just a place to cook; it's a stage where I bring my culinary visions to life. I've had the privilege of learning at some of the finest culinary schools, where I mastered the balance of classic techniques and modern innovation. My approach to cooking is simple: blend tradition with creativity, and always keep the flavors genuine and bold. My passion </p>
          <a href="#" className="read-more">Read More</a>
        </div>
        <div className="col-lg-4 col-md-12">
        {getUsers.pic ? (
                  <img
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL +
                      "/images/chef/users/" +
                      getUsers.pic
                    }
                    alt="chef"
                    className="chef-profile"
                  />
                ) : (
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + "/images/chef.png"}
                    alt="chef"
                    className="chef-profile"
                  />
                )}
        </div>
      </div>

      <div className="about-me">
        <div className="row">
          <div className="col-sm-4">
            <h3>More about me</h3>
            <p><b>For me, cooking is...</b></p>
            <p>Love, passion, my life, my everything</p>
            <br /> 
          </div>
          <div className="col-sm-4">
          <p><b>I learned to cook at...</b> </p>
          <p>3* The Fat Duck , 2* Spondi Athens, 1 *The Hinds Head, 1* he Pollen Street , Vezene Athens, Milos Athens</p>
          <br /> 
          </div>
          <div className="col-sm-4">
            <p><b>A cooking secret...</b></p>
            <p>Precision for cooking</p>
            <br /> 
          </div>
        </div>
      </div>
  
    </div >
  </div>
  </section>

  <section className="images-part">
   <div className="container">
    <div className="row">
      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-1.webp"} alt="chef" className="chef-profile"/>
      </div>
      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-2.webp"} alt="chef" className="chef-profile"/>
      </div>
      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-3.webp"} alt="chef" className="chef-profile"/>
      </div>
      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-4.webp"} alt="chef" className="chef-profile"/>
      </div>

      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-5.webp"} alt="chef" className="chef-profile"/>
      </div>

      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-4.webp"} alt="chef" className="chef-profile"/>
      </div>

      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-2.webp"} alt="chef" className="chef-profile"/>
      </div>

      <div className="col-sm-3">
      <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-1.webp"} alt="chef" className="chef-profile"/>
      </div>

      
    </div>
   </div>
  </section>
  
      <section className="messages-part">
        <div className="container ">
          {getUsers.love_cooking && (
            <div className="messages-text mt-5 tab-m-top">
              <p className="small-title">I love cooking because...</p>
              <p className="italic-title">{getUsers.love_cooking}</p>
              {/* <p className="italic-title">“Love, passion, my life, my everything”</p> */}
            </div>
          )}

          {getUsers.experience && (
            <div className="messages-text mt-5">
              <p className="small-title">Culinary experience</p>
              {/* <p className="italic-title">“3* The Fat Duck,  2*Spondi Athens, 1* The Hinds Head, 1* he Pollen Street, Veneze Atens, Milos Athens”</p> */}
              <p className="italic-title">{getUsers.experience}</p>
            </div>
          )}

          {getUsers.services_type && (
            <div className="messages-text mt-5">
              <p className="small-title">Personal Culinary Expert..</p>
              <p className="italic-title">{getUsers.services_type}</p>
              {/* <p className="italic-title">“Fetan Adria, Juan Roca, Grand Archaz and many more”</p> */}
            </div>
          )}

          {getUsers.favorite_dishes && (
            <div className="messages-text mt-5">
              <p className="small-title">Cuisines Offered</p>
              <p className="italic-title">{getUsers.favorite_dishes}</p>
              {/* <p className="italic-title">“Precision and passion for cooking”</p> */}
            </div>
          )}

          {getUsers.languages && (
            <div className="messages-text mt-5">
              <p className="small-title">Language Proficiency</p>
              <p className="italic-title">{getUsers.languages}</p>
              {/* <p className="italic-title">“Precision and passion for cooking”</p> */}
            </div>
          )}

          {getUsers.skills && (
            <div className="messages-text mt-5">
              <p className="small-title">Special Skills and Knowledge</p>
              <p className="italic-title">{getUsers.skills}</p>
              {/* <p className="italic-title">“Precision and passion for cooking”</p> */}
            </div>
          )}
        </div>
      </section>
      {totalDishes.length > 0 && (
        <section className="experience-slider mobile-p-0">
          <div className="container ">
            <h2 className="font-black">{getUsers.name} photo album</h2>
            <div className="row mt-5 mobile-m-0">
              <Slider {...settings}>
                {totalDishes.map((dishes: any, index: any) => {
                  return (
                    <div className="col-lg-2 col-md-6" key={index}>
                      <div className="slider-img-plase">
                        {dishes.img ? (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              "/images/chef/dishes/" +
                              dishes.img
                            }
                            width={612}
                            height={300}
                          />
                        ) : (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              "/images/placeholder.jpg"
                            }
                            width={612}
                            height={300}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="services-part location-how mt-5 mobile-m-0">
          <div className="container">
            <h2>{getUsers.name} reviews</h2>
            <p className="dis-max-width mb-4">
              Immersing myself in reviews, I am constantly reminded of the genuine passion and commitment to excellence that resonates in every aspect of my work. These words fuel my drive and inspire me to continually push the boundaries of culinary innovation{" "}
            </p>
            <div className="row mt-5">
              {reviews.map((rev: any, index: number) => (
                <div className="col-lg-4 col-md-6" key={index}>
                   <div className="step-box text-center customers-review py-2" id="test-img" >
                    {rev.pic ? (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/chef/users/" +
                          rev.pic
                        }
                        alt="chef"
                        className="chef-img w-25"
                      />
                    ) : (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_BASE_URL + "/images/chef.png"
                        }
                        alt="chef"
                        className="chef-img"
                      />
                    )}

                    <h4>{rev.name}</h4>

                    <p className="star-review">
                    {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`${
                        index < Math.round(Number(rev.stars))
                          ? " fa-solid fa-star"
                          : "fa-regular fa-star"
                      }`}
                    ></i>
                  ))}
                    </p>
                    
                    <p>{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
