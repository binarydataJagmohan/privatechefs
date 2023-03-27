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
               <h4 className="title-20">Any allergies?</h4> 
              </div>
            </div>
            <div className="row mb-5">
            <div className="col-lg-1 col-md-12"></div>
             <div className="col-lg-11 col-md-12">
                <div className="row"> 
                    <div className="col-sm-3"> 
                      <div className="slider-img-plase">
                      <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/special-requests/1.jpg'} alt="1" /> 
                        <p className="plase-btn"><a href="#">Nuts</a></p>
                      </div>
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/special-requests/2.jpg'} alt="2" />
                        <p className="plase-btn"><a href="#">Lactose</a></p>
                      </div> 
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/special-requests/3.jpg'} alt="3" />
                        <p className="plase-btn"><a href="#">Gluten</a></p>
                      </div> 
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/special-requests/4.jpg'} alt="4" />
                        <p className="plase-btn"><a href="#">Seafood</a></p>
                      </div> 
                    </div>   
                </div> 
             </div>  
            </div> 
            <div className="row mb-2">
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-11 col-md-12"> 
               <div className="row">
                <div className="col-lg-6 col-md-12">
                    <h4 className="title-20">Any special requests?</h4> 
                    <textarea className="textarea-part mt-3" placeholder="This is a sample text"></textarea>
                </div>
                <div className="col-lg-6 col-md-12">
                    <h4 className="title-20">Any special requests?</h4> 
                    <textarea className="textarea-part mt-3" placeholder="This is a sample text"></textarea>
                </div>
               </div>
              </div>
            </div>
            </div>
            <div className="container-fluid mt-5">
            <div className="d-flx-step">
            <div className="view-more  mt-4"><a href="#">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="#">Next</a></div>    
            </div> 
            <div className="rotate-box"> <h4 className="rotate-text">enter any special requests</h4></div>
           </div>  
       </section>
        
        </>
    )
}