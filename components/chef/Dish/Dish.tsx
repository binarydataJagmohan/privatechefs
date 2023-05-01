import React, { useState, useEffect } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import {
  getDishecategory,
  dishAddUpdate,
  getDishes,
  deleteSingleDish,
  fetchDishCategoryById
} from "../../../lib/chefapi";
import { getToken, getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";

export default function Dish() {
  const [errors, setErrors] = useState({});
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
  const [dishCategories, setDishCategories] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [dishName, setDishName] = useState("");
  const [dishCategory, setDishcategory] = useState("");
  const [dishList, setDishLists] = useState([]);

  const [dishmethod, setDishMethod] = useState('');
  const [dishid, setDishId] = useState('');

  const [dishcategoryid, setDishCategoryId] = useState('all');

  const [dishTotalList, setTotalDishLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabetletter, setAlphabetLetter] = useState('');

  const pageSize = 25;

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };
 

  useEffect(() => {
    const data = isPageVisibleToRole("chef-dish");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      // console.log(userData);
      setCurrentUserData(userData);
      fetchdishes(userData.id);
    }
    // Fetch the list of dish categories from the API
    getDishecategory()
      .then((data) => {
        setDishCategories(data.data);
        //console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
     
  }, []);

  const fetchdishes = async (user_id) => {
    
    try {
      const res = await getDishes(user_id);
      if (res.status) {
     
        setTotalDishLists(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setDishLists(paginatedPosts);

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

  const onPageChange = (page) => {
    setCurrentPage(page);
    fetchdishes(currentUserData.id)
    .then(res => {
      if(res.status==true){
        setTotalDishLists(res.data);
        const paginatedPosts = paginate(res.data, page, pageSize);
        setDishLists(paginatedPosts);
      } else {
        setErrorMessage(res.message);
      }
    })
    .catch(err => {
        console.log(err);
    });
  };

  const handlMenuSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!dishName) {
      errors.name = "Dish Name is required";
    }

    if (!dishCategory) {
      errors.dishcategory = "Dish Category is required";
    }

    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        id:dishid,
        item_name: dishName,
        dish_category_id: dishCategory,
        userId: currentUserData.id,
      };


      dishAddUpdate(data)
        .then((res) => {
          if (res.status == true) {
            setModalConfirm(false);
            setButtonState(false);
            setDishLists((prevState) => [...prevState, res.data]);
            setDishName("");
            setDishcategory("");
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          setButtonState(false);
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };


  const handleEdit = (e, id) => {
    e.preventDefault();
    setDishId(id);
    const dish = dishTotalList.find(d => d.id === id);
    if (dish) {
      setDishName(dish.item_name);
      setDishcategory(dish.dish_category_id)
      setModalConfirm(true);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the dish",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleDish(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your Dish  has been deleted!", {
                icon: "success",
              });
              fetchdishes(currentUserData.id);
              setDishLists([]);
            } else {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          })
          .catch((err) => {
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          });
      } else {
        // handle cancel
      }
    });
  };

  const handleMenuBlur = (event) => {
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

      case "dishcategory":
        if (!value) {
          newErrors.dishcategory = "Dish category is required";
        } else {
          delete newErrors.dishcategory;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const fetchDishCategoryDataById = (id,alphabetletter='') => {
    
    setDishCategoryId(id);
   
    const data = {
      letter: alphabetletter,
      dish_category_id: id,
      user_id: currentUserData.id,
    };

    fetchDishCategoryById(data)
      .then((res) => {
        if (res.status == true) {
          
          setTotalDishLists(res.data);
          const paginatedPosts = paginate(res.data, currentPage, pageSize);
          setDishLists(paginatedPosts);

        } else {
      
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
       
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    
  };


  // const fetchDishCategoryDataByAlphabet = (letter) => {
  //   setAlphabetLetter(letter);
  //   fetchDishCategoryDataById(dishcategoryid)
  // };


  return (
    <>
      <div className="table-part">
        <h2>Dishes</h2> {alphabetletter}
          <div className="d-md-flex justify-content-space-between">
            <div className="md">
            <button key='' className={`${dishcategoryid == 'all' ? 'table-btn btn-2' : 'table-btn'}`} onClick={() => {fetchDishCategoryDataById('all');}}>
                 All
            </button>
              {Array.isArray(dishCategories) &&
                dishCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`${dishcategoryid == category.id ? 'table-btn btn-2 ' : 'table-btn'}`}
                    onClick={() => fetchDishCategoryDataById(category.id)}
                  >
                    {category.dish_category}
                  </button>
                ))}
            </div>

            {/* <button className="table-btn">Starter</button> */}
            <div>
            <button className="table-btn" onClick={() => {
                setDishId('');
                setModalConfirm(true);
                  }}>
                Add Dish
            </button>
            </div>
          </div>
        <div className="row mt-4">
          <div className="col-auto">
            <table className="table" id="alpabet_table">
            <tbody>
              {Array.from(Array(26), (e, i) => String.fromCharCode(65 + i)).map((letter, index) => (
                <tr key={index}>
                  <th scope="row" onClick={() => fetchDishCategoryDataById(dishcategoryid,letter)} style={{border:'none',padding:'0px'} } role='button'>{letter}</th>

                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="col">
          <table className="table">
            <thead>
            </thead>
            <tbody>
              
              {dishList
                .sort((a, b) => a.item_name.localeCompare(b.item_name))
                .map((dish, index) => {
                  return (
                    <tr key={index} style={{border:'none'}}>
                      
                      <td>{dish.item_name}</td>
                      <td className="text-end add-icon-class">
                        <i
                          className="fa-solid fa-pencil"
                          role='button'
                          onClick={(e) => handleEdit(e, dish.id)}
                        ></i>
                        <i
                          className="fa-sharp fa-solid fa-trash"
                          
                          onClick={(e) => handleDelete(e, dish.id)}

                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <Pagination
              items={dishTotalList.length} 
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
          /> 
           
          
          </div>
        </div>
      </div>

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="all-form">
          <form
            className="common_form_error"
            id="menu_form"
            onSubmit={handlMenuSubmit}
          >
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={dishName}
                onBlur={handleMenuBlur}
                autoComplete="username"
                onChange={(e) => setDishName(e.target.value)}
                placeholder="Enter dish name"
              />
              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="login_div">
              <label htmlFor="dishcategory">Dish Category:</label>
              <select
                name="dishcategory"
                onBlur={handleMenuBlur}
                onChange={(e) => setDishcategory(e.target.value)}
                value={dishCategory}
              >
                <option value="">Select a dish category</option>

                {Array.isArray(dishCategories) &&
                  dishCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.dish_category}
                    </option>
                  ))}
              </select>
              {errors.dishcategory && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.dishcategory}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn-send w-100 mt-3"
              disabled={buttonStatus}
            >
              Submit
            </button>
          </form>
        </div>
      </PopupModal>

      <ToastContainer />
    </>
  );
}
