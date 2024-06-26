import React, { useState, useEffect } from "react";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getSingleUserProfile, updateUsersImage } from "../../../lib/userapi";
import { UpdateSetting } from "../../../lib/adminapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimezonePicker from "react-bootstrap-timezone-picker";
import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";
import { showToast } from "../../commoncomponents/toastUtils";

export default function UserProfile() {
  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string;
  }

  interface UserData {
    pic: string | null;
  }

  const [name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [buttonStatus, setButtonState] = useState(false);

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: "",
    name: "",
    email: "",
    pic: null,
    surname: "",
    role: "",
    approved_by_admin: "",
  });

  const [userData, setUserData] = useState<UserData>({ pic: "" });

  useEffect(() => {
    getUserData();
  }, []);

  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    setButtonState(true);
    const userid = currentUserData.id;

    const data = {
      name: name || "",
      email: email || "",
      phone: phone || "",
      password: password || "",
    };

    UpdateSetting(userid, data)
      .then((res) => {
        setButtonState(false);
        window.localStorage.setItem("name", res.data.name);
        window.localStorage.setItem("email", res.data.email);
        window.localStorage.setItem("phone", res.data.phone);
        showToast("success", res.message);
      })
      .catch((err) => {
        setButtonState(false);
        toast.error("Error occurred", {
          position: toast.POSITION.BOTTOM_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: "#ffff",
            borderLeft: "4px solid #e74c3c",
            color: "#454545",
          },
          progressStyle: {
            background: "#ffff",
          },
        });
      });
  };

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
    setImage(file);

    updateUsersImage(currentUserData.id, file)
      .then((res) => {
        window.localStorage.setItem("pic", res.data.pic);
        showToast("success", res.message);
        // window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid file format", {
          position: toast.POSITION.TOP_RIGHT,
          closeButton: true,
          hideProgressBar: false,
          style: {
            background: "#ffff",
            borderLeft: "4px solid #e74c3c",
            color: "#454545",
          },
          progressStyle: {
            background: "#ffff",
          },
        });
      });
  };

  const getUserData = async () => {
    const data = isPageVisibleToRole("admin-setting");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      const userData = getCurrentUserData() as CurrentUserData;
      setCurrentUserData({
        ...userData,
        id: userData.id,
        name: userData.name,
        pic: userData.pic,
        surname: userData.surname,
        role: userData.role,
        approved_by_admin: userData.approved_by_admin,
      });
      getSingleUserData(userData.id);
    }
  };

  const getSingleUserData = async (id: any) => {
    getSingleUserProfile(id)
      .then((res) => {
        setButtonState(false);
        if (res.status == true) {
          setFullName(res.data.name);
          setPhone(res.data.phone);
          setEmail(res.data.email);
          setPassword(res.data.view_password);
          setUserData(res.data);
        } else {
          setButtonState(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            closeButton: true,
            hideProgressBar: false,
            style: {
              background: "#ffff",
              borderLeft: "4px solid #e74c3c",
              color: "#454545",
            },
            progressStyle: {
              background: "#ffff",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="userprofile-part">
        <div className="container">
          <div className="my-profile tab-m-0">
            <h2> Setting </h2>
          </div>
          <div className="satingStyle">
            <form onSubmit={handleUpdateProfile}>
              <div className="row">
                <div className="col-lg-12text-start">
                  <div className="user-img" id="admin-profile">
                    {userData.pic ? (
                      <img src={image && typeof image !== "string" ? URL.createObjectURL(image) : userData.pic ? process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + userData.pic : ""} style={{ objectFit: "cover" }} alt="" />
                    ) : (
                      <img src={image && typeof image !== "string" ? URL.createObjectURL(image) : process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} style={{ objectFit: "cover" }} alt="" />
                    )}
                    <label>
                      {" "}
                      <input type="file" name="image" id="uploadfile" className="d-none" onChange={imageChange} accept=".jpg, .jpeg, .gif, .png, .webp" />
                      <i className="fa-solid fa-camera"></i>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="all-form tab-m-0 pt-0 right-left-spacing">
                    <div className="col-lg-12">
                      <label>Name </label>
                      <input type="text" name="name" defaultValue={currentUserData.name || ""} placeholder="Name " onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="col-lg-12">
                      <label>Email</label>
                      <input type="email" defaultValue="email" value={email || ""} placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="col-lg-12">
                      <label>Password</label>
                      <input type="password" id="loginpassword" name="password" value={password || ""} placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-lg-12">
                      <label>Phone</label>
                      <input
                        type="text"
                        defaultValue="phone"
                        maxLength={10}
                        value={phone || ""}
                        placeholder="Phone"
                        onChange={(e) => {
                          const re = /^[0-9\b]+$/;
                          if (e.target.value === "" || re.test(e.target.value)) {
                            setPhone(e.target.value);
                          }
                        }}
                        required
                      />
                    </div>
                    <div className="text-right mt-5">
                      <button className="table-btn">Update Setting Information</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
}
