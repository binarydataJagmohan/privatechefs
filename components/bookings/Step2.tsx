import React, { useState ,useEffect} from 'react'
export default function Step2() {
    return (
        <>
       <section className="journey-part">
         <div className="container size-real">
            <div className="row">
             <div className="col-sm-1"></div>
                <div className="col-sm-10">
                <h1>One time service</h1>
                <h1 className="awaits mb-0">a great experience awaits</h1>
                <div className="text-areya-srep dummy-up text-center"> 
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac egestas et enim porttitor urna amet, amet. Turpis aenean dolor risus vel mattis enim, scelerisque egestas fermentum. Quis senectus dictum vitae pretium commodo. Nunc congue sed sed penatibus. Accumsan, sit sit id enim sed sed ullamcorper. Ultrices scelerisque ac fermentum enim.</p>  
                   </div>
                </div>
            </div> 
            <div className="row mb-5">
             <div className="col-lg-10 col-md-12">
                <div className="row">
                   <div className="col-sm-1"></div>
                    <div className="col-sm-3"> 
                      <div className="slider-img-plase">
                      <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-1.jpg'} alt="step-img-1" /> 
                        <p className="plase-btn"><a href="#">Family Style</a></p>
                      </div>
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-2.jpg'} alt="step-img-2" />
                        <p className="plase-btn"><a href="#">Standard Style</a></p>
                      </div> 
                    </div>
                    <div className="col-sm-3"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-2.jpg'} alt="step-img-2" />
                        <p className="plase-btn"><a href="#">Premium Style</a></p>
                      </div> 
                    </div>
                    
                </div>
             </div> 
            </div> 
            </div>
            <div className="container-fluid mt-5">
            <div className="d-flx-step">
            <div className="view-more  mt-4"><a href="/bookings/step1">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="/bookings/step3">Next</a></div>    
            </div> 
            <div className="rotate-box"> <h4 className="rotate-text">select services</h4></div>
           </div>  
       </section>
        
        </>
    )
}