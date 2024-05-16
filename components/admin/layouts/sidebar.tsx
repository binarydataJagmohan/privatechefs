import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { getAllChefDetails } from '../../../lib/adminapi';
import { toast } from 'react-toastify';
import { getCurrentUserData, removeToken, removeStorageData } from '../../../lib/session';
import { UpdateUserToOffiline } from "../../../lib/userapi"
import { getBookingsCount } from "../../../lib/chefapi"

export default function Sidebar(): JSX.Element {
    const router = useRouter();
    const [currentUserData, setCurrentUserData]: any = useState({});
    const [appliedbookingcount, setAppliedBookingCount] = useState();
    const [hiredbookingcount, setHiredBookingCount] = useState();

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const userData = getCurrentUserData();
        setCurrentUserData(userData);
        getBookingsCountData();
    };

    const getBookingsCountData = async () => {
        const userid: any = getCurrentUserData();
        getBookingsCount(userid.id)
            .then(res => {
                if (res.status == true) {
                    // setAppliedBookingCount(res.available_booking);
                    setAppliedBookingCount(res.admin_available_booking);

                    setHiredBookingCount(res.hired_booking);
                } else {
                    console.log(res.message);
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
            <div id="sidebar-container" className="sidebar-expanded  mobile-view d-md-block">
                <div className="fixed-left">
                    <div className="">
                        <div className='text-center'>
                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/logo.png'} alt="user-menu" width={70} height={70} />
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-3 col-md-4 col-4 pr-0">
                                <a href="/">
                                    {currentUserData.pic && currentUserData.pic != 'null' ?
                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + currentUserData.pic} alt="user-menu" />
                                        : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/logo.png'} alt="user-menu" />}
                                </a>
                            </div>
                            <div className="col-lg-9 col-md-8 col-8">
                                <div className="user-profile-collapsed">
                                    <h5></h5>
                                    <p>{currentUserData.role}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <ul className="list-group">
                        <a href="#" data-toggle="sidebar-colapse" className="list-group-item list-group-item-action d-flex align-items-center icon-arrow">
                            <div className="d-flex w-100 justify-content-start align-items-center">
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                        </a>
                        <a href="/" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                                <span className="menu-collapsed">Home</span>
                            </div>
                        </a>
                        <a href="/admin/dashboard" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/dashboard' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-boxes-stacked"></i></span>
                                <span className="menu-collapsed">General</span>
                            </div>
                        </a>
                        <a href="/admin/bookings" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/bookings' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                                <span className="menu-collapsed">Available Bookings</span>
                                {appliedbookingcount ? (
                                    <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00d1', marginLeft: '5px', height: '25px', width: '25px', maxHeight: '25px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{appliedbookingcount}</span>
                                ) : null}
                            </div>
                        </a>

                        <a href="/admin/assigned-booking" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/assigned-booking' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                                <span className="menu-collapsed">Assigned Bookings</span>
                                {hiredbookingcount ? (
                                    <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00d1', marginLeft: '5px', height: '25px', width: '25px', maxHeight: '25px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{hiredbookingcount}</span>
                                ) : null}
                            </div>
                        </a>

                        <a href="/admin/invoices" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/invoices' || router.pathname == '/admin/invoices/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-file"></i></span>
                                <span className="menu-collapsed">Invoices</span>
                            </div>
                        </a>

                        <a href="/admin/testimonial" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/testimonial' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-file"></i></span>
                                <span className="menu-collapsed">Testimonial</span>
                            </div>
                        </a>
                        <a href="/admin/receipts" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/receipts' || router.pathname == '/admin/receipts/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-credit-card"></i></span>
                                <span className="menu-collapsed">Receipts</span>
                            </div>
                        </a>
                        <a href="/admin/chefs" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/chefs' || router.pathname == '/admin/chefs/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa fa-users"></i></span>
                                <span className="menu-collapsed">Chefs</span>
                            </div>
                        </a>

                        <a href="/admin/concierge" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/concierge' || router.pathname == '/admin/concierge/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa fa-users"></i></span>
                                <span className="menu-collapsed">Concierge</span>
                            </div>
                        </a>

                        <a href="/admin/users" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/users' || router.pathname == '/admin/users/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa fa-users" aria-hidden="true"></i></span>
                                <span className="menu-collapsed">Users</span>
                            </div>
                        </a>
                        {/*<a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-spoon"></i></span>  
                            <span className="menu-collapsed">Menus</span> 
                        </div>
                    </a>*/}
                        <a href="/admin/cuisine" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/cuisine' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-bowl-food"></i></span>
                                <span className="menu-collapsed">Cuisine</span>
                            </div>
                        </a>
                        <a href="/admin/calender" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/calender' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-calendar"></i></span>
                                <span className="menu-collapsed">Calendar</span>
                            </div>
                        </a>
                        <a href="/admin/villas" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/villas' || router.pathname == '/admin/villas2' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                                <span className="menu-collapsed">Villas</span>
                            </div>
                        </a>
                        <a href="/admin/chats" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/chats' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-brands fa-rocketchat"></i></span>
                                <span className="menu-collapsed">Chats</span>
                            </div>
                        </a>
                        <a href="/admin/allergy" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/allergy' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-hand-dots"></i></span>
                                <span className="menu-collapsed">Allergy</span>
                            </div>
                        </a>
                        <a href="/admin/servicechoice" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/servicechoice' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-bell-concierge"></i></span>
                                <span className="menu-collapsed">Service choice</span>
                            </div>
                        </a>
                        <a href="/admin/setting" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/setting' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa fa-cog" aria-hidden="true"></i></span>
                                <span className="menu-collapsed">Settings</span>
                            </div>
                        </a>
                        <a href="/admin/pages" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/pages' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-file"></i></span>
                                <span className="menu-collapsed">Pages</span>
                            </div>
                        </a>
                        <a href="/admin/top-rated-chef" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/admin/top-rated-chef' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-star"></i></span>
                                <span className="menu-collapsed">Top Rated Chef</span>
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
            </div>
        </>
    )
}
