import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { forgetPassword } from '../../lib/frontendapi';
import { useRouter } from 'next/router';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
          router.push('/Login');
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
        <form className="form-center" onSubmit={handleSubmit}>
          <img src={`${process.env.NEXT_PUBLIC_BASE_URL}assets/images/logo-blue.png`} alt="logo-blue" className="logo-blue" />
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <span className="text-danger">{errors.email}</span>}
          <button type="submit" className="btn-send">Reset Password</button>
          <div style={{ color: 'blue' }}>{loading ? 'Sending email...' : 'Send Reset Email'}</div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};
