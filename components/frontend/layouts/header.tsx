import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { login, register, forgetPassword } from '../../../lib/frontendapi';
import { removeToken, removeStorageData, getCurrentUserData, removeBookingData } from "../../../lib/session";
import PopupModal from '../../../components/commoncomponents/PopupModal';
export default function Header({ }) {

  interface Errors {
    password?: string;
    confirmPassword?: string;
    email?: string
    role?: string
    name?: string
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userrole = 'admin';
  const [activeTab, setActiveTab] = useState("");




  useEffect(() => {
    checkuser();

  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");

    if (token && role) {
      setIsAuthenticated(true);
      setRole(role);
    }
  }, []);

  const checkuser = async () => {
    const user: User = getCurrentUserData() as User;
    if (user.id != null) {
      setCurrentUserId(true);

    }
  };

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
    removeToken();
    removeStorageData();
    removeBookingData();
    window.location.href = '/';
    setIsAuthenticated(false);
    setRole("");

  }

  //login submit start

  const handleLoginSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
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

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      // setButtonState(true);
      // Call an API or perform some other action to register the user
      const data = {
        email: email,
        password: password,
      };
      login(data)
        .then((res) => {
          if (res.status == true) {
            if (res.authorisation.token) {
              setIsAuthenticated(true);

              window.localStorage.setItem("token", res.authorisation.token);
              window.localStorage.setItem("id", res.user.id);
              window.localStorage.setItem("name", res.user.name);
              window.localStorage.setItem("email", res.user.email);
              window.localStorage.setItem("role", res.user.role);
              window.localStorage.setItem("pic", res.user.pic);
              window.localStorage.setItem("surname", res.user.surname);
              window.localStorage.setItem("phone", res.user.phone);
              window.localStorage.setItem("approved_by_admin", res.user.approved_by_admin);
              window.localStorage.setItem("profile_status", res.user.profile_status);
              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });

              setTimeout(() => {
                if (res.user.role == "admin") {
                  window.location.href = "/admin/dashboard";
                }
              }, 1000);

              setTimeout(() => {
                if (res.user.role == "user") {
                  window.location.href = "/user/userprofile";
                }
              }, 1000);

              setTimeout(() => {
                if (res.user.role == "chef") {
                  if (
                    res.user.approved_by_admin == "yes" &&
                    res.user.profile_status == "completed"
                  ) {
                    window.location.href = "/chef/dashboard";
                  } else {
                    window.location.href = "/chef/myprofile";
                  }
                }
              }, 1000);
            } else {
              setButtonState(false);
              toast.info(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } else {
            setButtonState(false);
            toast.info(res.message, {
              position: toast.POSITION.TOP_RIGHT,
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
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!role) {
      newErrors.role = "Role is required";
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
              window.localStorage.setItem(
                "approved_by_admin",
                res.data.user.approved_by_admin
              );

              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
              });

              setTimeout(() => {
                if (res.data.user.role == "chef") {
                  window.location.href = "/chef/myprofile";
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
                position: toast.POSITION.TOP_RIGHT
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
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
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
            toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });


          } else {
            setButtonState(false);
            toast.info(res.message, {
              position: toast.POSITION.TOP_RIGHT
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
                {/* <li className="nav-item">
                                  <a className="nav-link active" aria-current="page" href="/covid19">COVID-19</a>
                                </li> */}
                {/* <li className="nav-item">
                  <a className="nav-link" href="/bookings/step1">Start your journey</a>
                </li> */}

                <li className={`nav-item ${router.pathname === '/bookings/step1' ? 'active' : ''}`}>
                  <a className="nav-link" href="/bookings/step1">Start your journey</a>
                </li>
                {/* {isAuthenticated && role === "user" && (
              <li className="nav-item">
                <a className="nav-link" href="/user/dashboard">
                  Dashboard
                </a>
              </li>
            )} */}

                <li className={`nav-item ${router.pathname === '/whoweare' ? 'active' : ''}`}>
                  <a className="nav-link" href="/whoweare">Who we are</a>
                </li>
                <li className={`nav-item ${router.pathname === '/ourchefs' ? 'active' : ''}`}>
                  <a className="nav-link" href="/ourchefs">Our Chefs</a>
                </li>

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
                <li className="user">
                  {!current_user_id ? <a className="nav-link" href="#" onClick={() => signinpopup()} >SignIn/SignUp</a> : <a className="nav-link" href="#" onClick={handleLogout} >Logout</a>}

                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <ToastContainer />

      {/* // login popup code start  */}
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
        <div className="text-center popup-img">
          <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" />
        </div>
        <div className="all-form" >
          <form onSubmit={handleLoginSubmit} className="common_form_error" id="login_form">
            <div className='login_div'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="loginemail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleLoginBlur} autoComplete="username" />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
            </div>
            <div className='login_div'>
              <label htmlFor="password">Password:</label>
              <input type="password" id="loginpassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleLoginBlur} autoComplete="current-password" />

              {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.password}</span>}
            </div>
            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
          </form>

          <div className='d-flex justify-content-between sign_up_forgot_password'>

            <p className="text-link text-left my-2"><a href="#" onClick={() => signuppopup()}>Don’t have an account? <span>Sign up</span></a></p>

            <p className="text-link text-left my-2"><a href="#" onClick={() => forgotpopup()}><span>Forgot password? </span></a></p>

          </div>

          <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/g-logo.png'} alt="g-logo" /> Continue with Google</button>
          <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/a-logo.jpg'} alt="a-logo" /> Continue with Apple</button>
          <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/f-logo.png'} alt="f-logo" /> Continue with Facebook</button>
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
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleRegisterBlur} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.name}</span>}
            </div>
            <div className='login_div'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="registeremail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleRegisterBlur} autoComplete="username" />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
            </div>

            <div className='login_div mb-2'>
              <label htmlFor="email">Role:</label>
              <select className="" onChange={(e) => setRole(e.target.value)} name="role">
                <option value="user">User</option>
                <option value="chef">Chef</option>
                <option value="concierge">Conciergehief</option>
              </select>
              {errors.role && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.role}</span>}
            </div>

            <div className='login_div'>
              <label htmlFor="password">Password:</label>
              <input type="password" id="registerpassword" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password" />
              {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.password}</span>}
            </div>
            <div className='login_div'>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password" />
              {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_login" >{errors.confirmPassword}</span>}
            </div>
            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
          </form>
          <p className="text-link text-left my-2"><a href="#" onClick={() => signinpopup()}>Already have account? <span>Sign in</span></a></p>

          {/* <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/g-logo.png'} alt="g-logo"/> Continue with Google</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/a-logo.jpg'} alt="a-logo"/> Continue with Apple</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-logo.png'} alt="f-logo"/> Continue with Facebook</button> */}
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




    </>
  )
}