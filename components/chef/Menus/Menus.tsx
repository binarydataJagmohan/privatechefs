import React, { useState, useEffect } from "react";
import Pagination from "../../commoncomponents/Pagination";
import PopupModal from "../../commoncomponents/PopupModal";
import PopupModalLarge from "../../commoncomponents/PopupModalLarge";
import { paginate } from "../../../helpers/paginate";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import {
  getAllCrusine,
  saveChefMenu,
  getAllChefMenu,
} from "../../../lib/chefapi";
import { getCurrentUserData } from "../../../lib/session";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../commoncomponents/toastUtils";
import Select from "react-select";

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
  const [modalfilterConfirm, setModalFilterConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisineid, setCuisineDataId] = useState<string[]>([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: "",
    name: "",
    email: "",
    pic: null,
    surname: "",
    role: "",
    approved_by_admin: "",
    profile_status: "",
  });

  const [totalMenu, setTotalMenu] = useState([]);
  const [menuData, setMenu] = useState<MenuData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const pageSize = 10;
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  const modalFilterConfirmClose = () => {
    setModalFilterConfirm(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = isPageVisibleToRole("chef-menu");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
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
    } else {
      window.location.href = "/404";
    }
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getAllChefMenu(currentUserData.id)
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setMenu(paginatedPosts);
        } else {
          setErrorMessage(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCrusineData = async () => {
    getAllCrusine()
      .then((res) => {
        if (res.status == true) {
          setCuisineData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllChefMenuData = async (id: any) => {
    getAllChefMenu(id)
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, currentPage, pageSize);
          setMenu(paginatedPosts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //menus submit start

  const handlMenuSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!cuisineid || cuisineid.length === 0) {  
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
        // cuisineid: cuisineid,
        cuisineid: cuisineid.join(","),
        user_id: currentUserData.id,
      };
      saveChefMenu(data, image)
        .then((res) => {
          if (res.status == true) {
            setModalConfirm(false);
            setButtonState(false);
            setTotalMenu(res.data);
            const paginatedPosts = paginate(res.data, currentPage, pageSize);
            setMenu(paginatedPosts);

            showToast("success", res.message);

            setTimeout(() => {
              window.location.href = "/chef/menu/" + res.save_menu_id;
            }, 1000);
          } else {
            setButtonState(false);
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: "#ffff",
                borderLeft: "4px solid #e74c3c",
                color: "#454545",
              },
              progressStyle: {
                background: "#ffff",
              },
            });
          }
        })
        .catch((err) => {
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
  };

  // const uniqueCuisines = [
  //   ...new Set(
  //     menuData?.flatMap((menu: any) =>
  //       menu.cuisine_id?.includes(",")
  //         ? menu.cuisine_id?.split(",")
  //         : [menu.cuisine_id]
  //     )
  //   ),
  // ];

  const uniqueCuisines = [
    ...new Set(
      menuData?.flatMap((menu: any) => {
        if (!menu.cuisine_id) return []; // Handle null or undefined case
  
        const cuisineId = String(menu.cuisine_id); // Ensure it's a string
        return cuisineId.includes(",") ? cuisineId.split(",") : [cuisineId];
      })
    ),
  ];
  

  const filteredCuisines = cuisinedata.filter((cuisine: any) =>
    uniqueCuisines.includes(cuisine.id.toString())
  );

  const handleCuisineFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCuisines((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
  };

  // const filteredMenu = menuData.filter((menu: any) =>
  //   selectedCuisines.length === 0
  //     ? true
  //     : selectedCuisines.some((cuisine) =>
  //         menu.cuisine_id.split(",").includes(cuisine)
  //       )
  // );

  const filteredMenu = menuData.filter((menu: any) => {
    const cuisineId = menu.cuisine_id ? String(menu.cuisine_id) : ""; // Ensure it's a string
    return selectedCuisines.length === 0
      ? true
      : selectedCuisines.some((cuisine) =>
          cuisineId.split(",").includes(cuisine)
        );
  });
  

  const clearFilters = () => {
    setSelectedCuisines([]); 
    setMenu(totalMenu); 
  };
  
  return (
    <>
      <div className="table-part">
        <h2>Menus</h2>
        <ul className="table_header_button_section p-r">
          <li className="">
            <button
              className="table-btn border-radius round-white"
              onClick={() => {
                setModalFilterConfirm(true);
              }}
            >
              Filter{" "}
            </button>
          </li>
          <li>
    <button
      className="table-btn border-radius round-white"
      onClick={clearFilters}
    >
      Clear
    </button>
  </li>
        </ul>
        <div className="row mt-4 add_menu_items gap-3">
          <div
            className="col-sm-3"
            onClick={() => {
              setModalConfirm(true);
              resetFields();
            }}
            role="button"
          >
            <div className="menu-name mb-4 mb-sm-0">
              <p>Add Menu Name </p>
            </div>
          </div>

          {filteredMenu.length > 0 ? (
            filteredMenu.map((menu, index) => {
              return (
                <div className="col-sm-3" key={index}>
                  <a href={"/chef/menu/" + menu.id} className="sdf">
                    <div className="slider-img-plase">
                      {menu.image ? (
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/chef/menu/" +
                            menu.image
                          }
                          width={612}
                          height={300}
                          alt={menu.name}
                        />
                      ) : (
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/placeholder.jpg"
                          }
                          width={612}
                          height={300}
                          alt={menu.menu_name}
                        />
                      )}

                      <p
                        className="plase-btn"
                        data-bs-toggle="tooltip"
                        title={menu.menu_name}
                      >
                        <span className="plase-btn-span">
                          {menu.menu_name
                            ? menu.menu_name.length > 15
                              ? menu.menu_name.slice(0, 15) + "..."
                              : menu.menu_name
                            : ""}
                        </span>
                      </p>
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="col-sm-3">
              <div className="slider-img-plase"></div>
            </div>
          )}
        </div>
      </div>
      <Pagination
        items={totalMenu.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      {/* {filter basis of cusineis menu} */}

      <PopupModalLarge
        show={modalfilterConfirm}
        handleClose={modalFilterConfirmClose}
      >
        <div className="accordion-body" style={{ padding: "32px 10px" }}>
          <div className="row">
            {filteredCuisines.map((cuisine: any) => (
              <div className="col-sm-4" key={cuisine.id}>
                <input
                  type="checkbox"
                  value={cuisine.id}
                  onChange={handleCuisineFilter}
                  checked={selectedCuisines.includes(cuisine.id.toString())}
                  style={{ marginRight: "5px" }}
                />
                <label style={{ marginLeft: "5px" }}>{cuisine.name}</label>
              </div>
            ))}
          </div>
        </div>
      </PopupModalLarge>

      {/* // Menu popup start  */}
      <PopupModal
        show={modalConfirm}
        handleClose={modalConfirmClose}
        staticClass="var-login"
      >
        <div className="all-form">
          <form
            onSubmit={handlMenuSubmit}
            className="common_form_error"
            id="menu_form"
          >
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleMenuBlur}
                autoComplete="username"
              />

              {errors.name && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="login_div">
              <label htmlFor="Description">Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleMenuBlur}
              ></textarea>
            </div>
            <div className="login_div">
              <label htmlFor="Cuisine">Cuisine:</label>
              <Select
                isMulti
                options={cuisinedata.map((cuisine) => ({
                  value: cuisine.id,
                  label: cuisine.name,
                }))}
                value={cuisinedata
                  .filter((cuisine:any) => cuisineid.includes(cuisine.id))
                  .map((cuisine) => ({
                    value: cuisine.id,
                    label: cuisine.name,
                  }))}
                onChange={(selectedOptions:any) =>
                  setCuisineDataId(
                    selectedOptions.map((option:any) => option.value)
                  )
                }
                placeholder="Select Cuisine"
                className="basic-multi-select"
                styles={{
                  control: (provided:any, state:any) => ({
                    ...provided,
                    borderColor: state.isFocused ? '#eeeeee' : provided.borderColor,
                    boxShadow: state.isFocused ? '0 0 0 1px #eeeeee' : provided.boxShadow,
                    '&:hover': {
                      borderColor: 'grey',
                    },
                  }),
                }}
              />
              {errors.cuisine && (
                <span className="small error text-danger mb-2 d-inline-block error_login">
                  {errors.cuisine}
                </span>
              )}
            </div>

            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img src={preview} alt="Preview" width={100} height={100} />
              )}
            </div>

            <div className="image-preview mb-4"></div>

            <button
              type="submit"
              className="btn-send w-100"
              disabled={buttonStatus}
            >
              Submit Menu Information
            </button>
          </form>
        </div>
      </PopupModal>
    </>
  );
}
