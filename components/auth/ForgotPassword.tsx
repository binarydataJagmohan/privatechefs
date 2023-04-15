import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Login from '../../components/auth/Login';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { forgetPassword } from '../../lib/frontendapi';
import { useRouter } from 'next/router';

export default function ForgotPassword() {

  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await forgetPassword({ email });
      console.log(response)
      if (response.success === true) {
        toast.success('Password reset email sent successfully');
        setTimeout(() => {
          router.push('/');
        }, 3000);

      } else {
        toast.error('Password reset email failed to send');
      }
    } catch (error) {
      toast.error('Password reset email failed to send');
    }
    setLoading(false);
  };

  return (
    <section className="form-part ">
      <div className="container mt-5">
        <form className="form-center" >
          {/* <img src={`${process.env.NEXT_PUBLIC_BASE_URL}assets/images/logo-blue.png`} alt="logo-blue" className="logo-blue" /> */}
          {/* <label>Email</label> */}
          {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="text-danger">{errors.email}</span>} */}
          <button type="button" className="btn-send" data-bs-toggle="modal" href="#exampleModal2">Reset Password</button>
          {/* <div style={{ color: 'blue' }}>{loading ? 'Sending email...' : 'Send Reset Email'}</div> */}
        </form>
      </div>

      <ToastContainer />
      <div className="container"> 
                {/* <button className="table-btn btn-2" data-bs-toggle="modal" data-bs-target="#exampleModal2">Sign In</button> */}
                <div className="popup-part ">
                    <div className="modal fade ppupclass" id="exampleModal2"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content">
                          <div className="modal-header">                             
                          </div>
                          <div className="modal-body">
                              <div className="text-center popup-img">
                              <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'}  alt="logo" />
                              </div>
                              <div className="all-form">
                                <form onSubmit={handleSubmit}>
                                  <label>Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                     {errors.email && <span className="text-danger">{errors.email}</span>}
                                       <div className="text-right mt-2">
                                        <button type="submit" className="btn-send" data-bs-toggle="modal" >Reset Password</button>
                                          <div style={{ color: 'blue' }}>{loading ? 'Sending email...' : ''}</div>
                                       </div>
                                    </form>
                                 </div>
                          </div> 
                        </div>
                      </div>
                    </div>
                </div>

      </div>
        
    </section>
  );
};
