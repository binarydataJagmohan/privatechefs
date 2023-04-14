import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic'
import PopupModal from '../../components/commoncomponents/PopupModal';
import Register from 'components/auth/Register';
import { useRouter } from "next/router";
import {login} from '../../lib/frontendapi';
import { removeToken, removeStorageData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ modalConfirm, setModalConfirm }) {

    const [modalConfirmTwo, setModalConfirmTwo] = useState(false);
    const [buttonStatus, setButtonState] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const modalConfirmClose = () => {
      setModalConfirm(false);
    };

    const signuppopup = () => {
        setModalConfirm(false);
        setModalConfirmTwo(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Validate form data
        const errors = {};
    
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
        

        setErrors(errors);
    
        // Submit form data if there are no errors
        if (Object.keys(errors).length === 0) {
          setButtonState(true);
           // Call an API or perform some other action to register the user
           const data = {
             email: email,
             password: password,
           };
           login(data)
          .then(res => {
            if(res.status==true){
                if(res.authorisation.token){

                window.localStorage.setItem("token", res.authorisation.token);
                window.localStorage.setItem("id", res.user.id);
                window.localStorage.setItem("name", res.user.name);
                window.localStorage.setItem("email", res.user.email);
                window.localStorage.setItem("role", res.user.role);

                toast.success(res.message, {
                  position: toast.POSITION.TOP_RIGHT
                });
           
              } else {
                setButtonState(false);
                toast.info(res.message, {
                  position: toast.POSITION.TOP_RIGHT
                });
              }
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

      const handleBlur = (event) => {
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

    return (
        <>
            
            <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
                <div className="text-center popup-img">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                </div>
                <div className="all-form" > 
                <form onSubmit={handleSubmit} id="login_form">
                    
                    <div className='login_div'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleBlur}/>
                        {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
                    </div>
                    <div className='login_div'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleBlur}/>
                        {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.password}</span>}
                    </div>
                   
                    <button type="submit" className="btn-send w-100" disabled={buttonStatus}>Continue</button>
                </form>
                    <p className="text-link text-left my-2"><a href="#" onClick={() => signuppopup()}>Don’t have an account? <span>Sign up</span></a></p>
                    
                    {/* <div className="or"><p>OR</p></div>
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
                    </div> */}
                    {/*<button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/g-logo.png'} alt="g-logo"/> Continue with Google</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/a-logo.jpg'} alt="a-logo"/> Continue with Apple</button>
                    <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-logo.png'} alt="f-logo"/> Continue with Facebook</button>*/}
                </div>

			</PopupModal>

            {modalConfirmTwo && ( <Register modalConfirmTwo={modalConfirmTwo} setModalConfirmTwo={setModalConfirmTwo} /> )} 

        </>
  )
}
