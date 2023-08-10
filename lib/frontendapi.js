import { getToken } from "./session";
import axios from "axios";

export const login = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const register = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const getCurrentUserData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getcurrentuserdata', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};


export const forgetPassword = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/forget-password`, {
      email: data,
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const CheckUserResetPasswordVerification = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/check-user-reset-password-verfication`, {
      data: data,
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const UpdateResetPassword = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/updated-reset-password`, {
      data: data,
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAllCrusine = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-cuisine', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const SaveBooking = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/save-booking`, {
      email: data,
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const saveContact = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-contact', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const socialDataSave = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/social-data-save', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const selectRole = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/select-role/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const getEmail = async (email, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-email-data/' + email, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const UpdateBooking = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/update-booking`, {
      email: data,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      data: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const getInstagramImages = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-instagram-images', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const slugSingleSetting = async (slug, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-slug-setting/' + slug, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAllTopRatedChef = async (slug, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-top-rated-chef', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAllLocation = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-location', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getLocationBySlug = async (slug,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-location-by-slug/' + slug, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};