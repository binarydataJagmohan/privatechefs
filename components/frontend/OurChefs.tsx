import React, { useState ,useEffect} from 'react'
import Slider from "react-slick";
export default function OurChefs() {
    const settings = {
        rows: 1,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        //slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        autoplay:true,
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
    return(
        <>
            <section className="banner-part p-0">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/banner-4.jpg'} alt="banner-4" className="w-100 border-0 banner-left"/>
                    </div>
                    <div className="col-sm-6">
                    <div className="banner-text pages-text">
                    <h1>Our chefs</h1>
                    <div className="banner-btn mb-5"><a href="/startjourney">Start your journey</a></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                    </div>
                    </div>
                </div>    
                </div>
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Top rated chefs</h2> 
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/2.jpg'} alt="2"/>
                                    <p className="plase-btn"><a href="/frontchefs">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/3.jpg'} alt="3"/>
                                    <p className="plase-btn"><a href="/frontchefs">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/2.jpg'} alt="2"/>
                                    <p className="plase-btn"><a href="/frontchefs">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/3.jpg'} alt="3"/>
                                    <p className="plase-btn"><a href="/frontchefs">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/2.jpg'} alt="2"/>
                                    <p className="plase-btn"><a href="/frontchefs">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/3.jpg'} alt="3"/>
                                    <p className="plase-btn"><a href="/frontchefs">Greece</a></p>
                                </div> 
                            </div>
                        </Slider>
                    </div>  
                </div> 
            </section>

            <section className="services-part location-how  mobile-m-0 mobile-p-0">
                <div className="container">
                    <h2>Chefs based on location</h2> 
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                    </div>
                <div className="container-fluid ">  
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Location 1</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Location 2</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Location 3</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab2" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact2" aria-selected="false">Location 4</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab3" data-bs-toggle="pill" data-bs-target="#pills-contact3" type="button" role="tab" aria-controls="pills-contact3" aria-selected="false">Location 5</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab4" data-bs-toggle="pill" data-bs-target="#pills-contact4" type="button" role="tab" aria-controls="pills-contact4" aria-selected="false">Location 6</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab5" data-bs-toggle="pill" data-bs-target="#pills-contact5" type="button" role="tab" aria-controls="pills-contact5" aria-selected="false">Location 7</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab6" data-bs-toggle="pill" data-bs-target="#pills-contact6" type="button" role="tab" aria-controls="pills-contact6" aria-selected="false">Location 8</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-contact-tab7" data-bs-toggle="pill" data-bs-target="#pills-contact7" type="button" role="tab" aria-controls="pills-contact7" aria-selected="false">Location 9</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel"  aria-labelledby="pills-home-tab">
                            <div className="row mt-4">
                                <Slider {...settings}>
                                    <div className="col-lg-2 col-md-6">
                                        <div className="slider-img-plase">
                                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/28.jpg'} alt="22"/>
                                            <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                                        </div> 
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <div className="slider-img-plase">
                                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/23.jpg'} alt="23"/>
                                            <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                                        </div> 
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <div className="slider-img-plase">
                                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/24.jpg'} alt="24"/>
                                            <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                                        </div> 
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <div className="slider-img-plase">
                                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/25.jpg'} alt="25"/>
                                            <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                                        </div> 
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <div className="slider-img-plase">
                                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/26.jpg'} alt="26"/>
                                            <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                                        </div> 
                                    </div>
                                    <div className="col-lg-2 col-md-6">
                                        <div className="slider-img-plase">
                                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/27.jpg'} alt="3"/>
                                            <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                                        </div> 
                                    </div>
                                </Slider>
                            </div>
                            <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            2
                        </div>
                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            3
                        </div>
                        <div className="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact-tab2">
                            4
                        </div>
                        <div className="tab-pane fade" id="pills-contact3" role="tabpanel" aria-labelledby="pills-contact-tab3">
                            5
                        </div>
                        <div className="tab-pane fade" id="pills-contact4" role="tabpanel" aria-labelledby="pills-contact-tab4">
                            6
                        </div>
                        <div className="tab-pane fade" id="pills-contact5" role="tabpanel" aria-labelledby="pills-contact-tab5">
                            7
                        </div>
                        <div className="tab-pane fade" id="pills-contact6" role="tabpanel" aria-labelledby="pills-contact-tab6">
                            8
                        </div>
                        <div className="tab-pane fade" id="pills-contact7" role="tabpanel" aria-labelledby="pills-contact-tab7">
                            9
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="services-part location-how  mobile-m-0">
                <div className="container">
                    <h2>Our Fleet</h2> 
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                </div>
                <div className="container-fluid mt-5">
                <div className="row">
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/28.jpg'} alt="22"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/23.jpg'} alt="23"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/24.jpg'} alt="24"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/25.jpg'} alt="25"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/26.jpg'} alt="26"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/27.jpg'} alt="3"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                    </div> 
                    
                    <div className="row mt-3">
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/28.jpg'} alt="22"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/23.jpg'} alt="23"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/24.jpg'} alt="24"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/25.jpg'} alt="25"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/26.jpg'} alt="26"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/27.jpg'} alt="3"/>
                                <p className="plase-btn"><a href="/frontchefs">Name</a></p>
                            </div> 
                        </div>
                    </div>
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div> 
            </section> */}

            

           
 

        </>
    )
}