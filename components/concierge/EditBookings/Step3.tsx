import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getEditBookingData } from '../../../lib/adminapi';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import moment from 'moment';
export default function Step3() {

  type MealValues = {
    date: string;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    [key: string]: boolean | string; // add an index signature that allows for any string key
  };

  const [mealValues, setMealValues] = useState<{ breakfast: boolean; lunch: boolean; dinner: boolean; }>({
    breakfast: true,
    lunch: true,
    dinner: true
  });


  const [newtime, setTime] = useState({});

  const [mutipledate, setMutipleDate] = useState<string[]>([]);


  const [servicetype, setSeriveType] = useState("");

  const [multipleDateMealValues, setMultipleDateMealValues] = useState<MealValues[]>([]);


  useEffect(() => {
    BookingStepThree();
    // window.localStorage.removeItem('selectedMeals')
  }, []);

  const BookingStepThree = async () => {

    const data = isPageVisibleToRole("concierge");
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
        window.location.href = '/concierge/booking';
      }
    }


  };

  const formatDate = (value: any) => {
    return moment(value).format('D/M/YY');
  }

  const formatDateTwo = (value: any) => {
    return moment(value).format('DD/MM/YYYY');
  }


  const fetchEditBookingDetails = async (id: any) => {
    try {
      const res = await getEditBookingData(id);
      if (res.status) {
        // console.log(res.data);

        const category = res.data[0].category;
        const windowtime = window.localStorage.getItem("time");
        const windowselectedmeal = window.localStorage.getItem("selectedMeals");
        const windowcategory = window.localStorage.getItem("servicetype");

        if (category == windowcategory) {


          setSeriveType(category);
          if (category == 'multipletimes') {


            const MultifirstDate = new Date(res.data[0].date).toISOString();
            const MultilastDate = new Date(res.data[res.data.length - 1].date).toISOString();
            var bookingtime = MultifirstDate + ',' + MultilastDate;

            if (windowtime == bookingtime) {

              const [startDate, endDate] = bookingtime.split(",");
              const startTimestamp = new Date(startDate).getTime();
              const endTimestamp = new Date(endDate).getTime();
              const start = new Date(startTimestamp);
              const end = new Date(endTimestamp);
              const dateArray = [];

              for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                dateArray.push(new Date(date).toLocaleDateString());
              }

              setMutipleDate(dateArray);

              const initialValue = res.data.map((data: any) => ({
                date: formatDateTwo(data.date),
                breakfast: data.breakfast == 'yes' ? true : false,
                lunch: data.lunch == 'yes' ? true : false,
                dinner: data.dinner == 'yes' ? true : false,
              }));


              const checkwindowselectedmeal = JSON.stringify(windowselectedmeal);
              const checkinitialValue = JSON.stringify(initialValue);

              if (windowselectedmeal == null || checkwindowselectedmeal == checkinitialValue) {

                setMultipleDateMealValues(initialValue);

              } else {
                if (windowselectedmeal) {
                  setMultipleDateMealValues(JSON.parse(windowselectedmeal));
                }

              }

            } else {

              if (windowselectedmeal) {

                if (windowtime) {

                  const [startDate, endDate] = windowtime.split(",");
                  const startTimestamp = new Date(startDate).getTime();
                  const endTimestamp = new Date(endDate).getTime();
                  const start = new Date(startTimestamp);
                  const end = new Date(endTimestamp);
                  const dateArray = [];

                  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                    dateArray.push(new Date(date).toLocaleDateString());
                  }

                  setMutipleDate(dateArray);

                  setMultipleDateMealValues(JSON.parse(windowselectedmeal));

                }

              } else {
                if (windowtime) {
                  const [startDate, endDate] = windowtime.split(",");
                  const startTimestamp = new Date(startDate).getTime();
                  const endTimestamp = new Date(endDate).getTime();
                  const start = new Date(startTimestamp);
                  const end = new Date(endTimestamp);
                  const dateArray = [];

                  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                    dateArray.push(new Date(date).toLocaleDateString());
                  }

                  setMutipleDate(dateArray);

                  const initialValue = dateArray.map((date) => ({
                    date,
                    breakfast: true,
                    lunch: true,
                    dinner: true,
                  }));
                  setMultipleDateMealValues(initialValue);

                }
              }

            }
          } else {

            const onetimedata = new Date(res.data[0].date).toISOString();

            if (windowtime == onetimedata) {

              const data = res.data[0];
              const transformedData = {
                breakfast: data.breakfast === 'yes' ? true : false,
                lunch: data.lunch === 'yes' ? true : false,
                dinner: data.dinner === 'yes' ? true : false,
              };

              const checkwindowselectedmeal = JSON.stringify(windowselectedmeal);
              const checktransformedData = JSON.stringify(transformedData);

              if (windowselectedmeal == null || checkwindowselectedmeal == checktransformedData) {

                const data = res.data[0];
                const transformedData = {
                  breakfast: data.breakfast === 'yes' ? true : false,
                  lunch: data.lunch === 'yes' ? true : false,
                  dinner: data.dinner === 'yes' ? true : false,
                };

                setMealValues(transformedData);

              } else {

                if (windowselectedmeal) {
                  setMealValues(JSON.parse(windowselectedmeal));
                }
              }
              setTime(formatDate(res.data[0].date));

            } else {

              if (windowselectedmeal) {
                setMealValues(JSON.parse(windowselectedmeal));
              }
              setTime(formatDate(windowtime));

            }

          }

        } else {


          setSeriveType(windowcategory || '');


          if (windowcategory == 'multipletimes') {

            const MultifirstDate = new Date(res.data[0].date).toISOString();
            const MultilastDate = new Date(res.data[res.data.length - 1].date).toISOString();
            var bookingtime = MultifirstDate + ',' + MultilastDate;

            if (windowtime == bookingtime) {

              const [startDate, endDate] = bookingtime.split(",");
              const startTimestamp = new Date(startDate).getTime();
              const endTimestamp = new Date(endDate).getTime();
              const start = new Date(startTimestamp);
              const end = new Date(endTimestamp);
              const dateArray = [];

              for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                dateArray.push(new Date(date).toLocaleDateString());
              }

              setMutipleDate(dateArray);

              const initialValue = res.data.map((data: any) => ({
                date: formatDateTwo(data.date),
                breakfast: data.breakfast == 'yes' ? true : false,
                lunch: data.lunch == 'yes' ? true : false,
                dinner: data.dinner == 'yes' ? true : false,
              }));


              const checkwindowselectedmeal = JSON.stringify(windowselectedmeal);
              const checkinitialValue = JSON.stringify(initialValue);

              if (windowselectedmeal == null || checkwindowselectedmeal == checkinitialValue) {

                setMultipleDateMealValues(initialValue);

              } else {
                if (windowselectedmeal) {
                  setMultipleDateMealValues(JSON.parse(windowselectedmeal));
                }

              }

            } else {


              if (windowselectedmeal) {

                if (windowtime) {

                  const [startDate, endDate] = windowtime.split(",");
                  const startTimestamp = new Date(startDate).getTime();
                  const endTimestamp = new Date(endDate).getTime();
                  const start = new Date(startTimestamp);
                  const end = new Date(endTimestamp);
                  const dateArray = [];

                  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                    dateArray.push(new Date(date).toLocaleDateString());
                  }

                  setMutipleDate(dateArray);

                  setMultipleDateMealValues(JSON.parse(windowselectedmeal));

                }

              } else {
                if (windowtime) {

                  const [startDate, endDate] = windowtime.split(",");
                  const startTimestamp = new Date(startDate).getTime();
                  const endTimestamp = new Date(endDate).getTime();
                  const start = new Date(startTimestamp);
                  const end = new Date(endTimestamp);
                  const dateArray = [];

                  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
                    dateArray.push(new Date(date).toLocaleDateString());
                  }

                  setMutipleDate(dateArray);

                  const initialValue = dateArray.map((date) => ({
                    date,
                    breakfast: true,
                    lunch: true,
                    dinner: true,
                  }));
                  setMultipleDateMealValues(initialValue);

                }
              }

            }
          } else {

            const onetimedata = new Date(res.data[0].date).toISOString();

            if (windowtime == onetimedata) {



              const data = res.data[0];
              const transformedData = {
                breakfast: data.breakfast === 'yes' ? true : false,
                lunch: data.lunch === 'yes' ? true : false,
                dinner: data.dinner === 'yes' ? true : false,
              };

              const checkwindowselectedmeal = JSON.stringify(windowselectedmeal);
              const checktransformedData = JSON.stringify(transformedData);

              if (windowselectedmeal == null || checkwindowselectedmeal == checktransformedData) {

                const data = res.data[0];
                const transformedData = {
                  breakfast: data.breakfast === 'yes' ? true : false,
                  lunch: data.lunch === 'yes' ? true : false,
                  dinner: data.dinner === 'yes' ? true : false,
                };

                setMealValues(transformedData);

              } else {

                if (windowselectedmeal) {
                  setMealValues(JSON.parse(windowselectedmeal));
                }
              }
              setTime(formatDate(res.data[0].date));

            } else {

              if (windowselectedmeal) {
                setMealValues(JSON.parse(windowselectedmeal));
              }
              setTime(formatDate(windowtime));

            }

          }



        }


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


  const handleMealChange = (date: string, mealType: string, isChecked: boolean) => {
    // function body here  
    // create a copy of the state array
    const updatedValues = [...multipleDateMealValues];

    // find the index of the object that represents the selected date
    const index = updatedValues.findIndex((obj) => obj.date === date);

    if (index !== -1) {
      // if the object for the selected date already exists in the array, update the meal value
      updatedValues[index][mealType] = isChecked;
    } else {
      // if the object for the selected date does not exist, create a new object and add it to the array
      updatedValues.push({
        date: date,
        breakfast: mealType === 'breakfast' ? isChecked : false,
        lunch: mealType === 'lunch' ? isChecked : false,
        dinner: mealType === 'dinner' ? isChecked : false,
      });
    }

    // set the updated array back to the state
    setMultipleDateMealValues(updatedValues);
  };

  const CheckStepThree = () => {

    if (multipleDateMealValues.length || Object.values(mealValues).some(val => val)) {

      if (servicetype == 'multipletimes') {
        window.localStorage.setItem("selectedMeals", JSON.stringify(multipleDateMealValues));
        window.location.href = '/concierge/edit-booking/step4';
      } else {

        window.localStorage.setItem("selectedMeals", JSON.stringify(mealValues));
        window.location.href = '/concierge/edit-booking/step4';
      }

    } else {

      swal({
        title: 'Oops!',
        text: 'You need to select at least one meal for further procedure',
        icon: 'info',
      });

    }

  };

  const ClearSelectedMealsData = () => {
    setMealValues({
      breakfast: false,
      lunch: false,
      dinner: false
    });
    const checkboxes = document.getElementsByName("service_type");
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    window.localStorage.removeItem("selectedMeals");
  };



  return (
    <>
      <section className="userprofile-part">
        <div className="container-fluid">
          <div className="my-profile mt-5 tab-m-0">
            <h2> Edit Booking <span className="log-out"><a href="/concierge/booking">Back</a></span></h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="my-profile">
                <a href="/concierge/edit-booking/step1">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 1</h4>
                    <p>Edit Service Type</p>
                  </div>
                </a>
                <a href="/concierge/edit-booking/step2">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 2</h4>
                    <p>Edit Service</p>
                  </div>
                </a>
                <div className="profile-cols mt-4 active">
                  <h4>Step 3</h4>
                  <p>Edit Type Of Meal</p>
                </div>

                <a href="/concierge/edit-booking/step4">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 4</h4>
                    <p>Edit Type Of Cuisine</p>
                  </div>
                </a>
                <a href="/concierge/edit-booking/step5">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 5</h4>
                    <p>Edit Special Request</p>
                  </div>
                </a>
                <a href="/concierge/edit-booking/step6">
                  <div className="profile-cols mt-4 mb-4">
                    <h4>Step 6</h4>
                    <p>Edit Booking Details</p>
                  </div>
                </a>


              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="all-form  tab-m-0  right-left-spacing">

                {servicetype === 'multipletimes' && (
                  <div className="row mb-5 align-items-center" >
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Breakfast</th>
                          <th>Lunch</th>
                          <th>Dinner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {servicetype === 'multipletimes' && mutipledate.map((date, index) => (
                          <tr key={index} className="py-5">
                            <td><h6 style={{ color: '#ff4e00' }} className="pt-3">{date}</h6></td>
                            <td>
                              <div className="slider-img-plased pb-2 pt-3">
                                <input
                                  type="checkbox"
                                  id={`myCheckbox1-${index}`}
                                  name="service_type"
                                  value="yes"
                                  className="step_radio_css_mutiple"
                                  checked={multipleDateMealValues.some((obj) => obj.date === date && obj.breakfast)}
                                  onChange={(e) => handleMealChange(date, 'breakfast', e.target.checked)}
                                />
                                <label htmlFor={`myCheckbox1-${index}`} className="step_label_css_mutiple">

                                </label>

                              </div>
                            </td>
                            <td>
                              <div className="slider-img-plased pb-2 pt-3">
                                <input
                                  type="checkbox"
                                  id={`myCheckbox2-${index}`}
                                  name="service_type"
                                  value="yes"
                                  className="step_radio_css_mutiple"
                                  checked={multipleDateMealValues.some((obj) => obj.date === date && obj.lunch)}
                                  onChange={(e) => handleMealChange(date, 'lunch', e.target.checked)}
                                />
                                <label htmlFor={`myCheckbox2-${index}`} className="step_label_css_mutiple">

                                </label>

                              </div>
                            </td>
                            <td>
                              <div className="slider-img-plased pb-2 pt-3">
                                <input
                                  type="checkbox"
                                  id={`myCheckbox3-${index}`}
                                  name="service_type"
                                  value="yes"
                                  className="step_radio_css_mutiple"
                                  checked={multipleDateMealValues.some((obj) => obj.date === date && obj.dinner)}
                                  onChange={(e) => handleMealChange(date, 'dinner', e.target.checked)}
                                />
                                <label htmlFor={`myCheckbox3-${index}`} className="step_label_css_mutiple">

                                </label>

                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                )}


                {servicetype == 'onetime' && (

                  <div className="row mb-5 edit_booking_tick_css">


                    <div className="col-lg-7 col-md-12">
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="slider-img-plase">
                            <input
                              type="checkbox"
                              id="myCheckbox1"
                              name="service_type"
                              value={"yes"}
                              className="step_radio_css"
                              checked={mealValues.breakfast}
                              onChange={(e) =>
                                setMealValues({
                                  ...mealValues,
                                  breakfast: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="myCheckbox1" className="step_label_css">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "images/step-img-3.jpg"
                                }
                                alt="step-img-1"
                              />
                            </label>
                            <p className="plase-btn">
                              <a href="#">Breakfast</a>
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-4">
                          <div className="slider-img-plase">
                            <input
                              type="checkbox"
                              id="myCheckbox2"
                              name="service_type"
                              value={"yes"}
                              className="step_radio_css"
                              checked={mealValues.lunch}
                              onChange={(e) =>
                                setMealValues({
                                  ...mealValues,
                                  lunch: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="myCheckbox2" className="step_label_css">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "images/step-img-4.jpg"
                                }
                                alt="step-img-1"
                              />
                            </label>
                            <p className="plase-btn">
                              <a href="#">Lunch</a>
                            </p>
                          </div>
                        </div>

                        <div className="col-sm-4">
                          <div className="slider-img-plase">
                            <input
                              type="checkbox"
                              id="myCheckbox3"
                              name="service_type"
                              value={"yes"}
                              className="step_radio_css"
                              checked={mealValues.dinner}
                              onChange={(e) =>
                                setMealValues({
                                  ...mealValues,
                                  dinner: e.target.checked,
                                })
                              }
                            />
                            <label htmlFor="myCheckbox3" className="step_label_css">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_BASE_URL +
                                  "images/step-img-5.jpg"
                                }
                                alt="step-img-1"
                              />
                            </label>
                            <p className="plase-btn">
                              <a href="#">Dinner</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="text-areya-srep">
                        <p className="golden-mini-title">
                          Please select your meal on {newtime.toLocaleString()}
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Scelerisque ante a turpis facilisis mi, diam. Elit quis congue
                          nunc, risus sem morbi imperdiet ut. Justo, arcu ultricies
                          tristique auctor ipsum, ut elementum augue{" "}
                        </p>
                        <div className="view-more  mt-4">
                          <a href="#" onClick={(e) => ClearSelectedMealsData()}>
                            Clear All
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
              <div className="container-fluid mt-5">
                <div className="d-flx-step">
                  <div className="view-more  mt-4">
                    <a href="/concierge/edit-booking/step2">Back</a>
                  </div>
                  <div className="view-more bg-golden mt-4">
                    <a href="#" onClick={(e) => CheckStepThree()}>
                      Next
                    </a>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  )
}