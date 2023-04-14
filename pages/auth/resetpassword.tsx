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
          router.push('/Login');
        }, 3000);
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      toast.error("Password reset failed");
    }
  };
  return (
    <section className="form-part ">
      <div className="container mt-5">
        <form className="form-center" onSubmit={handleReset}>
          <img src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/logo-blue.png"} alt="logo-blue" className="logo-blue" />
          <label>Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">New Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input type="password" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button type="submit" className="btn-send">Reset Password </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

