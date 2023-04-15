import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { resetPassword } from '@/lib/frontendapi';
import { useRouter } from 'next/router';


export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirm) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    const user = {
      token: token,
      email: email,
      password: password,
      password_confirmation: passwordConfirm
    }
    // resetPassword(user);
    try {
      const response = await resetPassword(user);
      console.log(response)
      if (response.success === true) {
        toast.success("Password reset successful");
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      toast.error("Password reset failed");
    }
  };
  return (
    // <section className="form-part p-0 pb-5">
    //   <div className="container mt-5">
    //     <div className='row justify-content-center'>    
    //     <div className='col-sm-4'>
    //     {/* <div className='text-center'>
    //     <img src={process.env.NEXT_PUBLIC_BASE_URL + "/images/3.png"} alt="logo-blue" className="logo-blue" />
    //     </div> */}
    //     <form className="form-center" onSubmit={handleReset}>
    //       <div className='form-group'>
    //       <label className='mt-3'>Email <span className=''>*</span></label>
    //       <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
    //        className='form-control mt-3'/>
    //       </div>
    //       <div className='form-group'>
    //       <label className='mt-3'>New Password <span>*</span></label>
    //       <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
    //       className='form-control mt-3' />
    //       </div>
    //       <div className='form-group'>
    //       <label className='mt-3'>Confirm Password <span>*</span></label>
    //       <input type="password" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm}
    //         onChange={(e) => setPasswordConfirm(e.target.value)}
    //         className='form-control mt-3'/>
    //       </div>
    //     <div className='mt-4'>
    //     <button type="submit" className="btn-send">Reset Password </button>
    //     </div>
    //     </form>
    //     </div>
    //     </div>
        
    //   </div>
    //   <ToastContainer />
    // </section>
    <>
       <div className="modal fade ppupclass show popopacity"  id="exampleModal2" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog  modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header" />
                        <div className="modal-body">
                            <div className="text-center popup-img">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'}  alt="logo" />
                            </div>
                            <form onSubmit={handleReset}>
                            <div className="all-form">
                            <label className='mt-3'>Email <span className=''>*</span></label>
                             <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                 className='form-control mt-3'/>
                                <label>New Password</label>
                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                      className='form-control mt-3' />
                                <label>Confirm Password</label>
                                <input type="password" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm}
                                         onChange={(e) => setPasswordConfirm(e.target.value)}
                                              className='form-control mt-3'/>
                                
                                <div className="text-right mt-2">
                                <button type="submit" className="btn-send">Reset Password </button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
    </>
  

  );
};

