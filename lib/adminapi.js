import { getToken } from "./session";
import axios from "axios";

export const getAllChefDetails = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getAllChefDetails', {
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

export const allergy = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/saveAllergy', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const testimonial = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/save-testimonial', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getTestimonials = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-testnomial', {
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

export const testimonialDelete = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/testimonial-Delete/' + data, {
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

export const updateTestimonial = async (data) => {
  let formdata = new FormData();
  for (let key in data) {
    formdata.append(key, data[key]);
  }
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/update-testimonial/' + data.id, formdata, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAllergyDetails = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getAllergyDetails', {
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
export const allergyDelete = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/allergyDelete/' + data, {
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

export const getSingleTestimonial = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-testnomial/' + id, {
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

export const saveService = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/saveService', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getServiceDetails = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getServiceDetails', {
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

export const serviceDelete = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/serviceDelete/' + data, {
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
export const getSingleAllergy = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getSingleAllergyDetails/' + id, {
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

export const updateAllergyDetails = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getSingleService = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getSingleServiceDetail/' + id, {
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

export const saveVilla = async (data, image) => {
  let formdata = new FormData();
  for (let i = 0; i < image.length; i++) {
    formdata.append('image[]', image[i]);
  }
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/save-villa', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const updateVilla = async (id,data, image) => {
  let formData = new FormData();
  for (let i = 0; i < image.length; i++) {
    formData.append('image[]', image[i]);
  }
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-villas/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken(),
      },
      data: formData
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};


export const getVillas = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-villas/', {
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

export const deleteSingleVilla = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-villas/' +id , {
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


export const serviceUpdate = async (id, data) => {
  let formdata = new FormData();
  for (let key in data) {
    formdata.append(key, data[key]);
  }
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/serviceUpdate/' + id, formdata, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAllCuisine = async (data) => {
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


export const getItemByCtaegory = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-item-by-category/' + id, {
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

export const getUserBybooking = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-User-By-Booking', {
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

export const getSingleVillas = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-villas/' +id ,{
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

export const saveCuisine = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/save-cuisine', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const cuisneDelete = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/cuisine-delete/' + data, {
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

export const getSingleCisine = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-cuisine/' + id, {
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

export const updateCuisine = async (id, data) => {
  let formdata = new FormData();
  for (let key in data) {
    formdata.append(key, data[key]);
  }
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/update-cuisine/' + id, formdata, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
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

export const getUserBookingId = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-User-By-Booking/' + id, {
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

export const getChefByFilter = async (cuisines) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get_chef_by_filter',{
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: cuisines,
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};


export const getCuisine = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-cuision',{
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: data,
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const getAllUsers = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-users', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: data,
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const updateAllergy = async (data) => {
  let formdata = new FormData();
  for (let key in data) {
    formdata.append(key, data[key]);
  }
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/updateAllergy/' + data.id, formdata, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getUserBookingById = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-User-Booking-id/' + id, {
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


export const getadminChefByBooking = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-chef-by-booking', {
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

export const getAdminChefFilterByBooking = async (type) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-chef-filter-by-booking/' +type,{
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

export const getSingleUserAssignBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-user-assign-booking/' + id, {
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

export const UpdatedAppliedBookingByKeyValue = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/updated-applied-booking-by-key-value', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAdminChefByBooking = async () => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-chef-by-booking', {
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

export const getAdminAssignedBooking = async () => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-assigned-booking', {
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

export const getAdminAppliedFilterByBooking = async (type) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-applied-filter-by-booking/' +type,{
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


export const deleteBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-booking/' +id,{
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

export const getEditBookingData = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-edit-booking-data/' + id, {
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

export const getAllBookingData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-bookings/', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const approveChefProfile = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/approve-chef-profile/' +id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getChefApproval = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-approval/' +id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export const changeBookingStatus = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/change-booking-status/' +id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};