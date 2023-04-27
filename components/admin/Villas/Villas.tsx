import React, { useState, useEffect } from 'react'
import PopupModal from "../../../components/commoncomponents/PopupModalLarge";
import { getCurrentUserData } from '../../../lib/session'
import { saveVilla, updateVilla, getVillas, getSingleVillas, deleteSingleVilla } from '../../../lib/adminapi'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";

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
	const [image, setImage] = useState([]);
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
	const [getsingledata, setGetSingleData] = useState([]);
	const [modalConfirm, setModalConfirm] = useState(false);
	const [editmodalConfirm, editsetModalConfirm] = useState(false);
	const [buttonStatus, setButtonState] = useState(false);


	const modalConfirmClose = () => {
		setModalConfirm(false);
	};
	const editmodalConfirmClose = () => {
		editsetModalConfirm(false);
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
			const userid = getCurrentUserData();
			getAllVillasData();
		}
	}

	const getAllVillasData = async () => {
		getVillas()
			.then(res => {
				if (res.status == true) {
					setVillasData(res.data);
					console.log(res.data);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const getSingleData = async (id: any) => {
		getSingleVillas(id)
			.then(res => {
				if (res.status == true) {
					setModalConfirm(false);
					editsetModalConfirm(true);
					setGetSingleData(res.data);
					setFullName(res.data.name);
					setEmail(res.data.email);
					setPhone(res.data.phone);
					setAddress(res.data.address);
					setCity(res.data.city);
					setState(res.data.state);
					setPartnerOwner(res.data.partner_owner);
					setCapacity(res.data.capacity);
					setCategory(res.data.category);
					setPrice(res.data.price_per_day);
					setBedrooms(res.data.bedrooms);
					setBathrooms(res.data.bathrooms);
					setBBQ(res.data.BBQ);
					setTypeStove(res.data.type_of_stove);
					setEquipment(res.data.equipment);
					setWebsite(res.data.website);
					setConsiergePhone(res.data.consierge_phone);
					setFacebookLink(res.data.facebook_link);
					setInstagramLink(res.data.instagram_link);
					setTwitterLink(res.data.twitter_link);
					setLinkedinLink(res.data.linkedin_link);
					setYoutubeLink(res.data.youtube_link);
						const imageNames = res.data.image.split(',');
						setImage(imageNames);
						console.log(imageNames);
					
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
		if (!address) {
			errors.address = "Address is required";
		}
		if (!image) {
			errors.image = "Image is required";
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
			saveVilla(data, image)
				.then(res => {
					if (res.status == true) {
						console.log(res.status);
						getAllVillasData();
						setModalConfirm(false);
						setButtonState(false);
						setFullName("");
						setEmail("");
						setPhone("");
						setAddress("");
						setCity("");
						setState("");
						setPartnerOwner("");
						setCapacity("");
						setPrice("");
						setBedrooms("");
						setImage("");
						setBathrooms("");
						setBBQ("");
						setTypeStove("");
						setEquipment("");
						setWebsite("");
						setConsiergePhone("");
						setFacebookLink("");
						setInstagramLink("");
						setTwitterLink("");
						setLinkedinLink("");
						setYoutubeLink("");
						toast.success(res.message, {
							position: toast.POSITION.TOP_RIGHT
						});

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

	const handleVillaupdate = (e: any) => {
		e.preventDefault();
		// Validate form data

		const errors = {};
		if (!name) {
			errors.name = "Name is required";
		}
		if (!address) {
			errors.address = "Address is required";
		}
		if (!image) {
			errors.image = "Image is required";
		}

		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			setButtonState(true);
			const id = getsingledata.id;
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
			updateVilla(id, data, image)
				.then(res => {
					if (res.status == true) {
						console.log(res.status);
						getAllVillasData();
						editsetModalConfirm(false);
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

	const handleImageChange = (e) => {
		const files = e.target.files;
		const imagesArray = [];
	
		for (let i = 0; i < files.length; i++) {
		  imagesArray.push(files[i]);
		}
	
		setImage(imagesArray);
		console.log(imagesArray);
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
			case "address":
				if (!value) {
					newErrors.name = "Address is required";
				} else {
					delete newErrors.name;
				}
				break;
			case "image":
				if (!value) {
					newErrors.name = "Image is required";
				} else {
					delete newErrors.name;
				}
				break;

			default:
				break;
		}
		setErrors(newErrors);
	};

	const deleteSinglevilla = (id) => {
		swal({
			title: "Are you sure?",
			text: "You want to delete the villa",
			icon: "warning",
			buttons: true,
			dangerMode: true,
			buttons: ["Cancel", "Yes, I am sure!"],
			confirmButtonColor: "#062B60",
		}).then((willDelete) => {
			if (willDelete) {
				deleteSingleVilla(id)
					.then((res) => {
						if (res.status == true) {
							getAllVillasData();
							swal("Your Villa has been deleted!", {
								icon: "success",
							});
							// setTimeout(() => {
							// 	window.location.href = '/admin/villas/';
							// }, 1000);
						} else {
							toast.error(res.message, {
								position: toast.POSITION.TOP_RIGHT,
							});
						}
					})
					.catch((err) => { });
			} else {
			}
		});
	};

	return (
		<>
			<div className="table-part">
				<h2>Villas</h2>
				<ul className="table_header_button_section p-r">
					<li><button className="table-btn" onClick={() => setModalConfirm(true)}>Add</button></li>
					<li className="right-li"><button className="table-btn border-radius round-white">Filter </button></li>
				</ul>
				<div className="table-box" id="villa_table">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">Sr No.</th>
								{/* <th scope="col">Image</th> */}
								<th scope="col">Name</th>
								<th scope="col">Phone</th>
								<th scope="col">Address</th>
								<th scope="col">Partner/Owner</th>
								<th scope="col">Bedroom</th>
								<th scope="col">Bathrooms</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
							{Array.isArray(villasdata) && villasdata.map((villa) => (
								<tr key={villa.id}>
									<td>{villa.id}</td>
									{/* <td id="villa_img">
										{villa.image == 'null' ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="user-menu" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + 'images/villas/images/' + villa.image} alt="user-menu" />}
									</td> */}
									<td>{villa.name}</td>
									<td>{villa.phone}</td>
									<td>{villa.address}</td>
									<td>{villa.partner_owner}</td>
									<td>{villa.bedrooms}</td>
									<td>{villa.bathrooms}</td>
									<td>
										<div className="dropdown" id="none-class">
											<a
												className="dropdown-toggle"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												<i className="fa-solid fa-ellipsis"></i>
											</a>
											<ul
												className="dropdown-menu"
												aria-labelledby="dropdownMenuButton"
											>
												<li>
													<a
														className="dropdown-item"
														href="#"
														onClick={() => {
															getSingleData(villa.id);
														}}
													>
														Edit
													</a>
												</li>
												<li>
													<a
														className="dropdown-item"
														href="#"
														onClick={(e) =>
															deleteSinglevilla(villa.id)
														}
													>
														Delete
													</a>
												</li>
											</ul>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* // villa popup start  */}
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
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="name">Name1:</label>
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
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="email">Email:</label>
									<input
										type="text"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="phone">Phone:</label>
									<input
										type="text"
										name="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="address">Address:</label>
									<input
										type="text"
										name="address"
										value={address}
										onBlur={handleMenuBlur}
										onChange={(e) => setAddress(e.target.value)}
									/>
									{errors.address && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.address}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="city">City:</label>
									<input
										type="text"
										name="city"
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="state">State:</label>
									<input
										type="text"
										name="state"
										value={state}
										onChange={(e) => setState(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="partner_owner">Partner/Owner:</label>
									<select aria-label="Default select example" name="partner_owner"
										value={partner_owner}
										onChange={(e) => setPartnerOwner(e.target.value)}>
										<option value=''>Select partner/owner</option>
										<option value='partner'>Partner</option>
										<option value='owner'>Owner</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="category">Category:</label>
									<select aria-label="Default select example" name="category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}>
										<option value=''>Select category</option>
										<option value='basic'>Basic</option>
										<option value='luxury'>Luxury</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="capacity">Capacity:</label>
									<input
										type="number"
										name="capacity"
										value={capacity}
										onChange={(e) => setCapacity(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="price_per_day">Price Per Day:</label>
									<input
										type="number"
										name="price_per_day"
										value={price_per_day}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bedrooms">Bedrooms:</label>
									<input
										type="number"
										name="bedrooms"
										value={bedrooms}
										onChange={(e) => setBedrooms(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bathrooms">Bathrooms:</label>
									<input
										type="number"
										name="bathrooms"
										value={bathrooms}
										onChange={(e) => setBathrooms(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bedrooms">Bedrooms:</label>
									<input
										type="number"
										name="bedrooms"
										value={bedrooms}
										onChange={(e) => setBedrooms(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bathrooms">Bathrooms:</label>
									<input
										type="number"
										name="bathrooms"
										value={bathrooms}
										onChange={(e) => setBathrooms(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="BBQ">BBQ:</label>
									<select aria-label="Default select example" name="BBQ" value={BBQ} onChange={(e) => setBBQ(e.target.value)}>
										<option value=''>Select BBQ</option>
										<option value='yes'>Yes</option>
										<option value='no'>No</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="type_of_stove">Type of stove:</label>
									<select aria-label="Default select example" name="type_of_stove" value={type_of_stove} onChange={(e) => setTypeStove(e.target.value)}>
										<option value=''>Select Stove</option>
										<option value='gas'>Gas</option>
										<option value='electric'>Electric</option>
										<option value='induction'>Induction</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="equipment">Equipment:</label>
									<select aria-label="Default select example" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
										<option value=''>Select Equipment</option>
										<option value='basic'>Basic</option>
										<option value='fully_equipped'>Fully equipped</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
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
							<div className='col-md-4'>
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
							<div className='col-md-4'>
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
							<div className='col-md-4'>
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
						</div>
						<div className="row">
							<div className='col-md-4'>
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
							<div className='col-md-4'>
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
							<div className='col-md-4'>
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
								onBlur={handleMenuBlur}
								onChange={handleImageChange}
								accept="jpg,png"
								multiple
							/>

							{errors.image && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.image}</span>}
							<div className='row mt-3'>
								{image && image.map((image, index) => (
									image instanceof Blob || image instanceof File ? (
										<div className='col-md-2' key={index}>
											<img src={URL.createObjectURL(image)} alt="selected image" width={100} height={100} />
										</div>
									) :
										<div className='col-md-2' key={index}>
											<img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/villas/images/' + image} alt="villa-image" width={100} height={100} />
										</div>
								))}
							</div>

						</div>
						<button
							type="submit"
							className="btn-send w-100 mt-5"
						>
							Submit
						</button>
					</form>
				</div>
			</PopupModal>

			{/* // villa Edit popup start  */}

			<PopupModal
				show={editmodalConfirm}
				handleClose={editmodalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleVillaupdate}
					>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										name="name"
										defaultValue={name}
										onBlur={handleMenuBlur}
										onChange={(e) => setFullName(e.target.value)}
									/>
									{errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="email">Email:</label>
									<input
										type="text"
										name="email"
										defaultValue={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="phone">Phone:</label>
									<input
										type="text"
										name="phone"
										defaultValue={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="address">Address:</label>
									<input
										type="text"
										name="address"
										defaultValue={address}
										onBlur={handleMenuBlur}
										onChange={(e) => setAddress(e.target.value)}
									/>
									{errors.address && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.address}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="city">City:</label>
									<input
										type="text"
										name="city"
										defaultValue={city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="state">State:</label>
									<input
										type="text"
										name="state"
										defaultValue={state}
										onChange={(e) => setState(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="partner_owner">Partner/Owner:</label>
									<select aria-label="Default select example" name="partner_owner"
										value={partner_owner}
										onChange={(e) => setPartnerOwner(e.target.value)}>
										<option value=''>Select partner/owner</option>
										<option value='partner' defaultValue={partner_owner === 'partner'}>Partner</option>
										<option value='owner' defaultValue={partner_owner === 'owner'}>Owner</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="category">Category:</label>
									<select aria-label="Default select example" name="category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}>
										<option value=''>Select category</option>
										<option value='basic' defaultValue={category === 'basic'}>Basic</option>
										<option value='luxury' defaultValue={category === 'luxury'}>Luxury</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="capacity">Capacity:</label>
									<input
										type="number"
										name="capacity"
										defaultValue={capacity}
										onChange={(e) => setCapacity(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="price_per_day">Price Per Day:</label>
									<input
										type="number"
										name="price_per_day"
										defaultValue={price_per_day}
										onChange={(e) => setPrice(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bedrooms">Bedrooms:</label>
									<input
										type="number"
										name="bedrooms"
										defaultValue={bedrooms}
										onChange={(e) => setBedrooms(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bathrooms">Bathrooms:</label>
									<input
										type="number"
										name="bathrooms"
										defaultValue={bathrooms}
										onChange={(e) => setBathrooms(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bedrooms">Bedrooms:</label>
									<input
										type="number"
										name="bedrooms"
										defaultValue={bedrooms}
										onChange={(e) => setBedrooms(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="bathrooms">Bathrooms:</label>
									<input
										type="number"
										name="bathrooms"
										defaultValue={bathrooms}
										onChange={(e) => setBathrooms(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="BBQ">BBQ:</label>
									<select aria-label="Default select example" name="BBQ" value={BBQ} onChange={(e) => setBBQ(e.target.value)}>
										<option value=''>Select BBQ</option>
										<option value='yes' defaultValue={BBQ === 'yes'}>Yes</option>
										<option value='no' defaultValue={BBQ === 'no'}>No</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="type_of_stove">Type of stove1:</label>
									<select aria-label="Default select example" name="type_of_stove" value={type_of_stove} onChange={(e) => setTypeStove(e.target.value)}>
										<option value=''>Select Stove</option>
										<option value='gas' defaultValue={type_of_stove === 'gas'}>Gas</option>
										<option value='electric' defaultValue={type_of_stove === 'electric'}>Electric</option>
										<option value='induction' defaultValue={type_of_stove === 'induction'}>Induction</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="equipment">Equipment:</label>
									<select aria-label="Default select example" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
										<option value=''>Select Equipment</option>
										<option value='basic' defaultValue={equipment === 'basic'}>basic</option>
										<option value='fully_equipped' defaultValue={equipment === 'basic'}>fully_equipped</option>
									</select>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="consierge_phone">Consierge Phone:</label>
									<input
										type="number"
										name="consierge_phone"
										defaultValue={consierge_phone}
										onChange={(e) => setConsiergePhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="website">Website:</label>
									<input
										type="text"
										name="website"
										defaultValue={website}
										onChange={(e) => setWebsite(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="facebook_link">Facebook Link:</label>
									<input
										type="text"
										name="facebook_link"
										defaultValue={facebook_link}
										onChange={(e) => setFacebookLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="instagram_link">Instagram Link:</label>
									<input
										type="text"
										name="instagram_link"
										defaultValue={instagram_link}
										onChange={(e) => setInstagramLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="twitter_link">Twitter Link:</label>
									<input
										type="text"
										name="twitter_link"
										defaultValue={twitter_link}
										onChange={(e) => setTwitterLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="linkedin_link">Linkedin Link:</label>
									<input
										type="text"
										name="linkedin_link"
										defaultValue={linkedin_link}
										onChange={(e) => setLinkedinLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="youtube_link">Youtube Link:</label>
									<input
										type="text"
										name="youtube_link"
										defaultValue={youtube_link}
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
								onChange={handleImageChange}
								onBlur={handleMenuBlur}
								accept="jpg,png"
								multiple
							/>
							{errors.image && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.image}</span>}

							<div className='row mt-3'>
								{image && image.map((image, index) => (
									image instanceof Blob || image instanceof File ? (
										<div className='col-md-2' key={index}>
											<img src={URL.createObjectURL(image)} alt="selected image" width={100} height={100} />
										</div>
									) : (
										<div className='col-md-2' key={index}>
											<img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/villas/images/' + image} alt="villa-image" width={100} height={100} />
										</div>
									)
								))}

							</div>
						</div>
						<div className='mt-4'>
							<button
								type="submit"
								className="btn-send w-100"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</PopupModal>

			<ToastContainer />
		</>
	)
}