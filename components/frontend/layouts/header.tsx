import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic'
import Login from '../../../components/auth/Login';
import { useRouter } from "next/router";
import { ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {login,register,forgetPassword} from '../../../lib/frontendapi';
import PopupModal from '../../../components/commoncomponents/PopupModal';
export default function Header({}) {

    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalConfirmTwo, setModalConfirmTwo] = useState(false);
    const [modalConfirmThree, SetModalConfirmThree] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [buttonStatus, setButtonState] = useState(false);
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

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
    };

    const signinpopup = () => {
        setModalConfirm(true);
        setModalConfirmTwo(false);
        SetModalConfirmThree(false);
        setButtonState(false);
    };

    const forgotpopup = () => {
        SetModalConfirmThree(true);
        setModalConfirm(false);
        setModalConfirmTwo(false);
        setButtonState(false);
    };

    

    //login submit start

    const handleLoginSubmit = (event) => {
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

      const handleLoginBlur = (event) => {
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

    const handleRegisterSubmit = (event) => {
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
             role:role
           };
           register(data)
          .then(res => {
            if(res.status==true){
              if(res.data.token){

                window.localStorage.setItem("token", res.data.token);
                window.localStorage.setItem("id", res.data.user.id);
                window.localStorage.setItem("name", res.data.user.name);
                window.localStorage.setItem("email", res.data.user.email);
                window.localStorage.setItem("role", res.data.user.role);
               
                toast.success(res.message, {
                  position: toast.POSITION.TOP_RIGHT
                });
                
                setTimeout(() => {
                  if(res.data.user.role == 'chef'){
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
                Object.keys(res.errors).forEach(function(key) {
                  res.errors[key].forEach(function(errorMessage) {
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

      const handleRegisterBlur = (event) => {
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

    const handleForgotSubmit = (event) => {
        event.preventDefault();
    
        // Validate form data
        const errors = {};
    
        if (!email) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Invalid email address";
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
            if(res.status==true){
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

      const handleForgotBlur = (event) => {
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
                        <a className="navbar-brand header-logo" href="/" ><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo"/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mt-2 ">
                                {/* <li className="nav-item">
                                  <a className="nav-link active" aria-current="page" href="/covid19">COVID-19</a>
                                </li> */}
                                <li className="nav-item">
                                  <a className="nav-link" href="/startjourney">Start your journey</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="/whoweare">Who we are</a>
                                </li> 
                                <li className="nav-item">
                                    <a className="nav-link" href="/ourchefs">Our Chefs</a>
                                </li>  
                              
                                <li className="user">
                                    <a className="nav-link" href="#" onClick={() => setModalConfirm(true)}>SignIn/SignUp</a>
                                </li>
                            </ul> 
                        </div> 
                    </nav>
                </div>
            </header>
            <ToastContainer/>     

              {/* // login popup code start  */}
              <PopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
                  <div className="text-center popup-img">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                  </div>
                  <div className="all-form" > 
                  <form onSubmit={handleLoginSubmit} className="common_form_error" id="login_form">
                      
                      <div className='login_div'>
                          <label htmlFor="email">Email:</label>
                          <input type="email" id="loginemail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleLoginBlur}  autoComplete="username"/>
                          {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
                      </div>
                      <div className='login_div'>
                          <label htmlFor="password">Password:</label>
                          <input type="password" id="loginpassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleLoginBlur} autoComplete="current-password"/>

                          {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.password}</span>}
                      </div>
                    
                      <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit' }</button>
                  </form>
                              
                      <div className='d-flex justify-content-between sign_up_forgot_password'>

                      <p className="text-link text-left my-2"><a href="#" onClick={() => signuppopup()}>Don’t have an account? <span>Sign up</span></a></p>

                      <p className="text-link text-left my-2"><a href="#" onClick={() => forgotpopup()}><span>Forgot password? </span></a></p>

                      </div>
                  
                      <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/g-logo.png'} alt="g-logo"/> Continue with Google</button>
                      <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/a-logo.jpg'} alt="a-logo"/> Continue with Apple</button>
                      <button className="btn-g"><img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-logo.png'} alt="f-logo"/> Continue with Facebook</button>
                  </div>

              </PopupModal>

             {/* // login popup code end  */}

             {/* // register popup code start  */}

             <PopupModal show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
                <div className="text-center popup-img">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                </div>
                <div className="all-form"> 
                <form onSubmit={handleRegisterSubmit} className="common_form_error" id="register_form">
                    <div className='register_div'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name"  name="name" value={name} onChange={(e) => setName(e.target.value)}  onBlur={handleRegisterBlur} />
                        {errors.name && <span className="small error text-danger mb-2 d-inline-block error_register ">{errors.name}</span>}
                    </div>
                    <div className='register_div'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="registeremail" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleRegisterBlur} autoComplete="username"/>
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
                        <input type="password" id="registerpassword" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password"/>
                        {errors.password && <span className="small error text-danger mb-2 d-inline-block error_register">{errors.password}</span>}
                    </div>
                    <div className='register_div'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password"/>
                        {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_register" >{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit' }</button>
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
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                </div>
                <div className="all-form" > 
                <form onSubmit={handleForgotSubmit} className="common_form_error" id="forgot_form">
                    
                    <div className='login_div'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleForgotBlur}/>
                        {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
                    </div>
                                      
                    <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit' }</button>
                </form>
                            
                </div>

			      </PopupModal>

             {/* // login popup code end  */}

            

                                
        </>
  )
}