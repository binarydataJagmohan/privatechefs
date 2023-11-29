import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import { getAllTopRatedChef, getAllTopRatedChefOnFrontend } from "../../lib/frontendapi"
import Head from 'next/head';

export default function OurChefs(props: any) {

    interface PageSlug {
        name: string;
        slug: string;
        meta_desc: string;
        meta_tag: string;
    }

    interface Location {
        chefs: any;
        id: number;
        pic: string;
        address: string;
        location_pic: string;
        name: string;
    }



    const [allchef, setAllChef] = useState([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [pageslug, setSlug] = useState<PageSlug | null>(null);
    const [selectedLocation, setSelectedLocation] = useState('Greece');


    useEffect(() => {
        if (props) {
            setSlug(props.pages.data);
        }
    }, []);

    useEffect(() => {
        fetchBookingAdminDetails();
        fetchLocationDetails();
    }, [selectedLocation]);

    const fetchBookingAdminDetails = async () => {
        const res = await getAllTopRatedChef();
        if (res.status) {
            setAllChef(res.data);
        }
    };

    const fetchLocationDetails = async () => {
        try {
            const res = await getAllTopRatedChefOnFrontend();
            if (res.status) {
                setLocations(res.data);
            } else {
                console.log('error');
            }
        } catch (err: any) {
            console.log('error');
        }
    };

    const settings = {
        rows: 1,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
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
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-7.jpg'} alt="banner-4" className="w-100 border-0 banner-left" />
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text">
                                <h1>Our Culinary Artists</h1>
                                <div className="banner-btn mb-5"><a href="/bookings/step1">Start your journey</a></div>
                                <p>Prepare to be introduced to a world of culinary excellence as we proudly present our top-rated Chefs from across the globe. At Private Chefs Worldwide, our team of talented culinary artists have not only perfected their craft but also elevated it to new heights..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Top rated chefs</h2>
                    <p className="dis-max-width mb-4">These exceptional Chefs have been curated for their culinary expertise, creativity, and dedication to delighting your taste buds. Each one brings their unique flair to the table, delivering extraordinary dining experiences that resonate with the flavors of the world.</p>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            {allchef.map((data) => (
                                <div className="col-lg-2 col-md-6">
                                    <div className="slider-img-plase" id="chef-img">
                                        {data.pic ? (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + data.pic} alt="2" id="chef_id" />
                                        ) : (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="2" id="chef_id" />
                                        )}
                                         <p className="plase-btn"><a href="/frontchefs">Chef {data.name && data.name.split(' ')[0]}</a></p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section className="services-part location-how  mobile-m-0 mobile-p-0">
                <div className="container">
                    <h2>Chefs by location</h2>
                    <p className="dis-max-width mb-4">These exceptional Chefs have been curated for their culinary expertise, creativity, and dedication to delighting your taste buds. Each one brings their unique flair to the table, delivering extraordinary dining experiences that resonate with the flavors of the world.</p>
                </div>
                <div className="container-fluid ">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        {locations.map(location => (
                            <li className="nav-item" key={location.id} role="presentation">
                                <button
                                    className={`nav-link ${location.address === selectedLocation ? 'active' : ''}`}
                                    id={`pills-contact-tab${location.id}`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#pills-contact${location.id}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`pills-contact${location.id}`}
                                    aria-selected={location.id === 1}
                                    onClick={() => {
                                        setSelectedLocation(location.address);
                                    }}
                                >
                                    {location.address}
                                </button>

                            </li>
                        ))}
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className="row mt-4">
                                <Slider {...settings}>
                                    {locations
                                        .filter(data => data.address === selectedLocation)
                                        .map((location, index) => (
                                            location.chefs.length > 0 ? (
                                                location.chefs.map(chef => (
                                                    <div className="col-lg-2 col-md-6" key={chef.chef_id}>
                                                        <div className="slider-img-plase" id="chef-img">
                                                            {chef.pic ? (
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + chef.pic} alt={chef.name} id="chef_id" />
                                                            ) : (
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt={chef.name} id="chef_id" />
                                                            )}
                                                            <p className="plase-btn"><a href="/frontchefs">{chef.name}</a></p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div key="notFoundMessage">No chefs found in this location.</div>
                                            )
                                        ))}
                                </Slider>

                            </div>
                            {/* <div className="text-center view-more mt-4"><a href="#">View More</a></div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}