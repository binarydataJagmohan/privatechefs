import React, { useState, useEffect, useRef } from "react";
import Pagination from "../../commoncomponents/Pagination";
import PopupModal from "../../commoncomponents/PopupModal";
import { paginate } from "../../../helpers/paginate";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { saveChefDishImages, getAllChefDishGallery, deleteChefDishImage } from "../../../lib/chefapi";
import { useRouter } from "next/router";
import { getToken, getCurrentUserData } from "../../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import swal from "sweetalert";
import { showToast } from "../../commoncomponents/toastUtils";
import PageFound from "../../pageFound";

export default function DishGallery() {
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
    img?: string;
  }

  interface CuisineData {
    id?: number;
    name?: string;
  }

  const [errors, setErrors] = useState<Errors>({});
  const [modalConfirm, setModalConfirm] = useState(false);
  const [buttonStatus, setButtonState] = useState(false);
  const [dishid, setDishId] = useState("");
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

  const [totalMenu, setTotalMenu] = useState<any>([]);
  const [menuData, setMenu] = useState<MenuData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<any>(null);
  const pageSize = 10;

  const modalConfirmClose = () => {
    setModalConfirm(false);
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
    getAllChefDishGallery(currentUserData.id)
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

  const getAllChefMenuData = async (id: any) => {
    getAllChefDishGallery(id)
      .then((res) => {
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
      .catch((err) => {
        console.log(err);
      });
  };

  //menus submit start

  const handlMenuSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};

    setErrors(newErrors);

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      setButtonState(false);
      // Call an API or perform some other action to register the user
      const data = {
        id: dishid,
        user_id: currentUserData.id,
      };
      saveChefDishImages(data, image)
        .then((res) => {
          if (res.status == true) {
            setModalConfirm(false);
            setButtonState(false);
            getAllChefMenuData(currentUserData.id);
            showToast("success", res.message);
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
    setImage(null);
    setPreview(null);
    setDishId("");

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const EditDishImage = (e: any, id: any) => {
    const filteredMenu = totalMenu.filter((item: any) => item.id == id);

    setDishId(id);

    if (filteredMenu[0].img) {
      setPreview(process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/dishes/" + filteredMenu[0].img);
    }

    setModalConfirm(true);
  };

  const deleteDishImage = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the dish image",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willDelete) => {
      if (willDelete) {
        deleteChefDishImage(id)
          .then((res) => {
            if (res.status === true) {
              getAllChefMenuData(currentUserData.id);
              swal("Your Dish Image has been deleted!", {
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
            toast.error(err.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
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
          });
      } else {
        // handle cancel
      }
    });
  };

  return (
    <>
      <div className="table-part">
        <ul className="table_header_button_section p-r mt-4">
          <li
            className=""
            onClick={() => {
              setModalConfirm(true);
              resetFields();
            }}
          >
            <h2>Gallery of Dishes</h2>
          </li>

          <li
            className="right-li"
            onClick={() => {
              setModalConfirm(true);
              resetFields();
            }}
          >
            <button className="table-btn border-radius round-white">
              Add Dishes Gallery Image
            </button>
          </li>
        </ul>
        <div className="row mt-4 add_menu_items">
          {menuData.length > 0 ? (
            menuData.map((menu, index) => {
              return (
                <div className="col-sm-3 dishes_gallery" key={index}>
                  <div className="slider-img-plase">
                    <i className="fa-solid fa-pen-to-square position-absolute end-0 text-white" role="button" onClick={(e) => EditDishImage(e, menu.id)}></i>
                    <i className="fa-solid fa-trash position-absolute end-0 text-white" role="button" onClick={(e) => deleteDishImage(e, menu.id)}></i>
                    {menu.img ? (
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/dishes/" + menu.img} width={612} height={300} alt={menu.name} />
                    ) : (
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} width={612} height={300} alt={menu.menu_name} />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <PageFound iconClass={"fa-solid fa-receipt"} heading={" No Dish Gallery  "} subText={"Available"} />
            </>
          )}
        </div>
      </div>
      <Pagination items={totalMenu.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />

      {/* // Menu popup start  */}
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
        <div className="text-center popup-img">
          <p
            className="text-start fw-bold px-2 fs-4"
            style={{ color: "#ff4e00d1" }}
          >
            {dishid ? "Edit Dishes Gallery Image" : "Add Dishes Gallery Image"}
          </p>
        </div>
        <div className="all-form">
          <form onSubmit={handlMenuSubmit} className="common_form_error" id="menu_form">
            <div className="login_div">
              <label htmlFor="Image">Image:</label>
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required={!dishid} />
              {preview && <img src={preview} alt="Preview" width={100} height={100} style={{ objectFit: "contain" }} />}
            </div>

            <div className="image-preview mb-4"></div>

            <button
              type="submit"
              className="btn-send w-100 float-end"
              disabled={buttonStatus}
            >
              Submit Dishes Gallery Image
            </button>
          </form>
        </div>
      </PopupModal>

      {/* // Menu popup end  */}
      <ToastContainer />
    </>
  );
}
