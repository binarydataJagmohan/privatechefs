import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { getSingleChefProfile } from "../../lib/userapi"

export default function Chefs(props: any) {

    interface User {
        id: number,
        name: string,
        surname: string,
        phone: string,
        email: string,
        BIC: string,
        IBAN: string,
        address: string,
        bank_address: string,
        bank_name: string,
        holder_name: string,
        passport_no:string,
        pic:string,
        tax_id:string,
        vat_no:string,
        about:string,
        description: string,
        services_type: string,
        favorite_dishes:string,
        languages:string,
        love_cooking:string,
        experience:string,
        favorite_chef:string,
        skills: string,
        addresses:string,
       
       
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
        passport_no:"",
        pic:"",
        tax_id:"",
        vat_no:"",
        about: "",
        description: "",
        services_type: "",
        favorite_dishes:"",
        languages:"",
        love_cooking:"",
        experience:"",
        favorite_chef:"",
        skills: "",
        addresses:""
    });
    let id = props.userId;
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getSingleChefProfile(id);
            setUsers(userData.data);

        };
        fetchUserData();
    }, []);

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
    return (
        <>
            <section className="banner-part p-0">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src="/images/banner-5.jpg" alt="banner-5" className="w-100 border-0 banner-left" />
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text  margin-sp">

                                {getUsers.pic ? (
                                    <img src={
                                        process.env.NEXT_PUBLIC_IMAGE_URL +
                                        "/images/chef/users/" +
                                        getUsers.pic
                                    } alt="chef" className="chef-img w-25" />
                                ) : (
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + '/images/chef.png'} alt="chef" className="chef-img" />
                                )}

                                <h1>{getUsers.name}</h1>
                                <p className="star-review">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <span>201 reviews</span>
                                </p>
                                <p className='mt-2'>{getUsers.about}</p>
                                <div className="banner-btn mb-5"><a href="/bookings/step1">Start your journey</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part mt-5">
                <div className="container">
                    <p className="font-sb-title-up"> Get to know me better </p>
                    <h2><i>“Perfection and extraordinery taste is my goal <br /> in every dish”</i></h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                </div>
            </section>
            {getUsers.services_type && (
                  <section className="services-part location-how  mt-5 tab-m-0 tab-p-0">
                  <div className="container">
                      <h2>My services</h2>
                      <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                      <div className="row mt-5">
                        
                              {/* <div className="step-box">
                              <h4><span className="big-48">1</span></h4>
                              <h4>{getUsers.service_title_one}</h4>
                              <p>{getUsers.service_description_one} </p>
                              </div> */}
                              {getUsers.services_type && getUsers.services_type.split(",").map((service, index) => (
                                  <div className="col-lg-3 col-md-6" key={index}>
                                      <div className="step-box p-4">
                                      <h4><span className="big-48">{index + 1}</span></h4>
                                      <h4>{service}</h4>
                                      
                                      </div>
                                  </div>
                              ))}
                          
                         
                      </div>
                  </div>
              </section>
            )}                      
          

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

            <section className="experience-slider mobile-p-0">
                <div className="container ">
                    <h2 className="font-black">{getUsers.name} photo album</h2>
                    <div className="row mt-5 mobile-m-0">
                        <Slider {...settings}>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-1.webp'} alt="f-1" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-2.webp'} alt="f-2" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-3.webp'} alt="f-3" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-4.webp'} alt="f-4" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-5.webp'} alt="f-5" />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-1.webp'} alt="f-1" />
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>{getUsers.name} reviews</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris. </p>
                    <div className="row mt-5">
                        <div className="col-lg-4 col-md-6">
                            <div className="step-box text-center customers-review ">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/1.png'} alt="1" />
                                <h4>Cody Fisher</h4>
                                <p className="star-review">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="step-box text-center customers-review ">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/2.png'} alt="2" />
                                <h4>Bessie Cooper</h4>
                                <p className="star-review">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="step-box text-center customers-review ">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/3.png'} alt="3" />
                                <h4>Eleanor Pena</h4>
                                <p className="star-review">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}