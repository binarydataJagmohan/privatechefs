import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getTestimonials } from '../../lib/adminapi';
import Head from 'next/head';

export default function ChefLocation(props: any) {

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
        id:number;
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
                                                // <a href="#">
                                                <a href={process.env.NEXT_PUBLIC_BASE_URL + 'frontchefs/' + location.id}>
                                                    {location.name}</a>
                                            ) : (
                                                <span></span>
                                            )}
                                        </p>

                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}