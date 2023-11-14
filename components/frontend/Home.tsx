import React, { useState, useEffect, useCallback } from 'react';
import Slider from "react-slick";
import { useRouter } from "next/router";
import {/*CheckUserEmailVerification,*/CheckUserResetPasswordVerification, UpdateResetPassword, getAllTopRatedChef } from '../../lib/frontendapi';
import { getTestimonials } from '../../lib/adminapi';
import Head from 'next/head';
import PopupModal from '../../components/commoncomponents/PopupModal';
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeBookingData } from "../../lib/session";
import { getAllLocation } from "../../lib/frontendapi"


export default function Home(props: any) {

    interface Errors {
        password?: string;
        confirmPassword?: string;
    }
    interface Insta {
        id: number;
        media_url: string;
    }
    interface Testimonial {
        id: number;
        stars: number;
        name: string;
        description: string;
        image: string;
    }

    interface PageSlug {
        name: string;
        slug: string;
        meta_desc: string;
        meta_tag: string;
    }
    interface Location {
        id: number;
        pic: string;
        address: string;
        location_pic: string;
    }

    const router = useRouter();
    const [locations, setLocations] = useState<Location[]>([]);
    const [modalConfirmTwo, setModalConfirmTwo] = useState(false);
    const [buttonStatus, setButtonState] = useState(false);
    const [password, setPassword] = useState("");
    const [getinstafeed, setInstaFeed] = useState<Insta[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [stars, setStar] = useState([]);
    const [pageslug, setSlug] = useState<PageSlug | null>(null);
    const [allchef, setAllChef] = useState([]);


    useEffect(() => {
        if (props) {
            setSlug(props.pages.data);
            //console.log(props.pages.data);
        }
        fetchBookingAdminDetails();
        fetchTestimonialDetails();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                removeBookingData();
                fetchLocationDetails();

                if (router.query.id && router.query.hash) {
                    // CheckEmailVerification();
                }

                if (router.query.userid && router.query.resettoken) {
                    CheckResetPasswordVerification();
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchData();
    }, [router]);

    const fetchBookingAdminDetails = async () => {
        const res = await getAllTopRatedChef();
        if (res.status) {
            setAllChef(res.data);
        }
    };

    const fetchLocationDetails = async () => {
        try {
            const res = await getAllLocation();
            if (res.status) {
                setLocations(res.data);
                //console.log(res.data);
            } else {
                console.log('error');
            }
        } catch (err: any) {
            console.log('error');
        }
    };


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

        }
    };



    const CheckResetPasswordVerification = async () => {
        const data = {
            id: router.query.userid,
            token: router.query.resettoken
        }

        CheckUserResetPasswordVerification(data)
            .then(res => {
                if (res) {
                    if (res.status == true) {
                        setModalConfirmTwo(true);
                    } else {
                        swal({
                            title: 'Oops!',
                            text: res.message,
                            icon: 'info',

                        });
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    // const CheckEmailVerification = async () => {
    //     const data = {
    //         id:router.query.id,
    //         token:router.query.hash
    //     }

    //     CheckUserEmailVerification(data)
    //     .then(res => {
    //         if(res){
    //            if(res.status == true){
    //                 swal({
    //                     title: 'Thanks!',
    //                     text: res.message,
    //                     icon: 'success',


    //                 });
    //            }else {
    //                 swal({
    //                     title: 'Oops!',
    //                     text: res.message,
    //                     icon: 'success',

    //                 });
    //            }
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }



    const modalConfirmCloseTwo = () => {
        setModalConfirmTwo(false);
    }

    //register submit start

    const handleResetSubmit = (event: any) => {
        event.preventDefault();

        // Validate form data
        const newErrors: Errors = {};

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(errors);

        // Submit form data if there are no errors
        if (Object.keys(errors).length === 0) {

            setButtonState(true);

            // Call an API or perform some other action to register the user
            const data = {
                user_id: router.query.userid,
                password: password,
            };
            UpdateResetPassword(data)
                .then(res => {
                    if (res.status == true) {
                        setButtonState(false);
                        setModalConfirmTwo(false);
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: '#ffff',
                                borderLeft: '4px solid #ff4e00d1',
                                color: '#454545',
                                "--toastify-icon-color-success": "#ff4e00d1",
                            },
                            progressStyle: {
                                background: '#ffff',
                            },
                        });


                    } else {
                        setButtonState(false);
                        if (res.status === false && res.errors) {
                            Object.keys(res.errors).forEach(function (key) {
                                res.errors[key].forEach(function (errorMessage: any) {
                                    toast.error(errorMessage);
                                });
                            });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

    };

    const handleResetBlur = (event: any) => {
        const { name, value } = event.target;
        const newErrors = { ...errors };

        switch (name) {

            case "password":
                if (!value) {
                    newErrors.password = "Password is required";
                } else if (value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                } else {
                    delete newErrors.password;
                }
                break;
            case "confirmPassword":
                if (!value) {
                    newErrors.confirmPassword = "Please confirm your password";
                } else if (value !== password) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    //register submit close



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
    const handleStarHover = (num: number) => {
        const starColor = num > 0 ? "#ff4e00d1" : "#ff4e00d1";
        const stars = document.querySelectorAll(".fa-star");
        stars.forEach((star, index) => {
            (star as HTMLElement).style.color = index < num ? starColor : '#ff4e00d1';
        });
    };
    return (
        <>
            <Head>
                <title>{pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}</title>
                <meta name="description" content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`} />
            </Head>
                <section className="banner-part">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-8">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner.webp'} alt="banner" />
                        </div>
                        <div className="col-sm-4">
                            <div className="banner-text home-page-banner-text">
                                <h1>Creating memoriess with food</h1>
                                <div className="banner-btn"><a href="/bookings/step1">Start your journey</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="experience-slider mt-5">
                <div className="container">
                    <h2 className='text-center'> Get inspired for your next experience</h2>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            {locations.map((location, index) => (
                                <div className="col-lg-2 col-md-6" key={index}>
                                    <a
                                        href={
                                            process.env.NEXT_PUBLIC_BASE_URL +
                                            'location/' +
                                            location.address
                                        }
                                    >
                                        <div className="slider-img-plase" id="location_idd">
                                            {location.location_pic ? (
                                                <img
                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/location/' + location.location_pic}
                                                    id="loc_id"
                                                    alt="slider-1"
                                                />
                                            ) : (
                                                <img
                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'}
                                                    id="dummy-img"
                                                    alt="slider-1"
                                                />
                                            )}
                                            <p className="plase-btn">
                                                <a
                                                    href={
                                                        process.env.NEXT_PUBLIC_BASE_URL +
                                                        'location/' +
                                                        location.address
                                                    }
                                                >
                                                    {location.address.slice(0, 35)}
                                                </a>
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </Slider>


                    </div>
                    {/* <div className="text-center view-more mt-4"><a href="#">View More</a></div> */}
                </div>
            </section>

            <section className="services-part mt-4">
                <div className="container">
                    <h2> Our services</h2>
                    <p className="dis-max-width mb-4">Looking for a Chef to create unforgettable culinary memories? Perhaps a Butler to pamper you all day long with any request? Or a talented Bartender that will surprise you with delicious cocktails? We have it all!</p>
                    <div className="row mt-5 justify-content-center service_data">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card-box">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/_01.jpg'} alt="11" className='service_img'/>
                                <h3>Chefs</h3>
                                <p className='pb-3'>Our world-class chefs are artists of the kitchen, elevating every meal into a masterpiece. With a global culinary repertoire and a passion for creativity, they turn dining into a remarkable experience. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card-box">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/imgpsh_fullsiaze_an22im.jpg'} alt="11" className='service_img'/>
                                <h3>Butlers</h3>
                                <p>Our butlers are the epitome of grace and service, ensuring your every need is met with seamless sophistication. From tableside service to event coordination, they add a touch of class to every moment. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card-box">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/_3.jpg'} alt="11" className='service_img'/>
                                <h3>Bartenders</h3>
                                <p>Our bartenders are skilled mixologists who turn every drink into a work of art. From classic cocktails to custom concoctions, they bring an element of liquid elegance to your event, leaving your guests in awe of their craft. </p>
                            </div>
                        </div>
                        {/*<div className="col-lg-3 col-md-6">
                            <div className="card-box">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/14.webp'} alt="11" />
                            <h3>Massage</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </section>
            <section className="text-side">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/Secondphoto.jpg'} alt="7" className="border-radius" />
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="contant-box mt-5 mt-0-1024">
                                <h2>Design your next experience</h2>
                                <p>At Private Chefs Worldwide, we believe that every moment deserves a touch of extraordinary. Our feature empowers you to create a culinary journey as unique as you are. Whether it's an intimate dinner for two, a lavish celebration, or a themed event, we offer a canvas for your imagination. Select from our team of world-class chefs, butlers, waiters, and bartenders to craft a one-of-a-kind experience that reflects your tastes and aspirations. Together, we'll bring your vision to life, ensuring that every detail is tailored to perfection, from the menu to the ambiance. Your next memorable experience awaits – let's design it together.</p>
                                <div className="banner-btn"><a href="/bookings/step1">Start your journey</a></div>
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
                    <div className="row mt-5">
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48" id="big-id"><i className="fa-solid fa-spoon"></i></span> </h4>
                                <h4>We tailor your menu</h4>
                                <p>Every menu is tailored specifically for you and your guests.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fas fa-bacon"></i></span>  </h4>
                                <h4>We buy the ingredients</h4>
                                <p>All shopping is taken care by our Chefs prior their arrival.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-kitchen-set"></i></span> </h4>
                                <h4>We cook in your kitchen</h4>
                                <p>All the magic is prepared before your eyes in your own house.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-2 col-md-12"> </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-cutlery"></i></span>  </h4>
                                <h4>We serve each dish</h4>
                                <p>All dishes are served by our Chefs so you can relax and enjoy.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-brush"></i></span></h4>
                                <h4> We clean up</h4>
                                <p>Don't worry about cleaning. Just sit and enjoy your experience.</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12"> </div>
                    </div>

                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0 testimonial-part p-0">
                <div className="container">
                    <h2>Top rated chefs</h2>
                    <p className="dis-max-width mb-4">Explore a selection of our top-rated chefs who have consistently dazzled clients with their culinary expertise. These culinary all-stars are masters of their craft, each bringing a unique blend of creativity and skill to the table. Whether you're craving the rich flavors of Italian cuisine, the delicate art of sushi, or a fusion of global tastes, our top-rated chefs are ready to turn your dining dreams into reality.</p>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            {allchef.map((data: any) => (
                                <div className="col-lg-2 col-md-6">
                                    <div className="slider-img-plase" id="chef-img">
                                        {data.pic ? (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + data.pic} alt="2" id="chef_id" />
                                        ) : (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="2" id="chef_id" />
                                        )}
                                        <p className="plase-btn"><a href="/frontchefs">{data.name}</a></p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
            <section className="testimonial-part mt-5">
                <div className="container">
                    <h2 className="text-center">What they say about us...</h2>
                    <h4 className="text-center">So proud to create such beautiful memories!</h4>
                    <div className="row mt-5">
                        {testimonials.slice(0, 3).map((testimonial) => (
                            <div className="col-lg-4 col-md-12" key={testimonial.id}>
                                <div className="test-box">
                                    <p>{testimonial.description.slice(0, 200)}.</p>
                                    <div className="row">
                                        <div className="col-3" id="test-img">
                                            {testimonial.image ? (
                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/admin/testimonial/' + testimonial.image} alt="ava4" />
                                            ) : (
                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="ava4" />
                                            )}
                                        </div>
                                        <div className="col-9">
                                            <div className="say">
                                                <h5 className="mt-2">{testimonial.name}</h5>
                                                {/* <p className="font-12"> */}
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
                                                {/* </p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="testimonial-part text-center pt-3">
                <div className="container">
                    <div className="row mt-5">
                        <div className='col-md-3'>
                            <div className='customers'>
                                <p>10,500</p>
                                <span>Happy customers</span>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='customers'>
                                <p>3,800</p>
                                <span>Bookings</span>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='customers'>
                                <p>2,500</p>
                                <span>Chefs</span>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className='customers'>
                                <p>30</p>
                                <span>Countries operating​</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="trusted-part mt-5">
                <div className="container">
                    <h2>Instagram Feed</h2>
                    <div className="row  mt-5">
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/1.jpg'} alt="logo-1" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst ">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/2.jpg'} alt="logo-2" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/3.jpg'} alt="logo-3" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/4.jpg'} alt="logo-4" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/5.jpg'} alt="logo-5" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/6.jpg'} alt="logo-6" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/7.jpg'} alt="logo-7" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/8.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/9.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/10.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/11.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/12.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/13.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/14.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/15.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/16.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/17.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/18.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/19.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/20.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/21.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/22.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/23.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/24.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/25.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/26.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/27.jpg'} alt="logo-8" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6">
                            <div className="logos width-set-inst">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/instragram-feed/28.jpg'} alt="logo-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="trusted-part">
                <div className="container">
                    <h2>Trusted by pioneers around the world</h2>
                    <p>Serving exelence and quality services to clients around the globe. <br /> Our paramount priority? You...</p>

                    <div className="row   mt-5">
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-1.png'} alt="logo-1" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-2.png'} alt="logo-2" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-3.png'} alt="logo-3" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-4.png'} alt="logo-4" />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-5.png'} alt="logo-5" />
                            </div>
                        </div>
                        
                        {/* <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-1.png'} alt="logo-7" />
                            </div>
                        </div> */}
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-8.png'} alt="logo-8" />
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-6.png'} alt="logo-6" style={{objectFit:'cover'}} className="w-100"/>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
            {/* // register popup code start  */}

            <PopupModal show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
                <div className="text-center popup-img">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" />
                </div>
                <div className="all-form">
                    <form onSubmit={handleResetSubmit} id="reset_register_form">

                        <div className='register_div'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="resetpassword" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleResetBlur} autoComplete="new-password" />
                            {errors.password && <span className="small error text-danger mb-2 d-inline-block error_register">{errors.password}</span>}
                        </div>
                        <div className='register_div'>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" id="resetconfirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleResetBlur} autoComplete="new-password" />
                            {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_register" >{errors.confirmPassword}</span>}
                        </div>
                        <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait' : 'Submit'}</button>
                    </form>

                </div>

            </PopupModal>

            {/* // register popup code end  */}
            <ToastContainer />

        </>
    )
}
