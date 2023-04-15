import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import PopupModal from '../../components/commoncomponents/PopupModal';
import { useRouter } from "next/router";
import Login from 'components/auth/Login';
import { register } from '../../lib/frontendapi';
import { removeToken, removeStorageData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({ modalConfirmTwo, setModalConfirmTwo }) {

  const [modalConfirm, setModalConfirm] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [buttonStatus, setButtonState] = useState(false);

  const modalConfirmCloseTwo = () => {
    setModalConfirmTwo(false);
  }

  const signinpopup = () => {
    setModalConfirm(true);
    setModalConfirmTwo(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!role) {
      errors.role = "Role is required";
    }

    setErrors(errors);

    // Submit form data if there are no errors
    if (Object.keys(errors).length === 0) {

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

              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
              });

              setTimeout(() => {
                if (res.data.user.role == 'chef') {
                  window.location.href = '/chef/dashboard';
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
                res.errors[key].forEach(function (errorMessage) {
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

  const handleBlur = (event) => {
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

  return (
    <>

      <PopupModal show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
        <div className="text-center popup-img">
          <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo.png'} alt="logo" />
        </div>
        <div className="all-form">
          <form onSubmit={handleSubmit} id="register_form">
            <div className='register_div'>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={handleBlur} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_register ">{errors.name}</span>}
            </div>
            <div className='register_div'>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur} />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_register">{errors.email}</span>}
            </div>

            <div className='register_div mb-2'>
              <label htmlFor="email">Role:</label>
              <select className="" onChange={(e) => setRole(e.target.value)} name="role">
                <option value="user">User</option>
                <option value="chef">Chef</option>
                <option value="concierge">Conciergehief</option>
              </select>
              {errors.role && <span className="small error text-danger mb-2 d-inline-block error_register">{errors.role}</span>}
            </div>

            <div className='register_div'>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleBlur} />
              {errors.password && <span className="small error text-danger mb-2 d-inline-block error_register">{errors.password}</span>}
            </div>
            <div className='register_div'>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleBlur} />
              {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_register" >{errors.confirmPassword}</span>}
            </div>
            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>Continue</button>
          </form>
          <p className="text-link text-left my-2"><a href="#" onClick={() => signinpopup()}>Already have account? <span>Sign in</span></a></p>

          <div className="or"><p>OR</p></div>
          <div className="mt-2">
            <a href="/admin/dashboard" className="btn-send temprary_login_btn w-100">Login with Admin</a>
          </div>
          <div className="mt-2">
              <a href="/chef/dashboard" className="btn-send temprary_login_btn w-100">Login with Chef</a>
          </div>
          <div className="mt-2">
            <a href="/concierge/dashboard" className="btn-send temprary_login_btn w-100">Login with Concierge</a>
          </div>
          <div className="mt-2">
            <a href="/user/userprofile" className="btn-send temprary_login_btn w-100">Login with User</a>
          </div>
          <div className="mt-2">
            <a href="/bookings/step1" className="btn-send temprary_login_btn w-100">Bookings</a>
          </div>
          {/*<button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/g-logo.png'} alt="g-logo"/> Continue with Google</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/a-logo.jpg'} alt="a-logo"/> Continue with Apple</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-logo.png'} alt="f-logo"/> Continue with Facebook</button>*/}
        </div>

      </PopupModal>

      {modalConfirm && (<Login modalConfirm={modalConfirm} setModalConfirm={setModalConfirm} />)}


    </>
  )
}
