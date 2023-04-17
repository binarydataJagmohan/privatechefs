import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { updateChefProfile, getChefDetail,UpdateChefResume,getChefResume} from '../../../lib/chefapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyProfile() {

	const [name, setFullName] = useState("");
	const [surname, setSurName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [passport_no, setPassportNo] = useState("");
	const [BIC, setBIC] = useState("");
	const [IBAN, setIBAN] = useState("");
	const [bank_name, setBankName] = useState("");
	const [holder_name, setHolderName] = useState("");
	const [bank_address, setBankAddress] = useState("");

	const [about, setAbout] = useState("");
	const [description, setDescription] = useState("");
	const [services_type, setServicesType] = useState("");
	const [employment_status, setEmploymentStatus] = useState("");
	const [website, setWebsite] = useState("");
	const [languages, setLanguages] = useState("");
	const [experience, setExperience] = useState("");
	const [skills, setSkills] = useState("");
	const [favorite_chef, setFavoriteChef] = useState("");
	const [favorite_dishes, setFavoriteDishes] = useState("");
	const [love_cooking, setLoveCooking] = useState("");
	const [facebook_link, setFacebookLink] = useState("");
	const [instagram_link, setInstagramLink] = useState("");
	const [twitter_link, setTwitterLink] = useState("");
	const [linkedin_link, setLinkedinLink] = useState("");
	const [youtube_link, setYoutubeLink] = useState("");

	const [currentUserData, setCurrentUserData] = useState({});
	const [userData, setUserData] = useState({});
	const [chefResume, setChefResume] = useState({});

	const handleUpdateProfile = async (e: any) => {
		e.preventDefault();
		const userid = currentUserData.id;
		const data = {
			id: userid,
			name: name,
			surname: surname,
			email: email,
			phone: phone,
			address: address,
			passport_no: passport_no,
			BIC: BIC,
			IBAN: IBAN,
			bank_name: bank_name,
			holder_name: holder_name,
			bank_address: bank_address,
		};
		updateChefProfile(userid, data)
			.then(res => {
				toast.success(res.message, {
					position: toast.POSITION.TOP_RIGHT
				});

			}).catch(err => {
				toast.error('Error occured', {
					position: toast.POSITION.BOTTOM_RIGHT
				});
			});
	};

	const resumeUpdate = async (e: any) => {
		e.preventDefault();
		const id = currentUserData.id;
		const data = {
			id: id,
			about:about,
			description: description,
			services_type: services_type,
			employment_status: employment_status,
			website: website,
			languages: languages,
			experience: experience,
			skills: skills,
			favorite_chef: favorite_chef,
			favorite_dishes: favorite_dishes,
			love_cooking: love_cooking,
			facebook_link: facebook_link,
			instagram_link: instagram_link,
			twitter_link: twitter_link,
			linkedin_link: linkedin_link,
			youtube_link:youtube_link
		};
		UpdateChefResume(id, data)
			.then(res => {
				toast.success(res.message, {
					position: toast.POSITION.TOP_RIGHT
				});

			}).catch(err => {
				toast.error('Error occured', {
					position: toast.POSITION.BOTTOM_RIGHT
				});
			});
	};

	useEffect(() => {
		getUserData();
	  }, []);
	
	  const getUserData = async () => {
		const data = isPageVisibleToRole('chef-menu');
		if(data == 2) {
		  window.location.href = '/';
		}
		if(data == 0) {
		  window.location.href = '/404';
		}
		if(data ==1) {
		  const userData = getCurrentUserData();
		  setCurrentUserData(userData);
		  getChefDetailData(userData.id);
		  getChefResumeData(userData.id);
		}
	  }

	const getChefDetailData = async (id) => {
		getChefDetail(id)
		.then(res => {
		  if(res.status==true){
				setUserData(res.data);
		  } else {
			  toast.error(res.message, {
			  position: toast.POSITION.TOP_RIGHT
			});
		  }
		})
		.catch(err => {
			console.log(err);
		});
	}

	const getChefResumeData = async (id) => {
		getChefResume(id)
		.then(res => {
		  if(res.status==true){
			setChefResume(res.data);
		  } else {
			  toast.error(res.message, {
			  position: toast.POSITION.TOP_RIGHT
			});
		  }
		})
		.catch(err => {
			console.log(err);
		});
	}

	return (
		<>
			<div className="table-part">
				<h2>My Profile</h2>
				<div className="tab-part change-btn-colors">
					<div className="border-bottom pb-3">
						<ul className="nav nav-pills text-left-j " id="pills-tab" role="tablist">
							<li className="nav-item" role="presentation">
								<button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">My Profile</button>
							</li>
							<li className="nav-item" role="presentation">
								<button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Resume</button>
							</li>
							<li className="nav-item" role="presentation">
								<button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">My Locations</button>
							</li>
						</ul>
					</div>
					<div className="tab-content mt-4" id="pills-tabContent">
						<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
							<form onSubmit={handleUpdateProfile}>
								<div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Personal Information</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
											<div className="picture-profile">
												<div className="row">
													<div className="col-lg-4 col-md-5 col-4 pr-0">
														<a href="/">
															<img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/user.png'} alt="" />
														</a>
													</div>
													<div className="col-lg-8 col-md-7 col-8">
														<div className="user-profile-collapsed mt-3">
															<h6>Profile Picture</h6>
															<p className="f-10-2">Upload lalalalalalallalalalalala alalalalalallalalalala</p>
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
													<input type="text" name="name" defaultValue={currentUserData.name} onChange={(e) => setFullName(e.target.value)} />
												</div>
												<div className="col-lg-4 col-md-6">
													<label>Surname</label>
													<input type="text" name="surname" defaultValue={userData.surname} onChange={(e) => setSurName(e.target.value)} />
												</div>
												<div className="col-lg-4 col-md-6">
													<label>Email</label>
													<input type="text" name="email" defaultValue={currentUserData.email} onChange={(e) => setEmail(e.target.value)} />
												</div>
												<div className="col-lg-4 col-md-6">
													<label>Phone Number</label>
													<input type="number" name="phone" defaultValue={userData.phone} onChange={(e) => setPhone(e.target.value)} />
												</div>
												<div className="col-lg-5 col-md-6">
													<label>Adress</label>
													<input type="text" name="address" defaultValue={userData.address} onChange={(e) => setAddress(e.target.value)} />
												</div>
												<div className="col-lg-3 col-md-6">
													<label>ID/Passport Number</label>
													<input type="text" name="passport_no" defaultValue={userData.passport_no} onChange={(e) => setPassportNo(e.target.value)} />
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
													<input type="text" name="BIC" defaultValue={userData.BIC} onChange={(e) => setBIC(e.target.value)} />
												</div>
												<div className="col-lg-8 col-md-6">
													<label>BIC</label>
													<input type="text" name="IBAN" defaultValue={userData.IBAN} onChange={(e) => setIBAN(e.target.value)} />
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Bank Holder Name</label>
													<input type="text" name="holder_name" defaultValue={userData.holder_name} onChange={(e) => setHolderName(e.target.value)} />
												</div>
												<div className="col-lg-4 col-md-5">
													<label>Bank Name</label>
													<input type="text" name="bank_name" defaultValue={userData.bank_name} onChange={(e) => setBankName(e.target.value)} />
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Bank Adress</label>
													<input type="text" name="bank_address" defaultValue={userData.bank_address} onChange={(e) => setBankAddress(e.target.value)} />
												</div>
												{/* <div className="col-lg-4 col-md-5">
													<label>ID/Passport Number</label>
													<input type="text" name="BIC"/>
												</div> */}
											</div>
										</div>
									</div>
								</div>
								<div className="text-right">
								<button className="table-btn" type="submit">Save</button>
								</div>
								<hr />
								{/* <div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Services</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
										</div>
									</div>
									<div className="col-lg-8 col-md-12">
										<div className="all-form">
											<div className="row">
												<div className="col-lg-12 col-md-12">
													<label>Type of cusines</label>
													<input type="text" />
												</div>
												<div className="col-lg-8 col-md-6">
													<label>Bank Adress</label>
													<input type="text" />
												</div>
												<div className="col-lg-4 col-md-7">
													<label>Bank Name</label>
													<input type="text" />
												</div>
												<div className="col-lg-8 col-md-5">
													<label>Bank Account Holder Name</label>
													<input type="text" />
												</div>
												<div className="col-lg-4 col-md-7">
													<label>Currency</label>
													<input type="text" />
												</div>
											</div>
										</div>
									</div>
								</div> */}
							</form>
						</div>
						<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
							<form onSubmit={resumeUpdate}>
								<>
								<div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Professional Profile</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
											<div className="picture-profile">
												<div className="row">
													<div className="col-lg-4 col-md-5 col-4 pr-0">
														<a href="/">
															<img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/user.png'} alt="" />
														</a>
													</div>
													<div className="col-lg-8 col-md-7 col-8">
														<div className="user-profile-collapsed mt-3">
															<h6>Profile Picture</h6>
															<p className="f-10-2">Upload lalalalalalallalalalalala alalalalalallalalalala</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-8 col-md-12">
										<div className="all-form">
											<div className="row">
												<div className="col-lg-12 col-md-12">
													<label>Tell us about you</label>
													<textarea  name="about" defaultValue={chefResume.about} onChange={(e) => setAbout(e.target.value)}></textarea>
												</div>
												<div className="col-lg-12 col-md-12">
													<label>What describes you best?</label>
													<textarea name="description"  defaultValue={chefResume.description} onChange={(e) => setDescription(e.target.value)}></textarea>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Type of services</label>
													<input type="text" name="services_type"  defaultValue={chefResume.services_type} onChange={(e) => setServicesType(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Employment Status</label>
													<input type="text" name="employment_status" defaultValue={chefResume.employment_status} onChange={(e) => setEmploymentStatus(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Your website</label>
													<input type="text" name="website"  defaultValue={chefResume.website} onChange={(e) => setWebsite(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Languages</label>
													<input type="text" name="languages" defaultValue={chefResume.languages} onChange={(e) => setLanguages(e.target.value)} />
												</div>
											</div>
										</div>
									</div>
								</div>
								<hr />
								<div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Professional Experience</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
										</div>
									</div>
									<div className="col-lg-8 col-md-12">
										<div className="all-form">
											<div className="row">
												<div className="col-lg-12 col-md-12">
													<label>I love cooking because</label>
													<textarea name="love_cooking" defaultValue={chefResume.love_cooking} onChange={(e) => setLoveCooking(e.target.value)}></textarea>
												</div>
												<div className="col-lg-12 col-md-12">
													<label>Culinary experience</label>
													<textarea name="experience"  defaultValue={chefResume.experience} onChange={(e) => setExperience(e.target.value)}></textarea>
												</div>
												<div className="col-lg-12 col-md-12">
													<label>Tell us about your favorite chefs</label>
													<textarea name="favorite_chef" defaultValue={chefResume.favorite_chef} onChange={(e) => setFavoriteChef(e.target.value)}></textarea>
												</div>
												<div className="col-lg-12 col-md-12">
													<label>Tell us about your favorite cuisines</label>
													<textarea name="favorite_dishes" defaultValue={chefResume.favorite_dishes} onChange={(e) => setFavoriteDishes(e.target.value)}></textarea>
												</div>
												<div className="col-lg-12 col-md-12">
													<label>Any special skills?</label>
													<textarea name="skills"  defaultValue={chefResume.skills} onChange={(e) => setSkills(e.target.value)}></textarea>
												</div>
											</div>
										</div>
									</div>
								</div>

								<hr />
								<div className="row">
									<div className="col-lg-4 col-md-12">
										<div className="text-left">
											<h5>Social Networks</h5>
											<p className="f-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue metus fermentum, curabitur nibh pellentesque dignissim neque lacus suscipit. Placerat viverra egestas.</p>
										</div>
									</div>
									<div className="col-lg-8 col-md-12">
										<div className="all-form">
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<label>Facebook</label>
													<input type="text" name="facebook_link" defaultValue={chefResume.facebook_link} onChange={(e) => setFacebookLink(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Instagram</label>
													<input type="text" name="instagram_link"  defaultValue={chefResume.instagram_link} onChange={(e) => setInstagramLink(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Twitter</label>
													<input type="text" name="twitter_link" defaultValue={chefResume.twitter_link} onChange={(e) => setTwitterLink(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Linkedin</label>
													<input type="text" name="linkedin_link" defaultValue={chefResume.linkedin_link} onChange={(e) => setLinkedinLink(e.target.value)}/>
												</div>
												<div className="col-lg-6 col-md-6">
													<label>Youtube</label>
													<input type="text" name="youtube_link" defaultValue={chefResume.youtube_link} onChange={(e) => setYoutubeLink(e.target.value)}/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="text-right">
								<button className="table-btn text-right" type="submit">Save</button>
								</div>
								<hr></hr>
								</>
							</form>
						</div>
						<div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
							<div className="row">
								<div className="col-lg-4 col-md-12 position-r">
									<div className="location-name">
										<div className="row">
											<div className="col-9"><p className="f-16">Location Name 1</p></div>
											<div className="col-3">
												<label className="switch">
													<input type="checkbox"  />
													<span className="slider round"></span>
												</label>
											</div>
										</div>
									</div>

									<div className="location-name">
										<div className="row">
											<div className="col-9"><p className="f-16">Location Name 1</p></div>
											<div className="col-3">
												<label className="switch">
													<input type="checkbox" />
													<span className="slider round"></span>
												</label>
											</div>
										</div>
									</div>

									<div className="location-name">
										<div className="row">
											<div className="col-9"><p className="f-16">Location Name 1</p></div>
											<div className="col-3">
												<label className="switch">
													<input type="checkbox" />
													<span className="slider round"></span>
												</label>
											</div>
										</div>
									</div>

									<div className="location-name">
										<div className="row">
											<div className="col-9"><p className="f-16">Location Name 1</p></div>
											<div className="col-3">
												<label className="switch">
													<input type="checkbox" />
													<span className="slider round"></span>
												</label>
											</div>
										</div>
									</div>
									<div className="banner-btn position-bottom"><a href="/startjourney">Start your journey</a></div>
								</div>
								<div className="col-lg-8 col-md-12">
									<img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/map-3.png'} alt="map-3" className="w-100" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		</>
	)
}