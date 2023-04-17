import React, { useState ,useEffect} from 'react'
import Pagination from "../../../components/commoncomponents/Pagination";
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { paginate } from "../../../helpers/paginate";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {getAllCrusine,saveChefMenu} from '../../../lib/chefapi';
import { useRouter } from "next/router";
import { getToken } from "../../../lib/session";
import { ToastContainer,toast } from 'react-toastify';
export default function Menus() {

 const [errors, setErrors] = useState({});
 const [cuisinedata, setCuisineData] = useState({});
 const [modalConfirm, setModalConfirm] = useState(false);
 const [buttonStatus, setButtonState] = useState(false);

 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [cuisineid, setCuisineDataId] = useState('');
 const [image, setImage] = useState('');

 const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  useEffect(() => {
    getUserData();
    getAllCrusineData();
  }, []);

  const getUserData = async () => {
    const data = isPageVisibleToRole('chef-menu');
    if(data == 2) {
      window.location.href = '/';
    }
    if(data == 0) {
      window.location.href = '/404';
    }
  }

  const getAllCrusineData = async () => {
      getAllCrusine()
      .then(res => {
        if(res.status==true){
          setCuisineData(res.data);
        } else {
         
        }
      })
      .catch(err => {
          console.log(err);
      });
  }

  //login submit start

  const handlMenuSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
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
         name: name,
         description: description,
         cuisineid : cuisineid,

       };
       saveChefMenu(data,image[0])
      .then(res => {
        if(res.status==true){
          
            setModalConfirm(false);
            setButtonState(false);
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

  //login submit close


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
                  <p onClick={() => setModalConfirm(true)} role="button">Add Menu Name </p>
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

           {/* // Menu popup start  */}
           <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
                  <div className="text-center popup-img">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                  </div>
                  <div className="all-form" > 
                  <form onSubmit={handlMenuSubmit}  className="common_form_error" id="menu_form">
                      
                      <div className='login_div'>
                          <label htmlFor="name">Name:</label>
                          <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} onBlur={handleMenuBlur} autoComplete="username"/>
                          {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
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
                            <input type="file" name="imge"  onChange={ (e) => setImage(e.target.files) } accept="jpg,png"/>
                      </div>
                    
                      <button type="submit" className="btn-send w-100" disabled={buttonStatus}>Submit</button>
                  </form>
                              
                  </div>

              </PopupModal>

            {/* // Menu popup end  */}
            <ToastContainer/>

        </>
    )
}