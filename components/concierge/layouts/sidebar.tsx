import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { getCurrentUserData, removeToken, removeStorageData } from '../../../lib/session';
import { UpdateUserToOffiline } from "../../../lib/userapi"
import { getConciergeBookingsCount } from "../../../lib/concierge"

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
        getConciergeBookingsCount(userid.id)
            .then(res => {
                if (res.status == true) {
                    setAppliedBookingCount(res.allbooking);
                    setHiredBookingCount(res.hired_booking);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    // function handleLogout() {
    //     UpdateUserToOffiline(currentUserData.id)
    //     .then(res => {
    //         if (res.status == true) {
    //             removeToken();
    //             removeStorageData();
    //             window.location.href = '/';
    //         } else {
    //             console.log("error");
    //         }
    //     })

    //     }

    function handleLogout() {
        removeToken();
        removeStorageData();
        window.location.href = '/';
    }

    return (
        <>
            <div id="sidebar-container" className="sidebar-expanded  mobile-view d-md-block">
                <div className="user-profile">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-4 pr-0">
                        <a href="/">
                            {currentUserData.pic == null ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="user-menu" /> : <img
                                src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+currentUserData.pic}
                                alt="chats-user"
                            />}
                        </a>
                        </div>
                        <div className="col-lg-9 col-md-8 col-8">
                            <div className="user-profile-collapsed">
                                <h5>{currentUserData.name}</h5>
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
                    <a href="/" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                            <div className="d-flex ">
                                <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                                <span className="menu-collapsed">Home</span>
                            </div>
                        </a>
                    <a href="/concierge/dashboard" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/dashboard' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-boxes-stacked"></i></span>
                            <span className="menu-collapsed">General</span>
                        </div>
                    </a>
                    <a href="/concierge/bookings" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/bookings' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Available Bookings</span>
                            {appliedbookingcount ? (
                                 <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00', marginLeft: '5px',height:'25px',width: '25px',maxHeight:'25px',alignItems: 'center',justifyContent:'center',display:'flex'}}>{appliedbookingcount}</span>
                            ) : null}
                        </div>
                    </a>

                    <a href="/concierge/assigned-booking" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/assigned-booking' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file-lines"></i></span>
                            <span className="menu-collapsed">Assigned Bookings</span>
                            {hiredbookingcount ? (
                                 <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: '#ff4e00', marginLeft: '5px',height:'25px',width: '25px',maxHeight:'25px',alignItems: 'center',justifyContent:'center',display:'flex'}}>{hiredbookingcount}</span>
                            ) : null}
                        </div>
                    </a>

                    <a href="/concierge/invoices" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/invoices' || router.pathname == '/concierge/invoices/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-file"></i></span>
                            <span className="menu-collapsed">Invoices</span>
                        </div>
                    </a>
                    <a href="/concierge/receipts" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/receipts' || router.pathname == '/concierge/receipts/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-credit-card"></i></span>  
                            <span className="menu-collapsed">Receipts</span> 
                        </div>
                    </a>
                    <a href="/concierge/chefs" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/chefs' || router.pathname == '/concierge/chefs/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-carrot"></i></span>
                            <span className="menu-collapsed">Chefs</span>
                        </div>
                    </a>
                    <a href="/concierge/customers" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/customers' || router.pathname == '/concierge/customers/[id]' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-carrot"></i></span>
                            <span className="menu-collapsed">Customers</span>
                        </div>
                    </a>
                    {/*<a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-spoon"></i></span>  
                            <span className="menu-collapsed">Menus</span> 
                        </div>
                    </a>*/}
                    <a href="/concierge/calender" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/calender' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-calendar"></i></span>
                            <span className="menu-collapsed">Calendar</span>
                        </div>
                    </a>
                    <a href="/concierge/villas" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/villas' || router.pathname == '/concierge/villas2' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
                        <div className="d-flex ">
                            <span className="icon-dash"><i className="fa-solid fa-house"></i></span>
                            <span className="menu-collapsed">Villas</span>
                        </div>
                    </a>
                    <a href="/concierge/chats" data-toggle="collapse" aria-expanded="false" className={router.pathname == '/concierge/chats' ? 'list-group-item list-group-item-action flex-column align-items-start active' : 'list-group-item list-group-item-action flex-column align-items-start'}>
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
