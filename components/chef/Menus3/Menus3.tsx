import React, { useState ,useEffect} from 'react'
export default function Menus3() {
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
                  <li><button className="table-btn btn-2">Type of food </button></li>
                  <li><button className="table-btn  ">Dishes </button></li>
                  <li><button className="table-btn btn-2">Persons & Prices </button></li>
                  <li className="right-li"><button className="table-btn opacity">Save menu </button></li> 
              </ul>
              
              <div className="up-down-part mt-5">
              <div className="accordion-part mt-5">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Starter
                                </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                First Course
                                </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply
                                </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Main Course
                                </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <div className="dessert">
                                    Dessert <i className="fa-solid fa-chevron-up"></i>
                                  </div>
                                  <div className="jus-right d-flex mt-3 mobile-flx">
                                   <div className="dropdown">
                                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                      Choose 2 dishes <i className="fa-solid fa-chevron-down right-s"></i>
                                      </button>
                                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                      </ul>
                                    </div>
                                    <div className="text-right"><button className="btn-send">Add Dessert</button></div> 
                                  </div>
                                  <div className="row mt-4">
                                    <div className="col-1 bg-fff"><h3 className="num-">1</h3></div>
                                    <div className="col-10 bg-f1f1f1 jus-right ">
                                        <div className="dropdown">
                                          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                          Choose 2 dishes <i className="fa-solid fa-chevron-down right-s"></i>
                                          </button>
                                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                          </ul>
                                        </div>
                                    </div>
                                    <div className="col-1 bg-f1f1f1 text-center trash"><i className="fa-solid fa-trash"></i></div>
                                  </div>
                                  <div className="row mt-4">
                                    <div className="col-1 bg-fff"><h3 className="num-">2</h3></div>
                                    <div className="col-10 bg-f1f1f1 jus-right ">
                                        <div className="dropdown">
                                          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                          Choose 2 dishes <i className="fa-solid fa-chevron-down right-s"></i>
                                          </button>
                                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                          </ul>
                                        </div>
                                    </div>
                                    <div className="col-1 bg-f1f1f1 text-center trash"><i className="fa-solid fa-trash"></i></div>
                                  </div>
                                </div>
                                </div>
                            </div>   
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