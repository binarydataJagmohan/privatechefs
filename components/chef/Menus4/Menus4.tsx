import React, { useState ,useEffect} from 'react'
export default function Menus4() {
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
                  <li><a href="/chef/menus2"><button className="table-btn btn-2">Type of food </button></a></li>
                  <li><a href="/chef/menus3"><button className="table-btn btn-2 ">Dishes </button></a></li>
                  <li><button className="table-btn ">Persons & Prices </button></li>
                  <li className="right-li"><button className="table-btn  ">Save menu </button></li> 
              </ul>
            <div className="row mt-4 all-form">
              <div className="col-lg-3 col-md-6">
               <label>Minimum </label>
                <select>
                  <option>6</option>
                  <option>6</option>
                  <option>6</option>
                  <option>6</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6">
               <label>Maximum </label>
                <select>
                  <option>6</option>
                  <option>6</option>
                  <option>6</option>
                  <option>6</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-6">
               <label>Price for 6</label>
               <input type="text" placeholder="50"  className="placeholder-color"/>
              </div>
              <div className="col-lg-3 col-md-6">
               <label>Price for 7 to 20</label>
               <input type="text" placeholder="100" className="placeholder-color" />
              </div>
            </div> 
            <div className="blank-box"></div>
          </div>
          <div className="col-lg-4 col-md-12">
          <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/food.png'} alt="food" className="boder-img w-100 mt-5 pt-4  " />
          </div>
        </div>  
			</div>
        </>
    )
}