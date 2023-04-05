import React, { useState ,useEffect} from 'react'
export default function Step3() {
    return (
        <>
       <section className="journey-part">
         <div className="container size-real">
            <div className="row">
             <div className="col-sm-1"></div>
                <div className="col-sm-10">
                <h1>Type of meal</h1>
                <h1 className="awaits mb-0">a great experience awaits</h1>
                <div className="text-areya-srep dummy-up text-center"> 
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac egestas et enim porttitor urna amet, amet. Turpis aenean dolor risus vel mattis enim, scelerisque egestas fermentum. Quis senectus dictum vitae pretium commodo. Nunc congue sed sed penatibus. Accumsan, sit sit id enim sed sed ullamcorper. Ultrices scelerisque ac fermentum enim.</p>  
                   </div>
                </div>
            </div> 
            <div className="row mb-5">
            <div className="col-lg-1 col-md-12"></div>
             <div className="col-lg-7 col-md-12">
                <div className="row"> 
                    <div className="col-sm-4"> 
                      <div className="slider-img-plase">
                      <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-3.jpg'} alt="step-img-3" /> 
                        <p className="plase-btn"><a href="#">Breakfast</a></p>
                      </div>
                    </div>
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-4.jpg'} alt="step-img-4" />
                        <p className="plase-btn"><a href="#">Lunch</a></p>
                      </div> 
                    </div>
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/step-img-5.jpg'} alt="step-img-5" />
                        <p className="plase-btn"><a href="#">Dinner</a></p>
                      </div> 
                    </div>
                    
                </div>
             </div> 
             <div className="col-lg-4 col-md-12">
                <div className="text-areya-srep">
                    <p className="golden-mini-title">Lunch</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque ante a turpis facilisis mi, diam. Elit quis congue nunc, risus sem morbi imperdiet ut. Justo, arcu ultricies tristique auctor ipsum, ut elementum augue </p>  
                    <div className="view-more  mt-4"><a href="#">Clear All</a></div>
                   </div>
                </div>
            </div> 
            </div>
            <div className="container-fluid mt-5">
            <div className="d-flx-step">
            <div className="view-more  mt-4"><a href="/bookings/step2">Back</a></div>
            <div className="view-more bg-golden mt-4"><a href="/bookings/step4">Next</a></div>    
            </div> 
            <div className="rotate-box"> <h4 className="rotate-text">select type of meal</h4></div>
           </div>  
       </section>
        
        </>
    )
}