import React, { useState, useEffect } from 'react'
import { saveContact } from "../../lib/frontendapi";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Contact() {

    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhoneno] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors]: any = useState({});
    const [buttonStatus, setButtonState] = useState(false);


    const handleContactSubmit = (e: any) => {
        e.preventDefault();
        // Validate form data
        const errors: any = {};
        if (!name) {
            errors.name = "Name is required";
        }
        if (!email) {
            errors.email = "Email is required";
        }
        if (!phone_no) {
            errors.phone_no = "Phone No. is required";
        }
        if (!message) {
            errors.message = "Message is required";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setButtonState(true);
            // Call an API or perform some other action to register the user
            const data = {
                name: name,
                email: email,
                phone_no: phone_no,
                message: message,
            };

            saveContact(data)
                .then(res => {
                    if (res.status == true) {
                        console.log(res.status);
                        setButtonState(false);
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: '#ffff',
                                borderLeft: '4px solid #ff4e00',
                                color: '#454545',
                                "--toastify-icon-color-success": "#ff4e00",
                            },
                            progressStyle: {
                                background: '#ffff',
                            },
                        });

                    } else {
                        setButtonState(false);
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: '#ffff',
                                borderLeft: '4px solid #e74c3c',
                                color: '#454545',
                            },
                            progressStyle: {
                                background: '#ffff',
                            },
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    return (
        <>
            <section className="banner-part ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-6.jpg'} alt="banner-6" className="w-100   img-b" />
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <form onSubmit={handleContactSubmit}>
                                <div className="all-form">
                                    <h2>Contact us</h2>
                                    <label>Name Surname</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
                                    <label>Phone Number</label>
                                    <PhoneInput
                                        country={"us"}
                                        value={phone_no}
                                        onChange={(phone_no) => setPhoneno(phone_no)}
                                    // add the required attribute here
                                    />
                                    {errors.phone_no && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.phone_no}</span>}
                                    <label>Your message</label>
                                    <textarea name="message" value={message || ''} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    {errors.message && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.message}</span>}
                                    <div className="text-right">
                                        <button className="table-btn" type="submit" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-part" id="faq">
                <div className="container">
                    <h3>Frequently Asked Questions (FAQ)</h3>
                    <ul className="table_header_button_section mt-3">
                        <li><button className="table-btn">I am a Chef</button></li>
                        <li><button className="table-btn btn-2">I am customer</button></li>
                    </ul>
                    <div className="accordion-part mt-5">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        How does Private Chef Work?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Who is the team behind Private Chefs?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        How can I contact Private Chefs?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="heading4">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                        Do I need to pay in order to use Take a Chef?
                                    </button>
                                </h2>
                                <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="heading5">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                        Who can be a Chef?
                                    </button>
                                </h2>
                                <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="heading6">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                        How can I receive requests through Take a Chef?
                                    </button>
                                </h2>
                                <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="heading7">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                        How can I receive requests through Take a Chef?
                                    </button>
                                </h2>
                                <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="heading8">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                        How can I receive requests through Take a Chef?
                                    </button>
                                </h2>
                                <div id="collapse8" className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Private Chefs allows you to enjoy the experience of having a private chef anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}