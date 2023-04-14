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
    }
    //console.log(current_user_data)
    return current_user_data;
  } else {
    const current_user_data = {}
    return current_user_data;
  }
}