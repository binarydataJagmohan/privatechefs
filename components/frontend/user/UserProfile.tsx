import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { updateUserProfile, getSingleUserProfile } from '../../../lib/userapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeToken, removeStorageData } from "../../../lib/session";
import TimezonePicker from 'react-bootstrap-timezone-picker';
import 'react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css';


export default function UserProfile() {

  const [name, setFullName] = useState("");
  const [surname, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timezone, setTimezone] = useState();
  const [birthday, setBirthday] = useState();
  const [currency, setCurrency] = useState("");
  const [invoice_details, setInvoiceDetails] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [vat_no, setVatNo] = useState("");
  const [tax_id, setTaxId] = useState("");
  const [image, setImage] = useState("");
  const [buttonStatus, setButtonState] = useState(false);

  const [currentUserData, setCurrentUserData] = useState({});
  const [userData, setUserData] = useState({});

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
      invoice_details: invoice_details,
      company_name: company_name || '',
      vat_no: vat_no || '',
      tax_id: tax_id || ''
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

  const hoverinimage = () => {
    $(this).css("opacity", "0.3");
    $(".fa-image").css("display", "block");
  };

  const hoveroutimage = () => {
    $(this).css("opacity", "1");
    $(".fa-image").css("display", "none");
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
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
      const userData = getCurrentUserData();
      setCurrentUserData(userData);
      getSingleUserData(userData.id)
    }
  }

  const getSingleUserData = async (id) => {
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
          setInvoiceDetails(res.data.invoice_details);
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

  const handleTimezoneChange = (selectedTimezone:any) => {
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
                  <a href="/user/userprofiletwo">
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
              <div className="col-lg-6 col-md-12">
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

                  <label>Address</label>
                  <input type="text" name="address" value={address || ''} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>Timezone</label>
                      <TimezonePicker name="timezone" value={timezone || ''} placeholder="Timezone" onChange={handleTimezoneChange} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>Currency</label>
                      <input type="text" name="currency" value={currency || ''} placeholder="Currency" onChange={(e) => setCurrency(e.target.value)} />
                    </div>

                  </div>
                  <div className="checkbox-size text-left mt-3 mb-3"> 
                  <input type="checkbox" name="invoice_details" value="1" className="checkbox-" onChange={(e) => setInvoiceDetails(e.target.checked ? "1" : "0")}  checked={invoice_details === "1"} />
                    <label> Invoice details</label>
                  </div>
                  <label className="mt-3">Company Name</label>
                  <input type="text" name="company_name" value={company_name || ''} placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} />
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <label>VAT Number</label>
                      <input type="text" name="vat_no" value={vat_no || ''} placeholder="VAT Number" maxLength={15}  onChange={(e) => setVatNo(e.target.value)} />
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <label>TAX ID</label>
                      <input type="text" name="tax_id" value={tax_id || ''} placeholder="TAX ID" maxLength={15}  onChange={(e) => setTaxId(e.target.value)} />
                    </div>
                  </div>
                  <div className="text-right mt-4">
                  <button className="table-btn" type="submit" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save'}</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <div className="user-img  ">
                  {userData.pic ? <img
                    src={
                      image ? URL.createObjectURL(image) : process.env.NEXT_PUBLIC_IMAGE_URL + 'images/chef/users/' + userData.pic
                    }
                    alt=""
                    onClick={() => uploadimage()}
                    onMouseEnter={() => hoverinimage()}
                    onMouseLeave={() => hoveroutimage()}
                  /> : <img
                    src={
                      image ? URL.createObjectURL(image) : process.env.NEXT_PUBLIC_IMAGE_URL + "images/chef/users.jpg"
                    }
                    crop={{ ratio: "1/1", position: "center" }}
                    alt=""
                    onClick={() => uploadimage()}
                    onMouseEnter={() => hoverinimage()}
                    onMouseLeave={() => hoveroutimage()}
                  />}
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