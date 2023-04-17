import { getToken } from "./session";
import axios from "axios";

export const getAllCrusine = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL+'/get-all-cuisine', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const saveChefMenu = async (data,image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL+'/save-chef-menu',formdata,{
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
          'Authorization': 'Bearer '+getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const upadte_chef_profile = async (id,data) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-chef-profile/' + id, {
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

export const get_chef_detail = async (id) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-detail/' + id, {
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

export const upadte_chef_resume = async (id,data) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-chef-resume/' + id, {
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

export const get_chef_resume = async (id) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-resume/' + id, {
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