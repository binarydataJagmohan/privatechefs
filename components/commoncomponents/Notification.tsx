import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../lib/session'
import { notificationForUserAdmin, notificationStatus } from '../../lib/notificationapi';
import { isPageVisibleToRole } from "../../helpers/isPageVisibleToRole";
import moment from 'moment';


export default function Notification() {

    const [currentUserData, setCurrentUserData] = useState({});
    const [userData, setUserData] = useState({});

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
            const userData = getCurrentUserData();
            setCurrentUserData(userData);
            getNotification(userData.id);
            notificationStaus(userData.id);
        }
    }

    const getNotification = async (id) => {
        notificationForUserAdmin(id)
            .then(res => {
                if (res.status == true) {
                    setUserData(res.data);
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const notificationStaus = async (id) => {
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
                <h2>Notification</h2>
                <div className="notification-box">
                    {Array.isArray(userData) && userData.length > 0 ? (
                        userData.map((notification) => (
                            <div className="notification-hover">
                                <div className="d-flex">
                                    <div className="circle1">
                                        {notification.pic ? (
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}images/chef/users/${notification.pic}`} alt="user-menu" />
                                        ) : (
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/users.jpg`} alt="user-menu" />
                                        )}
                                    </div>
                                    <div className="text-noti mt-2">
                                        <p className='notify'>{notification.description}</p>
                                    </div>

                                    <div className="text-noti mt-2 text-right">
                                    <p>{moment(notification.created_at).fromNow()}</p>
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
            </div>
        </>
    )
}