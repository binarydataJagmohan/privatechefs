import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getTestimonials } from '../../lib/adminapi';
import { ToastContainer, toast } from "react-toastify";


export default function Location() {

    interface Testimonial {
        id: number;
        stars: number;
        name: string;
        description: string;
        image: string;
    }

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [stars, setStar] = useState([]);

    useEffect(() => {
        fetchTestimonialDetails();
    }, [testimonials]);

    const fetchTestimonialDetails = async () => {
        try {
            const res = await getTestimonials();
            if (res.status) {
                setTestimonials(res.data);
                setStar(res.data.stars)
                //console.log(res.data);
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (err: any) {
            toast.error(err.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleStarHover = (num: number) => {
        const starColor = num > 0 ? "#ff4e00" : "#ff4e00";
        const stars = document.querySelectorAll(".fa-star");
        stars.forEach((star, index) => {
            (star as HTMLElement).style.color = index < num ? starColor : '#ff4e00';
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
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-2.jpg'} alt="banner-2" className="w-100 border-0 banner-left" />
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text">
                                <h1>Athens, Greece</h1>
                                <div className="banner-btn mb-5"><a href="#">Start your journey</a></div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part location-how mt-5">
                <div className="container">
                    <h2>How it works</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                    <div className="row mt-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">1</span></h4>
                                <h4>Step 1</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">2</span></h4>
                                <h4>Step 2</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">3</span></h4>
                                <h4>Step 3</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">4</span></h4>
                                <h4>Step 4</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Chefs for this location</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/2.jpg'} alt="2" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/3.jpg'} alt="3" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/2.jpg'} alt="2" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/3.jpg'} alt="3" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/2.jpg'} alt="2" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/3.jpg'} alt="3" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Our customers said</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris. </p>
                    <div className="row mt-5">
                        {testimonials.slice(0, 3).map((testimonial) => (
                            <div className="col-lg-4 col-md-6">
                                <div className="step-box text-center customers-review" id="test-img">
                                    {testimonial.image ? (
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/testimonial/' + testimonial.image} alt="ava4" />
                                    ) : (
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="ava4" />
                                    )}
                                    <h4>{testimonial.name}</h4>
                                    <p className="star-list blue-star" id="star-color">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <i
                                                key={num}
                                                className={`fa${num <= testimonial.stars ? 's' : 'r'} fa-star`}
                                                onMouseEnter={() => handleStarHover(num)}
                                                onClick={() => setStar(stars)}
                                            />
                                        ))}
                                    </p>
                                    <p>{testimonial.description.slice(0, 200)}.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="experience-slider mt-5">
                <div className="container">
                    <h3> Things to explore</h3>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/slider-1.webp'} alt="slider-1" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/slider-2.webp'} alt="slider-2" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/slider-3.webp'} alt="slider-3" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/slider-4.webp'} alt="slider-4" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/slider-2.webp'} alt="slider-2" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/slider-4.webp'} alt="slider-4" />
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div>
            </section>

        </>
    )
}