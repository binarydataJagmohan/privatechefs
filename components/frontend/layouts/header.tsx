import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { login, register, forgetPassword, socialDataSave } from '../../../lib/frontendapi';
import { removeToken, removeStorageData, getCurrentUserData, removeBookingData } from "../../../lib/session";
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { UpdateUserToOffiline } from "../../../lib/userapi"
import { useSession, signIn, signOut } from 'next-auth/react'
import { showToast } from '../../commoncomponents/toastUtils';

export default function Header({ }) {

  interface Errors {
    password?: string;
    confirmPassword?: string;
    email?: string
    role?: string
    name?: string
    privacy?: string
    terms?: string
  }

  interface User {
    id: string;
    // Other properties of the user data object
  }

  const router = useRouter();

  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalConfirmTwo, setModalConfirmTwo] = useState(false);
  const [modalConfirmThree, SetModalConfirmThree] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonState] = useState(false);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [current_user_id, setCurrentUserId] = useState(false);
  const [user_id, setUserId] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userrole = 'admin';
  const [acceptance, setAcceptance] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [currentUserData, setCurrentUserData]: any = useState({});


  useEffect(() => {
    getAllNotify();
  }, []);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userData: any = getCurrentUserData();
    const now = new Date();
    const expirationDate = new Date(userData.expiration);
    if (token) {
      if (now > expirationDate) {
        removeToken();
        removeStorageData();
        window.location.href = '/404';
        console.log("yes");
      } else {
        console.log("no");
      }
    }
  }, []);

  const getAllNotify = async () => {
    const userData: any = getCurrentUserData();
    setCurrentUserData(userData);
  }

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setRole(role);
    }
  }, []);

  const { data: session } = useSession() || {};

  useEffect(() => {
    if (session) {
      SocialData(session.user, 'google');
    }

  }, [session]);

  const SocialData = (user: any, type: any) => {
    const data = {
      name: user.name,
      email: user.email,
      login_type: type,
      password: '12345678'
    };
    socialDataSave(data)
      .then(res => {
        if (res.status == true) {
          if (res.data.token) {
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("id", res.data.user.id);
            window.localStorage.setItem("name", res.data.user.name);
            window.localStorage.setItem("email", res.data.user.email);
            window.localStorage.setItem("role", res.data.user.role);
            window.localStorage.setItem("pic", res.data.user.pic);
            window.localStorage.setItem("surname", res.data.user.surname);
            window.localStorage.setItem("phone", res.data.user.phone);
            window.localStorage.setItem("address", res.data.user.address);
            window.localStorage.setItem("expiration", res.data.expiration);
            window.localStorage.setItem(
              "approved_by_admin",
              res.data.user.approved_by_admin
            );
            window.localStorage.setItem("profile_status", res.data.user.profile_status);
            window.localStorage.setItem("created_by", res.data.user.created_by);

            setIsAuthenticated(true);
            setRole(res.data.user.role);
            setCurrentUserId(true);
            setUserId(res.data.user.id);
            signOut({ redirect: false }).then();
            showToast('success', res.message);
            router.push('/user/userprofile');
          } else {
            setButtonState(false);
            toast.info(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
                "--toastify-icon-color-success": "#ff4e00d1",
              },
              progressStyle: {
                background: '#ffff',
              },
            });
          }
        } else {
          setButtonState(false);
          if (res.status === false && res.errors) {
            Object.keys(res.errors).forEach(function (key) {
              res.errors[key].forEach(function (errorMessage: any) {
                toast.error(errorMessage);
              });
            });
          }
        }
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    checkuser();
  }, []);

  useEffect(() => {
    const clientId = getClientIdFromURL();
    const user = getCurrentUserData() as User;
    const bookingcurrentURL = localStorage.getItem('bookingcurrentURL')

    if (user.id != null) {
      setCurrentUserId(true);
      setUserId(user.id);
    }
    if (clientId && clientId != user.id || bookingcurrentURL) {
      setModalConfirm(true);
    } else if (clientId == user.id) {
      setModalConfirm(false);
    } else {
      console.log();
    }
  }, []);

  const getClientIdFromURL = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('client_id');
    }
    return null;
  };


  const checkuser = async () => {
    const user = getCurrentUserData() as User;
    if (user.id != null) {
      setCurrentUserId(true);
      setUserId(user.id);
    }
  };


  const clientId = getClientIdFromURL();
  const clientIdExists = clientId !== null;

  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  const modalConfirmCloseTwo = () => {
    setModalConfirmTwo(false);
  }

  const modalConfirmCloseThree = () => {
    SetModalConfirmThree(false);
  };

  const signuppopup = () => {
    setModalConfirm(false);
    setModalConfirmTwo(true);
    SetModalConfirmThree(false);
    setButtonState(false);
    removeToken();
    removeStorageData();
  };

  const signinpopup = () => {
    setModalConfirm(true);
    setModalConfirmTwo(false);
    SetModalConfirmThree(false);
    setButtonState(false);
    removeToken();
    removeStorageData();
  };

  const forgotpopup = () => {
    SetModalConfirmThree(true);
    setModalConfirm(false);
    setModalConfirmTwo(false);
    setButtonState(false);
  };

  function handleLogout() {
    UpdateUserToOffiline(user_id)
      .then(res => {
        if (res.status == true) {
          removeToken();
          removeStorageData();
          removeBookingData();
          signOut({ redirect: false }).then();
          window.location.href = '/';
          setIsAuthenticated(false);
          setRole("");
        } else {
          console.log("error");
        }
      })

  }

  //login submit start

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();

    const newErrors: Errors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setButtonState(true);
      const data = {
        email: email,
        password: password,
      };
      login(data)
        .then((res) => {
          if (res.status == true) {
            if (res.authorisation.token) {
              setButtonState(false);
              setIsAuthenticated(true);
              window.localStorage.setItem("token", res.authorisation.token);
              window.localStorage.setItem("id", res.user.id);
              window.localStorage.setItem("name", res.user.name);
              window.localStorage.setItem("email", res.user.email);
              window.localStorage.setItem("role", res.user.role);
              window.localStorage.setItem("pic", res.user.pic);
              window.localStorage.setItem("surname", res.user.surname);
              window.localStorage.setItem("phone", res.user.phone);
              window.localStorage.setItem("address", res.user.address);
              window.localStorage.setItem("approved_by_admin", res.user.approved_by_admin);
              window.localStorage.setItem("profile_status", res.user.profile_status);
              window.localStorage.setItem("expiration", res.authorisation.expiration);
              window.localStorage.setItem("created_by", res.user.created_by);
              showToast('success', res.message);
              let url: any = localStorage.getItem('currentURL');

              if (url) {
                window.location.href = url;
              } else {
                url = localStorage.getItem('bookingcurrentURL')
                if (url) {
                  window.location.href = url;
                }
              }


              setTimeout(() => {
                if (res.user.role == "admin") {
                  window.location.href = "/admin/dashboard";
                }
              }, 1000);

              setTimeout(() => {

                if (res.user.role == "user") {
                  if (res.user.profile_status == "completed") {
                    window.location.href = "/bookings/step1";
                  } else {
                    window.location.href = "/user/userprofile";
                  }
                }
              }, 1000);

              setTimeout(() => {
                if (res.user.role == "chef") {
                  if (res.user.approved_by_admin == "yes" && res.user.profile_status == "completed"
                  ) {
                    window.location.href = "/chef/dashboard";
                  } else {
                    window.location.href = "/chef/myprofile";
                  }
                }
              }, 1000);

              setTimeout(() => {
                if (res.user.role == "concierge") {
                  window.location.href = "/concierge/dashboard";
                }
              }, 1000);

            } else {
              setButtonState(false);
              toast.info(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: '#ffff',
                  borderLeft: '4px solid #e74c3c',
                  color: '#454545',
                  "--toastify-icon-color-info": "#e74c3c",
                },
                progressStyle: {
                  background: '#ffff',
                },
              });
            }
          } else {
            setButtonState(false);
            toast.info(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
                "--toastify-icon-color-info": "#e74c3c",
              },
              progressStyle: {
                background: '#ffff',
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  const handleLoginBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        } else {
          delete newErrors.password;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  //login submit close

  //register submit start

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
    // if (!password) {
    //   newErrors.password = "Password is required";
    // } else if (password.length < 8) {
    //   newErrors.password = "Password must be at least 8 characters";
    // }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
      newErrors.password = "Password must be at least 8+ chars, start uppercase, 1 special, 1 number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!role) {
      newErrors.role = "Role is required";
    }

    if (!privacy) {
      newErrors.privacy = "Please accept privacy policy";
    }

    if (!terms) {
      newErrors.terms = "Please accept terms and condition";
    }
    setErrors(newErrors);
    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        email: email,
        password: password,
        role: role
      };
      register(data)
        .then(res => {
          if (res.status == true) {
            if (res.data.token) {
              window.localStorage.setItem("token", res.data.token);
              window.localStorage.setItem("id", res.data.user.id);
              window.localStorage.setItem("name", res.data.user.name);
              window.localStorage.setItem("email", res.data.user.email);
              window.localStorage.setItem("role", res.data.user.role);
              window.localStorage.setItem("pic", res.data.user.pic);
              window.localStorage.setItem("surname", res.data.user.surname);
              window.localStorage.setItem("phone", res.data.user.phone);
              window.localStorage.setItem("address", res.data.user.address);
              window.localStorage.setItem("expiration", res.data.user.expiration);
              window.localStorage.setItem(
                "approved_by_admin",
                res.data.user.approved_by_admin
              );
              window.localStorage.setItem("profile_status", res.data.profile_status);
              window.localStorage.setItem("created_by", res.data.user.created_by);

              showToast('success', res.message);

              setTimeout(() => {
                if (res.data.user.role == "chef") {
                  window.location.href = "/chef/myprofile";
                }
              }, 1000);

              setTimeout(() => {
                if (res.data.user.role == "concierge") {
                  window.location.href = "/concierge/dashboard";
                }
              }, 1000);

              setTimeout(() => {
                if (res.data.user.role == "user") {
                  window.location.href = "/user/userprofile";
                }
              }, 1000);
            } else {
              setButtonState(false);
              toast.info(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: '#ffff',
                  borderLeft: '4px solid #e74c3c',
                  color: '#454545',
                  "--toastify-icon-color-success": "#ff4e00d1",
                },
                progressStyle: {
                  background: '#ffff',
                },
              });
            }
          } else {
            setButtonState(false);
            if (res.status === false && res.errors) {
              Object.keys(res.errors).forEach(function (key) {
                res.errors[key].forEach(function (errorMessage: any) {
                  toast.error(errorMessage);
                });
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };


  const handleRegisterBlur = (event: any) => {
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
      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        // if (!value) {
        //   newErrors.password = "Password is required";
        // } else if (value.length < 8) {
        //   newErrors.password = "Password must be at least 8 characters";
        // } else {
        //   delete newErrors.password;
        // }
        if (!value) {
          newErrors.password = "Password is required";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)) {
          newErrors.password = "Password must be at least 8+ chars, start uppercase, 1 special, 1 number.";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
      case "role":
        if (!value) {
          newErrors.role = "Role is required";
        } else {
          delete newErrors.role;
        }
        break;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  //register submit close


  //Forgout submit start

  const handleForgotSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }


    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
      // Call an API or perform some other action to register the user
      const data = {
        email: email,
      };
      forgetPassword(data)
        .then(res => {
          if (res.status == true) {
            SetModalConfirmThree(false);
            setButtonState(false);
            showToast('success', res.message);

          } else {
            setButtonState(false);
            toast.info(res.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeButton: true,
              hideProgressBar: false,
              style: {
                background: '#ffff',
                borderLeft: '4px solid #e74c3c',
                color: '#454545',
                "--toastify-icon-color-info": "#ff4e00d1",
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

  const handleForgotBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    switch (name) {

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };


  const handleAccept = () => {

    if (acceptance == true) {
      setAcceptance(false)
    } else {
      setAcceptance(true)
    }

  }

  if (typeof window !== "undefined") {
    window.addEventListener('DOMContentLoaded', clickFunction, false);
  }
  function clickFunction() {
    let menu = document.querySelector('.menu');
    menu?.classList.toggle('active');
  }


  //Forgout submit close

  return (
    <>
      <header className="header-part">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bottom-border">
            <a className="navbar-brand header-logo" href="/" ><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mt-2 ">

                <li className={`nav-item ${router.pathname === '/bookings/step1' ? 'active' : ''}`}>
                  <a className="nav-link" href="/bookings/step1">Start your journey</a>
                </li>

                <li className={`nav-item ${router.pathname === '/whoweare' ? 'active' : ''}`}>
                  <a className="nav-link" href="/whoweare">Who we are</a>
                </li>
                <li className={`nav-item ${router.pathname === '/ourchefs' ? 'active' : ''}`}>
                  <a className="nav-link" href="/ourchefs">Our Chefs</a>
                </li>
                {role == 'user' &&
                  <li className={`nav-item ${router.pathname === '/user/messages' ? 'active' : ''}`}>
                    <a className="nav-link" href="/user/messages">Message</a>
                  </li>}

                {isAuthenticated && role === "admin" && (
                  <li className={`nav-item ${router.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                    <a className="nav-link" href="/admin/dashboard">
                      Dashboard
                    </a>
                  </li>
                )}

                {isAuthenticated && role === "chef" && (
                  <li className={`nav-item ${router.pathname === '/chef/dashboard' ? 'active' : ''}`}>
                    <a className="nav-link" href="/chef/dashboard">
                      Dashboard
                    </a>
                  </li>
                )}
                {isAuthenticated && role === "user" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/user/userprofile">
                      My Profile
                    </a>
                  </li>

                )}

                {isAuthenticated && role === "user" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/user/setting">
                      Settings
                    </a>
                  </li>

                )}

                {isAuthenticated && role === "concierge" && (
                  <li className="nav-item">
                    <a className="nav-link" href="/concierge/dashboard">
                      Dashboard
                    </a>
                  </li>
                )}
                <li className="user nav-item">
                  {!current_user_id ? <a className="nav-link" href="#" onClick={() => signinpopup()} >SignIn</a> : <a className="nav-link" href="#" onClick={handleLogout} >Logout</a>}

                </li>
                {isAuthenticated && (
                  <div className=''>
                    <div className="profile" onClick={clickFunction}>
                      <div className="img-box">
                        {currentUserData.pic && currentUserData.pic != 'null' ? (
                          <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="" />
                        ) : (
                          <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'} alt="" />
                        )}
                      </div>
                    </div>
                    <div className="menu front-menu">
                      <ul>
                        <li className='user_menu'><a href='#'><i className="fa-solid fa-user"></i>&nbsp;{currentUserData.name ? currentUserData.name.substring(0, 15) + '...' : ''}</a><span className="user-role">{currentUserData.role ? currentUserData.role : ''}</span></li>
                        <li><a href={process.env.NEXT_PUBLIC_BASE_URL + 'user/messages'}><i className="fa-solid fa-comments"></i>&nbsp;Chat</a></li>
                        {/* <li><a href={process.env.NEXT_PUBLIC_BASE_URL + `user/notification/notification?id=${currentUserData.id}`}><i className="fa-solid fa-bell"></i>&nbsp;Notification</a></li> */}
                        <li><a href={process.env.NEXT_PUBLIC_BASE_URL + 'user/userprofile'}><i className="fa fa-cog"></i>&nbsp;Settings</a></li>
                        <li><a href="#" onClick={handleLogout}><i className="fa fa-sign-out"></i>&nbsp;Sign Out</a></li>
                      </ul>
                    </div>
                  </div>
                )}
                <div className='d-none-set d-lg-block'>
                  {!current_user_id && (
                    <li className="user nav-item">
                      <div className="dropdown">

                        <div className="banner-btn" style={{ marginTop: '0' }}> <a className="nav-link set-color-text" href="#" onClick={() => { setRole('chef'); signuppopup(); }}>Chef Registration</a></div>
                      </div>
                    </li>
                  )}</div>
                <div className='d-none-set d-lg-block'>
                  {!current_user_id && (
                    <li className="user nav-item">
                      <div className="dropdown">
                        <div className="banner-btn" style={{ marginTop: '0' }}> <a className="nav-link set-color-text" href="#" onClick={() => { setRole('concierge'); signuppopup(); }}>B2B Registration</a></div></div>
                    </li>
                  )}</div>


                {/* mobile view button */}
                <div className='d-block d-lg-none-set'>
                  {!current_user_id && (
                    <><li className="nav-item">
                      <a className="nav-link" href="#" onClick={() => { setRole('chef'); signuppopup(); }}>Chef Registration</a>
                    </li><li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => { setRole('concierge'); signuppopup(); }}>B2B Registration</a>
                      </li></>
                  )}</div>

              </ul>
            </div>
          </nav>
        </div>
      </header>


      {/* // login popup code start  */}
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login" clientIdExists={clientIdExists}
      >
        <div className="text-center popup-img">
          <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" />
        </div>
        <div className="all-form" >
          <form onSubmit={handleLoginSubmit} className="common_form_error" id="login_form">
            <div className='login_div'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="loginemail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleLoginBlur} autoComplete="username" maxLength={50} />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
            </div>
            <div className='login_div'>
              <label htmlFor="password" >Password:</label>
              <input type="password" id="loginpassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleLoginBlur} autoComplete="current-password" />

              {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.password}</span>}
            </div>
            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
          </form>

          <div className='d-flex justify-content-between sign_up_forgot_password'>

            <div className="dropdown text-link mt-2">
              <span className='dont_color'>Don’t have an account? </span>
              <a href="#"
              >
                <span onClick={() => { setRole('user'); signuppopup(); }}>Sign up</span>
              </a>
            </div>


            <p className="text-link text-left my-2"><a href="#" onClick={() => forgotpopup()}><span>Forgot password? </span></a></p>

          </div>

          <button className="btn-g" onClick={() => signIn('google')}><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/g-logo.png'} alt="g-logo" /> Continue with Google</button>

          <button className="btn-g" onClick={() => signIn('facebook')}><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-logo.png'} alt="f-logo" /> Continue with Facebook</button>
        </div>

      </PopupModal>

      {/* // login popup code end  */}

      {/* // register popup code start  */}

      <PopupModal show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
        <div className="text-center popup-img">
          <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" />
        </div>
        <div className="all-form">
          <form onSubmit={handleRegisterSubmit} className="common_form_error" id="register_form">
            <div className='login_div'>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleRegisterBlur} maxLength={50} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.name}</span>}
            </div>
            <div className='login_div'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="registeremail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleRegisterBlur} maxLength={50} />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
            </div>

            {/* <div className='login_div mb-2'>
              <label htmlFor="email">Role:</label>
              <select className="login-select" onChange={(e) => setRole(e.target.value)} name="role">
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="chef">Chef</option>
                <option value="concierge">Concierge</option>
              </select>
              {errors.role && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.role}</span>}
            </div> */}

            <div className='login_div'>
              <label htmlFor="password" className='setmobilepass'>Password:</label>
              <input type="password" id="registerpassword" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password" />
              {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login pasword-mobile" style={{ wordWrap: 'break-word', marginTop: '-8px' }}>{errors.password}</span>}
            </div>
            <div className='login_div'>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password" />
              {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_login" >{errors.confirmPassword}</span>}
            </div>

            <label className='text-start text-decoration-underline fw-bold' role="button" onClick={() => handleAccept()}>Acceptance Policy</label>


            {acceptance && (
              <p className='text-start'>I have read and agree to the <a target="_blank" href='/privacypolicy'>Privacy Policy</a> and  <a target="_blank" href='/termsconditions'>Terms of Use</a> of Private Chefs World. I understand and consent to the collection, processing, and use of my personal data as outlined in these documents. I acknowledge that my information will be handled in accordance with the applicable data protection laws.
              </p>
            )}

            <div className='login_div mt-2'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" style={{ width: 'auto' }} onChange={(e) => setPrivacy(e.target.checked)} />
              <label className="form-check-label" htmlFor="flexCheckIndeterminate" style={{ width: 'auto', marginLeft: "4px" }}>
                I have read and agree to the <a target="_blank" href='/privacypolicy' className='popup-sign-color'>Privacy Policy.</a>
              </label>
              {errors.privacy && <span className="small error text-danger mt-4 d-inline-block error_login" >{errors.privacy}</span>}
            </div>


            <div className='login_div'>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" style={{ width: 'auto' }} onChange={(e) => setTerms(e.target.checked)} />
              <label className="form-check-label mb-4" htmlFor="flexCheckIndeterminate" style={{ width: 'auto', marginLeft: "4px" }}>
                I have read and agree to the <a target="_blank" href='/termsconditions' className='popup-sign-color'>Terms of Use.</a>
              </label>
              {errors.terms && <span className="small error text-danger mt-4 d-inline-block error_login" >{errors.terms}</span>}
            </div>


            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
          </form>
          <p className="text-link text-left my-2"><a href="#" onClick={() => signinpopup()}>Already have account? <span>Sign in</span></a></p>

          <button className="btn-g" onClick={() => signIn('google')}><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/g-logo.png'} alt="g-logo" /> Continue with Google</button>
          {/* <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/a-logo.jpg'} alt="a-logo" /> Continue with Apple</button> */}
          <button className="btn-g" onClick={() => signIn('facebook')}><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-logo.png'} alt="f-logo" /> Continue with Facebook</button>
        </div>

      </PopupModal>

      {/* // register popup code end  */}

      {/* // login popup code start  */}
      <PopupModal show={modalConfirmThree} handleClose={modalConfirmCloseThree} staticClass="var-login">
        <div className="text-center popup-img">
          <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" />
        </div>
        <div className="all-form" >
          <form onSubmit={handleForgotSubmit} className="common_form_error" id="forgot_form">

            <div className='login_div'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleForgotBlur} />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
            </div>

            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
          </form>

        </div>

      </PopupModal>

      {/* // login popup code end  */}
      <ToastContainer />
    </>
  )
}
