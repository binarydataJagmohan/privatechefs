import React, { useState, useEffect } from "react";
import { removeToken, removeStorageData, getCurrentUserData } from "../../../lib/session";
import { notificationForUserAdmin } from "../../../lib/notificationapi";
import Link from "next/link";
import { UpdateUserToOffiline } from "../../../lib/userapi";
import { useRouter } from "next/router";

export default function Header() {
  const [currentUserData, setCurrentUserData]: any = useState({});
  const [countdata, setCountData] = useState("");
  const router = useRouter();

  useEffect(() => {
    getAllNotify();
  }, []);

  useEffect(() => {
    const userData: any = getCurrentUserData();
    const now = new Date();
    const expirationDate = new Date(userData.expiration);
    if (now > expirationDate) {
      removeToken();
      removeStorageData();
      window.location.href = "/404";
      console.log("yes");
    } else {
      console.log("no");
    }
  }, []);

  const getAllNotify = async () => {
    const userData: any = getCurrentUserData();
    setCurrentUserData(userData);
    getNotification(userData.id);
  };

  const getNotification = async (id: any) => {
    notificationForUserAdmin(id)
      .then((res) => {
        if (res.status == true) {
          setTimeout(() => {
            setCountData(res.count);
          }, 100);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function handleLogout() {
    UpdateUserToOffiline(currentUserData.id).then((res) => {
      if (res.status == true) {
        removeToken();
        removeStorageData();
        window.location.href = "/";
      } else {
        console.log("error");
      }
    });
  }
  if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", clickFunction, false);
  }
  function clickFunction() {
    let menu = document.querySelector(".menu");
    menu?.classList.toggle("active");
  }

  return (
    <>
      <div className="right-header mt-4 text-sm-right">
        <div className="row align-items-center">
          <div className="col-lg-10 col-md-6 col-2">
            <a href="#" className="bars-icon">
              <i className="fa-solid fa-bars"></i>
            </a>
          </div>
          <div className=" col-10 col-md-6 col-lg-2">
            <div className="d-flex align-items-center gx-5 justify-content-end">
              <div className="p-1">
                <p className="mb-0 comments-bell">
                  <a href="/admin/chats">
                    <i className="fa-solid fa-comments"></i>
                  </a>
                </p>
              </div>
              <div className="px-3">
                <Link href={`/admin/notification/notification?id=${currentUserData.id}`} className="notification">
                  <span>
                    <i className="fa-solid fa-bell"></i>
                  </span>
                  {countdata ? <span className="badge">{countdata}</span> : null}
                </Link>
              </div>
              <div className="">
                <div className="profile" onClick={clickFunction}>
                  <div className="img-box ">
                    {currentUserData.pic ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + currentUserData.pic} alt="" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" />}
                  </div>
                </div>
                <div className="menu">
                  <ul>
                    <li className="user_menu">
                      <a href="#">
                        {currentUserData.pic && currentUserData.pic != "null" ? (
                          <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + currentUserData.pic} alt="" style={{ width: "30px", height: "30px", borderRadius: "20px" }} />
                        ) : (
                          <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" style={{ width: "30px", height: "30px", borderRadius: "20px" }} />
                        )}
                        &nbsp;{currentUserData.name ? currentUserData.name.substring(0, 15) + "..." : ""}
                      </a>
                      {/* <span className="user-role">{currentUserData.role ? currentUserData.role : ''}</span> */}
                    </li>
                    <li>
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/chats"}>
                        <i className="fa-solid fa-comments"></i>&nbsp;Chat
                      </a>
                    </li>
                    <li>
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + `admin/notification/notification?id=${currentUserData.id}`}>
                        <i className="fa-solid fa-bell"></i>&nbsp;Notification
                      </a>
                    </li>
                    <li>
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/setting"}>
                        <i className="fa fa-cog"></i>&nbsp;Settings
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i>&nbsp;Sign Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
