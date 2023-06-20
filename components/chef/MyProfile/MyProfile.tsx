import React, { useState, useEffect, useRef } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { updateChefProfile, getChefDetail, UpdateChefResume, getChefResume, UpdateLocationStatus, SaveChefLocation, getChefLocation, UpdateChefLocation, getSingleLocation, deleteSingleLocation, updateChefImage, getCurrentLocation } from '../../../lib/chefapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Loader } from '@googlemaps/js-api-loader';
import PopupModal from '../../../components/commoncomponents/PopupModal';
import swal from "sweetalert";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";

export default function MyProfile() {

	interface Location {
		id: number;
		address: string;
		location_status: string;
	}
	interface Location1 {
		id: number;
		address: string;
		lat: number;
		lng: number;
	}
	interface User {
		id: number;
		name: string;
		surname: string;
		email: string;
		approved_by_admin: string;
	}

	interface UserData {
		pic: string | null;
	}

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
	const [image, setImage] = useState('');
	const [buttonStatus, setButtonState] = useState(false);

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

	const [locationaddress, setLocationaddress] = useState("");
	const [lat, setLat] = useState("");
	const [lng, setLng] = useState("");
	const [location_status, setLocationStatus] = useState("");
	const [modalConfirm, setModalConfirm] = useState(false);
	const [currentUserData, setCurrentUserData] = useState<User>({
		id: 0,
		name: "",
		surname: "",
		email: "",
		approved_by_admin: ""
	});

	const [userData, setUserData] = useState<UserData>({ pic: "" });
	const [chefResume, setChefResume] = useState({});
	const [chefLocation, setChefLocation] = useState<Location[]>([]);
	const [errors, setErrors]: any = useState({});
	const mapRef = useRef(null);
	const [editmodalConfirm, editsetModalConfirm] = useState(false);
	const [getsingledata, setGetSingleData]: any = useState([]);
	const [totalMenu, setTotalMenu]: any = useState({});
	const [getsinglelocation, setGetSingleLocation] = useState<Location[]>([]);
	const [currentlocation, setCurrentLocation] = useState<Location1>({
		id: 0,
		address: "",
		lat: 0,
		lng: 0,
	});
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;


	const modalConfirmOpen = () => {
		setModalConfirm(true);
	}
	const modalConfirmClose = () => {
		setModalConfirm(false);
	}
	const editmodalConfirmOpen = () => {
		editsetModalConfirm(true);
	}
	const editmodalConfirmClose = () => {
		editsetModalConfirm(false);
	}

	const updateLocationStatus = async (id: number, location_status: string) => {
		setButtonState(true);
		const data = {
			location_status: location_status
		};
		UpdateLocationStatus(id, data)
			.then(res => {
				if (res.status == true) {
					getChefLocationData(currentUserData.id);
					setModalConfirm(false);
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
	};

	const updateLocation = async (e: any) => {
		const errors: any = {};
		if (!locationaddress) {
			errors.locationaddress = "Address is required";
		}
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			e.preventDefault();
			// const user_id = chefLocation.user_id;
			// console.log(user_id);
			const id = getsingledata.id;
			setButtonState(true);
			const data = {
				user_id: currentUserData.id,
				address: locationaddress,
				lat: lat,
				lng: lng,
			};
			UpdateChefLocation(id, data)
				.then(res => {
					if (res.status == true) {
						setModalConfirm(false);
						editmodalConfirmClose();
						setButtonState(false);
						getChefLocationData(currentUserData.id);
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
	};


	const handleUpdateProfile = async (e: any) => {
		e.preventDefault();

		const errors: any = {};

		if (!name) {
			errors.name = "Name is required";
		}
		if (!surname) {
			errors.surname = "Surname is required";
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
		if (!passport_no) {
			errors.passport_no = "Passport No. is required";
		}
		if (!BIC) {
			errors.BIC = "BIC is required";
		}
		if (!IBAN) {
			errors.IBAN = "IBAN is required";
		}
		if (!bank_name) {
			errors.bank_name = "Bank Name is required";
		}
		if (!holder_name) {
			errors.holder_name = "Holder Name is required";
		}
		if (!bank_address) {
			errors.bank_address = "Bank Address is required";
		}
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			setButtonState(true);
			const userid = currentUserData.id;
			//console.log(userid);
			const data = {
				name: name || '',
				surname: surname || '',
				email: email || '',
				phone: phone || '',
				address: address || '',
				passport_no: passport_no || '',
				BIC: BIC || '',
				IBAN: IBAN || '',
				bank_name: bank_name || '',
				holder_name: holder_name || '',
				bank_address: bank_address || '',
				lat: lat,
				lng: lng
			};

			updateChefProfile(userid, data)
				.then((res) => {
					setButtonState(false);
					console.log(res.data);
					window.localStorage.setItem("name", res.data.name);
					window.localStorage.setItem("pic", res.data.pic);
					window.localStorage.setItem("surname", res.data.surname);
					window.localStorage.setItem("email", res.data.email);
					window.localStorage.setItem("address", res.data.address);
					window.localStorage.setItem("phone", res.data.phone);
					window.localStorage.setItem("profile_status", res.data.profile_status);
					window.localStorage.setItem("approved_by_admin", res.data.approved_by_admin);

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
					window.location.reload();
				})
				.catch((err) => {
					setButtonState(false);
					toast.error("Error occurred", {
						position: toast.POSITION.BOTTOM_RIGHT,
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
				});
		}
	};

	const imageChange = async (e: any) => {
		const file = e.target.files[0];
		setImage(file);

		updateChefImage(currentUserData.id, file)
			.then((res) => {
				window.localStorage.setItem("pic", res.data.pic);
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
				window.location.reload();
			})
			.catch(error => {
				console.error(error);
				toast.error('Invalid file format', {
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
			});
	};

	const saveLocation = async (e: any) => {
		const errors: any = {};
		if (!locationaddress) {
			errors.locationaddress = "Address is required";
		}
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			e.preventDefault();
			setButtonState(true);
			const userData: User = getCurrentUserData() as User;
			//console.log(user_id)
			const data = {
				user_id: userData.id,
				address: locationaddress,
				lat: lat,
				lng: lng,
			};
			SaveChefLocation(data)
				.then(res => {
					if (res.status == true) {
						console.log(res.data);
						getChefLocationData(userData.id);
						setModalConfirm(false);
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
					setButtonState(false);
					toast.error('Maximum limit of locations reached', {
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
				});
		}
	};


	const resumeUpdate = async (e: any) => {
		e.preventDefault();
		setButtonState(true);
		const id = currentUserData.id;
		const data = {
			about: about || '',
			description: description || '',
			services_type: services_type || '',
			employment_status: employment_status || '',
			website: website || '',
			languages: languages || '',
			experience: experience || '',
			skills: skills || '',
			favorite_chef: favorite_chef || '',
			favorite_dishes: favorite_dishes || '',
			love_cooking: love_cooking || '',
			facebook_link: facebook_link || '',
			instagram_link: instagram_link || '',
			twitter_link: twitter_link || '',
			linkedin_link: linkedin_link || '',
			youtube_link: youtube_link || ''
		};
		UpdateChefResume(id, data)
			.then(res => {
				setButtonState(false);
				console.log(res.data);
				// console.log(res.data);
				window.localStorage.removeItem("name");
				window.localStorage.removeItem("pic");
				window.localStorage.removeItem("surname");
				window.localStorage.setItem("name", res.data.name);
				window.localStorage.setItem("pic", res.data.pic);
				window.localStorage.setItem("surname", res.data.surname);
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

			}).catch(err => {
				setButtonState(false);
				toast.error(err, {
					position: toast.POSITION.BOTTOM_RIGHT,
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
			});
	};

	useEffect(() => {
		getUserData();

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
						if (inputId === 'address-input') {
							setAddress(address)
							setLat(lat.toString());
							setLng(lng.toString());
						} else if (inputId === 'address-input1') {
							setLocationaddress(address)
							setLat(lat.toString());
							setLng(lng.toString());
						} else if (inputId === 'address-input2') {
							setLocationaddress(address)
							setLat(lat.toString());
							setLng(lng.toString());
						}
					}
				});
			}
		}

		loader.load().then(() => {
			setupAddressAutocomplete('address-input');
			setupAddressAutocomplete('address-input1');
			setupAddressAutocomplete('address-input2');

		}).catch((error) => {
			console.error('Failed to load Google Maps API', error);
		});

	}, []);


	const getUserData = async () => {
		const data = isPageVisibleToRole('chef-edit-profile');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			const userData: User = getCurrentUserData() as User;
			setCurrentUserData(userData);
			getChefDetailData(userData.id);
			getChefResumeData(userData.id);
			getChefLocationData(userData.id);
			getCurrentLocationData(userData.id);
		}
	}
	const getLocation = async (id: any) => {
		try {
			const res = await getSingleLocation(id);
			if (res.status == true) {
				setModalConfirm(false);
				setGetSingleLocation(res.data.address);

				// Display the map for the selected location
				let lat, lng;

				// Update the property access based on the response structure
				if (res.data.geometry && res.data.geometry.location) {
					lat = res.data.geometry.location.lat;
					lng = res.data.geometry.location.lng;
				} else if (res.data.lat && res.data.lng) {
					lat = res.data.lat;
					lng = res.data.lng;
				} else {
					// Handle the case when the location coordinates are not available
					console.log("Location coordinates not found");
					return;
				}

				const parsedLat = parseFloat(lat);
				const parsedLng = parseFloat(lng);

				// Check if the parsed lat and lng are valid numbers
				if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
					const mapOptions = {
						center: { lat: parsedLat, lng: parsedLng },
						zoom: 12,
					};

					// Ensure google is defined before creating the map
					if (typeof google !== 'undefined' && mapRef.current !== null) {
						const map = new google.maps.Map(mapRef.current, mapOptions);
						const marker = new google.maps.Marker({
							position: { lat: parsedLat, lng: parsedLng },
							map: map,
							title: res.data.address,
						});
					}
				}
			} else {
				console.log("error");
			}
		} catch (err) {
			console.log(err);
		}
	}


	const getChefDetailData = async (id: any) => {
		getChefDetail(id)
			.then(res => {
				setButtonState(false);
				if (res.status == true) {
					setFullName(res.data.name);
					setSurName(res.data.surname);
					setEmail(res.data.email);
					setPhone(res.data.phone);
					setAddress(res.data.address);
					setPassportNo(res.data.passport_no);
					setBIC(res.data.BIC);
					setIBAN(res.data.IBAN);
					setBankName(res.data.bank_name);
					setHolderName(res.data.holder_name);
					setBankAddress(res.data.bank_address);
					setUserData(res.data);
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

	const getChefResumeData = async (id: any) => {
		getChefResume(id)
			.then(res => {
				if (res.status == true) {
					setAbout(res.data.about);
					setDescription(res.data.description);
					setServicesType(res.data.services_type);
					setEmploymentStatus(res.data.employment_status);
					setWebsite(res.data.website);
					setLanguages(res.data.languages);
					setExperience(res.data.experience);
					setSkills(res.data.skills);
					setFavoriteChef(res.data.favorite_chef);
					setFavoriteDishes(res.data.favorite_dishes);
					setLoveCooking(res.data.love_cooking);
					setFacebookLink(res.data.facebook_link);
					setInstagramLink(res.data.instagram_link);
					setInstagramLink(res.data.about);
					setTwitterLink(res.data.twitter_link);
					setLinkedinLink(res.data.linkedin_link);
					setYoutubeLink(res.data.youtube_link);
					setChefResume(res.data);
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
			.catch(err => {
				console.log(err);
			});
	}

	const onPageChange = (page: any) => {
		setCurrentPage(page);
		getChefLocation(currentUserData.id)
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, page, pageSize);
					setChefLocation(paginatedPosts);
				} else {
					console.log(res.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	// let googleMapsApiLoaded = false;

	const getCurrentLocationData = async (id: any) => {
		try {
			const res = await getCurrentLocation(id);
			if (res.status == true) {
				setModalConfirm(false);
				setCurrentLocation(res.data);
				//console.log(res.data.address);
				// Display the map for the selected location
				let lat, lng;

				// Update the property access based on the response structure
				if (res.data.geometry && res.data.geometry.location) {
					lat = res.data.geometry.location.lat;
					lng = res.data.geometry.location.lng;
				} else if (res.data.lat && res.data.lng) {
					lat = res.data.lat;
					lng = res.data.lng;
				} else {
					// Handle the case when the location coordinates are not available
					console.log("Location coordinates not found");
					return;
				}

				const parsedLat = parseFloat(lat);
				const parsedLng = parseFloat(lng);

				// Check if the parsed lat and lng are valid numbers
				if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
					const mapOptions = {
						center: { lat: parsedLat, lng: parsedLng },
						zoom: 12,
					};

					// Ensure google is defined before creating the map
					if (typeof google !== 'undefined' && mapRef.current !== null) {
						const map = new google.maps.Map(mapRef.current, mapOptions);
						const marker = new google.maps.Marker({
							position: { lat: parsedLat, lng: parsedLng },
							map: map,
							title: res.data.address,
						});
					}
				}
			} else {
				console.log("error");
			}
		} catch (err) {
			console.log(err);
		}
	}


	const getChefLocationData = async (id: any) => {
		getChefLocation(id)
			.then(res => {
				setButtonState(false);
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, currentPage, pageSize);
					setChefLocation(paginatedPosts);
					//console.log(res.data);

					const loader = new Loader({
						apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
						version: "weekly",
						libraries: ["places"]
					});
					loader.load().then(() => {
						if (res.data && res.data.length > 0) {
							const firstData = res.data[0];
							if (mapRef.current) {
								const map = new google.maps.Map(mapRef.current, {
									center: { lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lng) },
									zoom: 12,
								});

								const marker = new google.maps.Marker({
									position: { lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lng) },
									map: map,
									title: res.data[0].address,
								});
								//console.log(res.data[0].address);
							}
						} else {
							// handle case where res.data is undefined or empty
						}
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

	const GetSingleLocation = async (id: any) => {
		getSingleLocation(id)
			.then(res => {
				if (res.status == true) {
					setModalConfirm(false);
					editsetModalConfirm(true);
					setGetSingleData(res.data);
					setGetSingleLocation(res.data.address);
					setLocationaddress(res.data.address);
					//console.log(res.data.address);
					// setChefLocation(res.data);
				} else {
					console.log("error");
				}
			})
			.catch(err => {
				console.log(err);
			});
	}


	const deleteReceiptData = (id: any) => {
		swal({
			title: "Are you sure?",
			text: "You want to delete the Address",
			icon: "warning",
			dangerMode: true,
			buttons: ["Cancel", "Yes, I am sure!"],
		}).then((willDelete) => {
			if (willDelete) {
				deleteSingleLocation(id)
					.then((res) => {
						if (res.status == true) {
							getChefLocationData(currentUserData.id);
							swal("Your Address has been deleted!", {
								icon: "success",
							});
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

	const resetFields = () => {
		setLocationStatus("");
		setLocationaddress("");
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
														<div className="user-img1  ">
															{userData.pic ? (
																<img
																	src={
																		image && (typeof image !== 'string')
																			? URL.createObjectURL(image)
																			: (userData.pic ? process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + userData.pic : '')
																	}

																	alt=""
																/>
															) : (
																<img
																	src={
																		image && (typeof image !== 'string')
																			? URL.createObjectURL(image)
																			: process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'
																	}
																	// crop={{ ratio: "1/1", position: "center" }}
																	alt=""
																/>
															)}

															<label> <input
																type="file"
																name="image"
																id="uploadfile"
																className="d-none"
																onChange={imageChange}
																accept=".jpg, .jpeg, .gif, .png, .webp"
															/><i className="fa-solid fa-camera"></i>

															</label>
														</div>

													</div>
													<div className="col-lg-8 col-md-7 col-8">
														<div className="user-profile-collapsed mt-3">
															<h6>Profile Picture</h6>
															<p className="f-10-2">{currentUserData.name}</p>
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
													<input type="text" name="name" value={name || ''} onChange={(e) => setFullName(e.target.value)} />
													{errors.name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.name}
														</span>
													)}
												</div>
												<div className="col-lg-4 col-md-6">
													<label>Surname</label>
													<input type="text" name="surname" value={surname || ''} onChange={(e) => setSurName(e.target.value)} />
													{errors.description && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.description}
														</span>
													)}
												</div>
												<div className="col-lg-4 col-md-6">
													<label>Email</label>
													<input type="email" name="email" value={currentUserData.email} readOnly />

												</div>
												<div className="col-lg-4 col-md-6">
													<label>Phone Number</label>
													<PhoneInput
														country={"us"}
														value={phone}
														onChange={(phone) => setPhone(phone)}
													// add the required attribute here
													/>
													{errors.phone && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.phone}
														</span>
													)}
												</div>
												<div className="col-lg-5 col-md-6">
													<label>Address</label>
													<input id="address-input" type="text" name="address" value={address || ''} onChange={(e) => setAddress(e.target.value)} />
													{errors.address && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.address}
														</span>
													)}
												</div>
												<div className="col-lg-3 col-md-6">
													<label>ID/Passport No.</label>
													<input type="text" name="passport_no" value={passport_no || ''} onChange={(e) => setPassportNo(e.target.value)} />
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
													<input type="text" name="IBAN" value={IBAN || ''} onChange={(e) => setIBAN(e.target.value)} />
													{errors.IBAN && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.IBAN}
														</span>
													)}
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Bank Holder Name</label>
													<input type="text" name="holder_name" value={holder_name || ''} onChange={(e) => setHolderName(e.target.value)} />
													{errors.holder_name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.holder_name}
														</span>
													)}
												</div>
												<div className="col-lg-4 col-md-5">
													<label>Bank Name</label>
													<input type="text" name="bank_name" value={bank_name || ''} onChange={(e) => setBankName(e.target.value)} />
													{errors.bank_name && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.bank_name}
														</span>
													)}
												</div>
												<div className="col-lg-8 col-md-7">
													<label>Bank Address</label>
													<input type="text" name="bank_address" value={bank_address || ''} onChange={(e) => setBankAddress(e.target.value)} />
													{errors.bank_address && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.bank_address}
														</span>
													)}
												</div>
												<div className="col-lg-12 col-md-6">
													<label>BIC</label>
													<textarea name="BIC" value={BIC || ''} onChange={(e) => setBIC(e.target.value)}></textarea>
													{errors.BIC && (
														<span className="small error text-danger mb-2 d-inline-block error_login">
															{errors.BIC}
														</span>
													)}
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
									<button className="table-btn" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>
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
															<div className="user-img1">
																{userData.pic ? (
																	<img
																		src={
																			image && (typeof image !== 'string')
																				? URL.createObjectURL(image)
																				: (userData.pic ? process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + userData.pic : '')
																		}

																		alt=""
																	/>
																) : (
																	<img
																		src={
																			image && (typeof image !== 'string')
																				? URL.createObjectURL(image)
																				: process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'
																		}
																		// crop={{ ratio: "1/1", position: "center" }}
																		alt=""
																	/>
																)}

																<label> <input
																	type="file"
																	name="image"
																	id="uploadfile"
																	className="d-none"
																	onChange={imageChange}
																	accept=".jpg, .jpeg, .gif, .png, .webp"
																/><i className="fa-solid fa-camera"></i>

																</label>
															</div>
														</div>
														<div className="col-lg-8 col-md-7 col-8">
															<div className="user-profile-collapsed mt-3">
																<h6>Profile Picture</h6>
																<p className="f-10-2">{currentUserData.name}</p>
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
														<textarea name="about" value={about || ''} onChange={(e) => setAbout(e.target.value)}></textarea>
													</div>
													<div className="col-lg-12 col-md-12">
														<label>What describes you best?</label>
														<textarea name="description" value={description || ''} onChange={(e) => setDescription(e.target.value)}></textarea>
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Type of services</label>
														<input type="text" name="services_type" value={services_type || ''} onChange={(e) => setServicesType(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Employment Status</label>
														<input type="text" name="employment_status" value={employment_status || ''} onChange={(e) => setEmploymentStatus(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Your website</label>
														<input type="text" name="website" value={website || ''} onChange={(e) => setWebsite(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Languages</label>
														<input type="text" name="languages" value={languages || ''} onChange={(e) => setLanguages(e.target.value)} />
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
														<textarea name="love_cooking" value={love_cooking || ''} onChange={(e) => setLoveCooking(e.target.value)}></textarea>
													</div>
													<div className="col-lg-12 col-md-12">
														<label>Culinary experience</label>
														<textarea name="experience" value={experience || ''} onChange={(e) => setExperience(e.target.value)}></textarea>
													</div>
													<div className="col-lg-12 col-md-12">
														<label>Tell us about your favorite chefs</label>
														<textarea name="favorite_chef" value={favorite_chef || ''} onChange={(e) => setFavoriteChef(e.target.value)}></textarea>
													</div>
													<div className="col-lg-12 col-md-12">
														<label>Tell us about your favorite cuisines</label>
														<textarea name="favorite_dishes" value={favorite_dishes || ''} onChange={(e) => setFavoriteDishes(e.target.value)}></textarea>
													</div>
													<div className="col-lg-12 col-md-12">
														<label>Any special skills?</label>
														<textarea name="skills" value={skills || ''} onChange={(e) => setSkills(e.target.value)}></textarea>
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
														<input type="url" name="facebook_link" value={facebook_link || ''} onChange={(e) => setFacebookLink(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Instagram</label>
														<input type="url" name="instagram_link" value={instagram_link || ''} onChange={(e) => setInstagramLink(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Twitter</label>
														<input type="url" name="twitter_link" value={twitter_link || ''} onChange={(e) => setTwitterLink(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Linkedin</label>
														<input type="url" name="linkedin_link" value={linkedin_link || ''} onChange={(e) => setLinkedinLink(e.target.value)} />
													</div>
													<div className="col-lg-6 col-md-6">
														<label>Youtube</label>
														<input type="text" name="youtube_link" value={youtube_link || ''} onChange={(e) => setYoutubeLink(e.target.value)} />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="text-right">
										<button className="table-btn" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>									</div>
									<hr></hr>
								</>
							</form>
						</div>
						<div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
							<div className="row">
								<div className="col-lg-5 col-md-12 position-r">
									{Array.isArray(chefLocation) && chefLocation.length > 0 ? (
										// Render the locations if the data is available
										chefLocation.map((location, index) => (
											<div className="location-name" key={index}>
												<div className="row">
													<div className="col-7">
														<a onClick={() => getLocation(location.id)}>
															<p className="f-16" style={{ cursor: "pointer" }}>{location.address}</p>
														</a>
													</div>
													<div className="col-2">
														<label className="switch">
															<input
																type="checkbox"
																name="location_status"
																value={location_status}
																checked={location.location_status === "visible"}
																onChange={(e) => {
																	setLocationStatus(e.target.checked ? "visible" : "unvisible");
																	updateLocationStatus(location.id, e.target.checked ? "visible" : "unvisible");
																}}
															/>
															<span className="slider round"></span>
														</label>
													</div>
													<div className="col-3 social">
														<a onClick={() => GetSingleLocation(location.id)} id={`myCheckbox_${location.id}`}>
															<i className="fa fa-edit" aria-hidden="true"></i>
														</a>
														<a onClick={() => deleteReceiptData(location.id)}>
															<i className="fa fa-times" aria-hidden="true"></i>
														</a>
													</div>
												</div>
											</div>
										))
									) : (
										// Render a single item when the data is not available
										<div className="location-name">
											<div className="row">
												<div className="col-7">
													<a>
														<p className="f-16" style={{ cursor: "pointer" }}>{currentlocation.address}</p>
													</a>
												</div>
												<div className="col-2">
													<label className="switch">
														<input
															type="checkbox"
															name="location_status"
														/>
														<span className="slider round"></span>
													</label>
												</div>
											</div>
										</div>
									)}



									<div className='row'>
										<div className='col-md-6'>
											<div className="banner-btn position-top">
												<a onClick={() => { modalConfirmOpen(); resetFields(); }} style={{ cursor: "pointer", color: "white" }}>Add New Location</a>
											</div>
										</div>
										<div className='col-md-6'>
											<div className="banner-btn position-bottom">
												<a href="/startjourney">Start your journey</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-7 col-md-12">
									<div ref={mapRef} style={{ height: "400px" }}></div>
									{/* <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/map-3.png'} alt="map-3" className="w-100" /> */}
								</div>
							</div>
							<PopupModal
								show={modalConfirm}
								handleClose={modalConfirmClose}
								staticClass="var-login"
							>
								<div className="all-form" id="form_id">
									<form onSubmit={saveLocation}>
										<h5>Add Location</h5>
										<div className='row'>
											<div className='col-md-12'>
												<label>Address</label>
												<input id="address-input1" type="text" name="locationaddress" onChange={(e) => setLocationaddress(e.target.value)} />
												{errors.locationaddress && (
													<span className="small error text-danger mb-2 d-inline-block error_login">
														{errors.locationaddress}
													</span>
												)}
												{/* <iframe id="popup" style={{display:"none"}}src="about:blank"></iframe> */}
											</div>
										</div>
										<div className="text-right">
											<button className="table-btn" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>
										</div>
									</form>
								</div>
							</PopupModal>

							<PopupModal
								show={editmodalConfirm}
								handleClose={editmodalConfirmClose}
								staticClass="var-login"
							>
								<div className="all-form" id="form_id">
									<form onSubmit={updateLocation}>
										<h5>Edit Location</h5>
										<div className='row'>
											<div className='col-md-12'>
												<label>Address</label>
												<input id="address-input2" type="text" name="address" defaultValue={locationaddress || ''} onChange={(e) => setLocationaddress(e.target.value)} />
												{errors.locationaddress && (
													<span className="small error text-danger mb-2 d-inline-block error_login">
														{errors.locationaddress}
													</span>
												)}
												{/* <iframe id="popup" style={{display:"none"}}src="about:blank"></iframe> */}
											</div>
										</div>
										<div className="text-right">
											<button className="table-btn" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Update'}</button>
										</div>
									</form>
								</div>
							</PopupModal>
						</div>
					</div>
					{/* <Pagination
						items={totalMenu.length}
						currentPage={currentPage}
						pageSize={pageSize}
						onPageChange={onPageChange}
					/> */}
				</div>
				<ToastContainer />
			</div>
		</>
	)
}