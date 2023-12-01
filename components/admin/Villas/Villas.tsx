import React, { useState, useEffect } from 'react'
import PopupModal from "../../../components/commoncomponents/PopupModalLarge";
import { getCurrentUserData } from '../../../lib/session'
import { saveVilla, updateVilla, getVillas, getSingleVillas, deleteSingleVilla } from '../../../lib/adminapi'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import { Loader } from '@googlemaps/js-api-loader';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

	const [errors, setErrors]: any = useState({});
	const [totalMenu, setTotalMenu]: any = useState({});
	const [villasdata, setVillasData] = useState('');
	const [getsingledata, setGetSingleData]: any = useState([]);
	const [modalConfirm, setModalConfirm] = useState(false);
	const [editmodalConfirm, editsetModalConfirm] = useState(false);
	const [buttonStatus, setButtonState] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");

	const pageSize = 10;

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
		const data = isPageVisibleToRole('admin-villas');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			const userid = getCurrentUserData();
			getAllVillasData();

			const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""
			const loader = new Loader({
				apiKey,
				version: 'weekly',
				libraries: ['places']
			});
	
			function setupAddressAutocomplete(inputId: string) {
				const input: HTMLInputElement | null = document.getElementById(inputId) as HTMLInputElement | null;
				if (input) {
					const autocomplete = new google.maps.places.Autocomplete(input);
					autocomplete.addListener('place_changed', () => {
						const place = autocomplete.getPlace();
	
						if (place && place.formatted_address && place.geometry && place.geometry.location) {
							const address = place.formatted_address;
							const lat = place.geometry.location.lat();
							const lng = place.geometry.location.lng();
	
							// Set the values for the corresponding input field
							if (inputId == 'address-input' || inputId == 'address-input2') {
								setAddress(address)
								setLat(lat.toString());
								setLng(lng.toString());
							}
						}
					});
				}
			}
	
			loader.load().then(() => {
				setupAddressAutocomplete('address-input');
				setupAddressAutocomplete('address-input2');
	
			}).catch((error) => {
				console.error('Failed to load Google Maps API', error);
			});

		}
	}


	const onPageChange = (page: any) => {
		setCurrentPage(page);
		getVillas()
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, page, pageSize);
					setVillasData(paginatedPosts);
				} else {
					console.log(res.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};


	const getAllVillasData = async () => {
		getVillas()
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, currentPage, pageSize);
					setVillasData(paginatedPosts);

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
					setImage(res.villaImg);
					setLat(res.lat);
					setLat(res.lng);

				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	const resetFields = () => {
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
		setImage([]);
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
		setLat("");
		setLng("");
	}

	const handleVillaSubmit = (e: any) => {
		e.preventDefault();
		// Validate form data
		const errors: any = {};
		if (!name) {
			errors.name = "Name is required";
		}
		if (!address) {
			errors.address = "Address is required";
		}
		if (!image || image.length === 0) {
			errors.image = "Image is required";
		}
		if (!partner_owner) {
			errors.partner_owner = "Partner/Owner is required";
		}
		if (!category) {
			errors.category = "Category is required";
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
			const userData: any = getCurrentUserData();
			setButtonState(true);
			// Call an API or perform some other action to register the user
			const data = {
				name: name,
				user_id: userData.id,
				email: email,
				lat:lat,
				lng:lng,
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
	};

	const handleVillaupdate = (e: any) => {
		e.preventDefault();
		// Validate form data

		const errors: any = {};
		if (!name) {
			errors.name = "Name is required";
		}
		if (!address) {
			errors.address = "Address is required";
		}
		if (!image || image.length === 0) {
			errors.image = "Image is required";
		}
		if (!partner_owner) {
			errors.partner_owner = "Partner/Owner is required";
		}
		if (!category) {
			errors.category = "Category is required";
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

		if (Object.keys(errors).length === 0) {
			setButtonState(true);
			const id = getsingledata.id;

			const data = {
				name: name,
				email: email || '',
				phone: phone || '',
				address: address || '',
				city: city || '',
				state: state || '',
				partner_owner: partner_owner,
				capacity: capacity || '',
				category: category || '',
				price_per_day: price_per_day || '',
				bedrooms: bedrooms || '',
				bathrooms: bathrooms || '',
				BBQ: BBQ || '',
				type_of_stove: type_of_stove || '',
				equipment: equipment || '',
				consierge_phone: consierge_phone || '',
				website: website || '',
				facebook_link: facebook_link || '',
				instagram_link: instagram_link || '',
				twitter_link: twitter_link || '',
				linkedin_link: linkedin_link || '',
				youtube_link: youtube_link || '',
				lat: lat || '',
				lng: lng || '',
				image: image,
			};

			updateVilla(id, data, image)
				.then((res) => {
					if (res.status == true) {
						console.log(res.status);
						getAllVillasData();
						editsetModalConfirm(false);
						setButtonState(false);
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
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleImageChange = (e: any) => {
		const files = Array.from(e.target.files);
		const imagesArray: any = [];

		for (let i = 0; i < files.length; i++) {
			imagesArray.push(files[i]);
		}

		setImage(imagesArray);
		console.log(imagesArray);
	};


	const handleMenuBlur = (e: any) => {
		const { name, value } = e.target;
		const newErrors: any = { ...errors };

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

	const deleteSinglevilla = (id: any) => {
		swal({
			title: "Are you sure?",
			text: "You want to delete the villa",
			icon: "warning",
			//buttons: true,
			dangerMode: true,
			buttons: ["Cancel", "Yes, I am sure!"],
			//confirmButtonColor: "#062B60",
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
					<li><button className="table-btn" onClick={() => { setModalConfirm(true); resetFields(); }}>Add</button></li>
					{/* <li className="right-li"><button className="table-btn border-radius round-white">Filter </button></li> */}
				</ul>
				<div className="table-box" id="villa_table">
					{villasdata.length > 0 ?
						<table className="table table-borderless common_booking">
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
								{Array.isArray(villasdata) && villasdata.map((villa, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
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
															href={`villas/${villa.id}`}
															
														>
															View Villa
														</a>
													</li>

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
						:
						<p className='book1 text-center'>No Records Found</p>
					}
				</div>
			</div>

			<Pagination
				items={totalMenu.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>

			{/* // villa popup start  */}
			<PopupModal
				show={modalConfirm}
				handleClose={modalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form" id="form_id">
					<form
						className="common_form_error"
						id="menu_form"
						onSubmit={handleVillaSubmit}
					>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										name="name"
										value={name}
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
							<div className='col-md-4 villa_div'>
								<div className="login_div">
								<label htmlFor="email">Phone:</label>
									<PhoneInput			
														country={"us"}
														value={phone}
														onChange={(phone) => setPhone(phone)}
													// add the required attribute here
													/>
									
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="address">Address:</label>
									<input
										id="address-input"
										type="text"
										name="address"
										value={address}
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
									{errors.partner_owner && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.partner_owner}</span>}
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
									{errors.category && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.category}</span>}
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
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="equipment">Equipment:</label>
									<select aria-label="Default select example" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
										<option value=''>Select Equipment</option>
										<option value='basic'>Basic</option>
										<option value='fully_equipped'>Fully equipped</option>
									</select>
									{errors.equipment && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.equipment}</span>}
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
									{errors.BBQ && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.BBQ}</span>}
								</div>
							</div>
						</div>
						<div className="row">

							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="consierge_phone">Consierge Phone:</label>
									<input
										type="text"
										name="consierge_phone"
										value={consierge_phone}
										onChange={(e) => {
											const re = /^[0-9\b]+$/;
											if (e.target.value === '' || re.test(e.target.value)) {
												setConsiergePhone(e.target.value);
											}
										}}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="website">Website:</label>
									<input
										type="url"
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
										type="url"
										name="facebook_link"
										value={facebook_link}
										onChange={(e) => setFacebookLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="instagram_link">Instagram Link:</label>
									<input
										type="url"
										name="instagram_link"
										value={instagram_link}
										onChange={(e) => setInstagramLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="twitter_link">Twitter Link:</label>
									<input
										type="url"
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
										type="url"
										name="linkedin_link"
										value={linkedin_link}
										onChange={(e) => setLinkedinLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="Image">Image:</label>
									<input
										type="file"
										name="image"
										onChange={handleImageChange}
										multiple
									/>

									{errors.image && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.image}</span>}

									<div className='row mt-3 g-3'>
										{image && image.map((image: any, index) => (
											image instanceof Blob || image instanceof File ? (
												<div className='col-md-4' key={index}>
													<div className='v-img'>
														<img src={URL.createObjectURL(image)} className="s-image" alt="selected image" width={100} height={100} />
													</div>
												</div>
											) : (
												null
											)
										))}
									</div>

								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="youtube_link">Youtube Link:</label>
									<input
										type="url"
										name="youtube_link"
										value={youtube_link}
										onChange={(e) => setYoutubeLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className='mt-4'>
							<button
								type="submit"
								className="btn-send w-100"
								disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}
							</button>
						</div>
					</form>
				</div>
			</PopupModal>

			{/* // villa Edit popup start  */}

			<PopupModal
				show={editmodalConfirm}
				handleClose={editmodalConfirmClose}
				staticClass="var-login"
			>
				<div className="all-form" id="form_id">
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
										value={name || ''}
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
										value={email || ''}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4 villa_div'>
								<div className="login_div">
									<label htmlFor="phone">Phone:</label>
									<PhoneInput			
														country={"us"}
														value={phone}
														onChange={(phone) => setPhone(phone)}
													// add the required attribute here
													/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="address">Address:</label>
									<input
										id="address-input2"
										type="text"
										name="address"
										value={address || ''}
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
										value={city || ''}
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
										value={state || ''}
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
										<option value='partner' defaultValue={partner_owner === 'partner' ? 'true' : undefined}>Partner</option>
										<option value='owner' defaultValue={partner_owner === 'owner' ? 'true' : undefined}
										>Owner</option>
									</select>
									{errors.partner_owner && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.partner_owner}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="category">Category:</label>
									<select aria-label="Default select example" name="category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}>
										<option value=''>Select category</option>
										<option value='basic' defaultValue={category === 'basic' ? 'true' : undefined}>Basic</option>
										<option value='luxury' defaultValue={category === 'luxury' ? 'true' : undefined}>Luxury</option>
									</select>
									{errors.category && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.category}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="capacity">Capacity:</label>
									<input
										type="number"
										name="capacity"
										value={capacity || ''}
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
										value={price_per_day || ''}
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
										value={bedrooms || ''}
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
										value={bathrooms || ''}
										onChange={(e) => setBathrooms(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="type_of_stove">Type of stove1:</label>
									<select aria-label="Default select example" name="type_of_stove" value={type_of_stove} onChange={(e) => setTypeStove(e.target.value)}>
										<option value=''>Select Stove</option>
										<option value='gas' defaultValue={type_of_stove === 'gas' ? 'true' : undefined}>Gas</option>
										<option value='electric' defaultValue={type_of_stove === 'electric' ? 'true' : undefined}>Electric</option>
										<option value='induction' defaultValue={type_of_stove === 'induction' ? 'true' : undefined}>Induction</option>
									</select>
									{errors.type_of_stove && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.type_of_stove}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="equipment">Equipment:</label>
									<select aria-label="Default select example" name="equipment" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
										<option value=''>Select Equipment</option>
										<option value='basic' defaultValue={equipment === 'basic' ? 'true' : undefined}>basic</option>
										<option value='fully_equipped' defaultValue={equipment === 'basic' ? 'true' : undefined}>fully_equipped</option>
									</select>
									{errors.equipment && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.equipment}</span>}
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="BBQ">BBQ:</label>
									<select aria-label="Default select example" name="BBQ" value={BBQ} onChange={(e) => setBBQ(e.target.value)}>
										<option value=''>Select BBQ</option>
										<option value='yes' defaultValue={BBQ === 'yes' ? 'true' : undefined}>Yes</option>
										<option value='no' defaultValue={BBQ === 'no' ? 'true' : undefined}>No</option>
									</select>
									{errors.BBQ && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.BBQ}</span>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="consierge_phone">Consierge Phone:</label>
									<input
										type="text"
										name="consierge_phone"
										value={consierge_phone || ''}
										onChange={(e) => {
											const re = /^[0-9\b]+$/;
											if (e.target.value === '' || re.test(e.target.value)) {
												setConsiergePhone(e.target.value);
											}
										}}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="website">Website:</label>
									<input
										type="url"
										name="website"
										value={website || ''}
										onChange={(e) => setWebsite(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="facebook_link">Facebook Link:</label>
									<input
										type="url"
										name="facebook_link"
										value={facebook_link || ''}
										onChange={(e) => setFacebookLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="instagram_link">Instagram Link:</label>
									<input
										type="url"
										name="instagram_link"
										value={instagram_link || ''}
										onChange={(e) => setInstagramLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="twitter_link">Twitter Link:</label>
									<input
										type="url"
										name="twitter_link"
										value={twitter_link || ''}
										onChange={(e) => setTwitterLink(e.target.value)}
									/>
								</div>
							</div>
							<div className='col-md-4'>
								<div className="login_div">
									<label htmlFor="linkedin_link">Linkedin Link:</label>
									<input
										type="url"
										name="linkedin_link"
										value={linkedin_link || ''}
										onChange={(e) => setLinkedinLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row">
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="Image">Image:</label>
									<input
										type="file"
										name="image"
										onChange={handleImageChange}
										multiple
									/>
									{errors.image && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.image}</span>}


									<div className='row mt-3 g-3'>
										{image && image.map((images: any, index) => (
											images instanceof Blob || images instanceof File ? (
												<div className='col-md-4' key={index}>
													<div className='v-img'>
														<img src={URL.createObjectURL(images)} className="s-image" alt="selected image" width={100} height={100} />
													</div>
												</div>
											) : (
												<div className='col-md-4' key={index}>
													<div className='v-img'>
														<img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/villas/images/' + images.image} alt="villa-image" width={100} height={100} className="s-image" />
													</div>
												</div>
											)
										))}
									</div>
								</div>
							</div>
							<div className='col-md-6'>
								<div className="login_div">
									<label htmlFor="youtube_link">Youtube Link:</label>
									<input
										type="url"
										name="youtube_link"
										value={youtube_link}
										onChange={(e) => setYoutubeLink(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className='mt-4'>
							<button
								type="submit"
								className="btn-send w-100"
								disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Update'}
							</button>
						</div>
					</form>
				</div>
			</PopupModal>

			<ToastContainer />
		</>
	)
}