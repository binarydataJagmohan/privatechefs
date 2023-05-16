import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { updateUserProfile, getSingleUserProfile } from '../../../lib/userapi'
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
  const [lat,setLat ] = useState("");
  const [lng, setLng] = useState("");

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
      lat:lat,
      lng:lng,
    };

    updateUserProfile(userid, data, image)
      .then((res) => {
        setButtonState(false);
        console.log(res.data);
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
  };

  const uploadimage = () => {
    $("#uploadfile").trigger("click");
  };

  const hoverinimage = function (e: any) {
    $(e.target).css("opacity", "0.3");
    $(".fa-image").css("display", "block");
  };
  const hoveroutimage = function (e: any) {
    $(e.target).css("opacity", "1");
    $(".fa-image").css("display", "none");
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  useEffect(() => {

    const apiKey = 'AIzaSyBsHfzLkbQHTlW5mg3tyVFKCffTb1TfRaU'; // replace with your actual API key
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
                      <input type="text" name="name" value={currentUserData.name || ''} placeholder="Name " onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Surname</label>
                      <input type="text" name="surname" value={surname || ''} placeholder="Surname" onChange={(e) => setSurName(e.target.value)} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Phone</label>
                      <input type="text" name="phone" maxLength={10} value={phone || ''} placeholder="Phone" onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        if (e.target.value === '' || re.test(e.target.value)) {
                          setPhone(e.target.value);
                        }
                      }} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Birthday</label>
                      <input type="date" name="birthday" value={birthday || ''} placeholder="Birthday" onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                  </div>

                  {/* <label>Address</label>
                  <input type="text" name="address" value={address || ''} placeholder="Address" onChange={(e) => setAddress(e.target.value)} /> */}

                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>Timezone</label>
                      {/* <input name="timezone" value={timezone || ''} placeholder="Timezone" onChange={(e) => setTimezone(e.target.value)} /> */}
                      <TimezonePicker name="timezone" value={timezone || ''} placeholder="Timezone" onChange={handleTimezoneChange} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Currency</label>
                      <input type="text" name="currency" value={currency || ''} placeholder="Currency" onChange={(e) => setCurrency(e.target.value)} />
                    </div>

                  </div>
                  <div className="checkbox-size text-left mt-3 mb-3">
                    {/* <input type="checkbox" name="invoice_details" value="1" className="checkbox-" onChange={(e) => setInvoiceDetails(e.target.checked ? "1" : "0")} checked={invoice_details === "1"} /> */}
                    <label>Invoice details:</label>
                    <div className='details'>
                      <div className='row'>
                        <div className='col-md-4'>
                          <label>Address</label>
                          <input type="text" id="address-input" name="address" value={address || ''} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
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
                          <input type="text" name="city" value={city || ''} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className='col-md-4'>
                          <label>Country</label>
                          <input type="text" name="country" value={country || ''} placeholder="TAX ID" onChange={(e) => setCountry(e.target.value)} />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4'>
                          <label>Post Code</label>
                          <input type="number" name="post_code" value={post_code || ''} placeholder="Post Code" onChange={(e) => setPostCode(e.target.value)} />
                        </div>
                        <div className='col-md-4'>
                          <label>Business Email</label>
                          <input type="text" name="business_email" value={business_email || ''} placeholder="Business Email" onChange={(e) => setBusinessEmail(e.target.value)} />
                        </div>
                        <div className='col-md-4'>
                          <label>Business Phone No.</label>
                          <input type="text" name="business_phoneno" value={business_phoneno || ''} placeholder="Business Phone No" onChange={(e) => setBusinessPhoneNo(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <label className="mt-3">Company Name</label>
                  <input type="text" name="company_name" value={company_name || ''} placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} />
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>VAT Number</label>
                      <input type="text" name="vat_no" value={vat_no || ''} placeholder="VAT Number" maxLength={15} onChange={(e) => setVatNo(e.target.value)} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>TAX ID</label>
                      <input type="text" name="tax_id" value={tax_id || ''} placeholder="TAX ID" maxLength={15} onChange={(e) => setTaxId(e.target.value)} />
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
                      onClick={() => uploadimage()}
                      onMouseEnter={(e) => hoverinimage(e.currentTarget)}
                      onMouseLeave={(e) => hoveroutimage(e.currentTarget)}
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
                      onClick={() => uploadimage()}
                      onMouseEnter={(e) => hoverinimage(e.currentTarget)}
                      onMouseLeave={(e) => hoveroutimage(e.currentTarget)}
                    />
                  )}

                  <label> <input
                    type="file"
                    name="image"
                    id="uploadfile"
                    className="d-none"
                    onChange={imageChange}
                  /><i className="fa-solid fa-camera"></i></label>
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