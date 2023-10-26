import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import swal from "sweetalert";
import { getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import { SaveBooking } from '../../lib/frontendapi';
import { Loader } from '@googlemaps/js-api-loader';


export default function Step6() {

  interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    address: string;

  }


  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState(0);
  const [teens, setTeens] = useState(0);
  const [childrens, setChildren] = useState(0);
  const [address, setLocation] = useState(" ");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [serviceype, setServiceType] = useState("");
  const [time, setTime] = useState("");
  const [servicestyle, setServiceStyle] = useState("");
  const [mealsselected, setSelectedMeals] = useState({});
  const [cuisine, setSelectedCuisine] = useState(['']);
  const [allergies, setSelectedAllergies] = useState(['']);
  const [additionalnotes, setAdditionalNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Add this state variable


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
    const serviceType = window.localStorage.getItem("servicetype");
    const time = window.localStorage.getItem("time");
    const servicestyle = window.localStorage.getItem("servicestyle");
    const mealsSelected = window.localStorage.getItem("selectedMeals");
    const storedCuisine = window.localStorage.getItem("selectedcuisine");
    const storeallergies = window.localStorage.getItem("selectedallergies");
    const getadditionalnotes = window.localStorage.getItem("additionalnotes");

    setServiceType(serviceType ?? "");
    setTime(time ?? "");
    setServiceStyle(servicestyle ?? "");
    setSelectedMeals(JSON.parse(mealsSelected ?? '{}'));
    setSelectedCuisine(JSON.parse(storedCuisine ?? '{}'));
    setSelectedAllergies(JSON.parse(storeallergies ?? '{}'));
    setAdditionalNotes(getadditionalnotes ?? "");

    if (serviceType && time) {
      if (servicestyle) {
        if (!mealsSelected) {
          window.location.href = "/bookings/step3";
        } else {
          if (!storedCuisine) {
            window.location.href = "/bookings/step4";
          } else {
            const user: User = getCurrentUserData() as User;
            if (user.id != null) {
              setUserid(user.id);
              setName(user.name);
              setSurname(user.surname);
              setEmail(user.email);

              console.log(user.address)

              if (user.address != 'null') {

                setLocation(user.address);

                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';
                const loader = new Loader({
                  apiKey,
                  version: 'weekly',
                  libraries: ['places'],
                });

                loader.load().then(() => {
                  const geocoder = new google.maps.Geocoder();
                  geocoder.geocode({ address: user.address }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                      const lat = results[0].geometry.location.lat();
                      const lng = results[0].geometry.location.lng();

                      setLat(lat.toString());
                      setLng(lng.toString());
                    }
                  });
                }).catch((error) => {
                  console.error('Failed to load Google Maps API', error);
                });
              } else {
                setLocation("");

              }
            }
          }
        }
      } else {
        window.location.href = "/bookings/step2";
      }
    } else {
      window.location.href = "/bookings/step1";
    }
  };


  async function handleSubmit(e: any) {
    e.preventDefault();
  
    if (isSubmitting) {
      return; // If already submitting, return early to prevent multiple submissions
    }
  
    // Set isSubmitting to true to disable the button
    setIsSubmitting(true);
  
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
        };
  
        try {
          const res = await SaveBooking(data);
  
          if (res.status === true) {
            window.location.href = "/bookings/step7";
            window.localStorage.setItem("bookingid", res.bookingid);
          } else {
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
        } 
        catch (err) {
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
        }
      } else {
        swal({
          title: 'Oops!',
          text: 'Name, Email, Phone number are required fields',
          icon: 'info',
        });
      }
    } else {
      swal({
        title: 'Oops!',
        text: 'You need to enter the number of people in any category',
        icon: 'info',
      });
    }
  
    // Reset isSubmitting to false after the submission process is complete
    setIsSubmitting(false);
  }


  return (
    <>
      <section className="journey-part">
        <form onSubmit={handleSubmit}>
          <div className="container size-real">
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-10">
                <h1>Booking details</h1>
                <h1 className="awaits mb-0">a great experience awaits</h1>
              </div>
            </div>

            <div className="row mb-2">
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

                <div className="input-group mt-4 mb-4 mb-md-0 set-width-number">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => {
                        if (adults > 0) {
                          setAdults(adults - 1);
                        }
                      }}
                      style={{border: '1px lightgrey solid'}}>
                      -
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="updQtyLoose47"
                    value={adults}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (!isNaN(newValue)) {
                        setAdults(newValue);
                      }
                    }}
                    placeholder="Adults"
                    min="0"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      style={{border: '1px lightgrey solid'}}>
                      +
                    </button>
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

                <div className="input-group mt-4 mb-4 mb-md-0 set-width-number">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => {
                        if (teens > 0) {
                          setTeens(teens - 1);
                        }
                      }}
                      style={{border: '1px lightgrey solid'}}>
                      -
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={teens}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (!isNaN(newValue)) {
                        setTeens(newValue);
                      }
                    }}
                    placeholder="Teen"
                    min="0"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setTeens(teens + 1)}
                      style={{border: '1px lightgrey solid'}}>
                      +
                    </button>
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


                <div className="input-group mt-4 mb-4 mb-md-0 set-width-number">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => {
                        if (childrens > 0) {
                          setChildren(childrens - 1);
                        }
                      }}
                      style={{border: '1px lightgrey solid'}}
                    >
                      -
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={childrens}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (!isNaN(newValue)) {
                        setChildren(newValue);
                      }
                    }}
                    placeholder="Children"
                    min="0"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setChildren(childrens + 1)}
                      style={{border: '1px lightgrey solid'}}
                    >
                      +
                    </button>
                  </div>
                </div>

              </div>
            </div>
            <div className="row mb-2">
              <div className="col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="all-form input-big">
                      <h4 className="title-18">We will be at</h4>
                      <input
                        id="address-input"
                        type="text"
                        value={address === 'undefined' ? '' : address}
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
                <a href="/bookings/step5">Back</a>
              </div>
              <div className="view-more bg-golden mt-3">
                 <button
                  className="booking_submit_btn"
                  type="submit"
                  disabled={isSubmitting} // Disable the button while submitting
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}