import React, { useState ,useEffect} from 'react';
import Slider from "react-slick";
import { useRouter } from "next/router";
import {CheckUserEmailVerification,CheckUserResetPasswordVerification,UpdateResetPassword} from '../../lib/frontendapi';
import PopupModal from '../../components/commoncomponents/PopupModal';
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeBookingData } from "../../lib/session";
export default function Home() {

    const router = useRouter();
    const [modalConfirmTwo, setModalConfirmTwo] = useState(false);
    const [buttonStatus, setButtonState] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});


    useEffect(() => {
        
        removeBookingData();

        if(router.query.id && router.query.hash ){
            CheckEmailVerification();
        }

        if(router.query.userid && router.query.resettoken ){
            CheckResetPasswordVerification();
        }

    }, [router]);

    const CheckResetPasswordVerification = async () => {
        const data = {
            id:router.query.userid,
            token:router.query.resettoken
        }

        CheckUserResetPasswordVerification(data)
        .then(res => {
            if(res){
               if(res.status == true){
                setModalConfirmTwo(true);
               }else {
                    swal.fire({
                        title: 'Oops!',
                        text: res.message,
                        icon: 'info',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'confirm-button-class'
                        }
                    });
               }
            }
        })
        .catch(err => {
            console.log(err);
        });
    }   

    const CheckEmailVerification = async () => {
        const data = {
            id:router.query.id,
            token:router.query.hash
        }

        CheckUserEmailVerification(data)
        .then(res => {
            if(res){
               if(res.status == true){
                    Swal.fire({
                        title: 'Thanks!',
                        text: res.message,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'confirm-button-class'
                        }
                        
                    });
               }else {
                    Swal.fire({
                        title: 'Oops!',
                        text: res.message,
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'confirm-button-class'
                        }
                    });
               }
            }
        })
        .catch(err => {
            console.log(err);
        });
    }



    const modalConfirmCloseTwo = () => {
        setModalConfirmTwo(false);
    }

    //register submit start

    const handleResetSubmit = (event) => {
        event.preventDefault();
    
        // Validate form data
        const errors = {};
        
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
        
        setErrors(errors);
    
        // Submit form data if there are no errors
        if (Object.keys(errors).length === 0) {

          setButtonState(true);
         
           // Call an API or perform some other action to register the user
           const data = {
             user_id:router.query.userid,
             password: password,
           };
           UpdateResetPassword(data)
          .then(res => {
            if(res.status==true){

                setButtonState(false);
                toast.success(res.message, {
                  position: toast.POSITION.TOP_RIGHT
                });
                
             
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

      const handleResetBlur = (event) => {
        const { name, value } = event.target;
        const newErrors = { ...errors };
    
        switch (name) {
          
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
            break;
          default:
            break;
        }
    
        setErrors(newErrors);
      };
    
       //register submit close


    
    const settings = {
        rows: 1,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        //slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        autoplay:true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            } 
        ]
    }

    return(
        <>
            <section className="banner-part">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/banner.webp'} alt="banner"/>
                    </div>
                    <div className="col-sm-4">
                    <div className="banner-text home-page-banner-text">
                    <h1>Creating memories with food</h1>
                    <div className="banner-btn"><a href="/startjourney">Start your journey</a></div>
                    </div>
                    </div>
                </div>    
                </div>
            </section>
       
            <section className="experience-slider mt-5">
                <div className="container">
                    <h3> Get inspired for your next experience</h3>
                </div>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <Slider {...settings}>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/slider-1.webp'} alt="slider-1"/>
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/slider-2.webp'} alt="slider-2"/>
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/slider-3.webp'} alt="slider-3"/>
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/slider-4.webp'} alt="slider-4"/>
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/slider-2.webp'} alt="slider-2"/>
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/slider-4.webp'} alt="slider-4"/>
                                    <p className="plase-btn"><a href="#">Greece</a></p>
                                </div> 
                            </div>
                        </Slider>
                    </div> 
                    <div className="text-center view-more mt-4"><a href="#">View More</a></div>
                </div> 
            </section>

             <section className="services-part mt-4">
                <div className="container">
                    <h2> Our services</h2>
                    <p className="dis-max-width mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris.</p>
                    <div className="row mt-5">
                        <div className="col-lg-4 col-md-6">
                            <div className="card-box">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/11.webp'} alt="11" />
                            <h3>Chefs</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card-box">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/12.webp'} alt="11" />
                            <h3>Butlers</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card-box">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/13.webp'} alt="11" />
                            <h3>Bartenders</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>
                        {/*<div className="col-lg-3 col-md-6">
                            <div className="card-box">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/14.webp'} alt="11" />
                            <h3>Massage</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. </p>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </section>
            <section className="text-side">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/7.webp'} alt="7" className="border-radius" />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="contant-box mt-5 mt-0-1024">
                        <h2>Design your next experience</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec feugiat odio elit varius et feugiat in mattis. Convallis pellentesque suspendisse adipiscing lectus ultrices tristique eget. Dignissim elit in habitasse urna. Euismod commodo eget quis arcu neque. Suspendisse scelerisque vitae fringilla felis, a in. Nec facilisis rhoncus sit interdum amet massa eu erat in. Cursus sapien nulla tellus eu tellus quis ante a id. Nisi, sodales velit in malesuada porttitor in aliquet elit tellus. Arcu penatibus ornare id tortor, leo nulla aenean. Fusce.</p>
                        <div className="banner-btn"><a href="/startjourney">Start your journey</a></div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            <section className="services-part mt-5">
                <div className="container">
                    <h2>How it works?  </h2>
                    <p className="dis-max-width mb-4">We know chefs. We know the materials. W deliver results.</p>
                    <p className="dis-max-width mb-4">The aim of our service is to make the booking process from choosing a menu to the arrival of your private chef (at the place & time you want them) as quick & easy as possible for you.</p>
                    <div className="row mt-5">
                    <div className="col-lg-4 col-md-6">
                        <div className="num-list">
                          <h4><span className="big-48">1</span> You choose the menu</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">2</span> We buy the ingredients </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">3</span> We cook in your kitchen</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                    <div className="col-lg-2 col-md-12"> </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">4</span> We serve each dish </h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                         <div className="num-list">
                          <h4><span className="big-48">5</span> We clean up</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida tincidunt maecenas malesuada ullamcorper velit amet vel. Diam tellus laoreet dolor lorem facilisis eleifend odio suspendisse. Mauris sodales quis odio nulla.</p>
                         </div>
                        </div>
                        <div className="col-lg-2 col-md-12"> </div>
                    </div>
                    
                </div>
            </section>

            <section className="experience-slider "> 
                <div className="container-fluid ">
                 <h2>Instagram feeds</h2>
                    <div className="row mt-5">
                        <Slider {...settings}>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-1.webp'} alt="f-1"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-2.webp'} alt="f-2"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-3.webp'} alt="f-3"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-4.webp'} alt="f-4"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-5.webp'} alt="f-5"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-1.webp'} alt="f-1"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-5.webp'} alt="f-5"/> 
                                </div> 
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <div className="slider-img-plase">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/f-3.webp'} alt="f-3"/> 
                                </div> 
                            </div>
                        </Slider>
                    </div>  
                </div> 
            </section>

            <section className="testimonial-part"> 
                <div className="container">
                    <h2 className="text-center">What they say about us...</h2>
                    <h4 className="text-center">So proud to create such beautiful memories!</h4>
                    <div className="row mt-5">
                        <div className="col-lg-4 col-md-12">
                            <div className="test-box">
                                <p>The best culinary week of my life was with Chef Andreas in Mykonos. The tallent this Chef has is amazing. He took care of me and my family as we were his own. Highly recomended.</p>
                                <div className="row">
                                    <div className="col-3">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/ava4.png'} alt="ava4"/> 
                                    </div>
                                    <div className="col-9">
                                        <div className="say">
                                            <h5 className="mt-2">Christopher Adams</h5>
                                            <p className="font-12">Basebassl player</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="test-box">
                                <p>I had my weeding thid year in Greece and we were recomended to contracts Private Chefs Worldwide for our ceremony event. This was the best choice i have made for a high end catering. Everything was spectacular.</p>
                                <div className="row">
                                    <div className="col-3">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/ava3.png'} alt="ava3"/> 
                                    </div>
                                    <div className="col-9">
                                        <div className="say">
                                            <h5 className="mt-2">Mila Kunis</h5>
                                            <p className="font-12">Make-up artist</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="test-box">
                                <p>I travelled in Spain with my friends and heard about this amazing company. They provided us a Chef and assistant for a week and the food was out of this world. Everythid super fresh and made at the spot.</p>
                                <div className="row">
                                    <div className="col-3">
                                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/ava2.png'} alt="ava2"/> 
                                    </div>
                                    <div className="col-9">
                                        <div className="say">
                                            <h5 className="mt-2">Mike Stuart</h5>
                                            <p className="font-12">IT Tech</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="trusted-part">
              <div className="container">
                <h2>Trusted by pioneers around the world</h2>
                <p>Serving exelence and quality services to clients around the globe. <br/> Our paramount priority? You...</p>

                <div className="row   mt-5">
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-1.png'} alt="logo-1"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-2.png'} alt="logo-2"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-3.png'} alt="logo-3"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-4.png'} alt="logo-4"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-5.png'} alt="logo-5"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-6.png'} alt="logo-6"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-7.png'} alt="logo-7"/> 
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="logos">
                         <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo-8.png'} alt="logo-8"/> 
                        </div>
                    </div>
                </div>
              </div>
            </section>
 
             {/* // register popup code start  */}

             <PopupModal show={modalConfirmTwo} handleClose={modalConfirmCloseTwo} staticClass="var-login">
                <div className="text-center popup-img">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/logo.png'} alt="logo" />
                </div>
                <div className="all-form"> 
                <form onSubmit={handleResetSubmit} id="reset_register_form">

                    <div className='register_div'>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="resetpassword" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleResetBlur} autoComplete="new-password"/>
                        {errors.password && <span className="small error text-danger mb-2 d-inline-block error_register">{errors.password}</span>}
                    </div>
                    <div className='register_div'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="resetconfirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleResetBlur} autoComplete="new-password"/>
                        {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_register" >{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="btn-send w-100" disabled={buttonStatus}>{buttonStatus ? 'Please wait' : 'Submit'}</button>
                </form>
                   
                </div>

			</PopupModal>

            {/* // register popup code end  */}

        </>
    )
}