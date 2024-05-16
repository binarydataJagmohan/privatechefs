import React, { useState, useEffect } from 'react';
import { removeToken, removeStorageData, getCurrentUserData } from '../../../lib/session'
import { notificationForUserAdmin } from '../../../lib/notificationapi';
import Link from 'next/link'
import { getSingleUserProfile } from "../../../lib/userapi"
import { approvalMsg } from "../../../lib/chefapi"
import { UpdateUserToOffiline } from "../../../lib/userapi"
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
                                <div className="dropdown adminAddMenu" id="none-class">
                                    <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {currentUserData.pic && currentUserData.pic != 'null' ?
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="user-menu" style={{ borderRadius: '40px' }} height={40} width={40} />
                                            : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'} alt="user-menu" />}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li className="dropdown-item">
                                            {currentUserData.name}
                                            <br />
                                            <span className="role-set" style={{ color: '#8c8c8c', fontSize: '14px' }}>{currentUserData.role}</span>
                                        </li>
                                        <li>
                                            <a href="/" className="dropdown-item">
                                                <div className="d-flex ">
                                                    <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                                                    <span className="menu-collapsed">{router.pathname.startsWith('/chef') ? 'Home' : ''}</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/chef/myprofile" className="dropdown-item">
                                                <div className="d-flex ">
                                                    <span className="icon-dash"><i className="fa fa-cog" aria-hidden="true"></i></span>
                                                    <span className="menu-collapsed">My Profile</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href='#' onClick={handleLogout} className="dropdown-item">
                                                <div className="d-flex ">
                                                    <span className="icon-dash"><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                                                    <span className="menu-collapsed">Logout</span>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-block d-lg-none'>
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
            </div >
        </>
    )
}
