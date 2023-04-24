import React, { useState, useEffect } from 'react';
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { getDishecategory,dishInsert,getDishes } from '../../../lib/adminapi';
import { getToken, getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { ToastContainer, toast } from "react-toastify";

export default function Dish() {
  const [errors, setErrors] = useState({});
  const [modalConfirm, setModalConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
  const [dishCategories, setDishCategories] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [dishName,setDishName] = useState('');
  const [dishCategory,setDishcategory] = useState('');
  const [dishList,setDishLists] = useState([]);

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  useEffect(() => {
    const data = isPageVisibleToRole('chef-dish');
			if (data == 2) {
			  window.location.href = '/login'; // redirect to login if not logged in
			} else if (data == 0) {
			  window.location.href = '/404'; // redirect to 404 if not authorized
			}
      if (data == 1) {
        const userData = getCurrentUserData();
        // console.log(userData);
        setCurrentUserData(userData);
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
      fetchdishes();
  }, []);

  const fetchdishes = async () => {
    try {
      const res = await getDishes();
      if (res.status) {
        setDishLists(res.data);
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
          item_name: dishName,
          type: dishCategory,
          userId: currentUserData.id,
        };
    
        dishInsert(data)
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
    

  const handleMenuBlur = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value) {
          newErrors.name = 'Name is required';
        } else {
          delete newErrors.name;
        }
        break;

      case 'dishcategory':
        if (!value) {
          newErrors.dishcategory = 'Dish category is required';
        } else {
          delete newErrors.dishcategory;
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
        <h2>Dishes</h2>
        <div className="d-flex justify-content-space-between">
        <div className="md">
        {Array.isArray(dishCategories) && dishCategories.map((category) => (
    <button key={category.id} className="table-btn" onClick={() => setDishcategory(category.dish_category)}>{category.dish_category}</button>
     ))}
   </div>
     {/* <button className="table-btn">Starter</button> */}
           <div>
          <button className="table-btn" onClick={() => setModalConfirm(true)}>
            Add Dish
          </button>
          </div>
        </div>
        <div className="table-box">
          <table className="table">
            <thead>

              <tr>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
            {dishList.map((dish) => (
              <tr key={dish.id}>
                <th scope="row">{String.fromCharCode(65 + parseInt(dish.id))}</th>
                <td>{dish.item_name}</td>
                <td className="text-end">
                  <i className="fa-solid fa-pencil"></i>
                  <i className="fa-sharp fa-solid fa-trash"></i></td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="all-form">
          <form className="common_form_error" id="menu_form"  onSubmit={handlMenuSubmit}>
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" onBlur={handleMenuBlur} autoComplete="username" onChange={(e) => setDishName(e.target.value)}/>
              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>
              )}
            </div>
          
            <div className="login_div">
              <label htmlFor="dishcategory">Dish Category:</label>
              <select name="dishcategory" onBlur={handleMenuBlur} onChange={(e) => setDishcategory(e.target.value)} value={dishCategory}>
                <option value="">Select a dish category</option>
                
                {Array.isArray(dishCategories) &&
                  dishCategories.map((category) => (
                    <option key={category.id} value={category.dish_category}>
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
  
                      <button type="submit" className="btn-send w-100 mt-3" disabled={buttonStatus}>
                          Submit
                      </button>
                  </form>
          </div>
          </PopupModal>
          <ToastContainer />
      </>
  );
  
}