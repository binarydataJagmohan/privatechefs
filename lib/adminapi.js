import { getToken } from "./session";
import axios from "axios";
import id from "date-fns/locale/id/index.js";

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
        'Accept': 'application/json'
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

export const updateVilla = async (id, data, image) => {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-villas', {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-villas/' + id, {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-villas/' + id, {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get_chef_by_filter', {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-cuision', {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-chef-filter-by-booking/' + type, {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-applied-filter-by-booking/' + type, {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-booking/' + id, {
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
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-bookings', {
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




export const getChefApproval = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-approval/' + id, {
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
export const changeBookingStatus = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/change-booking-status/' + id, {
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

//chat api start

export const getAdminMessageData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-message-data', {
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

export const getClickAdminChefUserChatData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-click-admin-chef-user-chat-data', {
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

export const getReceipt = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-receipt', {
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

export const ContactByAdminToUserAndChef = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/contact-by-admin-to-user-and-chef', {
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
export const getInvoice = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-invoice', {
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

export const ContactByAdminToUserAndChefWithShareFile = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + '/contact-by-admin-to-user-and-chef-with-share-file', data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
        },
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAllUserData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-user-data', {
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

export const getSingleInvoice = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-invoice/' + id, {
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

export const SendMessageToUserByAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/send-message-by-admin-to-user', {
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

export const CreateGroupChatByAdmin = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/create-group-by-admin', formdata, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
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
export const getSingleReceiptAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-receipt-admin/' + id, {
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

export const getAdminMessageDataByFilter = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-message-data-by-filter', {
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

export const getAdminCalenderBookings = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-calender-bookings', {
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

export const getChefMenus = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-menu', {
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

export const AssignedBookingByAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/assigned-booking-by-admin', {
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

export const getSetting = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-settings', {
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

export const getSingleSetting = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-setting/' + id, {
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

export const upadteSetting = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-setting/' + id, {
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

export const updateTopratedChef = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/top-rated-chef/' + id, {
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

export const getTopRatedChef = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-top-rated-chef/' + id, {
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
export const getChefAllLocation = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-all-location' , {
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

export const getChefLocationByFilter = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/chef-location-filter' , {
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

export const chefPriceFilter = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/chef-price-filter' , {
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
export const UpdateSetting = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-setting/' + id, {
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
export const UpdatePageInfo = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-page-info/' + id, {
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


// make chef api's 14 october

export const updateChefImage = async (id, image) => {
  const formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.request({
      url: process.env.NEXT_PUBLIC_API_URL + '/update-chef-image/' + id,
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

export const admincreateChef = async (data) => {
  const formdata = new FormData();
  formdata.append('image', data.image);
  formdata.append('name', data.name);
  formdata.append('email', data.email);
  formdata.append('address', data.address);
  formdata.append('phone', data.phone);
  formdata.append('surname', data.surname);
  formdata.append('phone', data.phone);
  formdata.append('passport_no', data.passport_no);
  formdata.append('IBAN', data.IBAN);
  formdata.append('BIC', data.BIC);
  formdata.append('bank_name', data.bank_name);
  formdata.append('holder_name', data.holder_name);
  formdata.append('bank_address', data.bank_address);
  formdata.append('password', data.password);
  formdata.append('vat_no', data.vat_no);
  formdata.append('tax_id', data.tax_id);
  formdata.append('lat', data.lat);
  formdata.append('lng', data.lng);
  formdata.append('created_by', data.created_by);
  return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/admin-create-chef',formdata, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + getToken()
          },
      });
      req.then(res => resolve(res.data))
          .catch(err => reject(err));
  });
};


// 27 oct

export const getUserAllLocation = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-user-all-location' , {
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


export const getUserLocationByFilter = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/user-location-filter' , {
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



export const approveChefProfile = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/approve-chef-profile/' + id, {
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

export const getChefDetailByLocation = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-details-by-location', {
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

export const sendMessageToUserByAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/send-message-to-user-by-admin', {
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

export const AssignedBookingByAdminWithoutDatabse = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/assigned-booking-by-admin-without-db', {
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

export const getAllConcierge = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-concierge', {
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


export const approveConciergeProfile = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/approved-concierge-profile', {
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

export const AssignedVillaByBooking = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/assigned-villa-by-booking', {
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


export const getAdminVillaByBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-villa-by-booking/'+id, {
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

export const chefDelete = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/chefDelete/' + data, {
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

export const userDelete = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/userDelete/' + data, {
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

export const deleteChatMessage = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-chat-message/' + id, {
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

export const userDeactivate = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/userDeactivate/' + data, {
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

export const resendPaymentLink = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/resend-payment-link', {
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

export const UpdateChefResumeByAdmin = async (id, data) => {
  const formdata = new FormData();
  formdata.append('about', data.about);
  formdata.append('description', data.description);
  formdata.append('services_type', data.services_type);
  formdata.append('languages', data.languages);
  formdata.append('experience', data.experience);
  formdata.append('skills', data.skills);
  formdata.append('favorite_chef', data.favorite_chef);
  formdata.append('favorite_dishes', data.favorite_dishes);
  formdata.append('love_cooking', data.love_cooking);
  formdata.append('facebook_link', data.facebook_link);
  formdata.append('instagram_link', data.instagram_link);
  formdata.append('twitter_link', data.twitter_link);
  formdata.append('linkedin_link', data.linkedin_link);
  formdata.append('youtube_link', data.youtube_link);
  formdata.append('cooking_secret', data.cooking_secret);
  formdata.append('know_me_better', data.know_me_better);
  return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/update-chef-resume-by-admin/' + id,formdata, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + getToken()
          },
      });
      req.then(res => resolve(res.data))
          .catch(err => reject(err));
  });
};

export const UpdateLocationStatusByAdmin = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-location-status-by-admin/' + id, {
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

export const SaveChefLocationByAdmin = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-chef-location-by-admin', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + getToken()
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export const getSingleLocationByAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-location-by-admin/' + id, {
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

export const deleteSingleLocationofchefByAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-single-location-by-admin/' + id, {
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

export const updateChefProfileByAdmin = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request({
      url: process.env.NEXT_PUBLIC_API_URL + '/update-chef-profile-by-admin/' + id,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken(),
      },
      params: {
        ...data
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getChefDetailByAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-detail-by-admin/' + id, {
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

export const getCurrentLocationofchefByAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-current-location-by-admin/' + id, {
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

export const getChefResumeByAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-resume-by-admin/' + id, {
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

export const getChefLocationByAdmin = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-location-by-admin/' + id, {
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

export const adminCancelAndReopenBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/admin-cancel-and-reopen-booking/' + id, {
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

export const SaveFrontendLocation = async (data) => {
  const formdata = new FormData();

  formdata.append("location", data.location);
  if (data.image) formdata.append("image", data.image);
  formdata.append("heading_one", data.heading_one || "");
  formdata.append("peragraph_one", data.peragraph_one || "");
  formdata.append("heading_two", data.heading_two || "");
  formdata.append("heading_three", data.heading_three || "");
  formdata.append("peragraph_two", data.peragraph_two || "");

  formdata.append("heading_box_one", data.heading_box_one || "");
  formdata.append("peragraph_box_one", data.peragraph_box_one || "");
  formdata.append("heading_box_two", data.heading_box_two || "");
  formdata.append("peragraph_box_two", data.peragraph_box_two || "");
  formdata.append("heading_box_three", data.heading_box_three || "");
  formdata.append("peragraph_box_three", data.peragraph_box_three || "");
  formdata.append("heading_box_four", data.heading_box_four || "");
  formdata.append("peragraph_box_four", data.peragraph_box_four || "");
  formdata.append("heading_box_five", data.heading_box_five || "");
  formdata.append("peragraph_box_five", data.peragraph_box_five || "");

  formdata.append("heading_four", data.heading_four || "");
  formdata.append("peragraph_four", data.peragraph_four || "");
  formdata.append("heading_five", data.heading_five || "");
  formdata.append("peragraph_five", data.peragraph_five || "");
  formdata.append("heading_Six", data.heading_Six || "");

  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/save-location`, formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getLocationData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/get-location-data",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
        params: {
          ...data,
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const UpdateFrontendLocation = async (data, id) => {
  const formdata = new FormData();

  formdata.append("location", data.location);
  if (data.image) formdata.append("image", data.image);
  formdata.append("heading_one", data.heading_one || "");
  formdata.append("peragraph_one", data.peragraph_one || "");
  formdata.append("heading_two", data.heading_two || "");
  formdata.append("heading_three", data.heading_three || "");
  formdata.append("peragraph_two", data.peragraph_two || "");

  formdata.append("heading_box_one", data.heading_box_one || "");
  formdata.append("peragraph_box_one", data.peragraph_box_one || "");
  formdata.append("heading_box_two", data.heading_box_two || "");
  formdata.append("peragraph_box_two", data.peragraph_box_two || "");
  formdata.append("heading_box_three", data.heading_box_three || "");
  formdata.append("peragraph_box_three", data.peragraph_box_three || "");
  formdata.append("heading_box_four", data.heading_box_four || "");
  formdata.append("peragraph_box_four", data.peragraph_box_four || "");
  formdata.append("heading_box_five", data.heading_box_five || "");
  formdata.append("peragraph_box_five", data.peragraph_box_five || "");

  formdata.append("heading_four", data.heading_four || "");
  formdata.append("peragraph_four", data.peragraph_four || "");
  formdata.append("heading_five", data.heading_five || "");
  formdata.append("peragraph_five", data.peragraph_five || "");
  formdata.append("heading_Six", data.heading_Six || "");
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/location-update/${id}`,
        formdata,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getSingleLocationById = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/location/" + id,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};

export const deleteSingleLocation = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(
      process.env.NEXT_PUBLIC_API_URL + "/location-delete/" + id,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    req.then((res) => resolve(res.data)).catch((err) => reject(err));
  });
};