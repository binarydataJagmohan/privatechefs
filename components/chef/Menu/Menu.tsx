import React, { useState, useEffect } from "react";
import { getToken, getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {
  getSingleChefMenu,
  saveChefMenuItems,
  deleteChefMenuItem,
  getAllCrusine,
  updateChefMenu,
  deleteMenu,
  updateChefPersonPrice,
  getDishes,
  updateChefDishCount
} from "../../../lib/chefapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import PopupModal from '../../commoncomponents/PopupModal';
import Image from 'next/image'
export default function Menus2(props) {
  let id = props.MenuId;

  const [menu, setMenu] = useState([]);
  const [dishesdata, setDishes] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonState] = useState(false);
  const [name, setName] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [cuisinedata, setCuisineData] = useState({});
  const [menuname, setMenuName] = useState("");
  const [description, setDescription] = useState('');
  const [cuisineid, setCuisineDataId] = useState('');
  const [image, setImage] = useState('');
  const [previewimage,setPreviewimage] = useState('');
  const [Uploadimage, setUploadImage] = useState('');

  const [minperson, setMinPerson] = useState('');
  const [maxperson, setMaxPerson] = useState('');
  const [minprice, setMinPice] = useState('');
  const [maxprice,setMaxPice] = useState('');
  const [comments, setcomments] = useState('');

  const [chefalldishes, setChefAllDish] = useState('');

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResultsVisible, setSearchResultsVisible] = useState(true);
  
  const [dishtype, setDishType] = useState('');

  const [dishid, setDishId] = useState('');

  const [starter_items, setStartItems] = useState('');
  const [firstcourse_items, setFirstCourseItems] = useState('');
  const [maincourse_items, setMainCourseItems] = useState('');
  const [desert_items, setDesertItems] = useState('');
  

  useEffect(() => {
    getUserData();
  }, []);
  

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

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
      getAllCrusineData();
      fetchdishes(userData.id);
    }
  };

  const fetchdishes = async (user_id) => {
    
    try {
      const res = await getDishes(user_id);
      if (res.status) {
    
        setChefAllDish(res.data);

        //console.log(res.data);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUploadImage(event.target.files);
      setPreviewimage(reader.result);
      $('.image_actual').toggleClass('d-block d-none');
      $('.image_preview').toggleClass('d-none d-block');
      
    };

    reader.readAsDataURL(file);
  };

  const getAllCrusineData = async () => {
    getAllCrusine()
    .then(res => {
      if(res.status==true){
        setCuisineData(res.data);
      } else {
        //   toast.error(res.message, {
        //   position: toast.POSITION.TOP_RIGHT
        // });
      }
    })
    .catch(err => {
        console.log(err);
    });
  }

  const getSingleChefMenuData = async (id) => {
    getSingleChefMenu(id)
      .then((res) => {
        if (res.status == true) {
          setMenu(res.menudata);
          setMenuName(res.menudata.menu_name);
          setDescription(res.menudata.description);
          setCuisineDataId(res.menudata.cuisine_id);
          setImage(res.menudata.image);
          setMinPerson(res.menudata.min_person);
          setMaxPerson(res.menudata.max_person);
          setMinPice(res.menudata.min_price);
          setMaxPice(res.menudata.max_price);
          setcomments(res.menudata.comments);
          setDishes(res.dishes);
          setStartItems(res.menudata.starter_items);
          setFirstCourseItems(res.menudata.firstcourse_items);
          setMainCourseItems(res.menudata.maincourse_items);
          setDesertItems(res.menudata.desert_items);
          

          const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
          const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
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

  //dishes hanle submit start

  const handlMenuItemsSubmit = (event) => {
    event.preventDefault();

      const data = {
        menu_id: id,
        dish_id : dishid,
        user_id: currentUserData.id,
        type: dishtype,
      };
      saveChefMenuItems(data)
        .then((res) => {
          if (res.status == true) {
            setDishes(res.dishes);
            setSearchInputValue('');
            setDishType('');
            setSearchResultsVisible(false);
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            
            setName('');
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
  };

  const deleteMenuitem = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the menu item",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        deleteChefMenuItem(id)
          .then((res) => {
            if (res.status == true) {

              getSingleChefMenuData(props.MenuId);
              swal("Your menu item has been deleted!", {
                icon: "success",
              });
             
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((err) => {});
      } else {
      }
    });
  };

  //menu submit start

  const handlMenuSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!menuname) {
      errors.menuname = "Name is required";
    }

    if (!cuisineid) {
      errors.cuisine = "Cuisine is required";
    }
    
    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {

      setButtonState(true);
       // Call an API or perform some other action to register the user
       const data = {
         menu_id: id,
         name: menuname,
         description: description,
         cuisineid : cuisineid,
         user_id : currentUserData.id

       };
       updateChefMenu(data,Uploadimage[0])
      .then(res => {
        if(res.status==true){
            setModalConfirm(false);
            setButtonState(false);
            setMenuName(res.menudata.menu_name);
            setDescription(res.menudata.description);
            setCuisineDataId(res.menudata.cuisine_id);
            setImage(res.menudata.image);
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

  const handleMenuBlur = (event) => {
    const { menuname, value } = event.target;
    const newErrors = { ...errors };

    switch (menuname) {
      
      case "name":
        if (!value) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;
      case "cuisineid":
          if (!value) {
            newErrors.cuisine = "Cuisine is required";
          } else {
            delete newErrors.cuisine;
          }
          break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  //menu submit close

//delete menu start

  const deleteSingleMenu = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the menu",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        deleteMenu(id)
          .then((res) => {
            if (res.status == true) {
              swal("Your Menu has been deleted!", {
                icon: "success",
              });
              setTimeout(() => {
                  window.location.href = '/chef/menus';
              }, 1000);
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((err) => {});
      } else {
      }
    });
  };
//delete menu start


  //PersonPriceSubmit submit start

  const handlPersonPriceSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!minprice) {
      errors.minprice = "Min Price is required";
    }

    if (!maxprice) {
      errors.maxprice = "Max Price is required";
    }

    if (!minperson) {
      errors.minperson = "Min Person is required";
    }

    if (!maxperson) {
      errors.maxperson = "Max Person is required";
    }
    
    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
       // Call an API or perform some other action to register the user
       const data = {
         menu_id: id,
         min_person: minperson,
         max_person: maxperson,
         min_price : minprice,
         max_price : maxprice,
         comments	 : comments

       };
       updateChefPersonPrice(data)
      .then(res => {
        if(res.status==true){
            setButtonState(false);
            setMinPerson(res.menudata.min_person);
            setMaxPerson(res.menudata.max_person);
            setMinPice(res.menudata.min_price);
            setMaxPice(res.menudata.max_price);
            setcomments(res.menudata.comments);
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

  const handlPersonPriceBlur = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {
      
      
      case "minprice":
        if (!value) {
          newErrors.minprice = "Min Price is required";
        } else {
          delete newErrors.minprice;
        }
        break;
      case "maxprice":
          if (!value) {
            newErrors.maxprice = "Max Price is required";
          } else {
            delete newErrors.maxprice;
          }
          break;

      case "minperson":
        if (!value) {
          newErrors.minperson = "Min Person is required";
        } else {
          delete newErrors.minperson;
        }
        break;

      case "maxperson":
      if (!value) {
        newErrors.maxperson = "Max Person is required";
      } else {
        delete newErrors.maxperson;
      }
      break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  //menus submit close

  function renderSearchResults() {
    
    const query = searchInputValue.toLowerCase();   
    
    const type = dishtype; 

    const matchingData = Object.entries(chefalldishes)
      .filter(([slug, dish]) => {
        return (
          dish.type === type && // filter by type
          dish.item_name.toLowerCase().includes(query) // filter by query
        );
      })
      .reduce((acc, [id, dish]) => {
        acc[dish.id] = dish.item_name;
        return acc;
      }, {});
    return (
      <div id="search-results" style={{height: Object.keys(matchingData).length > 0 ? '' : 'auto',display: searchResultsVisible ? 'block' : 'none'}}>
        <ul>
        {Object.keys(matchingData).length > 0 ? (
              Object.entries(matchingData).map(([id, name]) => (
                <li key={name} onClick={() => addItem(id,name)} role="button">
                  {name}
                </li>
              ))
            ) : (
              <li>
                  No record found
                </li>
            )}
        </ul>
      </div>
    );
  }

  function handleSearchInputChange(event) {
    
    setSearchInputValue(event.target.value.trim());
    setDishType(event.target.name);
    setSearchResultsVisible(true);
    
  }

  function addItem(id, name) {
    setSearchInputValue(name)
    setSearchResultsVisible(false)
    setDishId(id)
  }

  function handleDishCount(e) {

      if(e.target.name == 'starter_items'){
          setStartItems(e.target.value);
      }

      if(e.target.name == 'firstcourse_items'){
        setFirstCourseItems(e.target.value);
      }

      if(e.target.name == 'maincourse_items'){
        setMainCourseItems(e.target.value);
      }
      if(e.target.name == 'desert_items'){
        setDesertItems(e.target.value);
      }

      const data = {
        menu_id: props.MenuId,
        dishcount: e.target.value,
        name: e.target.name,

      };
      updateChefDishCount(data)
    .then(res => {
      if(res.status==true){

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


  

  return (
    <>
      <div className="table-part">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <h2>
             
              {menuname ? menuname : menu.menu_name }
              <a href="#" className="t-icon">
                <i className="fa-solid fa-pencil" onClick={() => setModalConfirm(true)} ></i>
              </a>
              <a href="#" className="t-icon"  onClick={(e) =>deleteSingleMenu(id)}>
                <i className="fa-solid fa-trash"></i>
              </a>
            </h2>

            <ul
              className="nav nav-pills mb-3 justify-content-start p-r mt-4"
              id="pills-tab"
              role="tablist"
            >
              {/* <li className="nav-item" role="presentation">
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
              </li> */}
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
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
                            onClick={() => {
                              setSearchInputValue('');
                              setDishType('');
                              setSearchResultsVisible(false);
                            }}
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
                            <div className="all-form" id="all_menu_dishes_form">
                              
                              <form
                                onSubmit={handlMenuItemsSubmit}
                                className="common_form_error dishes_form"
                              >
                                <div className="login_div d-flex">
                                  <input
                                    type="text"
                                    name="starter"
                                    value={searchInputValue} onChange={handleSearchInputChange} 
                                    placeholder="Search starter..."
                                   
                                    className="mx-2 dishes_name_input"
                                    required
                                  />
                                  

                                  <select className="w-25 mx-2 dishes_name_input" onChange={handleDishCount} name="starter_items" value={starter_items} style={{height:'46px'}}>
                                      <option value="0">Choose Dishes</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
  
                                  </select>
                                  

                                  <button
                                    type="submit"
                                    className="btn-send w-50"
                                  >
                                    Add Starter Course
                                  </button>
                                  
                                </div>
                              </form>
                              <div className="" id="compare_countries_result">
                                  {searchInputValue && renderSearchResults()}
                              </div>
                            </div>

                            

                            {dishesdata &&
                              dishesdata.length > 0 &&
                              dishesdata
                                .filter((dishes) => dishes.type == "starter")
                                .map((dishes, index) => (
                                  <div
                                    className="row mt-2"
                                    key={index}
                                    id={`dishes_${dishes.menu_item_id}`}
                                  >
                                    <div className="col-1 bg-fff">
                                      <h3 className="num-">{index + 1}</h3>
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
                                          {dishes.item_name}
                                        </button>
                                        {/* Add your dropdown menu code here */}
                                      </div>
                                    </div>
                                    <div className="col-1 bg-f1f1f1 text-center trash">
                                      <i
                                        onClick={(e) =>
                                          deleteMenuitem(dishes.menu_item_id)
                                        }
                                        className="fa-solid fa-trash"
                                      ></i>
                                    </div>
                                  </div>
                                ))}
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
                            onClick={() => {
                              setSearchInputValue('');
                              setDishType('');
                              setSearchResultsVisible(false);
                            }}
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
                            <div className="all-form" id="all_menu_dishes_form">
                              <form
                                onSubmit={handlMenuItemsSubmit}
                                className="common_form_error dishes_form"
                              >
                                <div className="login_div d-flex">
                                  <input
                                    type="text"
                                    name="firstcourse"
                                    value={searchInputValue} onChange={handleSearchInputChange} 
                                    className="mx-2 dishes_name_input"
                                    required
                                  />
                                  {errors.name && (
                                    <span className="small error text-danger mb-2 d-inline-block error_login">
                                      {errors.name}
                                    </span>
                                  )}

                                    <select className="w-25 mx-2 dishes_name_input"  onChange={handleDishCount} name="firstcourse_items" value={firstcourse_items} style={{height:'46px'}}>
                                      <option value="0">Choose Dishes</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
  
                                  </select>

                                  <button
                                    type="submit"
                                    className="btn-send w-50"
                                  >
                                    Add First Course
                                  </button>
                                </div>
                              </form>
                              <div className="" id="compare_countries_result">
                                  {searchInputValue && renderSearchResults()}
                              </div>
                            </div>

                            {dishesdata &&
                              dishesdata.length > 0 &&
                              dishesdata
                                .filter(
                                  (dishes) => dishes.type == "firstcourse"
                                )
                                .map((dishes, index) => (
                                  <div
                                    className="row mt-2"
                                    key={index}
                                    id={`dishes_${dishes.menu_item_id}`}
                                  >
                                    <div className="col-1 bg-fff">
                                      <h3 className="num-">{index + 1}</h3>
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
                                          {dishes.item_name}
                                        </button>
                                        {/* Add your dropdown menu code here */}
                                      </div>
                                    </div>
                                    <div className="col-1 bg-f1f1f1 text-center trash">
                                      <i
                                        onClick={(e) =>
                                          deleteMenuitem(dishes.menu_item_id)
                                        }
                                        className="fa-solid fa-trash"
                                      ></i>
                                    </div>
                                  </div>
                                ))}
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
                            onClick={() => {
                              setSearchInputValue('');
                              setDishType('');
                              setSearchResultsVisible(false);
                            }}
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
                            <div className="all-form" id="all_menu_dishes_form">
                              <form
                                onSubmit={handlMenuItemsSubmit}
                                className="common_form_error dishes_form"
                              >
                                <div className="login_div d-flex">
                                  <input
                                    type="text"
                                    name="maincourse"
                                    value={searchInputValue} onChange={handleSearchInputChange} 

                                    className="mx-2 dishes_name_input"
                                    required
                                  />
                                 
                                   <select className="w-25 mx-2 dishes_name_input"  onChange={handleDishCount} name="maincourse_items" value={maincourse_items} style={{height:'46px'}}>
                                      <option value="0">Choose Dishes</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
  
                                  </select>

                                  <button
                                    type="submit"
                                    className="btn-send w-50"
                                  >
                                    Add Main Course
                                  </button>
                                </div>
                              </form>
                              <div className="" id="compare_countries_result">
                                  {searchInputValue && renderSearchResults()}
                              </div>
                            </div>

                            {dishesdata &&
                              dishesdata.length > 0 &&
                              dishesdata
                                .filter(
                                  (dishes) => dishes.type == "maincourse"
                                )
                                .map((dishes, index) => (
                                  <div
                                    className="row mt-2"
                                    key={index}
                                    id={`dishes_${dishes.menu_item_id}`}
                                  >
                                    <div className="col-1 bg-fff">
                                      <h3 className="num-">{index + 1}</h3>
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
                                          {dishes.item_name}
                                        </button>
                                        {/* Add your dropdown menu code here */}
                                      </div>
                                    </div>
                                    <div className="col-1 bg-f1f1f1 text-center trash">
                                      <i
                                        onClick={(e) =>
                                          deleteMenuitem(dishes.menu_item_id)
                                        }
                                        className="fa-solid fa-trash"
                                      ></i>
                                    </div>
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                            onClick={() => {
                              setSearchInputValue('');
                              setDishType('');
                              setSearchResultsVisible(false);
                            }}
                          >
                            Desert
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="all-form" id="all_menu_dishes_form">
                              <form
                                onSubmit={handlMenuItemsSubmit}
                                className="common_form_error dishes_form"
                              >
                                <div className="login_div d-flex">
                                  <input
                                    type="text"
                                    name="desert"
                                    value={searchInputValue} onChange={handleSearchInputChange} 

                                    className="mx-2 dishes_name_input"
                                    required
                                  />
                                 
                                    <select className="w-25 mx-2"  onChange={handleDishCount} name="desert_items" value={desert_items} style={{height:'48px'}}>
                                      <option value="0">Choose Dishes</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
  
                                  </select>

                                  <button
                                    type="submit"
                                    className="btn-send w-50"
                                   
                                  >
                                    Add Desert
                                  </button>
                                </div>
                              </form>
                              <div className="" id="compare_countries_result">
                                  {searchInputValue && renderSearchResults()}
                              </div>
                            </div>

                            {dishesdata &&
                              dishesdata.length > 0 &&
                              dishesdata
                                .filter((dishes) => dishes.type == "desert")
                                .map((dishes, index) => (
                                  <div
                                    className="row mt-2"
                                    key={index}
                                    id={`dishes_${dishes.menu_item_id}`}
                                  >
                                    <div className="col-1 bg-fff">
                                      <h3 className="num-">{index + 1}</h3>
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
                                          {dishes.item_name}
                                        </button>
                                        {/* Add your dropdown menu code here */}
                                      </div>
                                    </div>
                                    <div className="col-1 bg-f1f1f1 text-center trash">
                                      <i
                                        onClick={(e) =>
                                          deleteMenuitem(dishes.menu_item_id)
                                        }
                                        className="fa-solid fa-trash"
                                      ></i>
                                    </div>
                                  </div>
                                ))}
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
                <form onSubmit={handlPersonPriceSubmit}  className="common_form_error" id="menu_form">
                  <div className="row mt-4 all-form">
                    <div className="col-lg-3 col-md-6">
                      <label>Minimum Person</label>
                      <input type="number" name='minperson' value={minperson || ''} onChange={(e) => setMinPerson(e.target.value)} onBlur={handlPersonPriceBlur} placeholder='1'/>
                      {errors.minperson && <span className="small error text-danger mb-2 d-inline-block ">{errors.minperson}</span>}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label>Maximum Person</label>
                      <input type="number" name='maxperson' value={maxperson || ''} onChange={(e) => setMaxPerson(e.target.value)} onBlur={handlPersonPriceBlur} placeholder='10'/>
                      {errors.maxperson && <span className="small error text-danger mb-2 d-inline-block ">{errors.maxperson}</span>}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label>Price for 6</label>
                          <input type="number" name='minprice' value={minprice || ''} onChange={(e) => setMinPice(e.target.value)} onBlur={handlPersonPriceBlur} placeholder='50'/>
                          {errors.minprice && <span className="small error text-danger mb-2 d-inline-block ">{errors.minprice}</span>}
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <label>Price for 7 to 20</label>
                      <input type="number" name='maxprice' value={maxprice || ''} onChange={(e) => setMaxPice(e.target.value)} onBlur={handlPersonPriceBlur} placeholder='100'/>
                          {errors.maxprice && <span className="small error text-danger mb-2 d-inline-block ">{errors.maxprice}</span>}
                    </div>
                    <div className="col-lg-12 col-md-6 mt-2">
                      <label>Add Comments</label>
                      <textarea name="comments" value={comments || ''} onChange={(e) => setcomments(e.target.value)} onBlur={handlPersonPriceBlur} ></textarea>
                    </div>
                    <div className="col-lg-12 text-end col-md-6 mt-2">
                    <button type="submit" className="btn-send w-20" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
                      
                    </div>
                  </div>
                </form>
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


      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
              {/* <div className="text-center popup-img">
                  <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
              </div> */}
              <div className="all-form" > 
              <form onSubmit={handlMenuSubmit}  className="common_form_error" id="menu_form">
                  
                  <div className='login_div'>
                      <label htmlFor="name">Name:</label>
                      <input type="text" name='name' value={menuname} onChange={(e) => setMenuName(e.target.value)} onBlur={handleMenuBlur} autoComplete="username"/>
                      {errors.menuname && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.menuname}</span>}
                  </div>
                  <div className='login_div'>
                      <label htmlFor="Description">Description:</label>
                      <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={handleMenuBlur} ></textarea>
                      
                  </div>
                  
                  <div className='login_div'>
                      <label htmlFor="Cuisine">Cuisine:</label>
                      <select aria-label="Default select example" value={cuisineid} onChange={(e) => setCuisineDataId(e.target.value)}>
                          <option value=''>Select Cuisine</option>
                          {cuisinedata.length > 0 ? cuisinedata.map((cuisine, index) => (
                              <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                          )) : ''}
                      </select>

                      {errors.cuisine && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.cuisine}</span>}
                  </div>

                  <div className='login_div'>
                      <label htmlFor="Image">Image:</label>
                        <input type="file" name="imge" onChange={handleImageChange} accept="jpg,png"/>
                  </div>

                  <div className="image_actual mb-4 d-block">
                    {image && (
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL+'/images/chef/menu/'+image} alt="" width={100} height={100} alt={menu.name} />           
                    )}
                  </div>

                
                  <div className="image_preview mb-4 d-none">
                    {previewimage && (
                        <img src={previewimage} alt="Preview" width={100} height={100} />
                    )}
                  </div>

                  <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Update'}</button>
              </form>
                              
        </div>

        </PopupModal>

      <ToastContainer />
    </>
  );
}
