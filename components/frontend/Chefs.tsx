import React, { useState ,useEffect} from 'react'
export default function Chefs() {
    return(
        <>
            <section className="banner-part p-0">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                    <img src="images/banner-5.jpg" alt="banner-5" className="w-100 border-0 banner-left"/>
                    </div>
                    <div className="col-sm-6">
                    <div className="banner-text pages-text  margin-sp">
                    <img src="images/chef.png" alt="chef" />
                    <h1>Athens, Greece</h1>
                        <p className="star-review">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <span>201 reviews</span>
                        </p> 
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                    <div className="banner-btn mb-5"><a href="#">Start your journey</a></div>
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
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/2.jpg" alt="2"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/3.jpg" alt="3"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src="images/2.jpg" alt="2"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src="images/3.jpg" alt="3"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src="images/2.jpg" alt="2"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                            <img src="images/3.jpg" alt="3"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                    </div> 
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div> 
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Our customers said</h2> 
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris. </p>
                    <div className="row mt-5">
                      <div className="col-lg-4 col-md-6">
                         <div className="step-box text-center customers-review ">
                         <img src="images/1.png" alt="1" />
                          <h4>Cody Fisher</h4>
                              <p className="star-review">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                </p> 
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="step-box text-center customers-review ">
                         <img src="images/2.png" alt="2" />
                          <h4>Bessie Cooper</h4>
                              <p className="star-review">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                </p> 
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="step-box text-center customers-review ">
                         <img src="images/3.png" alt="3" />
                          <h4>Eleanor Pena</h4>
                              <p className="star-review">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                </p> 
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                      </div>                   
                </div>
            </section>

       
            <section className="experience-slider mt-5">
                <div className="container">
                    <h3> Things to explore</h3>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/slider-1.webp" alt="slider-1"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/slider-2.webp" alt="slider-2"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/slider-3.webp" alt="slider-3"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/slider-4.webp" alt="slider-4"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/slider-2.webp" alt="slider-2"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/slider-4.webp" alt="slider-4"/>
                                <p className="plase-btn"><a href="#">Greece</a></p>
                            </div> 
                        </div>
                    </div> 
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div> 
            </section>

            

           
 

        </>
    )
}