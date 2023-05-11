import { getToken } from "./session";
import axios from "axios";

export const updateUserProfile = async (id, data, image) => {
  const formdata = new FormData();
  formdata.append('image', image);
  Object.keys(data).forEach((key) => {
    formdata.append(key, data[key]);
  });
  return new Promise((resolve, reject) => {
    const req = axios.request({
      url: process.env.NEXT_PUBLIC_API_URL + '/update-user-profile/' + id,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken(),
      },
      data: formdata,
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getSingleUserProfile = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-user-profile/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};


export const getCurrentUserByBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-current-user-by-booking/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getUserFilterByBooking = async (id,type) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-user-filter-by-booking/' + id+'/'+type,{
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};