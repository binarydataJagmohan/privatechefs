import React, { useState ,useEffect} from 'react'
export default function Menus() {
    return (
        <>
          <div className="table-part">
            <h2>Menus</h2>
            <ul className="table_header_button_section p-r">
              <li><button className="table-btn btn-2">Thai <i className="fa-solid fa-xmark"></i></button></li>
              <li><button className="table-btn btn-2">Greek <i className="fa-solid fa-xmark"></i></button></li>
              <li><button className="table-btn btn-2">Desserts  <i className="fa-solid fa-xmark"></i></button></li>
              <li className="right-li"><button className="table-btn border-radius round-white">Filter </button></li> 
            </ul> 
            <div className="row mt-4"> 
              <div className="col-sm-3"> 
                <div className="menu-name">
                  <p>Menu Name</p>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/2.jpg'} alt="2" />
                  <p className="plase-btn"><a href="/chef/menus2">Standard Style</a></p>
                </div> 
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/3.jpg'} alt="3" />
                  <p className="plase-btn"><a href="/chef/menus2">Premium Style</a></p>
                </div> 
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/4.jpg'} alt="4" />
                  <p className="plase-btn"><a href="/chef/menus2">Premium Style</a></p>
                </div> 
              </div>        
            </div>
            <div className="row mt-3"> 
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/1.jpg'} alt="1" /> 
                  <p className="plase-btn"><a href="/chef/menus2">Family Style</a></p>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/2.jpg'} alt="2" />
                  <p className="plase-btn"><a href="/chef/menus2">Standard Style</a></p>
                </div> 
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/3.jpg'} alt="3" />
                  <p className="plase-btn"><a href="/chef/menus2">Premium Style</a></p>
                </div> 
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/4.jpg'} alt="4" />
                  <p className="plase-btn"><a href="/chef/menus2">Premium Style</a></p>
                </div> 
              </div>  
            </div>
            <div className="row mt-3"> 
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/1.jpg'} alt="1" /> 
                  <p className="plase-btn"><a href="/chef/menus2">Family Style</a></p>
                </div>
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/2.jpg'} alt="2" />
                  <p className="plase-btn"><a href="/chef/menus2">Standard Style</a></p>
                </div> 
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/3.jpg'} alt="3" />
                  <p className="plase-btn"><a href="/chef/menus2">Premium Style</a></p>
                </div> 
              </div>
              <div className="col-sm-3"> 
                <div className="slider-img-plase">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/cuishine/4.jpg'} alt="4" />
                  <p className="plase-btn"><a href="/chef/menus2">Premium Style</a></p>
                </div> 
              </div>    
            </div>
          </div>
        </>
    )
}