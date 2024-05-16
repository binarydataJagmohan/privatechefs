import React, { useState, useEffect } from 'react'
import Pagination from "../../commoncomponents/Pagination";
import PopupModal from '../../commoncomponents/PopupModal';
import { paginate } from "../../../helpers/paginate";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getAllCrusine, saveChefMenu, getAllChefMenu } from '../../../lib/chefapi';
import { useRouter } from "next/router";
import { getToken, getCurrentUserData } from "../../../lib/session";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'
import { showToast } from '../../commoncomponents/toastUtils';
export default function Menus() {


  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string;
    profile_status: string;
  }

  interface Errors {
    cuisine?: string;
    name?: string;
  }

  interface MenuData {
    id: number;
    name?: string;
    menu_name?: string;
    image?: string;

  }

  interface CuisineData {
    id?: number;
    name?: string;
  }

  const [errors, setErrors] = useState<Errors>({});
  const [cuisinedata, setCuisineData] = useState<CuisineData[]>([]);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cuisineid, setCuisineDataId] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: '',
    name: '',
    email: '',
    pic: null,
    surname: '',
    role: '',
    approved_by_admin: '',
    profile_status: ''
  });

  const [totalMenu, setTotalMenu] = useState([]);
  const [menuData, setMenu] = useState<MenuData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const pageSize = 10;

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = isPageVisibleToRole('chef-menu');
    if (data == 2) {
      window.location.href = '/';
    }
    if (data == 0) {
      window.location.href = '/404';
    }
    if (data == 1) {
      const userData = getCurrentUserData() as CurrentUserData;
        getAllCrusineData();
        getAllChefMenuData(userData.id);
        setCurrentUserData({
          ...userData,
          id: userData.id,
          name: userData.name,
          pic: userData.pic,
          surname: userData.surname,
          role: userData.role,
          approved_by_admin: userData.approved_by_admin,

        });
    }
    else {
      window.location.href = "/404";
    }
  }

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getAllChefMenu(currentUserData.id)
      .then(res => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setMenu(paginatedPosts);
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAllCrusineData = async () => {
    getAllCrusine()
      .then(res => {
        if (res.status == true) {
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

  const getAllChefMenuData = async (id: any) => {
    getAllChefMenu(id)
      .then(res => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, currentPage, pageSize);
          setMenu(paginatedPosts);


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



  //menus submit start

  const handlMenuSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!cuisineid) {
      newErrors.cuisine = "Cuisine is required";
    }

    setErrors(newErrors);

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      setButtonState(true);
      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        description: description,
        cuisineid: cuisineid,
        user_id: currentUserData.id

      };
      saveChefMenu(data, image)
        .then(res => {
          if (res.status == true) {

            setModalConfirm(false);
            setButtonState(false);
            setTotalMenu(res.data);
            const paginatedPosts = paginate(res.data, currentPage, pageSize);
            setMenu(paginatedPosts);

            showToast('success', res.message);

            setTimeout(() => {
              window.location.href = '/chef/menu/' + res.save_menu_id;
            }, 1000);

          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
              },
              progressStyle: {
                background: '#ffff',
              },
            });

          }
        })
        .catch(err => {
          console.log(err);
        });
    }

  };

  const handleMenuBlur = (event: any) => {
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

  //menus submit close

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(imageUrl);
    } else {
      setPreview(null);
    }
  };


  const resetFields = () => {
    setName("");
    setDescription("");
    setCuisineDataId("");
    setImage(null);
    setPreview(null);
  }


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
        <div className="row mt-4 add_menu_items">
          <div className="col-sm-3" onClick={() => { setModalConfirm(true); resetFields(); }} role="button">
            <div className="menu-name mb-4 mb-sm-0">
              <p>Add Menu Name </p>
            </div>
          </div>

          {menuData.length > 0 ? menuData.map((menu, index) => {
            return (
              <div className="col-sm-3" key={index}>
                <a href={"/chef/menu/" + menu.id} className="sdf">
                  <div className="slider-img-plase">

                    {menu.image
                      ?
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/menu/' + menu.image} width={612} height={300} alt={menu.name} />
                      :
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} width={612} height={300} alt={menu.menu_name} />

                    }

                    <p className="plase-btn" data-bs-toggle="tooltip" title={menu.menu_name}><span className='plase-btn-span'>{menu.menu_name ? (menu.menu_name.length > 15 ? menu.menu_name.slice(0, 15) + '...' : menu.menu_name) : ''}</span></p>


                  </div>
                </a>
              </div>
            )

          }) : <div className="col-sm-3">
            <div className="slider-img-plase">

            </div>
          </div>
          }
        </div>

      </div>
      <Pagination
        items={totalMenu.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />

      {/* // Menu popup start  */}
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
        {/* <div className="text-center popup-img">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                  </div> */}
        <div className="all-form" >
          <form onSubmit={handlMenuSubmit} className="common_form_error" id="menu_form">

            <div className='login_div'>
              <label htmlFor="name">Name:</label>
              <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} onBlur={handleMenuBlur} autoComplete="username" />

              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.name}
                </span>
              )}
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
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
              {preview && <img src={preview} alt="Preview" width={100} height={100} />}

            </div>

            <div className="image-preview mb-4">

            </div>

            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>Submit Menu Information</button>
          </form>

        </div>

      </PopupModal>

      {/* // Menu popup end  */}
      {/* <ToastContainer /> */}

    </>
  )
}