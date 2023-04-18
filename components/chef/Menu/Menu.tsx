import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getSingleChefMenu,saveChefDishes } from "../../../lib/chefapi";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export default function Menus2(props) {

  let id = props.MenuId;

  const [menu, setMenu] = useState([]);
  const [dishesdata, setDishes] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = isPageVisibleToRole("chef-single-menu");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      setCurrentUserData(userData);
      getSingleChefMenuData(id);
    }
  };

  const getSingleChefMenuData = async (id) => {
    getSingleChefMenu(id)
      .then((res) => {
        if (res.status == true) {
          setMenu(res.menudata);
          setDishes(res.Dishes);
          const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
          );
          const tooltipList = tooltipTriggerList.map(function (
            tooltipTriggerEl
          ) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
          });
        } else {
          //   toast.error(res.message, {
          //   position: toast.POSITION.TOP_RIGHT
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlDishesSubmit = (event) => {
   
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }
    
    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
       // Call an API or perform some other action to register the user
      
       
       const data = {
        menu_id: id,
        user_id:currentUserData.id,
        item_name:name,
        type:type

       };
       saveChefDishes(data)
      .then(res => {
        if(res.status==true){
      
            setButtonState(false);
            setDishes(res.Dishes);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });
         
        } else {
          setButtonState(false);
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
              });
          
        }
      })
      .catch(err => {
          console.log(err);
      });
    }
    
  };

  const handleDishesBlur = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {
      
      case "name":
        if (!value) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };


  return (
    <>
      <div className="table-part">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <h2>
              {menu.menu_name}
              <a href="#" className="t-icon">
                <i className="fa-solid fa-pencil"></i>
              </a>
              <a href="#" className="t-icon">
                <i className="fa-solid fa-trash"></i>
              </a>
            </h2>

            <ul
              className="nav nav-pills mb-3 justify-content-start p-r mt-4"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Type of food
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Dishes
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  Persons & Prices
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row mt-5">
                  <div className="col-sm-4">
                    <div className="slider-img-plase">
                      <div className="icon-check">
                        {" "}
                        <i className="fa-solid fa-check"></i>
                      </div>
                      {menu.image ? (
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/chef/menu/" +
                            menu.image
                          }
                          alt=""
                          width={305}
                          height={239}
                          alt={menu.name}
                        />
                      ) : (
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/placeholder.jpg"
                          }
                          width={305}
                          height={239}
                          alt={menu.menu_name}
                        />
                      )}
                      {menu && (
                        <p
                          className="plase-btn"
                          data-bs-toggle="tooltip"
                          title={menu.menu_name}
                        >
                          <a href={"/chef/menus/" + menu.id}>
                            {menu.menu_name && menu.menu_name.length > 15
                              ? menu.menu_name.slice(0, 15) + "..."
                              : menu.menu_name}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="up-down-part mt-5">
                  <div className="accordion-part mt-5">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Starter
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            
                            <div className="all-form" id="all_menu_dishes_form" > 
                            <form onSubmit={handlDishesSubmit}  className="common_form_error dishes_form" id="menu_form">
                      
                            <div className='login_div d-flex'>
                              <input type="text" name='name' value={name} onChange={(e) => {
                                setName(e.target.value);
                                setType('starter');
                              }} onBlur={handleDishesBlur} autoComplete="username" className="mx-2 dishes_name_input" />
                              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                              <button type="submit" className="btn-send w-25">Add Starter Course</button>
                            </div> 
                               
                                  </form>
                            </div>
                            
                            <div className="row mt-4">
                              <div className="col-1 bg-fff">
                                <h3 className="num-">1</h3>
                              </div>
                              <div className="col-10 bg-f1f1f1 jus-right ">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Choose 2 dishes{" "}
                                    
                                  </button>
                                 
                                </div>
                              </div>
                              <div className="col-1 bg-f1f1f1 text-center trash">
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            </div>
                          
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            First Course
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            
                            <div className="all-form" id="all_menu_dishes_form" > 
                            <form onSubmit={handlDishesSubmit}  className="common_form_error dishes_form" id="menu_form">
                      
                            <div className='login_div d-flex'>
                              <input type="text" name='name' value={name} onChange={(e) => {
                                setName(e.target.value);
                                setType('first_course');
                              }} onBlur={handleDishesBlur} autoComplete="username" className="mx-2 dishes_name_input" />
                              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                              <button type="submit" className="btn-send w-25">Add First Course</button>
                            </div> 
                               
                                  </form>
                            </div>
                            
                            <div className="row mt-4">
                              <div className="col-1 bg-fff">
                                <h3 className="num-">1</h3>
                              </div>
                              <div className="col-10 bg-f1f1f1 jus-right ">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Choose 2 dishes{" "}
                                    
                                  </button>
                                 
                                </div>
                              </div>
                              <div className="col-1 bg-f1f1f1 text-center trash">
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            </div>
                          
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Main Course
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            
                            <div className="all-form" id="all_menu_dishes_form" > 
                            <form onSubmit={handlDishesSubmit}  className="common_form_error dishes_form" id="menu_form">
                      
                            <div className='login_div d-flex'>
                              <input type="text" name='name' value={name} onChange={(e) => {
                                setName(e.target.value);
                                setType('main_course');
                              }} onBlur={handleDishesBlur} autoComplete="username" className="mx-2 dishes_name_input" />
                              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                              <button type="submit" className="btn-send w-25">Add Main Course</button>
                            </div> 
                               
                                  </form>
                            </div>
                            
                            <div className="row mt-4">
                              <div className="col-1 bg-fff">
                                <h3 className="num-">1</h3>
                              </div>
                              <div className="col-10 bg-f1f1f1 jus-right ">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Choose 2 dishes{" "}
                                    
                                  </button>
                                 
                                </div>
                              </div>
                              <div className="col-1 bg-f1f1f1 text-center trash">
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            </div>
                          
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                          Desert
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            
                            <div className="all-form" id="all_menu_dishes_form" > 
                            <form onSubmit={handlDishesSubmit}  className="common_form_error dishes_form" id="menu_form">
                      
                            <div className='login_div d-flex'>
                              <input type="text" name='name' value={name} onChange={(e) => {
                                setName(e.target.value);
                                setType('desert');
                              }} onBlur={handleDishesBlur} autoComplete="username" className="mx-2 dishes_name_input" />
                              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                              <button type="submit" className="btn-send w-25">Add Desert</button>
                            </div> 
                               
                                  </form>
                            </div>
                            
                            <div className="row mt-4">
                              <div className="col-1 bg-fff">
                                <h3 className="num-">1</h3>
                              </div>
                              <div className="col-10 bg-f1f1f1 jus-right ">
                                <div className="dropdown">
                                  <button
                                    className="btn btn-secondary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Choose 2 dishes{" "}
                                    
                                  </button>
                                 
                                </div>
                              </div>
                              <div className="col-1 bg-f1f1f1 text-center trash">
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            </div>
                          
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
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
                    <input
                      type="text"
                      placeholder="50"
                      className="placeholder-color"
                    />
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label>Price for 7 to 20</label>
                    <input
                      type="text"
                      placeholder="100"
                      className="placeholder-color"
                    />
                  </div>
                </div>
                <div className="blank-box"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <img
              src={process.env.NEXT_PUBLIC_BASE_URL + "images/food.png"}
              alt="food"
              className="boder-img w-100 mt-5 pt-4 "
            />
          </div>
        </div>
      </div>
    </>
  );
}
