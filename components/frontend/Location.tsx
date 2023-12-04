import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getTestimonials } from '../../lib/adminapi';
import Head from 'next/head';
import { getAllLocation } from "../../lib/frontendapi"

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
            console.log(props)
            setSlug(props.pages.data);
            // setLocations(props.locations.data);
            fetchLocationDetails();
        }

    }, []);

    useEffect(() => { 
        fetchTestimonialDetails();
    }, []);



    const fetchLocationDetails = async () => {
        try {
            const res = await getAllLocation();
            if (res.status) {
                setLocations(res.data);
                console.log(res.data);
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
                            <div className="pages-text pt-4 mt-5">
                                <h1>{locations && locations.length > 0 ? locations[0].address : ''}</h1>
                                <div className="banner-btn mb-4"><a href="/bookings/step1">Start your journey</a></div>
                                
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p> */}

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Athens' && (<>
                                
                                    Culinary Odyssey in Athens <br></br><br></br>

                                    In the heart of Athens, where ancient history meets vibrant modernity, embark on a gastronomic journey. Our chefs, artisans of taste, weave the essence of this ancient city into every dish. Picture a private feast infused with the warmth of Greek hospitality, where each bite tells a story of culinary finesse. <br></br><br></br>

                                    Indulge in the extraordinary, where the ancient spirit of Athens meets the modern magic of Private Chefs World.

                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Mykonos' && (<>
                                
                                A Gastronomic Sojourn<br></br><br></br>

                                In the enchanting island of Mykonos, where the Aegean breeze whispers tales of the past, our chefs invite you to a culinary escapade. Amidst the azure waters and pristine beaches, savor dishes that mirror the island's charm. Each menu crafted with precision, harmonizing local flavors and international flair.<br></br><br></br>

                                Embark on a gastronomic journey that mirrors Mykonos's allure – a blend of sun-kissed landscapes and exquisite cuisine. Experience the magic with Private Chefs World, where culinary excellence meets the charm of the Cyclades.

                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Oslo' && (<>
                                
                                A Nordic Feast for the Sensesn<br></br><br></br>

                                In the heart of Norway's capital, Oslo beckons with its blend of modern elegance and Viking heritage. Embark on a culinary voyage with Private Chefs World, where the northern lights of Nordic cuisine illuminate your plate.<br></br><br></br>

                                Our chefs, inspired by Oslo's pristine fjords and lush landscapes, curate menus that mirror the city's dynamic spirit. From reindeer delicacies to avant-garde Nordic creations, indulge in a feast with Private Chefs World that transcends borders. 

                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Oslo' && (<>
                                
                                A Nordic Feast for the Sensesn<br></br><br></br>

                                In the heart of Norway's capital, Oslo beckons with its blend of modern elegance and Viking heritage. Embark on a culinary voyage with Private Chefs World, where the northern lights of Nordic cuisine illuminate your plate.<br></br><br></br>

                                Our chefs, inspired by Oslo's pristine fjords and lush landscapes, curate menus that mirror the city's dynamic spirit. From reindeer delicacies to avant-garde Nordic creations, indulge in a feast with Private Chefs World that transcends borders. 

                                </>)}</div>


                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Crete' && (<>
                                
                                A Gastronomic Odyssey in the Cradle of Civilization<br></br><br></br>

                                Step into the enchanting embrace of Crete, where history and culinary artistry intertwine. This Greek island, birthplace of ancient myths and legends, invites you to a feast that transcends time with Private Chefs World.
                                <br></br><br></br>

                                Our chefs, inspired by Crete's sun-kissed landscapes and rich traditions, craft menus that pay homage to the island's agricultural bounty. From olive oil-infused delicacies to time-honored recipes, savor the authentic flavors of Crete in the comfort of your own retreat. Let our private chefs be your guides on a gastronomic odyssey through the cradle of civilization.


                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Corfu' && (<>
                                
                                Where Culinary Delights Meet Seaside Bliss<br></br><br></br>

                                Welcome to Corfu, a haven where azure waters meet verdant landscapes, and our private chefs transform your retreat into a culinary haven. Nestled in the Ionian Sea, this island whispers tales of Venetian architecture and olive groves, setting the stage for a gastronomic adventure.
                                <br></br><br></br>

                                Let the flavors of Corfu dance on your palate as our chefs blend the island's bounty into personalized menus. From seaside feasts to intimate gatherings, experience the essence of Corfu's culinary legacy with Private Chefs World. Elevate your stay with bespoke dishes that capture the spirit of this enchanting Greek gem.


                                </>)}</div>


                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Lefkada' && (<>
                                
                                A Culinary Tapestry Unraveled<br></br><br></br>

                                Step into the embrace of Lefkada, an island where azure seas kiss golden shores, and our private chefs orchestrate a symphony of flavors just for you. Set in the Ionian archipelago, Lefkada unveils a canvas of lush landscapes, charming villages, and sun-drenched vineyards.

                                <br></br><br></br>

                                In this culinary haven, our chefs craft bespoke menus that showcase the essence of Lefkada's gastronomic heritage. Whether you're seeking an intimate dinner or a beachfront feast, let Private Chefs World elevate your experience. 


                                </>)}</div>


                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Porto Heli' && (<>
                                
                                    A Seaside Culinary Escape<br></br><br></br>

                                    Indulge in the charm of Porto Heli, a coastal gem that beckons with azure waters and enchanting landscapes. This idyllic destination on the Peloponnese peninsula invites you to savor a unique blend of traditional Greek flavors and modern culinary artistry.


                                <br></br><br></br>

                                In Porto Heli, our private chefs craft exquisite dining experiences inspired by the bounty of the sea and the richness of local produce. From sun-kissed seafood to delectable Mediterranean dishes, every bite is a journey into the heart of Greek gastronomy. Our Chef at  Private Chefs World don’t create just a meal but a symphony of flavors in a picturesque seaside setting.



                                </>)}</div>


                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Paros' && (<>
                                
                                    Culinary Harmony Amidst Aegean Beauty<br></br><br></br>

                                    Welcome to Paros, a Cycladic gem where sun-kissed beaches meet whitewashed villages, creating a backdrop of unparalleled beauty. Immerse yourself in the allure of Paros, not only for its stunning landscapes but also for the gastronomic wonders that await.

                                <br></br><br></br>

                                At Private Chefs World, our culinary artists in Paros transform the island's fresh produce and local delicacies into unforgettable dining experiences. Indulge in the harmony of Aegean flavors, where every dish is a celebration of tradition and innovation. From savory seafood delights to vibrant Mediterranean creations, Paros becomes a canvas where our chefs paint with the colors and aromas of the island.


                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Antiparos' && (<>
                                
                                    Culinary Serenity Amidst Aegean Tranquility<br></br><br></br>

                                    Step into the serene embrace of Antiparos, a tranquil oasis in the heart of the Aegean Sea. This hidden gem is a haven of peaceful beaches, charming villages, and a culinary scene that captivates the senses.

                                <br></br><br></br>

                                At with Private Chefs World, our expert chefs in Antiparos invite you to embark on a gastronomic journey where innovation meets tradition. Delight in the flavors of the Aegean with each meticulously crafted dish, showcasing the richness of local produce and the essence of Mediterranean cuisine. From intimate gatherings to grand celebrations, let the culinary serenity of Antiparos elevate your dining experience.



                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Diaporos' && (<>
                                
                                    Culinary Delights Amidst Azure Beauty<br></br><br></br>

                                    Nestled in the embrace of azure waters, Diaporos beckons with its breathtaking beauty and culinary treasures. This island paradise, a jewel in the Aegean, offers an exquisite blend of natural wonders and gastronomic excellence.

                                <br></br><br></br>

                                With Private Chefs World, Diaporos becomes a canvas for culinary artistry. Our skilled chefs invite you to savor the richness of the island's bounty, creating dishes that mirror the vibrant hues of the surroundings. From sunlit shores to moonlit feasts, every moment in Diaporos is an opportunity to indulge in a symphony of flavors, crafted with passion and expertise. Explore the culinary delights that await, and let Diaporos be the backdrop for your unforgettable dining experience.


                                </>)}</div>

                                <div className=''>{locations && locations.length > 0 && locations[0].address == 'Crete' && (<>
                                
                                A Gastronomic Odyssey in the Cradle of Civilization<br></br><br></br>

                                Step into the enchanting embrace of Crete, where history and culinary artistry intertwine. This Greek island, birthplace of ancient myths and legends, invites you to a feast that transcends time with Private Chefs World.
                                <br></br><br></br>

                                Our chefs, inspired by Crete's sun-kissed landscapes and rich traditions, craft menus that pay homage to the island's agricultural bounty. From olive oil-infused delicacies to time-honored recipes, savor the authentic flavors of Crete in the comfort of your own retreat. Let our private chefs be your guides on a gastronomic odyssey through the cradle of civilization.


                                </>)}</div>


                                

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
                            <div className="num-list h-100" id="num-list-id">
                                <h4><span className="big-48" id="big-id"><i className="fa-solid fa-spoon"></i></span> </h4>
                                <h4>We tailor your menu</h4>
                                <p>Every menu is tailored specifically for you and your guests.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list h-100" id="num-list-id">
                                <h4><span className="big-48"><i className="fas fa-bacon"></i></span>  </h4>
                                <h4>We buy the ingredients</h4>
                                <p>All shopping is taken care by our Chefs prior their arrival.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list h-100" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-kitchen-set"></i></span> </h4>
                                <h4>We cook in your kitchen</h4>
                                <p>All the magic is prepared before your eyes in your own house.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3 mt-lg-4 mt-1">
                        <div className="col-lg-2 col-md-12 d-none d-lg-block"> </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list h-100" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-cutlery"></i></span>  </h4>
                                <h4>We serve each dish</h4>
                                <p>All dishes are served by our Chefs so you can relax and enjoy.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="num-list h-100" id="num-list-id">
                                <h4><span className="big-48"><i className="fa-solid fa-brush"></i></span></h4>
                                <h4> We clean up</h4>
                                <p>Don't worry about cleaning. Just sit and enjoy your experience.</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 d-none d-lg-block"> </div>
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
                                                <a href="#">Chef {location.name &&  location.name.split(" ")[0]}</a>
                                            ) : (
                                                <span></span>
                                            )}
                                        </p>

                                    </div>
                                </div>
                            )}
                        </Slider>
                    </div>
                    {/* <div className="text-center view-more mt-4"><a href="#">View More</a></div> */}
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


            <section className="experience-slider mt-5">
                <div className="container">
                    <h2 className='text-center'> Things to explore</h2>
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

        </>
    )
}