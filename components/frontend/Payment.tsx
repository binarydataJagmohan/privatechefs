'use client'
import React from 'react';
import { useState,useEffect } from 'react'; // Import useState
import Image from 'next/image';
import { useRouter } from "next/router";
import {savePlanPayment,UpdateUserToOffiline} from '../../lib/userapi';
import { removeToken, removeStorageData } from "../../lib/session";
import { getCurrentUserData } from '../../lib/session'
import Link from 'next/link';
import {toast} from 'react-toastify';
import swal from "sweetalert";


interface FormData {
  CardNumber: string;
  CardExpiredMonth: string;
  CardExpiredYear: string;
  CardCvv: string;
}

interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string
  }


export default function stepTwo() {

  const router = useRouter();

  const [plan_type, setPlanType] = useState('');
  const [plan_amount, setPlanAmount] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [user_id, setUserId] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [formData, setFormData] = useState<FormData>({
    CardNumber: '',
    CardExpiredMonth: '',
    CardExpiredYear: '',
    CardCvv: '',
  });

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: '',
    name: '',
    email: '',
    pic: null,
    surname: '',
    role: '',
    approved_by_admin: ''
  });



  useEffect(() => {
    getUserData();

    const { booking_id, client_amount, chef_id } = router.query;
    
  
  }, []);

  const getUserData = async () => {
    
      const userData = getCurrentUserData() as CurrentUserData;
      setCurrentUserData({
        ...userData,
        id: userData.id,
        name: userData.name,
        pic: userData.pic,
        surname: userData.surname,
        role: userData.role,
        approved_by_admin: userData.approved_by_admin,

      });
     
    
  }

  function validateForm() {
    const newErrors: { [key: string]: string } = {};
    if (!formData.CardNumber) {
      newErrors.CardNumber = 'card number is required';
    }else if (!/^\d{16}$/.test(formData.CardNumber)) {
      newErrors.CardNumber = 'Invalid card number';
    } 

    if (!formData.CardExpiredMonth ) {
      newErrors.CardExpiredMonth = 'card expiry month is required';

    } else if (!/^((0[1-9])|(1[0-2]))$/.test(formData.CardExpiredMonth)) {
      newErrors.CardExpiredMonth = 'Invalid expiry month';  
    }

    if (!formData.CardExpiredYear) {
        newErrors.CardExpiredYear = 'card expiry date is required';
    } else if (!/^\d{4}$/.test(formData.CardExpiredYear)) {
        newErrors.CardExpiredYear = 'Invalid expiry year';
    }

    if (!formData.CardCvv) {
      newErrors.CardCvv = 'card cvv is required';
    } else if (!/^\d{3}$/.test(formData.CardCvv)){
      newErrors.CardCvv = 'Invalid cvv';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function SubmitPaymentForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      const data = {
        user_id:router.query.client_id,
        booking_id: router.query.booking_id,
        amount:router.query.amount,
        chef_id:router.query.chef_id,
        applied_id:router.query.applied_id ? router.query.applied_id : null ,
        card_number:formData.CardNumber,
        exp_month:formData.CardExpiredMonth,
        exp_year:formData.CardExpiredYear,
        cvc:formData.CardCvv
      }

      savePlanPayment(data)
        .then(res => {  
          if(res.status == true){
           

            swal({
            icon: 'success',
            title: 'Thank You',
            text: 'Your payment has been successfully done',
            }).then(function () {
            
            router.push('/');
            
            });

            

          }else {
            
            toast.error(res.message);
            setIsLoading(false);
          }
            
        }) .catch(err => {
          const errorMessage = err.response.data.message;
          console.log(errorMessage)
          toast.error(errorMessage);
          setIsLoading(false);
        });
       

    }else {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    UpdateUserToOffiline(currentUserData.id)
      .then(res => {
        if (res.status == true) {
          removeToken();
          removeStorageData();
          window.location.href = '/';
        } else {
          console.log("error");
        }
      })

  }

  return (
    <>
     

      <section className="userprofile-part">
        <div className="container">
        <div className="my-profile mt-5 mb-5 tab-m-0">
            <h2> Booking Payment <span className="log-out">{currentUserData.id  && (
                <a onClick={handleLogout} role="button" >Log out</a>
            )}</span></h2>
          </div>
          <form action="" className='commanclassall' onSubmit={SubmitPaymentForm}>
            <div className="row">
            {currentUserData.id && (
            <div className="col-lg-3 col-md-12">
                <div className="my-profile">
                  <div className="profile-cols  active">
                    <h4>Account Settings</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                  <a href="/user/booking">
                    <div className="profile-cols mt-4">
                      <h4>My Bookings</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </a>

                  <a href={`/user/messages`}>
                    <div className="profile-cols mt-4 mb-4">
                      <h4>My Messages</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
           
              <div className="col-lg-7 col-md-12">
                <div className="all-form tab-m-0 pt-0 right-left-spacing">
                  <div className="row">
                      <div className='col-lg-12 col-md-12'>
                        <h2 className='d-inline-block fw-bolder'> Payment Details</h2>
                        <div className='float-end'>
                        <img className='' src={process.env.NEXT_PUBLIC_BASE_URL + 'images/stripe.png'} width={250} alt="logo-8" />
                        </div>
                      </div>
  
                    <div className="col-lg-12 col-md-12">
                      
                      <label htmlFor="">Card Number*</label>
                      <input type="text" className="form-control" placeholder='Enter Card Number' value={formData.CardNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, CardNumber: e.target.value })
                        }
                        maxLength={16} />
                         {errors.CardNumber && (
                           <small className="small error text-danger mb-2 d-inline-block error_login">{errors.CardNumber}</small>
                        )}

                    </div>
                    <div className="col-lg-12 col-md-12">
                        <label htmlFor="">Expiry Month*</label>
                        <input type="text" className="form-control"  placeholder='MM' value={formData.CardExpiredMonth}
                            onChange={(e) =>
                            setFormData({ ...formData, CardExpiredMonth: e.target.value })
                            }
                            maxLength={2} />
                            {errors.CardExpiredMonth && (
                            <small className="error-message text-danger">{errors.CardExpiredMonth}</small>
                            )}
                    </div>
                    <div className="col-lg-12 col-md-12">
                     <label htmlFor="">Expiry Year*</label>
                      <input type="text" className="form-control"  placeholder='YYYY' value={formData.CardExpiredYear}
                        onChange={(e) =>
                          setFormData({ ...formData, CardExpiredYear: e.target.value })
                        }
                        maxLength={4} />
                         {errors.CardExpiredYear && (
                           <small className="error-message text-danger">{errors.CardExpiredYear}</small>
                        )}
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <label htmlFor="cvv">CVV*</label>
                        <input type="text" className="form-control"  placeholder='ex. 321' value={formData.CardCvv}
                        onChange={(e) =>
                          setFormData({ ...formData, CardCvv: e.target.value })
                        }
                        maxLength={3}  />
                        {errors.CardCvv && (
                           <small className="error-message text-danger">{errors.CardCvv}</small>
                        )}
                    </div>
                    <div className="col-lg-12 col-md-12">
                     <label htmlFor="">Amount</label>
                      <input type="text" className="form-control"  placeholder='price' value={router.query.amount}
                        disabled/>
                         
                    </div>
                  </div>

                  <div className="mt-4">
                    <button className="table-btn" type="submit" disabled={isLoading}>{isLoading ? 'processing..' : 'Submit'}</button>
                  </div>       
                
             
                </div>
              </div>
              
            </div>
          </form>
          
        </div>
      </section>

      
    </>
  );
}
