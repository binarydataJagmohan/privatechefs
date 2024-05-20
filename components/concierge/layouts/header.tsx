import React, { useState, useEffect } from "react";
import { removeToken, removeStorageData, getCurrentUserData } from "../../../lib/session";
import { getNotificationConcierge } from "../../../lib/notificationapi";
import Link from "next/link";
import { UpdateUserToOffiline } from "../../../lib/userapi";

export default function Header(): JSX.Element {
  const [currentUserData, setCurrentUserData]: any = useState({});
  const [countdata, setCountData] = useState("");

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
    getNotificationConcierge(id)
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
      <div className="right-header mt-4">
        <div className="row align-items-center">
          <div className="col-lg-10 col-md-6 col-12">
            <a href="#" className="bars-icon">
              <i className="fa-solid fa-bars"></i>
            </a>
            <div className="d-none d-lg-block">{currentUserData.approved_by_admin === "no" && <p className="alert alert-danger text-center">Your account approval pending at administrative end.</p>}</div>
          </div>
          <div className=" col-10 col-md-6 col-lg-2">
            <div className="d-flex align-items-center gx-5 gap-2 justify-content-end">
              <div className="p-1">
                <p className="mb-0 comments-bell">
                  <a href="/concierge/chats">
                    <i className="fa-solid fa-comments"></i>
                  </a>
                </p>
              </div>
              {/* <div className="px-3">
                                <Link href={`/chef/notification/notification?id=${userData}`} className="notification">
                                    <span><i className="fa-solid fa-bell"></i></span>
                                    {countdata ? (
                                        <span className="badge">{countdata}</span>
                                    ) : null}

                                </Link>
                            </div> */}
              <div className="">
                <div className="profile" onClick={clickFunction}>
                  <div className="img-box">
                    {currentUserData.pic && currentUserData.pic != "null" ? (
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + currentUserData.pic} alt="" />
                    ) : (
                      <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" />
                    )}
                  </div>
                </div>
                <div className="menu">
                  <ul>
                    <li className="user_menu">
                      <a href="#">
                        <i className="fa-solid fa-user"></i>&nbsp;{currentUserData.name ? currentUserData.name.substring(0, 15) + "..." : ""}
                      </a>
                      <span className="user-role">{currentUserData.role ? currentUserData.role : ""}</span>
                    </li>
                    <li>
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "concierge/chats"}>
                        <i className="fa-solid fa-comments"></i>&nbsp;Chat
                      </a>
                    </li>
                    {/* <li><a href={process.env.NEXT_PUBLIC_BASE_URL+`concierge/notification/notification?id=${currentUserData.id}`}><i className="fa-solid fa-bell"></i>&nbsp;Notification</a></li> */}
                    <li>
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "concierge/setting"}>
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
        <div className="d-block d-lg-none">{currentUserData.approved_by_admin === "no" && <p className="alert alert-danger text-center">Your account approval pending at administrative end.</p>}</div>
      </div>
    </>
  );
}
