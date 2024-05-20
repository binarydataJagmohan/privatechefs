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
    city:string;
    role:string;
    know_me_better: string;
    cooking_secret: string;
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
    city: "",
    role: "",
    cooking_secret: "",
    know_me_better: ""

  });
  let id = props.userId;

  const [totalDishes, setTotalDishes] = useState<any>([]);

  const [reviews, setTotalReview] = useState<any>([]);

  const [average_rating, setAverageRating] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

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
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDescription = (description:any) => {
    if (isExpanded) {
      return description;
    }
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  };
  return (
    <>
      <section className="banner-part-chef text-center">
        <div className="overlay-black">
          <div className="container">
            <h1>{getUsers.name}</h1>
            <p>Private Chef In {getUsers.city}</p>
          </div>
        </div>
      </section>
      <section className="get-know">
        <div className="container">
          <div className="me-better">
            <div className="row">
              <div className="col-lg-4 col-md-12">
                <h2>Get to know me better</h2>
                {getUsers.know_me_better ? <q>{getUsers.know_me_better}</q> : ''}
                {/* <q>Perfection and extraordinary taste is my goal in every dish</q> */}
                <a href="/bookings/step1" className="btn-design">
                  Book Now
                </a>
              </div>
              <div className="col-lg-4 col-md-12">
                {getUsers.about 
                  ? 
                    <>
                      <p>
                        {renderDescription(getUsers.about)}
                      </p>
                      <a href="#" className="read-more" onClick={toggleExpand}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                      </a>
                    </>
                  :
                    ''
                }
              </div>
              <div className="col-lg-4 col-md-12">
                {getUsers.pic ? (
                  <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + getUsers.pic} alt="chef" className="chef-profile" style={{width:"250px", height:"250px", borderRadius:"190px"}} />
                ) : (
                  <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/chef.png"} alt="chef" className="chef-profile" />
                )}
              </div>
            </div>

            <div className="about-me">
              <div className="row">
                <div className="col-sm-4">
                  <h3>More about me</h3>
                  <p>
                    <b>For me, cooking is...</b>
                  </p>
                  <p>{getUsers.love_cooking ? getUsers.love_cooking : ''}</p>
                  <br />
                </div>
                <div className="col-sm-4">
                  <p>
                    <b>I learned to cook at...</b>{" "}
                  </p>
                  <p>{getUsers.experience ? getUsers.experience : ''}</p>
                  <br />
                </div>
                <div className="col-sm-4">
                  <p>
                    <b>A cooking secret...</b>
                  </p>
                  <p>{getUsers.cooking_secret ? getUsers.cooking_secret : ''}</p>
                  {/* <p>{getUsers.favorite_dishes ? getUsers.favorite_dishes : ''}</p> */}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {totalDishes.length > 0 && (
        <section className="images-part">
          <div className="container">
            <div className="row">
            {totalDishes.map((dishes: any, index: any) => {
              return (
                <div className="col-sm-3" key={index}>
                  {dishes.img ? (
                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/dishes/" + dishes.img} alt="chef" className="chef-profile" style={{maxHeight: "285px", width: "100%"}}/>
                  ) : (
                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="chef" className="chef-profile" />
                  )}
                  {/* <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/f-1.webp"} alt="chef" className="chef-profile" /> */}
                </div>
              )
            })}
            </div>
          </div>
        </section>
      )}
      {reviews.length > 0 && (
        <section id="reviewSection">
          <div className="container">
            <h1 className="text-center">{getUsers.name} reviews</h1>
            <div className="row" id="imageSlide">
              {reviews.map((rev: any, index: number) => {
                const createdAt = new Date(rev.created_at);
                const options:any = { year: 'numeric', month: 'short', day: '2-digit' };
                const formattedDate = createdAt.toLocaleDateString('en-US', options);
                return(
                  <div className="col-md-4" key={index}>
                    <div className="box-area">
                      <div className="single-box">
                        <div className="">
                          {rev.pic ? (
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + rev.pic} alt="chef" className="img-area" />
                          ) : (
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/chef.png"} alt="chef" className="img-area" />
                          )}
                        </div>
                        <div className="img-text">
                          <span className="header-text">
                            <strong>{rev.name}</strong>
                          </span>
                          <div className="line"></div>
                          <h3>Adrienne Goetz - { formattedDate }</h3>
                          <p>{rev.comment}</p>
                          <ul className="starEnd mt-3">
                            {[...Array(5)].map((_, index) => (
                            <li key={index}><i className={`${index < Math.round(Number(rev.stars)) ? " fa-solid fa-star" : "fa-regular fa-star"}`}></i></li>
                            ))}
                            {/* <li>
                              <i className="fa-solid fa-star"></i>
                            </li>
                            <li>
                              <i className="fa-solid fa-star"></i>
                            </li>
                            <li>
                              <i className="fa-solid fa-star-half-stroke"></i>
                            </li>
                            <li>
                              <i className="fa-solid fa-star-half-stroke"></i>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
      <section id="bookSection">
        <div className="container">
          <div className="row g-3">
            <div className="col-sm-3">
              <div className="firstImage">
                <img src="https://d1hdnpfpyy58x9.cloudfront.net/context/frontend/chefs/chef_profile/book-experience01.jpg,w_278,h_341,c_1,q_80,fd_1,e_.webp" alt="chef" className="chef-profile w-100 " />
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-3 sectionMargin">
                <div className="col-sm-6 sectionTopPadding">
                  <div>
                    <img src="https://d1hdnpfpyy58x9.cloudfront.net/context/frontend/chefs/chef_profile/book-experience02.jpg,w_278,h_305,c_1,q_80,fd_1,e_.webp" alt="chef" className="chef-profile  w-100 " />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div>
                    <img src="https://d1hdnpfpyy58x9.cloudfront.net/context/frontend/chefs/chef_profile/book-experience03.jpg,w_278,h_381,c_1,q_80,fd_1,e_.webp" alt="chef" className="chef-profile  w-100 " />
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="shadow-box">
                  <h3>Book your experience with {getUsers.name}</h3>
                  <p>Specify the details of your requests and the chef will send you a custom menu just for you.</p>
                  <a href="/bookings/step1" className=" a-btn-cta x-light   mx-3 mt-3" style={{ padding: "15px 14px", color: "#182427" }}>
                    Book
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="firstImage">
                <img src="https://d1hdnpfpyy58x9.cloudfront.net/context/frontend/chefs/chef_profile/book-experience04.jpg,w_278,h_405,c_1,q_80,fd_1,e_.webp" alt="chef" className="chef-profile   w-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="messages-part">
        <div className="container ">
          {getUsers.love_cooking && (
            <div className="messages-text mt-5 tab-m-top">
              <p className="small-title">I love cooking because...</p>
              <p className="italic-title">{getUsers.love_cooking}</p> */}
              {/* <p className="italic-title">“Love, passion, my life, my everything”</p> */}
            {/* </div>
          )}

          {getUsers.experience && (
            <div className="messages-text mt-5">
              <p className="small-title">Culinary experience</p> */}
              {/* <p className="italic-title">“3* The Fat Duck,  2*Spondi Athens, 1* The Hinds Head, 1* he Pollen Street, Veneze Atens, Milos Athens”</p> */}
              {/* <p className="italic-title">{getUsers.experience}</p>
            </div>
          )}

          {getUsers.services_type && (
            <div className="messages-text mt-5">
              <p className="small-title">Personal Culinary Expert..</p>
              <p className="italic-title">{getUsers.services_type}</p> */}
              {/* <p className="italic-title">“Fetan Adria, Juan Roca, Grand Archaz and many more”</p> */}
            {/* </div>
          )}

          {getUsers.favorite_dishes && (
            <div className="messages-text mt-5">
              <p className="small-title">Cuisines Offered</p>
              <p className="italic-title">{getUsers.favorite_dishes}</p> */}
              {/* <p className="italic-title">“Precision and passion for cooking”</p> */}
            {/* </div>
          )}

          {getUsers.languages && (
            <div className="messages-text mt-5">
              <p className="small-title">Language Proficiency</p>
              <p className="italic-title">{getUsers.languages}</p> */}
              {/* <p className="italic-title">“Precision and passion for cooking”</p> */}
            {/* </div>
          )}

          {getUsers.skills && (
            <div className="messages-text mt-5">
              <p className="small-title">Special Skills and Knowledge</p>
              <p className="italic-title">{getUsers.skills}</p> */}
              {/* <p className="italic-title">“Precision and passion for cooking”</p> */}
            {/* </div>
          )}
        </div>
      </section> */}
    </>
  );
}
