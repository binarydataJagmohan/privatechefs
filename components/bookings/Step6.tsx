import React, { useState ,useEffect} from 'react'
export default function Step6() {
    return (
        <>
       <section className="journey-part">
         <div className="container size-real">
            <div className="row">
             <div className="col-sm-1"></div>
                <div className="col-sm-10">
                <h1>Booking details</h1>
                <h1 className="awaits mb-0">a great experience awaits</h1> 
                </div>
            </div>

            <div className="row mb-2">
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-11 col-md-12">
               <h4 className="title-20">Number of people</h4> 
              </div>
            </div>
            <div className="row mb-5"> 
             <div className="col-lg-12 col-md-12">
                <div className="row"> 
                    <div className="col-sm-3"> 
                      <div className="slider-img-plase">
                       
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking-details/1.jpg'} alt="1" /> 
                        <p className="plase-btn"><a href="#">0 &nbsp;&nbsp; <i className="fa-solid fa-chevron-down"></i></a></p>
                        <select className="select-op">
                          <option value="val1">0</option>
                          <option value="val2">Val 1</option>
                          <option value="val3">Val 2</option>
                          <option value="val3">Val 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">
                      
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking-details/2.jpg'} alt="2" />
                     <select className="select-op">
                          <option value="val1">0</option>
                          <option value="val2">Val 1</option>
                          <option value="val3">Val 2</option>
                          <option value="val3">Val 3</option>
                        </select>
                      </div> 
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">                      
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/booking-details/3.jpg'} alt="3" />
                     <select className="select-op">
                          <option value="val1">0</option>
                          <option value="val2">Val 1</option>
                          <option value="val3">Val 2</option>
                          <option value="val3">Val 3</option>
                        </select>
                      </div> 
                    </div>   
                </div> 
             </div>  
            </div> 
            <div className="row mb-2"> 
              <div className="col-lg-12 col-md-12"> 
               <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="all-form input-big">
                    <h4 className="title-18">Your location</h4>
                    <input type="text"/>  
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="all-form input-big">
                    <h4 className="title-18">Name</h4>
                    <input type="text"/>  
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="all-form input-big">
                    <h4 className="title-18">Surname</h4>
                    <input type="text"/>  
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="all-form input-big">
                    <h4 className="title-18">Email</h4>
                    <input type="text"/>  
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="all-form input-big">
                    <h4 className="title-18">Phone Number</h4>
                    <input type="text"/>  
                  </div>
                </div> 
               </div>
              </div>
            </div>
            </div>
            <div className="container-fluid ">
            <div className="d-flx-step">
            <div className="view-more  mt-4"><a href="#">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="#">Next</a></div>    
            </div>  
           </div>  
       </section>
        
        </>
    )
}