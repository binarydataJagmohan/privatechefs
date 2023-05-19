import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { selectRole,getEmail} from '../lib/frontendapi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSession} from 'next-auth/react';
import { useRouter } from "next/router";

export default function Custom() {

  interface Errors {
    role?: string
  }

  interface User {
    id: number;
    role:string;
    email:string;
    approved_by_admin:string;
    profile_status:string;
  }

  const router = useRouter();

  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [buttonStatus, setButtonState] = useState(false);
  const [data, setdata] = useState({});
  const [current_user_data, setCurrentUserData] = useState<User>({
        id: 0,
        role: "",
        email:"",
        approved_by_admin: "",
        profile_status: "",
  });
  const { data: session } = useSession();

  useEffect(() => {
    // const fetchDataByEmail = async (email: string) => {
    //   try {
    //     const response = await getEmail(email);
    //     const userdata = response.data; // Modify as per your API response structure
    //     setCurrentUserData(userdata);
    //     console.log(userdata);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
  
    if (session && session.user && session.user.email) {
      const sessionEmail = session.user.email;
      getDataByEmail(sessionEmail);
    }

  }, [session]);
  

  const getDataByEmail = async (email: string) => {
    try {
      const response = await getEmail(email);
      const data = response.data; // Assuming the response contains the ID
      setCurrentUserData(data);// Modify as per your API response structure
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectSubmit = (e: any) => {
    e.preventDefault();

    // Validate form data
    const newErrors: Errors = {};
    if (!role) {
      newErrors.role = "Role is required";
    }
    setErrors(newErrors);

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      // setButtonState(true);
      const email = current_user_data.email;
      const id = current_user_data.id;
      //console.log(id);
      const data = {
        role: role,
      };
      selectRole(id,data)
        .then((res) => {
          if (res.status == true) {
           
              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
              });

              setTimeout(() => {
                if (current_user_data.role == "admin") {
                  router.push("/admin/dashboard");
                }
              }, 1000);

              setTimeout(() => {
                //alert(132);
                if (current_user_data.role == "user") {
                  router.push("/user/userprofile");
                }
              }, 1000);

              setTimeout(() => {
                if (current_user_data.role == "chef") {
                    router.push("/chef/myprofile")
                }
              }, 1000);
          } else {
            setButtonState(false);
            toast.info(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <section className="banner-part p-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-4.jpg'} alt="banner-4" className="w-100 border-0 banner-left" />
            </div>
            <div className="col-sm-6">
              <form onSubmit={handleSelectSubmit}>
                <div className="banner-text pages-text">
                  <h1>Select role</h1>
                  <div className='login_div mb-2'>
                    <select className="" name="role" onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select role</option>
                      <option value="user">User</option>
                      <option value="chef">Chef</option>
                      <option value="concierge">Conciergehief</option>
                    </select>
                    {errors.role && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.role}</span>}
                  </div>
                  <button type="submit" className="btn-send" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Submit'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}