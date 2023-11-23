import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getTestimonials } from '../../lib/adminapi';
import Head from 'next/head';

export default function Location(props: any) {

    interface Testimonial {
        id: number;
        stars: number;
        name: string;
        description: string;
        image: string;
    }
    interface Location {
        pic: string;
        address: string;
        name: string;
        location_pic: string;
    }
    interface PageSlug {
        name: string;
        slug: string;
        meta_desc: string;
        meta_tag: string;
    }


    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [stars, setStar] = useState([]);
    const [pageslug, setSlug] = useState<PageSlug | null>(null);

    useEffect(() => {
        if (props) {
            setSlug(props.pages.data);
            setLocations(props.locations.data);
        }

    }, []);

    useEffect(() => { 
        fetchTestimonialDetails();
    }, []);


    const fetchTestimonialDetails = async () => {
        try {
            const res = await getTestimonials();
            if (res.status) {
                setTestimonials(res.data);
                setStar(res.data.stars)
                //console.log(res.data);
            } else {
                console.log(res.message);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    const handleStarHover = (num: number) => {
        const starColor = num > 0 ? "#ff4e00d1" : "#ff4e00d1";
        const stars = document.querySelectorAll(".fa-star");
        stars.forEach((star, index) => {
            (star as HTMLElement).style.color = index < num ? starColor : '#ff4e00d1';
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
            <Head>
                <title>{pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}</title>
                <meta name="description" content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`} />
            </Head>
            <section className="banner-part p-0">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            {locations && locations.length > 0 && locations[0].location_pic ? (
                                <img
                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/location/' + locations[0].location_pic}
                                    alt="slider-1"
                                    id="single-img1"
                                    className="w-100 border-0 banner-left"
                                />
                            ) : (
                                <img
                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'}
                                    id="dummy-img"
                                    alt="slider-1"
                                    className="w-100 border-0 banner-left"
                                />
                            )}
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text">
                                <h1>{locations && locations.length > 0 ? locations[0].address : ''}</h1>
                                <div className="banner-btn mb-5"><a href="/bookings/step1">Start your journey</a></div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part mt-5" id='boxes-id'>
                <div className="container">
                    <h2 className='text-uppercase'>How it works?  </h2>
                    <div className='services-id'>
                        <p className="dis-max-width mb-3 text-uppercase">We know chefs. We know the materials. We deliver results.</p>
                    </div>
                    <p className="dis-max-width mb-4 text-capital">The aim of our service is to make the booking process from choosing a menu to the arrival of your private chefs (at the place & time you want them) as quick & easy as possible for you.</p>
                    <div className="row g-3 mt-5">
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48" id="big-id"><i className="fa-solid fa-spoon"></i></span> </h4>
                                <h4>You choose the menu</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fas fa-bacon"></i></span>  </h4>
                                <h4>We buy the ingredients</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-kitchen-set"></i></span> </h4>
                                <h4>We cook in your kitchen</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3 mt-4">
                        <div className="col-lg-2 col-md-12"> </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-cutlery"></i></span>  </h4>
                                <h4>We serve each dish</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-brush"></i></span></h4>
                                <h4> We clean up</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet.</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12"> </div>
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
                            {locations.map((location) =>
                                <div className="col-lg-2 col-md-6">
                                    <div className="slider-img-plase" id="location-img">
                                        {location.pic ? (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + location.pic} alt="2" />
                                        ) : (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="2" />
                                        )
                                        }
                                        <p className="plase-btn">
                                            {location.address ? (
                                                <a href="#">{location.name}</a>
                                            ) : (
                                                <span></span>
                                            )}
                                        </p>

                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Our customers said</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris. </p>
                    <div className="row mt-5 g-3">
                        {testimonials.slice(0, 3).map((testimonial) => (
                            <div className="col-lg-4 col-md-6">
                                <div className="step-box text-center customers-review" id="test-img">
                                    {testimonial.image ? (
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/testimonial/' + testimonial.image} alt="ava4" />
                                    ) : (
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="ava4" />
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


            <section className="experience-slider mt-lg-5">
                <div className="container">
                    <h3> Things to explore</h3>
                </div>
                <div className="container-fluid mt-lg-5 mt-4">
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