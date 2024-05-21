import React, { useState, useEffect } from 'react';
import { removeToken, removeStorageData, getCurrentUserData } from '../../../lib/session'
import { notificationForUserAdmin } from '../../../lib/notificationapi';
import Link from 'next/link'
import { getSingleUserProfile, UpdateUserToOffiline } from "../../../lib/userapi"
import { approvalMsg } from "../../../lib/chefapi"
import { useRouter } from "next/router";


export default function Header(): JSX.Element {

    interface User {
        id: string;
        name: string;
        surname: string;
        email: string;
        approved_by_admin: string;
    }

    interface UserData {
        id: number;
        approved_by_admin: string;
        profile_status: string;
        approval_msg: string;
        created_by: string;
    }

    const [userData, setUserData] = useState('');
    const [countdata, setCountData] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [currentUserData, setCurrentUserData]: any = useState({});
    const router = useRouter();

    const [data, setData] = useState<UserData>({
        id: 0,
        approved_by_admin: '',
        profile_status: '',
        approval_msg: '',
        created_by: '',
    });

    useEffect(() => {
        const userid: any = getCurrentUserData();
        getSingleData(userid.id);
        getAllNotify();
    }, []);

    useEffect(() => {
        const userData: any = getCurrentUserData();
        setCurrentUserData(userData);
        const now = new Date();
        const expirationDate = new Date(userData.expiration);
        if (now > expirationDate) {
            removeToken();
            removeStorageData();
            window.location.href = '/404';
            console.log("yes");
        } else {
            console.log("no");
        }
    }, []);


    const getSingleData = async (id: any) => {
        const userid: any = getCurrentUserData();
        getSingleUserProfile(userid.id)
            .then(res => {
                if (res.status == true) {
                    setData(res.data);
                    window.localStorage.setItem("profile_status", res.data.profile_status);
                    window.localStorage.setItem("approved_by_admin", res.data.approved_by_admin);
                    console.log(res.data);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const approvalMsgStatus = () => {
        const userData: User = getCurrentUserData() as User;
        approvalMsg(userData.id)
            .then(res => {
                if (res.status == true) {
                    setCountData(res.count);
                    setIsVisible(false);
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getAllNotify = async () => {
        const userData: User = getCurrentUserData() as User;
        const UserData: any = getCurrentUserData();
        setCurrentUserData(UserData);
        setUserData(userData.id);
        getNotification(userData.id);
    }

    const getNotification = async (id: any) => {
        notificationForUserAdmin(id)
            .then(res => {
                if (res.status == true) {
                    setCountData(res.count);
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    function handleLogout() {
        UpdateUserToOffiline(currentUserData.id)
            .then(res => {
                if (res.status == true) {
                    removeToken();
                    removeStorageData();
                    window.location.href = '/';
                } else {
                    console.log("error");
                }
            })

    }
    if (typeof window !== "undefined") {
        window.addEventListener('DOMContentLoaded', clickFunction, false);
    }
    function clickFunction() {
        let menu = document.querySelector('.menu');
        menu?.classList.toggle('active');
    }
    return (
        <>
            <div className="right-header mt-4">
                <div className="row align-items-center">
                    <div className="col-lg-10 col-md-6 col-2">
                        <a href="#" className="bars-icon"><i className="fa-solid fa-bars"></i></a>
                        <div className='d-none d-lg-block'>
                            {data.profile_status === 'pending' && data.approved_by_admin === 'no' && data.created_by === null && (
                                <p className="alert alert-danger">
                                    Complete your profile for pending admin approval.
                                </p>
                            )}
                            {data.profile_status === 'completed' && data.approved_by_admin === 'no' && data.created_by === null && (
                                <p className="alert alert-warning">
                                    Profile completed, awaiting admin approval to unlock culinary opportunities.
                                </p>
                            )}
                            {isVisible && data.profile_status === 'completed' && data.approved_by_admin === 'yes' && data.approval_msg === 'yes' && data.created_by === null && (
                                <p className="alert alert-success">
                                    Congratulations! Your profile has been completed and approved by the admin.
                                    <button className="table-btn1" value="no" onClick={approvalMsgStatus}>OK</button>
                                </p>
                            )}</div>
                    </div>
                    <div className=' col-10 col-md-6 col-lg-2'>
                        <div className="d-flex align-items-center gx-5 justify-content-end">
                            <div className='p-1'>
                                <p className="mb-0 comments-bell"><a href="/chef/chats"><i className="fa-solid fa-comments"></i></a></p>
                            </div>
                            <div className="px-3">
                                <Link href={`/chef/notification/notification?id=${userData}`} className="notification">
                                    <span><i className="fa-solid fa-bell"></i></span>
                                    {countdata ? (
                                        <span className="badge">{countdata}</span>
                                    ) : null}

                                </Link>
                            </div>
                            <div className=''>
                                <div className="profile" onClick={clickFunction}>
                                    <div className="img-box">
                                        {currentUserData.pic && currentUserData.pic != 'null' ? (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="" />
                                        ) : (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'} alt="" />
                                        )}
                                    </div>
                                </div>
                                <div className="menu">
                                    <ul>
                                        <li className='user_menu'><a href='/chef/myprofile'>
                                            {currentUserData.pic && currentUserData.pic != 'null' ? (
                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="" style={{width:"30px", height:"30px", borderRadius:"20px"}}/>
                                            ) : (
                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'} alt="" style={{width:"30px", height:"30px", borderRadius:"20px"}}/>
                                            )}&nbsp;{currentUserData.name ? currentUserData.name.substring(0,15)+'...' : ''}</a>
                                            {/* <span className="user-role">{currentUserData.role ? currentUserData.role : ''}</span> */}
                                        </li>
                                        <li><a href={process.env.NEXT_PUBLIC_BASE_URL + 'chef/chats'}><i className="fa-solid fa-comments"></i>&nbsp;Chat</a></li>
                                        <li><a href={process.env.NEXT_PUBLIC_BASE_URL + `chef/notification/notification?id=${userData}`}><i className="fa-solid fa-bell"></i>&nbsp;Notification</a></li>
                                        <li><a href={process.env.NEXT_PUBLIC_BASE_URL + 'chef/setting'}><i className="fa fa-cog"></i>&nbsp;Settings</a></li>
                                        <li><a href="#" onClick={handleLogout}><i className="fa fa-sign-out"></i>&nbsp;Sign Out</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
