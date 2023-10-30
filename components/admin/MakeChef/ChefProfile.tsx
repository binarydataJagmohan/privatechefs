import React, { useState, useEffect, useRef } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { admincreateChef, updateChefImage, } from '../../../lib/adminapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";


export default function ChefProfile() {

    interface User {
        id: number;
        name: string;
        surname: string;
        email: string;
        approved_by_admin: string;
        address: string;
        phone: string;
        passport_no: string;
    }

    interface UserData {
        pic: string | null;
    }

    interface Errors {
        email?: string
        name?: string
        surname?: string
        address?: string
        phone?: string
        passport_no?: string
        password?: string
        confirmPassword?: string
    }

    const [name, setFullName] = useState("");
    const [surname, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [passport_no, setPassportNo] = useState("");
    const [image, setImage] = useState('');
    const [buttonStatus, setButtonState] = useState(false);
    const [errors, setChefErrors] = useState<Errors>({});
	const [BIC, setBIC] = useState("");
	const [IBAN, setIBAN] = useState("");
	const [bank_name, setBankName] = useState("");
	const [holder_name, setHolderName] = useState("");
	const [bank_address, setBankAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentUserData, setCurrentUserData] = useState<User>({
        id: 0,
        name: "",
        surname: "",
        email: "",
        approved_by_admin: "",
        address: "",
        phone: "",
        passport_no: "",
    });

    const [userData, setUserData] = useState<UserData>({ pic: "" });
    const mapRef = useRef(null);
    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState(null);

    const imageChange = (e: any) => {
        const file = e.target.files[0];        
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleRegisterSubmit = (event: any) => {
        event.preventDefault();
        // Validate form data
        const newErrors: Errors = {};
        if (!name) {
            newErrors.name = "Name is required";
        }
        if (!surname) {
            newErrors.surname = "SurName is required";
        }
        if (!address) {
            newErrors.address = "Address is required";
        }
        if (!phone) {
            newErrors.phone = "Phone Number is required";
        }
        if (!passport_no) {
            newErrors.passport_no = "Passport No. is required";
        }
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email address";
        }
        if (!password) {
            newErrors.password = "Password is required";
          } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
          }
          if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
          } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
          }
        setChefErrors(newErrors);
        // Submit form data if there are no errors
        if (Object.keys(newErrors).length === 0) {
            const userData: any = getCurrentUserData();
            setButtonState(true);
            // Call an API or perform some other action to register the user
            const data = {
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                address: address,
                passport_no: passport_no,
                created_by: userData.id,
                image:selectedImage,
                BIC:BIC,
                IBAN:IBAN,
                bank_name:bank_name,
                holder_name:holder_name,
                bank_address:bank_address,
                password: password,
            };
            console.log(data);
            
            admincreateChef(data)
                .then(res => {
                    if (res.status == true) {
                        setButtonState(false);
                        setTimeout(() => {
                            router.push("/admin/chefs");
                        }, 1000);
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: '#ffff',
                                borderLeft: '4px solid #ff4e00d1',
                                color: '#454545',
                                "--toastify-icon-color-success": "#ff4e00d1",
                            },
                            progressStyle: {
                                background: '#ffff',
                            },
                        }
                        );

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
    };


    const handleRegisterBlur = (event: any) => {
        const { name, value } = event.target; // Use 'name' to identify the field
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
            break; // Don't forget to add 'break' here
          default:
            break;
        }
        setChefErrors(newErrors);
      };
      

    return (
        <>
            <div className="table-part">
                <h2>Add Chef</h2>
                <div className="tab-part change-btn-colors">
                    <div className="border-bottom pb-3">
                        <ul className="nav nav-pills text-left-j " id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Chef Profile</button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content mt-4" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <form onSubmit={handleRegisterSubmit}>
                                <div className="row">
                                    <div className="col-lg-4 col-md-12">
                                        <div className="text-left">
                                            <h5>Personal Information</h5>
                                            <p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
                                            <div className="picture-profile">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-5 col-4 pr-0">
                                                        <div className="user-img1 set-change-img">
                                                            {selectedImage ? (
                                                                <img
                                                                    src={URL.createObjectURL(selectedImage)}
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'}
                                                                    alt=""
                                                                />
                                                            )}

                                                            <label>
                                                                <input
                                                                    type="file"
                                                                    name="image"
                                                                    id="uploadfile"
                                                                    className="d-none"
                                                                    onChange={imageChange}
                                                                    accept=".jpg, .jpeg, .gif, .png, .webp"
                                                                />
                                                                <i className="fa-solid fa-camera"></i>
                                                            </label>
                                                        </div>

                                                    </div>
                                                    <div className="col-lg-8 col-md-7 col-8">
                                                        <div className="user-profile-collapsed mt-3">
                                                            <h6>Profile Picture</h6>
                                                            <p className="f-10-2">Chef</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-12">
                                        <div className="all-form">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-6">
                                                    <label>Name</label>
                                                    <input type="text" name="name" onChange={(e) => setFullName(e.target.value)} />
                                                    {errors.name && (
                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                            {errors.name}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <label>Surname</label>
                                                    <input type="text" name="surname" onChange={(e) => setSurName(e.target.value)} />
                                                    {errors.surname && (
                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                            {errors.surname}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <label>Email</label>
                                                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />

                                                    {errors.email && (
                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                            {errors.email}
                                                        </span>
                                                    )}

                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                    <label>Phone Number</label>
                                                    <PhoneInput
                                                        country={"us"}
                                                        onChange={(phone) => setPhone(phone)}
                                                    />
                                                    {errors.phone && (
                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                            {errors.phone}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-lg-5 col-md-6">
                                                    <label>Address</label>
                                                    <input id="address-input" type="text" name="address" onChange={(e) => setAddress(e.target.value)} />
                                                    {errors.address && (
                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                            {errors.address}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="col-lg-3 col-md-6">
                                                    <label>ID/Passport No.</label>
                                                    <input type="text" name="passport_no" onChange={(e) => setPassportNo(e.target.value)} />

                                                    {errors.passport_no && (
                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                            {errors.passport_no}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Bank Details</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
										</div>
									</div>
									<div className="col-lg-8 col-md-12">
										<div className="all-form">
											<div className="row">
												<div className="col-lg-4 col-md-6">
													<label>IBAN</label>
													<input type="text" name="IBAN" onChange={(e) => setIBAN(e.target.value)} />
													{/* {errors.IBAN && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.IBAN}
														</span>
													)} */}
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Bank Holder Name</label>
													<input type="text" name="holder_name" onChange={(e) => setHolderName(e.target.value)} />
													{/* {errors.holder_name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.holder_name}
														</span>
													)} */}
												</div>
												<div className="col-lg-4 col-md-5">
													<label>Bank Name</label>
													<input type="text" name="bank_name" onChange={(e) => setBankName(e.target.value)} />
													{/* {errors.bank_name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.bank_name}
														</span>
													)} */}
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Bank Address</label>
													<input type="text" name="bank_address" onChange={(e) => setBankAddress(e.target.value)} />
													{/* {errors.bank_address && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.bank_address}
														</span>
													)} */}
												</div>
												<div className="col-lg-12 col-md-6">
													<label>BIC</label>
													<textarea name="BIC" onChange={(e) => setBIC(e.target.value)}></textarea>
													{/* {errors.BIC && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.BIC}
														</span>
													)} */}
												</div>
											</div>
										</div>
									</div>
								</div>
                                <hr />
                                <div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Create Password</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
										</div>
									</div>
									<div className="col-lg-8 col-md-12">
										<div className="all-form">
											<div className="row">
												<div className="col-lg-4 col-md-6">
													<label>Password</label>
													{/* <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" onBlur={handleRegisterBlur} /> */}
                                                    <input type="password" id="registerpassword" name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password" />
                                                    {errors.password && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.password}</span>}
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Confirm Password</label>
													{/* <input type="password" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" onBlur={handleRegisterBlur} /> */}
                                                    <input type="password" id="confirmPassword text-danger mb-2 d-inline-block" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={handleRegisterBlur} autoComplete="new-password" />
                                                    {errors.confirmPassword && <span className="small error text-danger mb-2 d-inline-block error_login" >{errors.confirmPassword}</span>}
												</div>
											</div>
										</div>
									</div>
								</div>
                                <div className="text-right">
                                    <button className="table-btn" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>
                                </div>
                                <hr />
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}