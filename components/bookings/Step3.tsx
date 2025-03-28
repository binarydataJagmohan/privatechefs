import React, { useState, useEffect } from "react";
import swal from "sweetalert";
export default function Step3() {

  type MealValues = {
    date: string;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    [key: string]: boolean | string; // add an index signature that allows for any string key
  };

  const [mealValues, setMealValues] = useState<{ breakfast: boolean; lunch: boolean; dinner: boolean; }>({
    breakfast: false,
    lunch: false,
    dinner: false
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
    const serviceType = window.localStorage.getItem("servicetype");
    const time = window.localStorage.getItem("time");
    const servicestyle = window.localStorage.getItem("servicestyle");
    const mealsSelected = window.localStorage.getItem("selectedMeals");

    if (serviceType && time) {

      setSeriveType(serviceType);
      if (serviceType == "multipletimes") {
        const [startDate, endDate] = time.split(",");
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

      } else {
        const date = new Date(time);
        const dateString = date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
        setTime(dateString.toString());
      }

      if (servicestyle) {
        if (mealsSelected) {
          const selectedMeals = JSON.parse(mealsSelected);

          if (serviceType == 'multipletimes') {
            setMultipleDateMealValues(selectedMeals);
          } else {
            setMealValues(selectedMeals);
          }

        }
      } else {
        window.location.href = "/bookings/step2";
      }
    } else {
      window.location.href = "/bookings/step1";
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
        window.location.href = '/bookings/step4';
      } else {
        window.localStorage.setItem("selectedMeals", JSON.stringify(mealValues));
        window.location.href = '/bookings/step4';
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
      <section className="journey-part">
        <div className="container size-real">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">
              <h1>Taylor your meals, Your way</h1>
              <h1 className="awaits mb-0">a great experience awaits</h1>
              <div className="text-areya-srep dummy-up text-center mb-2">
                <p>
                  Take control of your dining adventure. Uncheck any meals you don't want, and design a culinary experience that's all about your preferences and excitement.
                </p>
              </div>
            </div>
          </div>

          {servicetype === 'multipletimes' && (
            <div className="row mb-5 align-items-center" >
              <table className="table-style table table-striped">
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
                    <tr key={index} className="py,lg-5">
                      <td data-label="Date"><h6 style={{ color: '#ff4e00d1' }} className="pt-3">{date}</h6></td>
                      <td data-label="Breakfast">
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
                      <td data-label="Lunch">
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
                      <td data-label="Dinner">
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


          {servicetype === 'onetime' && (
            <div className="row mb-5">
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-7 col-md-12">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="slider-img-plase">
                      <input
                        type="radio"
                        id="myCheckbox1"
                        name="service_type"
                        value={"yes"}
                        className="step_radio_css"
                        checked={mealValues.breakfast}
                        onChange={() =>
                          setMealValues({
                            breakfast: true,
                            lunch: false, // Deselect lunch
                            dinner: false, // Deselect dinner
                          })
                        }
                      />
                      <label htmlFor="myCheckbox1" className="step_label_css">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL + "images/step-img-3.jpg"
                          }
                          alt="step-img-1"
                        />
                      </label>
                      <p className="plase-btn">
                        <a href="#" onClick={() =>
                          setMealValues({
                            breakfast: true,
                            lunch: false,
                            dinner: false,
                          })}>Breakfast</a>
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="slider-img-plase">
                      <input
                        type="radio"
                        id="myCheckbox2"
                        name="service_type"
                        value={"yes"}
                        className="step_radio_css"
                        checked={mealValues.lunch}
                        onChange={() =>
                          setMealValues({
                            breakfast: false, // Deselect breakfast
                            lunch: true,
                            dinner: false, // Deselect dinner
                          })
                        }
                      />
                      <label htmlFor="myCheckbox2" className="step_label_css">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL + "images/step-img-4.jpg"
                          }
                          alt="step-img-1"
                        />
                      </label>
                      <p className="plase-btn">
                        <a href="#" onClick={() =>
                          setMealValues({
                            breakfast: false,
                            lunch: true,
                            dinner: false,
                          })}>Lunch</a>
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="slider-img-plase">
                      <input
                        type="radio"
                        id="myCheckbox3"
                        name="service_type"
                        value={"yes"}
                        className="step_radio_css"
                        checked={mealValues.dinner}
                        onChange={() =>
                          setMealValues({
                            breakfast: false, // Deselect breakfast
                            lunch: false, // Deselect lunch
                            dinner: true,
                          })
                        }
                      />
                      <label htmlFor="myCheckbox3" className="step_label_css">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_BASE_URL + "images/step-img-5.jpg"
                          }
                          alt="step-img-1"
                        />
                      </label>
                      <p className="plase-btn">
                        <a href="#" onClick={() =>
                          setMealValues({
                            breakfast: false,
                            lunch: false,
                            dinner: true,
                          })}>Dinner</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="text-areya-srep">
                  <p className="golden-mini-title">
                    {/* Please select your meal on {newtime.toLocaleString()} */}
                    Choose Your One-Time Experience
                  </p>
                  <p>
                    Your one-time culinary experience with Private Chefs is all about you. Select your preferred mealtime – breakfast, lunch, or dinner – and let us curate an unforgettable dining experience tailored to your tastes and preferences.{" "}
                  </p>
                  <div className="view-more mt-4">
                    <a href="#" onClick={(e) => ClearSelectedMealsData()}>
                      Clear All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}


        </div>
        <div className="container size-real mt-5">
          <div className="d-flx-step">
            <div className="view-more  mt-4">
              <a href="/bookings/step2">Back</a>
            </div>
            <div className="view-more bg-golden mt-4">
              <a href="#" onClick={(e) => CheckStepThree()}>
                Save and Continue
              </a>
            </div>
          </div>
          <div className="rotate-box">
            {" "}
            <h4 className="rotate-text">select type of meal</h4>
          </div>
        </div>
      </section>
    </>
  );
}
