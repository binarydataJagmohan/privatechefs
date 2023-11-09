import React, { useState, useEffect } from 'react'
import Head from 'next/head';

export default function WhoWeAre(props: any) {

    interface PageSlug {
        name: string;
        slug: string;
        meta_desc: string;
        meta_tag: string;
    }

    const [pageslug, setSlug] = useState<PageSlug | null>(null);

    useEffect(() => {
        if (props) {
            setSlug(props.pages.data);
        }

    }, []);

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
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/AlexSamoilis.jpg'} alt="banner-4" className="w-100 border-0 banner-left" />
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text">
                                <h1><span className="sab-title-banner">What is</span> <br />Private Chefs?</h1>
                                <div className="banner-btn mb-5"><a href="/bookings/step1">Start your journey</a></div>
                                <p>Private Chefs Worldwide, is more than just a culinary service. We are a global culinary movement, operating in 30 countries and powered by a passionate team of over 2500 talented chefs. </p>
                                <p>We're the curators of extraordinary dining experiences, bringing the world's flavors to your Villa, Estate, or Yacht. Whether you're seeking fine dining perfection or a deep dive into culinary culture, we're here to tantalize your taste buds and deliver an unparalleled experience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>About us</h2>
                    <p className="dis-max-width mb-4">At Private Chefs Worldwide, we are dedicated to elevating your dining experience. Our team is driven by a shared passion for exceptional cuisine and culinary innovation.</p>
                    <p className="dis-max-width mb-4">We believe that every meal is an opportunity to explore new flavors and create unforgettable memories. Our commitment to excellence ensures that each dish we serve is a masterpiece in its own right.</p>
                    <p className="dis-max-width mb-4">With a focus on fine dining and a deep respect for culinary traditions, we bring the world's flavors to your table, all within the comfort of your Villa, Estate, or Yacht.</p>
                    <p className="dis-max-width mb-4">Welcome to a culinary journey where your taste is our top priority, and your dining experience is truly exceptional.</p>
                </div>
            </section>

            <section className="events-part mobile-p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-same-formatting top-pad text-right mobile-left tab-m-0 left-areya">
                                {/* <h2>Mission</h2> */}
                                <h2>Alex Samoilis -<br/>  The Man Behind the Scenes</h2>
                                <p className="mt-3 mb-3 max-80 tab-m-0 f-r ">Meet Alex Samoilis, the culinary visionary behind Private Chefs Worldwide. With a Michelin star and the prestigious title of Ambassador of Taste for Global Gastronomy, his culinary journey is nothing short of exceptional.</p>
                                <p className="mt-3 mb-3 max-80 tab-m-0 f-r ">A blend of Greek and Mexican heritage has enhanced his palate from a young age, and his passion for celebrating diverse flavors has taken him around the world. His experiences range from renowned establishments like The Fat Duck UK to Gordon Ramsay's three Michelin-starred restaurant in London.</p>
                                <p className="mt-3 mb-3 max-80 tab-m-0 f-r ">As the owner of Private Chefs Worldwide, Alex has delighted the palates of dignitaries and celebrities from all corners of the globe, including the likes of the Prince of Qatar, Princes of Morocco, Bruce Willis, Tom Hanks, Dr. Oz, Grant and Elena Cardone, Will Smith, and Giannis Antetokounmpo, as well as government high-ranked officials from various countries.</p>
                                <p className="mt-3 mb-3 max-80 tab-m-0 f-r ">His vision is to make every meal a cultural exploration, a celebration of flavor. Welcome to the culinary world of Alex Samoilis, where excellence knows no bounds.</p>
                            </div>
                       
                        </div>
                        <div className="col-sm-6">
                            <div className="side-img">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/side-2.jpg'} alt="side-2" />
                            </div>
                        </div>
                        <div className="text-same-formatting mt-5 mobile-left ">
                                <div className="max-80 f-r text-cen">
                                    <h2 className="mt-5 tab-m-0 text-center">Our vision</h2>
                                    <p className=" mb-3 tab-m-0 ">At Private Chefs Worldwide, we believe in the magic of culinary artistry, where every dish is a love story waiting to be told. Our vision is inspired by the passion and dedication of Alex Samoilis, a culinary visionary with a heart filled with flavors from around the world.</p>
                                    <p className=" mb-3 tab-m-0 ">Our dream is to create a culinary world where every meal is a cherished memory, a taste of enchantment, and an exploration of love for food. We envision a global dining experience where the boundaries of culture dissolve, and flavors from diverse corners of the world dance on your palate.</p>
                                    <p className=" mb-3 tab-m-0 ">Our goal is to craft a journey that nourishes not just your body but also your soul. We aim to spark connections, ignite passion, and inspire culinary exploration. The flavors on your plate will tell stories of ancient cultures, vibrant celebrations, and the joy of savoring life's delights.</p>
                                    <p className=" mb-3 tab-m-0 ">As we move forward, we continue to embrace the essence of culinary love and adventure. We see Private Chefs Worldwide as a platform for lovers of food, where the romance of flavors and the art of dining take center stage. We envision a world where every meal is an ode to love, culture, and shared experiences.</p>
                                    <p className=" mb-3 tab-m-0 ">Join us on this culinary story and savor the taste of our vision. With each meal we create, we hope to ignite the same love and passion for food that has been the driving force behind Alex Samoilis's culinary journey.</p>
                                </div>
                            </div>
                    </div>

                    
                </div>
            </section>

        </>
    )
}