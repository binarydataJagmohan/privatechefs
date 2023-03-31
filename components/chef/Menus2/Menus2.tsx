import React, { useState ,useEffect} from 'react'
export default function Menus2() {
    return (
        <>
			<div className="table-part">
        <div className="row">
          <div className="col-lg-8 col-md-12">
             <h2>Menu Name 
               <a href="#" className="t-icon"><i className="fa-solid fa-pencil"></i></a>
				       <a href="#" className="t-icon"><i className="fa-solid fa-trash"></i></a>
             </h2>
				      <ul className="table_header_button_section p-r mt-4">
                  <li><button className="table-btn ">Type of food </button></li>
                  <li><a href="/chef/menus3"><button className="table-btn btn-2">Dishes </button></a></li>
                  <li><a href="/chef/menus4"><button className="table-btn btn-2">Persons & Prices </button></a></li>
                  <li className="right-li"><button className="table-btn opacity">Save menu </button></li> 
              </ul>
              <div className="row mt-5"> 
                    <div className="col-sm-4"> 
                      <div className="slider-img-plase opacity">
                      <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/1.jpg'} alt="1" /> 
                        <p className="plase-btn"><a href="#">Family</a></p>
                      </div>
                    </div>
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase ">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/2.jpg'} alt="2" />
                        <p className="plase-btn"><a href="#">Standard</a></p>
                      </div> 
                    </div>
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase opacity">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/3.jpg'} alt="3" />
                        <p className="plase-btn"><a href="#">Premium</a></p>
                      </div> 
                    </div>  
                    
                </div>
                <div className="row mt-3">  
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase opacity">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/2.jpg'} alt="2" />
                        <p className="plase-btn"><a href="#">Standard  </a></p>
                      </div> 
                    </div>
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase opacity">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/3.jpg'} alt="3" />
                        <p className="plase-btn"><a href="#">Premium  </a></p>
                      </div> 
                    </div>
                    <div className="col-sm-4"> 
                     <div className="slider-img-plase opacity">
                     <div className="icon-check"> <i className="fa-solid fa-check"></i></div>
                     <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/4.jpg'} alt="4" />
                        <p className="plase-btn"><a href="#">Premium  </a></p>
                      </div> 
                    </div>  
                    
                </div>

          </div>
          <div className="col-lg-4 col-md-12">
          <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food.png'} alt="food" className="boder-img w-100 mt-5 pt-4 " />
          </div>
        </div> 
			</div>
        </>
    )
}