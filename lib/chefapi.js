import { getToken } from "./session";
import axios from "axios";
import { resolve } from "path";

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

export const saveChefMenu = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/save-chef-menu', formdata, {
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

export const updateChefProfile = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request({
      url: process.env.NEXT_PUBLIC_API_URL + '/update-chef-profile/' + id,
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


export const getChefDetail = async (id) => {
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

export const UpdateChefResume = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-chef-resume/' + id, {
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

export const getChefResume = async (id) => {
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

export const getAllChefMenu = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-chef-menu/' + id, {
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

export const getSingleChefMenu = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-chef-menu/' + id, {
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

export const saveChefMenuItems = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-chef-menu-items', {
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

export const deleteChefMenuItem = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-chef-menu-item/' + id, {
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

export const updateChefMenu = async (data, image) => {
  let formdata = new FormData();
  formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/update-chef-menu', formdata, {
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

export const deleteMenu = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-single-menu/' + id, {
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

export const updateChefPersonPrice = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-person-price', {
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




export const getDishes = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-dishes/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },

    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const dishAddUpdate = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/add-chef-dish', {
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

export const getDishecategory = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/getDishecategory', {
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

export const deleteSingleDish = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-dish/' + id, {
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

export const getSingleDish = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-dish/' + id, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    });
    req.then(res => rcesolve(res.data))
      .catch(err => reject(err));
  });
};

export const fetchDishCategoryById = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/fetch-dish-category-by-id', {
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



export const updateChefDishCount = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-chef-dish-count', {
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

export const getAllBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-booking/', {
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

export const saveReceipt = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-receipt', {
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

export const getChefReceipt = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-receipt/' + id, {
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

export const getSingleReceipt = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-receipt/' + id, {
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

export const updateReceipt = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-receipt/' + id, {
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

export const updateReceiptImages = async (id, data, image) => {
  let formData = new FormData();
  for (let i = 0; i < image.length; i++) {
    formData.append('image[]', image[i]);
  }
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-receipt-images/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken()
      },
      data: formData
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};


export const deleteReceipt = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-receipt/' + id, {
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


export const getUserChefByBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-user-chef-by-booking/' + id, {
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

export const getUserChefFilterByBooking = async (id, type) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-user-chef-filter-by-booking/' + id + '/' + type, {
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
export const saveChefAppliedBookingJob = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-chef-applied-booking-job', {
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

export const getChefAppliedBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-applied-booking/' + id, {
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

export const getChefAppliedFilterByBooking = async (id, type) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-applied-filter-by-booking/' + id + '/' + type, {
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

export const UpdateChefLocation = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-chef-location/' + id, {
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

export const SaveChefLocation = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-chef-location/', {
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

export const getChefLocation = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-location/' + id, {
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

export const getCurrentLocation = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-current-location/' + id, {
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

export const UpdateLocationStatus = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-location-status/' + id, {
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

export const getSingleLocation = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-location/' + id, {
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

export const deleteSingleLocation = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-single-location/' + id, {
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

export const getChefMessageData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-message-data', {
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

export const ContactUserByChef = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/contact-user-by-chef', {
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

export const getClickChefUserChatData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-click-chef-user-chat-data', {
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
export const approvalMsg = async (id, data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/approval-msg/' + id, {
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
};

export const ContactUserByChefWithShareFile = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + '/contact-user-by-chef-with-share-file', data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
        },
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getChefBookingData = async (id,data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-bookings/'+id, {
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

export const saveInvoice = async(data) => {
  return new Promise((resolve,reject)=>{
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-invoice',{
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    })
    req.then(res => resolve(res.data))
    .catch(err => reject(err));
  })
}

export const getChefInvoice = async(id,data) => {
  return new Promise((resolve,reject)=>{
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-invoice/' + id,{
      method: 'get',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    })
    req.then(res => resolve(res.data))
    .catch(err => reject(err));
  })
}

export const updateInvoice = async(id,data) => {
  return new Promise((resolve,reject)=>{
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-invoice/'+id,{
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    })
    req.then(res => resolve(res.data))
    .catch(err => reject(err));
  })
}

export const getSingleInvoice = async(id,data) => {
  return new Promise((resolve,reject)=>{
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-invoice/'+id,{
      method: 'get',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    })
    req.then(res => resolve(res.data))
    .catch(err => reject(err));
  })
}

export const deleteInvoice = async(id,data) => {
  return new Promise((resolve,reject)=>{
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-invoice/'+id,{
      method: 'post',
      headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      }
    })
    req.then(res => resolve(res.data))
    .catch(err => reject(err));
  })
}

export const getAllChefBooking = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-chef-booking/' +id, {
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

