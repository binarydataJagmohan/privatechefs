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
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import { showToast } from "../../commoncomponents/toastUtils";

export default function Dish() {

  interface Errors {
    name?: string;
    description?: string;
    dishcategory?: string;
    // add more properties as needed
  }

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


  type Dish = {
    id: number;
    item_name: string;
    dish_category_id: string;
  };

  type DishCategpory = {
    dish_category: string;
    id: number
  };


  const [errors, setErrors] = useState<Errors>({});
  const [modalConfirm, setModalConfirm] = useState(false);
  const [editmodalConfirm, editsetModalConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
  const [dishCategories, setDishCategories] = useState<DishCategpory[]>([]);
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

  const [dishName, setDishName] = useState("");
  const [dishCategory, setDishcategory] = useState("");
  const [dishList, setDishLists] = useState<Dish[]>([]);

  const [dishmethod, setDishMethod] = useState('');
  const [dishid, setDishId] = useState('');

  const [dishcategoryid, setDishCategoryId] = useState('all');

  const [dishTotalList, setTotalDishLists] = useState<Dish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alphabetletter, setAlphabetLetter] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');



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
      window.location.href = "/"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData() as CurrentUserData;
        fetchdishes(userData.id);
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
    // Fetch the list of dish categories from the API
    getDishecategory()
      .then((data) => {
        setDishCategories(data.data);
       // console.log(data.data)
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const fetchdishes = async (user_id: any) => {

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
    } catch (err) {
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
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
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    fetchdishes(currentUserData.id)
      .then((res: any) => {
        if (res.status == true) {
          setTotalDishLists(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setDishLists(paginatedPosts);
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };



  const handlMenuSubmit = (event: any) => {
    event.preventDefault();
    const userData = getCurrentUserData() as CurrentUserData;
    // Validate form data
    const newErrors: Errors = {};

    if (!dishName) {
      newErrors.name = "Dish Name is required";
    }

    if (!dishCategory) {
      newErrors.dishcategory = "Dish Category is required";
    }

    // console.log(newErrors)

    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        id: dishid,
        item_name: dishName,
        dish_category_id: dishCategory,
        userId: currentUserData.id,
      };
      console.log(data);
      dishAddUpdate(data)
        .then((res) => {
          if (res.status == true) {
            setModalConfirm(false);
            setButtonState(false);
            fetchdishes(userData.id);
            setDishLists((prevState) => [...prevState, res.data]);
            setDishName("");
            setDishcategory("");
            showToast('success', res.message);
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
        .catch((err) => {
          setButtonState(false);
          console.log(err);
          toast.error(err.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };


  const handleEdit = (e: any, id: any) => {
    e.preventDefault();
    const userData = getCurrentUserData() as CurrentUserData;
    setDishId(id);
    const dish = dishTotalList.find(d => d.id === id);
    if (dish) {
      fetchdishes(userData.id);
      setDishName(dish.item_name);
      setDishcategory(dish.dish_category_id)
      setModalConfirm(true);
    }
  };

  const handleDelete = (e: any, id: any) => {
    e.preventDefault();
    const userData = getCurrentUserData() as CurrentUserData;
    swal({
      title: "Are you sure?",
      text: "You want to delete the dish",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],

    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleDish(id)
          .then((res) => {
            if (res.status === true) {
              fetchdishes(userData.id);
              swal("Your Dish  has been deleted!", {
                icon: "success",
              });
              // $('#singledish_'+id).hide();
              // fetchdishes(currentUserData.id);
              // setDishLists([]);
            } else {
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
          .catch((err) => {
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
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
          });
      } else {
        // handle cancel
      }
    });
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

  const fetchDishCategoryDataById = (id: any, alphabetletter = '') => {
    setSelectedLetter(alphabetletter);

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
      .catch((err) => {

        toast.error(err.message, {
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
      });

  };


  // const fetchDishCategoryDataByAlphabet = (letter) => {
  //   setAlphabetLetter(letter);
  //   fetchDishCategoryDataById(dishcategoryid)
  // };

  const resetFields = () => {
    setDishName('');
    setDishcategory('');
  }


  return (
    <>
      <div className="table-part">
        <h2>Dishes </h2> {alphabetletter}
        <div className="row sfsd">
          <div className="col-lg-8">
            <button key='' className={`${dishcategoryid == 'all' ? 'table-btn btn-2' : 'table-btn'}`} onClick={() => { fetchDishCategoryDataById('all'); }}>
              All
            </button>
            {Array.isArray(dishCategories) &&
              dishCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${dishcategoryid == category.id.toString() ? 'table-btn btn-2 mx-1' : 'table-btn mx-1'}`}
                  onClick={() => fetchDishCategoryDataById(category.id)}
                >
                  {category.dish_category}
                </button>
              ))}
          </div>

          {/* <button className="table-btn">Starter</button> */}
          <div className="col-lg-4 text-end">
            <button className="table-btn" onClick={() => {
              setDishId('');
              setModalConfirm(true);
              resetFields();
            }}>
              Add Dish
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-auto">
            <table className="table" id="alpabet_table">
              {/* <tbody>
              {Array.from(Array(26), (e, i) => String.fromCharCode(65 + i)).map((letter, index) => (
                <tr key={index}>
                  <th scope="row" onClick={() => fetchDishCategoryDataById(dishcategoryid,letter)} style={{border:'none',padding:'0px'} } role='button'>{letter}</th>

                </tr>
              ))}
            </tbody> */}
              <tbody>
                {Array.from(Array(26), (e, i) => String.fromCharCode(65 + i)).map((letter, index) => (
                  <tr key={index}>
                    <th
                      scope="row"
                      onClick={() => fetchDishCategoryDataById(dishcategoryid, letter)}
                      style={{
                        border: 'none',
                        padding: '0px',
                        color: selectedLetter === letter ? '#ff4e00d1' : 'initial',
                      }}
                      role="button"
                    >
                      {letter}
                    </th>
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
                      <tr key={index} style={{ border: 'none' }} id={`singledish_${dish.id}`}>

                        <td>{dish.item_name}</td>
                        <td className="text-end add-icon-class" id="icons">
                          <i
                            className="fa-solid fa-pencil"
                            role='button'
                            onClick={(e) => handleEdit(e, dish.id)}
                          ></i>
                          <i
                            className="fa-sharp fa-solid fa-trash" style={{ cursor: "pointer" }}

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
                // autoComplete="username"
                onChange={(e) => setDishName(e.target.value)}
                placeholder="Enter dish name"
                required
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
                required
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
