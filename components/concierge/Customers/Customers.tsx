import React, { useState, useEffect } from "react";
import { getAllConciergeUsers } from "../../../lib/concierge";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser, deleteUser } from "../../../lib/concierge";
import swal from "sweetalert";
import { getCurrentUserData } from "../../../lib/session";
import { showToast } from "../../commoncomponents/toastUtils";
import PageFound from "../../pageFound";

export default function Users() {
  interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: number;
    pic: string;
  }

  interface Errors {
    email?: string;
    name?: string;
    surname?: string;
  }

  const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonState] = useState(false);

  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalConfirmThree, SetModalConfirmThree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [getallusers, setAllUsers] = useState<User[]>([]);
  const [totalMenu, setTotalMenu]: any = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    const data = isPageVisibleToRole("concierge-users");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      const userData: User = getCurrentUserData() as User;
      getAllUsersData();
    }
  };

  const getAllUsersData = async () => {
    const userData: User = getCurrentUserData() as User;
    getAllConciergeUsers(userData.id)
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, currentPage, pageSize);
          setAllUsers(paginatedPosts);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getAllConciergeUsers()
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setAllUsers(paginatedPosts);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const userData: User = getCurrentUserData() as User;
      setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        email: email,
        created_by: userData.id,
      };
      console.log(data);
      createUser(data)
        .then((res) => {
          if (res.status == true) {
            getAllUsersData();
            setModalConfirm(false);
            setButtonState(false);
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

  const DeleteUser = (id: any) => {
    const userData: User = getCurrentUserData() as User;
    swal({
      title: "Are you sure?",
      text: "You want to delete the user",
      icon: "warning",
      //buttons: true,
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
      //confirmButtonColor: "#062B60",
    }).then((willDelete) => {
      if (willDelete) {
        deleteUser(id)
          .then((res) => {
            if (res.status == true) {
              getAllUsersData();
              swal("User has been deleted!", {
                icon: "success",
              });
              // setTimeout(() => {
              // 	window.location.href = '/admin/villas/';
              // }, 1000);
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
          .catch((err) => {});
      } else {
      }
    });
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    // setSurname("");
  };

  return (
    <>
      <div className="table-part">
        <h2>Users</h2>
        <div className="text-right">
          <button
            className="table-btn"
            onClick={() => {
              setModalConfirm(true);
              resetFields();
            }}
          >
            Add
          </button>
        </div>
        <div className="table-box" id="villa_table">
          {getallusers.length > 0 ? (
            <table className="table table-borderless common_booking">
              <thead>
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">Name/Surname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone no.</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {getallusers.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="chefs_pic">{user.pic ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + user.pic} alt="" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" />}</td>
                      <td>
                        {user.name || ""} {user.surname || ""}
                      </td>
                      <td>{user.email || ""}</td>
                      <td>{user.phone || ""}</td>
                      <td>
                        <div className="dropdown" id="none-class">
                          <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                          </a>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                              <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "concierge/customers/" + user.id}>
                                View
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#" onClick={(e) => DeleteUser(user.id)}>
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <PageFound iconClass={"fa-solid fa-book-open-reader"} heading={" No Customers "} subText={"Available"} />
            </>
          )}
        </div>
      </div>

      <Pagination items={totalMenu.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />

      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
        <div className="all-form">
          <form onSubmit={handleRegisterSubmit} className="common_form_error" id="register_form">
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.name}</span>}
            </div>
            {/* <div className='login_div'>
                            <label htmlFor="surname">Surname:</label>
                            <input type="text" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            {errors.surname && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.surname}</span>}
                        </div> */}
                        <div className='login_div'>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="registeremail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
                        </div>
                        <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit User Information'}</button>
                    </form>
                </div>
            </PopupModal>
            <ToastContainer />
        </>
    )
}
