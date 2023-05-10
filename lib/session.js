/**
 * * Remove stored token
 * It should remove the Token into the SessionStorage or LocalStorage
 *
 * @returns {void}
 */
export function removeToken() {
  window.localStorage.removeItem("token");
  window.sessionStorage.removeItem("token");
}
export function removeStorageData() {
  window.localStorage.removeItem("id");
  window.localStorage.removeItem("name");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("role");
  window.localStorage.removeItem("pic");
  window.localStorage.removeItem("surname");
  window.localStorage.removeItem("phone");
  window.localStorage.removeItem("approved_by_admin");
  window.localStorage.removeItem("profile_status");
}

export function removeBookingData() {
  window.localStorage.removeItem("time");
  window.localStorage.removeItem("servicetype");
  window.localStorage.removeItem("servicestyle");
  window.localStorage.removeItem("selectedMeals");
  window.localStorage.removeItem("selectedcuisine");
  window.localStorage.removeItem("selectedallergies");
  window.localStorage.removeItem("additionalnotes");
  window.localStorage.removeItem("bookingid");

}



/**
 * * Get the Token if presents.
 *
 * @returns {string | undefined}
 */
export function getToken() {
  return window.localStorage.getItem("token") || window.sessionStorage.getItem("token");
}

export function getCurrentUserData() {
  if(typeof window !== 'undefined'){
    const current_user_data = {
      id: window.localStorage.getItem("id"),
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      role: window.localStorage.getItem("role"),
      pic: window.localStorage.getItem("pic"),
      surname: window.localStorage.getItem("surname"),
      phone: window.localStorage.getItem("phone"),
      approved_by_admin: window.localStorage.getItem("approved_by_admin"),
      profile_status: window.localStorage.getItem("profile_status"),
    }
    //console.log(current_user_data)
    return current_user_data;
  } else {
    const current_user_data = {}
    return current_user_data;
  }
}