import React, { useState, useEffect } from 'react'
import Head from 'next/head';

export default function OurServices(props: any) {

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
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-3.jpg'} alt="banner-3" className="w-100 border-0 banner-left" />
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text">
                                <h1>Athens, Greece</h1>
                                <div className="banner-btn mb-5"><a href="/bookings/step1">Start your journey</a></div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part location-how mt-5 tab-m-0">
                <div className="container">
                    <div className="row mt-5 tab-m-0 g-3">
                        <div className="col-lg-2 col-md-12 "></div>
                        <div className="col-lg-4 col-md-12 text-right tab-center">
                            <h2 className="mt-4">Private Dinner</h2>
                            <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris. </p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">1</span></h4>
                                <h4>Preparing the menu</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">2</span></h4>
                                <h4>Food preparation</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4 tab-m-0 g-3">
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">3</span></h4>
                                <h4>Step 1</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">4</span></h4>
                                <h4>Step 2</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">5</span></h4>
                                <h4>Step 3</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="step-box">
                                <h4><span className="big-48">6</span></h4>
                                <h4>Step 4</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <section className="events-part mobile-p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="side-img">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/side-1.jpg'} alt="side-1" className="side-1" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="text-same-formatting top-pad">
                                <h2>Business Events</h2>
                                <p className="mt-3 mb-3 max-80 tab-m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                                <h5 className="goldan-text-20"><span>1</span>Marriage</h5>
                                <h5 className="goldan-text-20"><span>2</span>Baptism</h5>
                                <h5 className="goldan-text-20"><span>3</span>Birthday</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-same-formatting top-pad text-right mt-5 mobile-left">
                                <h2>Catering</h2>
                                <p className="mt-3 mb-3 max-80 tab-m-0 f-r">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="side-img">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/side-2.jpg'} alt="side-2" className="side-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}