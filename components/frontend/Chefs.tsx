import React, { useState ,useEffect} from 'react'
export default function  Chefs() {
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
                    <img src="images/chef.png" alt="chef" className="chef-img" />
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

            <section className="services-part mt-5">
                <div className="container">
                    <p className="font-sb-title-up"> Get to know me better </p>
                    <h2><i>“Perfection and extraordinery taste is my goal <br/> in every dish”</i></h2> 
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p> 
                </div>
            </section>

            <section className="services-part location-how  mt-5 tab-m-0 tab-p-0">
                <div className="container"> 
                    <h2>My services</h2> 
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                    <div className="row mt-5">
                    <div className="col-lg-3 col-md-6">
                         <div className="step-box">
                          <h4><span className="big-48">1</span></h4>
                          <h4>Personal Chef</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                         <div className="step-box">
                           <h4><span className="big-48">2</span></h4>
                           <h4>Full Time Chef</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                         <div className="step-box">
                           <h4><span className="big-48">3</span></h4>
                           <h4>Cooking Classes</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                         <div className="step-box">
                         <h4><span className="big-48">4</span></h4>
                          <h4>Cooking Show</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                         </div>
                        </div>
                    </div> 
                </div>
            </section>

            <section className="messages-part">
                <div className="container ">
                 <div className="messages-text mt-5 tab-m-top">
                    <p className="small-title">I love cooking because...</p>
                    <p className="italic-title">“Love, passion, my life, my everything”</p>
                 </div>
                 <div className="messages-text mt-5">
                    <p className="small-title">I learned to cook at..</p>
                    <p className="italic-title">“3* The Fat Duck,  2*Spondi Athens, 1* The Hinds Head, 1* he Pollen Street, Veneze Atens, Milos Athens”</p>
                 </div>
                 <div className="messages-text mt-5">
                    <p className="small-title">A role model in the kitchen is</p>
                    <p className="italic-title">“Fetan Adria, Juan Roca, Grand Archaz and many more”</p>
                 </div>
                 <div className="messages-text mt-5">
                    <p className="small-title">A cooking secret..</p>
                    <p className="italic-title">“Precision and passion for cooking”</p>
                 </div>
                </div>
            </section>

            <section className="experience-slider mobile-p-0"> 
                <div className="container ">
                 <h2 className="font-black">Xenofon’s photo album</h2>
                    <div className="row mt-5 mobile-m-0">
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/f-1.webp" alt="f-1"/> 
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/f-2.webp" alt="f-2"/> 
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/f-3.webp" alt="f-3"/> 
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/f-4.webp" alt="f-4"/> 
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/f-5.webp" alt="f-5"/> 
                            </div> 
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <div className="slider-img-plase">
                                <img src="images/f-1.webp" alt="f-1"/> 
                            </div> 
                        </div>
                    </div>  
                </div> 
            </section>

            <section className="services-part location-how mt-5 mobile-m-0">
                <div className="container">
                    <h2>Xenofon’s reviews</h2> 
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
  

            

           
 

        </>
    )
}