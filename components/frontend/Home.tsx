import React, { useState ,useEffect} from 'react'
export default function Home() {
    return(
        <>
            <section className="banner-part">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                    <img src="images/banner.webp" alt="banner"/>
                    </div>
                    <div className="col-sm-4">
                    <div className="banner-text home-page-banner-text">
                    <h1>Creating memories with food</h1>
                    <div className="banner-btn"><a href="#">Start your journey</a></div>
                    </div>
                    </div>
                </div>    
                </div>
            </section>
       
            <section className="experience-slider mt-5">
                <div className="container">
                    <h3> Get inspired for your next experience</h3>
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

             <section className="services-part mt-4">
                <div className="container">
                    <h2> Our services</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>

                    <div className="row mt-5">
                    <div className="col-lg-3 col-md-6">
                        <div className="card-box">
                        <img src="images/11.webp" alt="11" />
                        <h3>Chefs</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card-box">
                        <img src="images/12.webp" alt="11" />
                        <h3>Butlers</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card-box">
                        <img src="images/13.webp" alt="11" />
                        <h3>Bartenders</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="card-box">
                        <img src="images/14.webp" alt="11" />
                        <h3>Massage</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </section>


            <section className="text-side">
            <div className="container">
                <div className="row">
                <div className="col-lg-6 col-md-12">
                    <img src="images/7.webp" alt="7" className="border-radius" />
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="contant-box mt-5">
                    <h2>Design your next experience</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec feugiat odio elit varius et feugiat in mattis. Convallis pellentesque suspendisse adipiscing lectus ultrices tristique eget. Dignissim elit in habitasse urna. Euismod commodo eget quis arcu neque. Suspendisse scelerisque vitae fringilla felis, a in. Nec facilisis rhoncus sit interdum amet massa eu erat in. Cursus sapien nulla tellus eu tellus quis ante a id. Nisi, sodales velit in malesuada porttitor in aliquet elit tellus. Arcu penatibus ornare id tortor, leo nulla aenean. Fusce.</p>
                    <div className="banner-btn"><a href="#">Start your journey</a></div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <section className="services-part mt-5">
                <div className="container">
                    <h2>How it works?  </h2>
                    <p className="dis-max-width mb-4">We know chefs. We know the materials. W deliver results.</p>
                    <p className="dis-max-width mb-4">The aim of our service is to make the booking process from choosing a menu to the arrival of your private chef (at the place & time you want them) as quick & easy as possible for you.</p>
                    <div className="row mt-5">
                    <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">1</span> You choose the menu</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">2</span> We buy the ingredients </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">3</span> We cook in your kitchen</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                    <div className="col-lg-2 col-md-12"> </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">4</span> We serve each dish </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">5</span> We clean up</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-2 col-md-12"> </div>
                    </div>
                    
                </div>
            </section>

            <section className="experience-slider "> 
                <div className="container-fluid ">
                 <h2> Our photo album</h2>
                    <div className="row mt-5">
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
 

        </>
    )
}