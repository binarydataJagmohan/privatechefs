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
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-4.jpg'} alt="banner-4" className="w-100 border-0 banner-left" />
                        </div>
                        <div className="col-sm-6">
                            <div className="banner-text pages-text">
                                <h1><span className="sab-title-banner">What is</span> <br />Private Chefs?</h1>
                                <div className="banner-btn mb-5"><a href="/bookings/step1">Start your journey</a></div>
                                <p>Private Chefs is a unique experience that offers you from fine dining quality experience, to the very roots of the culinary culture of each region, in the comfort of your Villa, Estate or Yacht. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Who we are</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                </div>
            </section>

            <section className="events-part mobile-p-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-same-formatting top-pad text-right mt-5 mobile-left tab-m-0 left-areya">
                                <h2>Mission</h2>
                                <p className="mt-3 mb-3 max-80 tab-m-0 f-r ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                            </div>
                            <div className="text-same-formatting  max-80 mt-5 mobile-left ">
                                <div className="text-left max-80  f-r">
                                    <h2 className="mt-5 tab-m-0 ">Visions</h2>
                                    <p className=" mb-3 tab-m-0 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="side-img">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/side-2.jpg'} alt="side-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}