import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUserData, removeToken, removeStorageData } from '../../../lib/session';
import { info } from 'console';
import swal from "sweetalert";
import { getSingleUserProfile, UpdateUserToOffiline } from "../../../lib/userapi"
import { getBookingsCount, getAppliedBookingsCount } from "../../../lib/chefapi"

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

    interface UserData {
        id: number;
        approved_by_admin: string;
        created_by:string;
    }

    const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
        id: '',
        name: '',
        email: '',
        pic: '',
        surname: '',
        role: '',
        approved_by_admin: '',
        profile_status: '',
    });

    const [userData, setUserData] = useState<UserData>({
        id: 0,
        approved_by_admin: '',
        created_by:'',
    });

    const [bookingcount, setBookingCount] = useState();
    const [appliedbookingcount, setAppliedBookingCount] = useState();
    const [hiredbookingcount, setHiredBookingCount] = useState();

    const router = useRouter();

    useEffect(() => {
        const userid: any = getCurrentUserData();
        getSingleData(userid.id);
        getUserData();
        // getBookingsCountData();
        getAppliedBookingsCountData();
    }, []);

    // const getBookingsCountData = async () => {
    //     getBookingsCount()
    //         .then(res => {
    //             if (res.status == true) {
    //                 setBookingCount(res.available_booking);
    //             } else {
    //                 console.log(res.message);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    const getAppliedBookingsCountData = async () => {
        const userid: any = getCurrentUserData();
        getAppliedBookingsCount(userid.id)
            .then(res => {
                if (res.status == true) {
                    setBookingCount(res.available_booking);
                    setAppliedBookingCount(res.applied_booking);
                    setHiredBookingCount(res.hired_booking);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getSingleData = async (id: any) => {
        const userid: any = getCurrentUserData();
        getSingleUserProfile(userid.id)
            .then(res => {
                if (res.status == true) {
                    setUserData(res.data);
                    console.log(res.data);
                    window.localStorage.setItem("approved_by_admin", res.data.approved_by_admin);

                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

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
            profile_status: userData.profile_status
        });

    };

    function handleLogout() {
        UpdateUserToOffiline(userData.id)
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
                                {currentUserData.pic != 'null' ?
                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="user-menu" />
                                    : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users.jpg'} alt="user-menu" />}

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
                            if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                                e.preventDefault();
                                AdminApprovalInfoAlert();
                            } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
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
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
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
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Available Jobs</span>
                            {bookingcount ? (
                                <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00', marginLeft: '5px',height:'25px',width: '25px',maxHeight:'25px',alignItems: 'center',justifyContent:'center',display:'flex'}}>{bookingcount}</span>
                            ) : null}
                        </div>
                    </a>

                    <a href="/chef/applied-booking" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/applied-booking' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Applied Jobs</span>
                            {appliedbookingcount ? (
                                 <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00', marginLeft: '5px',height:'25px',width: '25px',maxHeight:'25px',alignItems: 'center',justifyContent:'center',display:'flex'}}>{appliedbookingcount}</span>
                            ) : null}
                        </div>
                    </a>

                    <a href="/chef/hired-booking" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/hired-booking' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Assigned Jobs</span>
                            {hiredbookingcount ? (
                                 <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00', marginLeft: '5px',height:'25px',width: '25px',maxHeight:'25px',alignItems: 'center',justifyContent:'center',display:'flex'}}>{hiredbookingcount}</span>
                            ) : null}
                        </div>
                    </a>

                    <a href="/chef/invoices" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/invoices' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (currentUserData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
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
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
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

                    <a href="/chef/menus" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/chef/menus' || router.pathname == '/chef/menu/[id]' || router.pathname == '/chef/menus2' || router.pathname == '/chef/menus3' || router.pathname == '/chef/menus4' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'} onClick={(e) => {
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
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
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
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
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending'  && userData.created_by === null) {
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
                        if (userData.approved_by_admin === 'no' && userData.created_by === null) {
                            e.preventDefault();
                            AdminApprovalInfoAlert();
                        } else if (currentUserData.profile_status === 'pending' && userData.created_by === null) {
                            e.preventDefault();
                            CompleteProfile();
                        }
                    }}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-brands fa-rocketchat"></i></span>
                            <span className="menu-collapsed">Chats</span>
                        </div>
                    </a>
                    <a onClick={handleLogout} data-toggle="collapse" aria-expanded="false" role="button" className={router.pathname == '/chef/chats' ? 'list-group-item list-group-item-action flex-column align-items-start ' : 'list-group-item list-group-item-action flex-column align-items-start'}>
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
