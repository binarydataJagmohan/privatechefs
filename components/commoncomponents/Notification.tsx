import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../lib/session'
import { notificationForUserAdmin, notificationStatus } from '../../lib/notificationapi';
import { isPageVisibleToRole } from "../../helpers/isPageVisibleToRole";
import moment from 'moment';
import Pagination from "../commoncomponents/Pagination";
import { paginate } from "../../helpers/paginate";

export default function Notification() {

    interface User {
        id: string;
        name: string;
        surname: string;
        email: string;
        approved_by_admin: string;
    }

    interface CurrentUserData {
        id: string;
        name: string;
        email: string;
        pic: string | null;
        surname: string;
        role: string;
        approved_by_admin: string

    }

    const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
        id: '',
        name: '',
        email: '',
        pic: null,
        surname: '',
        role: '',
        approved_by_admin: ''
    })


    const [totalNotify, setTotalNotify] = useState([]);
    const [userData, setUserData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const pageSize = 10;

    useEffect(() => {
        getAllNotify();
    }, []);

    const getAllNotify = async () => {
        const data = isPageVisibleToRole('notification');
        if (data == 2) {
            window.location.href = '/';
        }
        if (data == 0) {
            window.location.href = '/404';
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
            getNotification(userData.id);
            notificationStaus(userData.id);
        }
    }

    const onPageChange = (page: any) => {
        setCurrentPage(page);
        notificationForUserAdmin(currentUserData.id)
            .then(res => {
                if (res.status == true) {
                    setTotalNotify(res.data);
                    const paginatedPosts = paginate(res.data, page, pageSize);
                    setUserData(paginatedPosts);

                } else {
                    setErrorMessage(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };


    const getNotification = async (id: any) => {
        notificationForUserAdmin(id)
            .then(res => {
                if (res.status == true) {
                    setTotalNotify(res.data);
                    const paginatedPosts = paginate(res.data, currentPage, pageSize);
                    setUserData(paginatedPosts);
                    console.log(paginatedPosts);

                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const notificationStaus = async (id: any) => {
        notificationStatus(id)
            .then(res => {
                if (res.status == true) {
                    console.log(res.data);
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <>
            <div className="table-part">
                <div className='row'>
                    <div className='col-md-7'>
                        <h2>Notification</h2>
                    </div>
                    {/* <div className='col-md-5'>
                        <select aria-label="Default select example" name="approved_by_admin"
                        >
                            <option value='yes' >Approved</option>
                            <option value='no' >Unapproved</option>
                        </select>
                    </div> */}
                </div>
                <div className="notification-box">
                    {Array.isArray(userData) && userData.length > 0 ? (
                        userData.map((notification, index) => (
                            <div key={index} className="notification-hover">
                                <div className="d-md-flex">
                                    <div className="circle1 d-none d-lg-block">
                                        {notification.pic ? (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + notification.pic} alt="user-menu" />
                                        ) : (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="user-menu" />
                                        )}

                                    </div>
                                    <div className="text-noti mt-2">
                                        <p className='notify' style={{ fontWeight: "500" }}> {notification.type === 'register' ? (
                                            <>
                                                {notification.description.split('.')[0]}.

                                                {notification.description.split('.')[2] == 'user' ?
                                                    <a target={"_blank"} href={process.env.NEXT_PUBLIC_BASE_URL + 'admin/users/' + notification.description.split('.')[1]}><small>View Profile</small></a>
                                                    :
                                                    <>
                                                        {currentUserData.role === 'admin' ? (
                                                            <a target="_blank" href={process.env.NEXT_PUBLIC_BASE_URL + 'admin/chefs/' + notification.description.split('.')[1]}>
                                                                <small>View Profile</small>
                                                            </a>
                                                        ) : (
                                                            <p></p>
                                                        )}</>

                                                }

                                            </>
                                        ) : (

                                            notification.type === 'booking' ? (
                                                // JSX for your additional condition
                                                <>
                                                    {notification.description ? (
                                                        <>
                                                            {notification.description}
                                                            <a
                                                                className=''
                                                                target={"_blank"}
                                                                href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/bookings?booking_id=${notification.description.split('#')[1]}`}
                                                            >
                                                                <small>View Booking</small>
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <p></p>
                                                    )}

                                                </>
                                            ) : (
                                                // Default condition
                                                notification.description
                                            )
                                        )} </p>
                                        <p className='notify' style={{ fontStyle: "italic", fontSize: "12px" }}>{moment(notification.created_at).format('hh:mm a')}</p>
                                    </div>

                                    <div className="text-noti mt-2 text-md-right text-right">
                                        {/* <p>{moment(notification.created_at).format('MMMM Do YYYY, h:mm')}</p> */}
                                        <p>{moment(notification.created_at).format('MMMM Do YYYY')}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="notification-hover">
                            <p>No Notifications</p>
                        </div>
                    )}
                </div>
                <Pagination
                    items={totalNotify.length}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    )
}