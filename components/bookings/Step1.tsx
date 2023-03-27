import React, { useState ,useEffect} from 'react'
export default function Step1() {
    return (
        <>
       <section className="journey-part">
         <div className="container size-real">
            <div className="row">
             <div className="col-sm-1"></div>
                <div className="col-sm-10">
                <h1>Start your journey</h1>
                <h1 className="awaits">a great experience awaits</h1>
                </div>
            </div> 
            <div className="row mb-5">
             <div className="col-lg-6 col-md-12">
                <div className="row">
                   <div className="col-sm-1"></div>
                    <div className="col-sm-5"> 
                      <div className="slider-img-plase">
                       <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-1.jpg'} alt="step-img-1" /> 
                        <p className="plase-btn"><a href="#">One Time Service</a></p>
                      </div>
                    </div>
                    <div className="col-sm-5"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-2.jpg'} alt="step-img-2" />
                        <p className="plase-btn"><a href="#">Multiple Time Services</a></p>
                      </div> 
                    </div>
                    <div className="col-sm-1"></div>
                </div>
             </div>
                <div className="col-lg-6 col-md-12">
                <div className="text-areya-srep">
                    <p className="golden-mini-title">One time service</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac egestas et enim porttitor urna amet, amet. Turpis aenean dolor risus vel mattis enim, scelerisque egestas fermentum. Quis senectus dictum vitae pretium commodo. Nunc congue sed sed penatibus. Accumsan, sit sit id enim sed sed ullamcorper. Ultrices scelerisque ac fermentum enim.</p> 
                    <p className="fild-text">Date</p>
                    <input type="text" placeholder="12/01/22" /> 
                   </div>
                </div>
            </div> 
            </div>
            <div className="container-fluid mt-5">
            <h4 className="rotate-text">selecy service type</h4>
            <div className="d-flx-step">
            <div className="view-more opec-v mt-4"><a href="#">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="#">Next</a></div>    
            </div> 
           </div> 
       </section>
        
        </>
    )
}