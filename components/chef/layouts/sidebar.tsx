import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUserData, removeToken, removeStorageData } from '../../../lib/session';
import { info } from 'console';
import swal from "sweetalert";

export default function Sidebar(): JSX.Element {

    interface CurrentUserData {
        id: string;
        name: string;
        email: string;
        pic: string | null;
        surname: string;
        role: string;
        approved_by_admin: string;
        profile_status: string;

    }

    const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
        id: '',
        name: '',
        email: '',
        pic: null,
        surname: '',
        role: '',
        approved_by_admin: '',
        profile_status: ''
    });

    const router = useRouter();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const userData = getCurrentUserData() as CurrentUserData;
        setCurrentUserData({
            ...userData,
            id: userData.id,
            name: userData.name,
            pic: userData.pic,
            surname: userData.surname,
            role: userData.role,
            approved_by_admin: userData.approved_by_admin,
            profile_status: userData.profile_status,

        });


    };


    function handleLogout() {
        removeToken();
        removeStorageData();
        window.location.href = '/';
    }

    function AdminApprovalInfoAlert() {
        swal({
            title: 'Oops!',
            text: 'Your approval is pending at admin end',
            icon: 'info',

        });
    }

    function CompleteProfile() {
        swal({
            title: 'Oops!',
            text: 'First of all please complete your profile then click on other tab',
            icon: 'info',

        });
    }


    return (
        <>

            <div id="sidebar-container" className="sidebar-expanded  mobile-view d-md-block">
                <div className="user-profile">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-4 pr-0">
                            <a href="/chef/myprofile">
                                {currentUserData.pic == 'null' ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="user-menu" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="user-menu" />}

                            </a>
                        </div>
                        <div className="col-lg-9 col-md-8 col-8">
                            <div className="user-profile-collapsed">
                                <a href="/chef/myprofile" className={router.pathname == '/chef/myprofile' ? 'active' : ''}><h5>{currentUserData.name} {currentUserData.surname != 'null' ? currentUserData.surname : ''}</h5></a>
                                <p>{currentUserData.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="list-group">
                    <a href="#" data-toggle="sidebar-colapse" className="list-group-item list-group-item-action d-flex align-items-center icon-arrow">
                        <div className="d-flex w-100 justify-content-start align-items-center">
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </a>

                    <a href="/" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                         if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                            <span className="menu-collapsed">Home</span>
                        </div>
                    </a>

                    <a href="/chef/dashboard" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/dashboard' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-boxes-stacked"></i></span>
                            <span className="menu-collapsed">General</span>
                        </div>
                    </a>


                    <a href="/chef/bookings" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/bookings' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Available Bookings</span>
                        </div>
                    </a>

                    <a href="/chef/applied-booking" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/applied-booking' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Applied Bookings</span>
                        </div>
                    </a>

                    <a href="/chef/invoices" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/invoices' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file"></i></span>
                            <span className="menu-collapsed">Invoices</span>
                        </div>
                    </a>
                    <a href="/chef/receipts" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/receipts' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-credit-card"></i></span>
                            <span className="menu-collapsed">Receipts</span>
                        </div>
                    </a>

                    {/* <a href="/chef/chefs" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/chefs' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-carrot"></i></span>  
                            <span className="menu-collapsed">Chefs</span> 
                        </div>
                    </a> */}

                    <a href="/chef/menus" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/menus' || router.pathname == '/chef/menus2' || router.pathname == '/chef/menus3' || router.pathname == '/chef/menus4' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-spoon"></i></span>
                            <span className="menu-collapsed">Menus</span>
                        </div>
                    </a>
                    <a href="/chef/dish" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/dish' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-cutlery"></i></span>
                            <span className="menu-collapsed">Dishes</span>
                        </div>
                    </a>
                    <a href="/chef/calender" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/calender' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-calendar"></i></span>
                            <span className="menu-collapsed">Calendar</span>
                        </div>
                    </a>
                    {/*<a href="/chef/villas" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/villas' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-house"></i></span>  
                            <span className="menu-collapsed">Villas</span> 
                        </div>
                    </a>*/}
                    <a href="/chef/chats" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/chats' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no') {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending') {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-brands fa-rocketchat"></i></span>
                            <span className="menu-collapsed">Chats</span>
                        </div>
                    </a>
                    <a onClick={handleLogout} data-toggle="collapse" aria-expanded="false" role="button" className={router.pathname == '/chef/chats' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                            <span className="menu-collapsed">Logout</span>
                        </div>
                    </a>
                </ul>
            </div>
        </>
    )
}
