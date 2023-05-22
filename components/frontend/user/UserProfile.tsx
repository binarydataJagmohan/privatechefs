import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { updateUserProfile, getSingleUserProfile, updateUsersImage } from '../../../lib/userapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeToken, removeStorageData } from "../../../lib/session";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';
import { Loader } from '@googlemaps/js-api-loader';

export default function UserProfile() {

  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string
  }

  interface UserData {
    pic: string | null;
  }

  const [name, setFullName] = useState("");
  const [surname, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timezone, setTimezone] = useState("");
  const [birthday, setBirthday] = useState<string | undefined>(undefined);
  const [currency, setCurrency] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [post_code, setPostCode] = useState("");
  const [business_email, setBusinessEmail] = useState("");
  const [business_phoneno, setBusinessPhoneNo] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [vat_no, setVatNo] = useState("");
  const [tax_id, setTaxId] = useState("");
  const [image, setImage] = useState("");
  const [buttonStatus, setButtonState] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [errors, setErrors]: any = useState({});

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: '',
    name: '',
    email: '',
    pic: null,
    surname: '',
    role: '',
    approved_by_admin: ''
  });

  const [userData, setUserData] = useState<UserData>({ pic: "" });

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();

    const errors: any = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!surname) {
      errors.surname = "Surname is required";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!timezone) {
      errors.timezone = "Timezone is required";
    }
    if (!birthday) {
      errors.birthday = "Birthday is required";
    }
    if (!currency) {
      errors.currency = "Currency is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (!post_code) {
      errors.post_code = "Post code is required";
    }
    if (!business_email) {
      errors.business_email = "business Email  is required";
    }
    if (!business_phoneno) {
      errors.business_phoneno = "Business Phone no. is required";
    }
    if (!company_name) {
      errors.company_name = "Company name is required";
    }
    if (!vat_no) {
      errors.vat_no = "Vat no. is required";
    }
    if (!tax_id) {
      errors.tax_id = "Tax Id is required";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setButtonState(true);
      const userid = currentUserData.id;

      const data = {
        name: name || '',
        surname: surname || '',
        phone: phone || '',
        address: address || '',
        timezone: timezone || '',
        birthday: birthday || '',
        currency: currency || '',
        city: city || '',
        country: country || '',
        post_code: post_code || '',
        business_email: business_email || '',
        business_phoneno: business_phoneno || '',
        company_name: company_name || '',
        vat_no: vat_no || '',
        tax_id: tax_id || '',
        lat: lat,
        lng: lng
      };

      updateUserProfile(userid, data)
        .then((res) => {
          setButtonState(false);
          getSingleUserData(userid);
          console.log(res.data);
          window.localStorage.setItem("name", res.data.name);
          window.localStorage.setItem("pic", res.data.pic);
          window.localStorage.setItem("surname", res.data.surname);
          window.localStorage.setItem("address", res.data.address);
          window.localStorage.setItem("phone", res.data.phone);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((err) => {
          setButtonState(false);
          toast.error("Error occurred", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    updateUsersImage(currentUserData.id, file)
      .then((res) => {
        window.localStorage.setItem("name", res.data.name);
        window.localStorage.setItem("pic", res.data.pic);
        window.localStorage.setItem("surname", res.data.surname);
        window.localStorage.setItem("address", res.data.address);
        window.localStorage.setItem("phone", res.data.phone);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(error => {
        console.error(error);
        toast.error('Error occurred', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""
    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then(() => {
      const input: HTMLInputElement | null = document.getElementById('address-input') as HTMLInputElement | null;
      if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => {

          const place = autocomplete.getPlace();

          // Get the address
          if (place && place.formatted_address && place.geometry && place.geometry.location) {
            // Get the address
            const address = place.formatted_address;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            setAddress(address)
            setLat(lat.toString());
            setLng(lng.toString());
            // Do something with the selected place
          }
          // Do something with the selected place
        });
      }
    }).catch((error) => {
      console.error('Failed to load Google Maps API', error);
    });
    getUserData();
  }, []);

  const getUserData = async () => {
    const data = isPageVisibleToRole('user-edit-profile');
    if (data == 2) {
      window.location.href = '/';
    }
    if (data == 0) {
      window.location.href = '/404';
    }
    if (data == 1) {
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
      getSingleUserData(userData.id)
    }
  }

  const getSingleUserData = async (id: any) => {
    getSingleUserProfile(id)
      .then(res => {
        setButtonState(false);
        if (res.status == true) {
          setFullName(res.data.name);
          setSurName(res.data.surname);
          setPhone(res.data.phone);
          setAddress(res.data.address);
          setTimezone(res.data.timezone);
          setBirthday(res.data.birthday);
          setCurrency(res.data.currency);
          setCity(res.data.city);
          setCountry(res.data.country);
          setPostCode(res.data.post_code);
          setBusinessEmail(res.data.business_email);
          setBusinessPhoneNo(res.data.business_phoneno);
          setCompanyName(res.data.company_name);
          setVatNo(res.data.vat_no);
          setTaxId(res.data.tax_id);
          setUserData(res.data);
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

  const handleTimezoneChange = (selectedTimezone: any) => {
    setTimezone(selectedTimezone);
  };

  function handleLogout() {
    removeToken();
    removeStorageData();
    window.location.href = "/";
  }

  return (
    <>
      <section className="userprofile-part">
        <div className="container">
          <div className="my-profile mt-5 mb-5 tab-m-0">
            <h2> My profile <span className="log-out"><a onClick={handleLogout} role="button" >Log out</a></span></h2>
          </div>
          <form onSubmit={handleUpdateProfile}>
            <div className="row">
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
                  <a href="/user/userprofilethree">
                    <div className="profile-cols mt-4 mb-4">
                      <h4>Aditional Information/Preferences</h4>
                      <p>Halal, Kosher, Hindu.</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-7 col-md-12">
                <div className="all-form tab-m-0 pt-0 right-left-spacing">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>Name  </label>
                      <input type="text" name="name" defaultValue={currentUserData.name || ''} placeholder="Name " onChange={(e) => setFullName(e.target.value)} />
                      {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Surname</label>
                      <input type="text" name="surname" defaultValue={surname || ''} placeholder="Surname" onChange={(e) => setSurName(e.target.value)} />
                      {errors.surname && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.surname}</span>}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Phone</label>
                      <input type="text" defaultValue="phone" maxLength={10} value={phone || ''} placeholder="Phone" onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                          setPhone(e.target.value);
                        }
                      }} />
                      {errors.phone && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.phone}</span>}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Birthday</label>
                      <input type="date" defaultValue="birthday" value={birthday || ''} placeholder="Birthday" onChange={(e) => setBirthday(e.target.value)} />
                      {errors.birthday && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.birthday}</span>}
                    </div>
                  </div>

                  {/* <label>Address</label>
                  <input type="text" name="address" value={address || ''} placeholder="Address" onChange={(e) => setAddress(e.target.value)} /> */}

                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>Timezone</label>
                      {/* <input name="timezone" value={timezone || ''} placeholder="Timezone" onChange={(e) => setTimezone(e.target.value)} /> */}
                      <TimezonePicker name="timezone" value={timezone || ''} placeholder="Timezone" onChange={handleTimezoneChange} />
                      {errors.timezone && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.timezone}</span>}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Currency</label>
                      <input type="text" name="currency" defaultValue={currency || ''} placeholder="Currency" onChange={(e) => setCurrency(e.target.value)} />
                      {errors.currency && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.currency}</span>}
                    </div>

                  </div>
                  <div className="checkbox-size text-left mt-3 mb-3">
                    {/* <input type="checkbox" name="invoice_details" value="1" className="checkbox-" onChange={(e) => setInvoiceDetails(e.target.checked ? "1" : "0")} checked={invoice_details === "1"} /> */}
                    <label>Invoice details:</label>
                    <div className='details'>
                      <div className='row'>
                        <div className='col-md-4'>
                          <label>Address</label>
                          <input type="text" id="address-input" defaultValue="address" value={address || ''} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                          {errors.address && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.address}</span>}
                          {/* <input
                      id="address-input"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    /> */}
                        </div>
                        <div className='col-md-4'>
                          <label>City</label>
                          <input type="text" defaultValue="city" value={city || ''} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                          {errors.city && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.city}</span>}
                        </div>
                        <div className='col-md-4'>
                          <label>Country</label>
                          <input type="text" defaultValue="country" value={country || ''} placeholder="TAX ID" onChange={(e) => setCountry(e.target.value)} />
                          {errors.country && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.country}</span>}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4'>
                          <label>Post Code</label>
                          <input type="number" defaultValue="post_code" value={post_code || ''} placeholder="Post Code" onChange={(e) => setPostCode(e.target.value)} />
                          {errors.post_code && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.post_code}</span>}
                        </div>
                        <div className='col-md-4'>
                          <label>Business Email</label>
                          <input type="text" defaultValue="business_email" value={business_email || ''} placeholder="Business Email" onChange={(e) => setBusinessEmail(e.target.value)} />
                          {errors.business_email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.business_email}</span>}
                        </div>
                        <div className='col-md-4'>
                          <label>Business Phone No.</label>
                          <input type="text" defaultValue="business_phoneno" value={business_phoneno || ''} placeholder="Business Phone No" onChange={(e) => setBusinessPhoneNo(e.target.value)} />
                          {errors.business_phoneno && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.business_phoneno}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <label className="mt-3">Company Name</label>
                  <input type="text" defaultValue="company_name" value={company_name || ''} placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} />
                  {errors.company_name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.company_name}</span>}
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>VAT Number</label>
                      <input type="text" defaultValue="vat_no" value={vat_no || ''} placeholder="VAT Number" maxLength={15} onChange={(e) => setVatNo(e.target.value)} />
                      {errors.vat_no && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.vat_no}</span>}
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>TAX ID</label>
                      <input type="text" defaultValue="tax_id" value={tax_id || ''} placeholder="TAX ID" maxLength={15} onChange={(e) => setTaxId(e.target.value)} />
                      {errors.tax_id && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.tax_id}</span>}
                    </div>
                  </div>
                  <div className="text-right mt-4">
                    <button className="table-btn" type="submit" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <div className="user-img  ">
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
                          : process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'
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
                  /><i className="fa-solid fa-camera"></i>
                  </label>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  )
}