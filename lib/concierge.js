import { getToken } from "./session";
import axios from "axios";

export const createUser = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/create-user', {
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

export const deleteUser = async (id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-user/' + id, {
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

export const getAllConciergeUsers = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-concierge-users/' + id, {
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

export const getConciergeChefByBooking = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-chef-by-booking/' + id, {
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

export const getAllConciergechef = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-concierge-chef/' + id, {
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

export const createChef = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/create-chef', {
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

export const deleteChef = async (id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/delete-chef/' + id, {
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

export const getConciergeReceipt = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-receipt/' + id, {
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

export const getConciergeVillas = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-villas/' + id, {
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

export const getAllConciergeBookings = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-concierge-bookings/' + id, {
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

export const getConciergeBookingsCount = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/concierge-bookings-count/' + id, {
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

export const getConciergeCalenderBookings = async (id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-calender-bookings/' + id, {
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
export const getConciergeFilterByBooking = async (id, type) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-filter-by-booking/' + id + '/' + type, {
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

  export const getConciergeAssignedBooking = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-assigned-booking/' + id, {
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


  export const getConciergeMessageData = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-concierge-message-data', {
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

  export const getClickConciergeChefUserChatData = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-click-concierge-chef-user-chat-data', {
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

  export const ContactByConciergeToUserAndChef = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/contact-by-concierge-to-user-and-chef', {
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

  export const ContactByConciergeToUserAndChefWithShareFile = async (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.NEXT_PUBLIC_API_URL + '/contact-by-concierge-to-user-and-chef-with-share-file', data, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
          },
        })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const getAllConciergeUserData = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-concierge-user-data/' + id, {
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

  export const SendMessageToUserByConcierge = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/send-message-to-user-by-concierge', {
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

  export const CreateGroupChatByConcierge = async (data, image) => {
    let formdata = new FormData();
    formdata.append('image', image);
    return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/create-group-by-concierge', formdata, {
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
  