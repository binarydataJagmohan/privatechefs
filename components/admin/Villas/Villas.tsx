import React, { useState, useEffect } from 'react'
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { getCurrentUserData } from '../../../lib/session'
import { saveVilla, updateVilla, getVillas } from '../../../lib/adminapi'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Villas() {

	const [name, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [partner_owner, setPartnerOwner] = useState("");
	const [capacity, setCapacity] = useState("");
	const [category, setCategory] = useState("");
	const [price_per_day, setPrice] = useState("");
	const [bedrooms, setBedrooms] = useState("");
	const [image, setImage] = useState('');
	const [bathrooms, setBathrooms] = useState("");
	const [BBQ, setBBQ] = useState("");
	const [type_of_stove, setTypeStove] = useState("");
	const [equipment, setEquipment] = useState("");
	const [website, setWebsite] = useState("");
	const [consierge_phone, setConsiergePhone] = useState("");
	const [facebook_link, setFacebookLink] = useState("");
	const [instagram_link, setInstagramLink] = useState("");
	const [twitter_link, setTwitterLink] = useState("");
	const [linkedin_link, setLinkedinLink] = useState("");
	const [youtube_link, setYoutubeLink] = useState("");

	const [errors, setErrors] = useState({});
	const [villasdata, setVillasData] = useState({});
	const [modalConfirm, setModalConfirm] = useState(false);
	const [buttonStatus, setButtonState] = useState(false);

	const modalConfirmClose = () => {
		setModalConfirm(false);
	};

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		const data = isPageVisibleToRole('villas');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			getAllVillasData();
		}
	}

	const getAllVillasData = async () => {
		getVillas()
			.then(res => {
				if (res.status == true) {
					setVillasData(res.data);
					//console.log(res.data);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const handleVillaSubmit = (e: any) => {
		e.preventDefault();
		// Validate form data
		const errors = {};
		if (!name) {
			errors.name = "Name is required";
		}
		if (!email) {
			errors.email = "Email is required";
		}
		if (!phone) {
			errors.phone = "Phone is required";
		}
		if (!address) {
			errors.address = "Address is required";
		}
		if (!city) {
			errors.city = "City is required";
		}
		if (!state) {
			errors.state = "State is required";
		}
		if (!partner_owner) {
			errors.partner_owner = "Partner is required";
		}
		if (!capacity) {
			errors.capacity = "Capacity is required";
		}
		if (!category) {
			errors.category = "Category is required";
		}
		if (!price_per_day) {
			errors.price_per_day = "Price is required";
		}
		if (!bedrooms) {
			errors.bedrooms = "Bedrooms is required";
		}
		if (!bathrooms) {
			errors.bathrooms = "Bathrooms is required";
		}
		if (!BBQ) {
			errors.BBQ = "BBQ is required";
		}
		if (!type_of_stove) {
			errors.type_of_stove = "Stove is required";
		}
		if (!equipment) {
			errors.equipment = "Equipment is required";
		}

		setErrors(errors);

		// Submit form data if there are no errors
		if (Object.keys(errors).length === 0) {
			setButtonState(true);
			// Call an API or perform some other action to register the user
			const data = {
				name: name,
				email: email,
				phone: phone,
				address: address,
				city: city,
				state: state,
				partner_owner: partner_owner,
				capacity: capacity,
				category: category,
				price_per_day: price_per_day,
				bedrooms: bedrooms,
				bathrooms: bathrooms,
				BBQ: BBQ,
				type_of_stove: type_of_stove,
				equipment: equipment,
				consierge_phone: consierge_phone,
				website: website,
				facebook_link: facebook_link,
				instagram_link: instagram_link,
				twitter_link: twitter_link,
				linkedin_link: linkedin_link,
				youtube_link: youtube_link,
				image: image
			};
			saveVilla(data, image[0])
				.then(res => {
					if (res.status == true) {
						console.log(res.status);
						setModalConfirm(false);
						setButtonState(false);
						toast.success(res.message, {
							position: toast.POSITION.TOP_RIGHT
						});
						// setTimeout(() => {
						// 	window.location.href = '/admin/villas/';
						// }, 1000);

					} else {
						setButtonState(false);
						toast.error(res.message, {
							position: toast.POSITION.TOP_RIGHT
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	const handleMenuBlur = (e: any) => {
		const { name, value } = e.target;
		const newErrors = { ...errors };

		switch (name) {

			case "name":
				if (!value) {
					newErrors.name = "Name is required";
				} else {
					delete newErrors.name;
				}
				break;
			default:
				break;
		}
		setErrors(newErrors);
	};



	return (
		<>
			<div className="table-part">
				<h2>Villas</h2>
				<ul className="table_header_button_section p-r">
					<li><button className="table-btn" onClick={() => setModalConfirm(true)}>Add</button></li>
					<li className="right-li"><button className="table-btn border-radius round-white">Filter </button></li>
				</ul>
				<div className="table-box">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>2493</td>
								<td>Devon Lane</td>
								<td>2/11/12</td>
								<td>2/11/12</td>
								<td>Stockton, New Hampshire</td>
								<td>One time</td>
								<td>One time</td>
								<td>One time</td>
								<td><a href="/admin/villas2"><i className="fa-solid fa-ellipsis"></i></a></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* // Menu popup start  */}
			<PopupModal
				show={modalConfirm}
				handleClose={modalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleVillaSubmit}
					>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										name="name"
										value={name}
										onBlur={handleMenuBlur}
										onChange={(e) => setFullName(e.target.value)}
									/>
									{errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
								</div>

							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="email">Email:</label>
									<input
										type="text"
										name="email"
										value={email}
										onBlur={handleMenuBlur}
										onChange={(e) => setEmail(e.target.value)}
									/>
									{errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="phone">Phone:</label>
									<input
										type="text"
										name="phone"
										value={phone}
										onBlur={handleMenuBlur}
										onChange={(e) => setPhone(e.target.value)}
									/>
									{errors.phone && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.phone}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="address">Address:</label>
									<input
										type="text"
										name="address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
									{errors.address && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.address}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="city">City:</label>
									<input
										type="text"
										name="city"
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
									{errors.city && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.city}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="state">State:</label>
									<input
										type="text"
										name="state"
										value={state}
										onChange={(e) => setState(e.target.value)}
									/>
									{errors.state && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.state}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="partner_owner">Partner/Owner:</label>
									<select aria-label="Default select example" name="partner_owner"
										value={partner_owner}
										onChange={(e) => setPartnerOwner(e.target.value)}>
										<option value=''>Select partner/owner</option>
										<option value='partner'>Partner</option>
										<option value='owner'>Owner</option>
									</select>
									{errors.partner_owner && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.partner_owner}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="category">Category:</label>
									<select aria-label="Default select example" name="category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}>
										<option value=''>Select category</option>
										<option value='basic'>Basic</option>
										<option value='luxury'>Luxury</option>
									</select>
									{errors.category && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.category}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="capacity">Capacity:</label>
									<input
										type="number"
										name="capacity"
										value={capacity}
										onChange={(e) => setCapacity(e.target.value)}
									/>
									{errors.capacity && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.capacity}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="price_per_day">Price Per Day:</label>
									<input
										type="number"
										name="price_per_day"
										value={price_per_day}
										onChange={(e) => setPrice(e.target.value)}
									/>
									{errors.price_per_day && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.price_per_day}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="bedrooms">Bedrooms:</label>
									<input
										type="number"
										name="bedrooms"
										value={bedrooms}
										onChange={(e) => setBedrooms(e.target.value)}
									/>
									{errors.bedrooms && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.bedrooms}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="bathrooms">Bathrooms:</label>
									<input
										type="number"
										name="bathrooms"
										value={bathrooms}
										onChange={(e) => setBathrooms(e.target.value)}
									/>
									{errors.bathrooms && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.bathrooms}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="BBQ">BBQ:</label>
									<select aria-label="Default select example" name="BBQ" value={BBQ} onChange={(e) => setBBQ(e.target.value)}>
										<option value=''>Select BBQ</option>
										<option value='yes'>Yes</option>
										<option value='no'>No</option>
									</select>
									{errors.BBQ && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.BBQ}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="type_of_stove">Type of stove:</label>
									<select aria-label="Default select example" name="type_of_stove" value={type_of_stove} onChange={(e) => setTypeStove(e.target.value)}>
										<option value=''>Select Stove</option>
										<option value='gas'>Gas</option>
										<option value='electric'>Electric</option>
										<option value='induction'>Induction</option>
									</select>
									{errors.type_of_stove && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.type_of_stove}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="equipment">Equipment:</label>
									<select aria-label="Default select example" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
										<option value=''>Select Equipment</option>
										<option value='basic'>basic</option>
										<option value='fully_equipped'>fully_equipped</option>
									</select>
									{errors.equipment && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.equipment}</span>}
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="consierge_phone">Consierge Phone:</label>
									<input
										type="number"
										name="consierge_phone"
										value={consierge_phone}
										onChange={(e) => setConsiergePhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="website">Website:</label>
									<input
										type="text"
										name="website"
										value={website}
										onChange={(e) => setWebsite(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="facebook_link">Facebook Link:</label>
									<input
										type="text"
										name="facebook_link"
										value={facebook_link}
										onChange={(e) => setFacebookLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="instagram_link">Instagram Link:</label>
									<input
										type="text"
										name="instagram_link"
										value={instagram_link}
										onChange={(e) => setInstagramLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="twitter_link">Twitter Link:</label>
									<input
										type="text"
										name="twitter_link"
										value={twitter_link}
										onChange={(e) => setTwitterLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="linkedin_link">Linkedin Link:</label>
									<input
										type="text"
										name="linkedin_link"
										value={linkedin_link}
										onChange={(e) => setLinkedinLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="youtube_link">Youtube Link:</label>
									<input
										type="text"
										name="youtube_link"
										value={youtube_link}
										onChange={(e) => setYoutubeLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="login_div">
							<label htmlFor="Image">Image:</label>
							<input
								type="file"
								name="image"
								onChange={(e) => setImage(e.target.files)}
								accept="jpg,png"
							/>
						</div>
						<button
							type="submit"
							className="btn-send w-100"
						>
							Submit
						</button>
					</form>
				</div>
			</PopupModal>
			<ToastContainer />
		</>
	)
}