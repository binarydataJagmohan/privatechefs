import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import swal from "sweetalert";
import { removeBookingData, getCurrentUserData } from "../../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import { UpdateBooking } from '../../../lib/frontendapi';
import { Loader } from '@googlemaps/js-api-loader';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getEditBookingData } from '../../../lib/adminapi';
export default function Step6() {

  interface User {
    role: string;
  }

  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState("");
  const [teens, setTeens] = useState("");
  const [childrens, setChildren] = useState("");
  const [address, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [role, setRole] = useState("");

  const [serviceype, setServiceType] = useState("");
  const [time, setTime] = useState("");
  const [servicestyle, setServiceStyle] = useState("");
  const [mealsselected, setSelectedMeals] = useState({});
  const [cuisine, setSelectedCuisine] = useState(['']);
  const [allergies, setSelectedAllergies] = useState(['']);
  const [additionalnotes, setAdditionalNotes] = useState('');
  const [bookingid, setBookingId] = useState('');

  const handleAddition = (e: any) => {
    setAdults(prevAdults => prevAdults + 1);
  };

  const handleSubtraction = (e: any) => {
    if (adults > 0) {
      setAdults(prevAdults => prevAdults - 1);
    }
  };

  const handleTeensAddition = (e: any) => {
    setTeens(prevTeens => prevTeens + 1);
  };

  const handleTeensSubtraction = (e: any) => {
    if (teens > 0) {
      setTeens(prevTeens => prevTeens - 1);
    }
  };
  const handleChildrenAddition = (e: any) => {
    setChildren(prevchildrens => prevchildrens + 1);
  };

  const handleChildrenSubtraction = (e: any) => {
    if (childrens > 0) {
      setChildren(prevchildrens => prevchildrens - 1);
    }
  };

  useEffect(() => {
    BookingStepSix();
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

            console.log(lat);
            console.log(lng);


            setLocation(address)
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
  }, []);


  const BookingStepSix = async () => {
    const data = isPageVisibleToRole("user");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const bookingId = window.localStorage.getItem('bookingid');
      if (bookingId) {

        fetchEditBookingDetails(bookingId)

      } else {
        window.location.href = '/user/booking';
      }
    }
  };

  const fetchEditBookingDetails = async (id: any) => {
    try {
      const res = await getEditBookingData(id);
      if (res.status) {

        const serviceType = window.localStorage.getItem("servicetype");
        const time = window.localStorage.getItem("time");
        const servicestyle = window.localStorage.getItem("servicestyle");
        const mealsSelected = window.localStorage.getItem("selectedMeals");
        const storedCuisine = window.localStorage.getItem("selectedcuisine");
        const storeallergies = window.localStorage.getItem("selectedallergies");
        const getadditionalnotes = window.localStorage.getItem("additionalnotes");
        const getbookingid = window.localStorage.getItem("bookingid");

        setServiceType(serviceType ?? '');
        setTime(time ?? '');
        setServiceStyle(servicestyle ?? '');
        setSelectedMeals(JSON.parse(mealsSelected ?? '{}'));
        setSelectedCuisine(JSON.parse(storedCuisine ?? '{}'));
        setSelectedAllergies(JSON.parse(storeallergies ?? '{}'));
        setAdditionalNotes(getadditionalnotes ? getadditionalnotes : res.data[0].getadditionalnotes);
        setBookingId(getbookingid ? getbookingid : res.data[0].getbookingid)

        setUserid(res.data[0].user_id);
        setName(res.data[0].name);
        setSurname(res.data[0].surname);
        setEmail(res.data[0].email);
        setPhone(res.data[0].phone);
        setAdults(res.data[0].adults);
        setTeens(res.data[0].teens);
        setChildren(res.data[0].childrens);
        setLocation(res.data[0].location
        );
        setLat(res.data[0].lat);
        setLng(res.data[0].lng);

        const user: User = getCurrentUserData() as User;
        setRole(user.role);


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
    } catch (err: any) {
      toast.error(err.message, {
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
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();


    if (adults || teens || childrens) {

      if (name && email && phone) {

        const data = {
          user_id: userid,
          category: serviceype,
          date: time,
          meals: mealsselected,
          service_id: servicestyle,
          cuisine_id: cuisine,
          allergies_id: allergies,
          notes: additionalnotes,
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          adults: adults,
          childrens: childrens,
          teens: teens,
          address: address,
          lat: lat,
          lng: lng,
          bookingid: bookingid,
          role: role
        }

        console.log(data);

        UpdateBooking(data)
          .then(res => {
            if (res.status == true) {
              removeBookingData();
              console.log(res.data);
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
              setTimeout(() => {
                window.location.href = "/user/booking";
              }, 2000);
            }
            if (res.status == false) {
              toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: 'error',
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
            toast.error(err, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: 'error',
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
      } else {

        swal({
          title: 'Oops!',
          text: 'Name,Email,Phone number are required field',
          icon: 'info',
        });
      }


    } else {

      swal({
        title: 'Oops!',
        text: 'You need to enter number of people of any category',
        icon: 'info',
      });
    }

  }





  return (
    <>
      <section className="userprofile-part">
        <div className="container-fluid">
          <div className="my-profile mt-5 tab-m-0">
            <h2> Edit Booking <span className="log-out"><a href="/user/booking">Back</a></span></h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="my-profile">
                {/* <a href="/user/edit-booking/step1"> */}
                <div className="profile-cols mt-4 mb-4">
                  <h4>Step 1</h4>
                  <p>Edit Service Type</p>
                </div>
                {/* </a>
                  <a href="/user/edit-booking/step2"> */}
                <div className="profile-cols mt-4 mb-4">
                  <h4>Step 2</h4>
                  <p>Edit Service</p>
                </div>
                {/* </a>
                  <a href="/user/edit-booking/step3"> */}
                <div className="profile-cols mt-4 mb-4">
                  <h4>Step 3</h4>
                  <p>Edit Type Of Meal</p>
                </div>
                {/* </a>
                  <a href="/user/edit-booking/step4"> */}
                <div className="profile-cols mt-4 mb-4">
                  <h4>Step 4</h4>
                  <p>Edit Type Of Cuisine</p>
                </div>
                {/* </a>
                  <a href="/user/edit-booking/step5"> */}
                <div className="profile-cols mt-4 mb-4">
                  <h4>Step 5</h4>
                  <p>Edit Special Request</p>
                </div>
                {/* </a> */}
                <div className="profile-cols mt-4 active">
                  <h4>Step 6</h4>
                  <p>Edit Booking Details</p>
                </div>


              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form mt-4 tab-m-0  right-left-spacing">


                <form onSubmit={handleSubmit}>
                  <div className="container size-real">
                    <div className="row">
                      <div className="col-sm-1"></div>
                      <div className="col-sm-10">
                        <h1>Booking details</h1>
                        <h1 className="awaits mb-0">a great experience awaits</h1>
                      </div>
                    </div>

                    <div className="row mb-2" >
                      <div className="col-lg-11 col-md-12">
                        <h4 className="title-20">Number of people</h4>
                      </div>
                    </div>
                    <div className="row mb-5">


                      <div className="col-sm-4">
                        <div className="slider-img-plase">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "images/booking-details/1.jpg"
                            }
                            alt="1"
                          />
                        </div>
                        <div className="input-group mt-4 mb-4 mb-md-0">
                          <input
                            type="number"
                            className="form-control"
                            id="updQtyLoose47"
                            value={adults}
                            onChange={(e) => setAdults(e.target.value)}
                            placeholder="Adults"
                            min="0"
                          />
                          <div className="flex postion-ab">
                            <div className="input-group-append">
                              <a className="btn btn-outline-secondary" onClick={handleAddition}>+</a>
                            </div>
                            <div className="input-group-append">
                              <a className="btn btn-outline-secondary" onClick={handleSubtraction}>-
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="slider-img-plase">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "images/booking-details/2.jpg"
                            }
                            alt="2"
                          />
                        </div>
                        <div className="input-group mt-4 mb-4 mb-md-0">
                          <input
                            type="number"
                            className="form-control"
                            value={teens}
                            onChange={(e) => setTeens(e.target.value)}
                            placeholder="Teen"
                            min="0"
                          />
                          <div className="flex postion-ab">
                            <div className="input-group-append">
                              <a className="btn btn-outline-secondary" onClick={handleTeensAddition}>+</a>
                            </div>
                            <div className="input-group-append">
                              <a className="btn btn-outline-secondary" onClick={handleTeensSubtraction}>-
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="slider-img-plase">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_BASE_URL +
                              "images/booking-details/3.jpg"
                            }
                            alt="3"
                          />
                        </div>
                        <div className="input-group mt-4 mb-4 mb-md-0">
                          <input
                            type="number"
                            className="form-control"
                            value={childrens}
                            onChange={(e) => setChildren(e.target.value)}
                            placeholder="Children"
                            min="0"
                          />
                          <div className="flex postion-ab">
                            <div className="input-group-append">
                              <a className="btn btn-outline-secondary" onClick={handleChildrenAddition}>+</a>
                            </div>
                            <div className="input-group-append">
                              <a className="btn btn-outline-secondary" onClick={handleChildrenSubtraction}>-
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                    <div className="row mb-2" id="user_booking">
                      <div className="col-lg-12 col-md-12">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="all-form input-big">
                              <h4 className="title-18">We will be at</h4>
                              <input
                                id="address-input"
                                type="text"
                                value={address}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="all-form input-big">
                              <h4 className="title-18">Name</h4>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="all-form input-big">
                              <h4 className="title-18">Surname</h4>
                              <input
                                type="text"
                                value={surname != 'null' ? surname : ''}
                                onChange={(e) => setSurname(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="all-form input-big">
                              <h4 className="title-18">Email</h4>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="all-form input-big">
                              <h4 className="title-18">Phone Number</h4>
                              <PhoneInput
                                country={"us"}
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                              // add the required attribute here
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid ">
                    <div className="d-flx-step">
                      <div className="view-more  mt-4">
                        <a href="/user/edit-booking/step5">Back</a>
                      </div>
                      <div className="view-more bg-golden mt-3">
                        <button className="booking_submit_btn" type="submit">Update</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}