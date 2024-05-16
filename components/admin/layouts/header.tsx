import React, { useState, useEffect } from 'react';
import { removeToken, removeStorageData, getCurrentUserData } from '../../../lib/session'
import { notificationForUserAdmin } from '../../../lib/notificationapi';
import Link from 'next/link'
import { UpdateUserToOffiline } from "../../../lib/userapi"
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
            window.location.href = '/404';
            console.log("yes");
        } else {
            console.log("no");
        }
    }, []);


    const getAllNotify = async () => {
        const userData: any = getCurrentUserData();
        setCurrentUserData(userData);
        getNotification(userData.id);
    }

    const getNotification = async (id: any) => {
        notificationForUserAdmin(id)
            .then(res => {
                if (res.status == true) {
                    setTimeout(() => {
                        setCountData(res.count);
                    }, 100);
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
            <div className="right-header mt-4 text-sm-right">
                <div className="row align-items-center">
                    <div className="col-lg-10 col-md-6 col-2">
                        <a href="#" className="bars-icon"><i className="fa-solid fa-bars"></i></a>
                    </div>
                    <div className=' col-10 col-md-6 col-lg-2'>
                        <div className='d-flex align-items-center g-5 justify-content-end'>
                            <div className='p-1'>
                                <p className="mb-0 comments-bell"><a href="/admin/chats"><i className="fa-solid fa-comments"></i></a></p>
                            </div>
                            <div className='px-3'>
                                <Link href={`/admin/notification/notification?id=${currentUserData.id}`} className="notification">
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
                                            Hello {currentUserData.role}
                                        </li>
                                        <li>
                                            <a href="/" className="dropdown-item">
                                                <div className="d-flex ">
                                                    <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                                                    <span className="menu-collapsed">{router.pathname.startsWith('/admin') ? 'Home' : ''}</span>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/admin/setting" className="dropdown-item">
                                                <div className="d-flex ">
                                                    <span className="icon-dash"><i className="fa fa-cog" aria-hidden="true"></i></span>
                                                    <span className="menu-collapsed">Settings</span>
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
                </div >
            </div >
        </>
    )
}
