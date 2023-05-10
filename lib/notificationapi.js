import { getToken } from "./session";
import axios from "axios";

export const notificationForUserAdmin = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/notification-for-user-admin/'+id, {
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

  export const notificationStatus = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/notification-status/'+id, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };