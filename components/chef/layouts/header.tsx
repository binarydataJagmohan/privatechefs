import React, { useState, useEffect } from 'react';
import { removeToken, removeStorageData, getCurrentUserData } from '../../../lib/session'
import { notificationForUserAdmin } from '../../../lib/notificationapi';
import Link from 'next/link'
import { getSingleUserProfile } from "../../../lib/userapi"
import { approvalMsg } from "../../../lib/chefapi"


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

    return (
        <>
            <div className="right-header mt-4 text-right">
                <div className="row">
                    <div className="col-lg-7 col-md-4 col-2">
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
                    <div className="col-lg-3 col-md-6 col-6">
                        {/* <form className="form-Search">
                            <input type="text" placeholder="Search" />
                        </form>  */}
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell"><a href="/chef/chats"><i className="fa-solid fa-comments"></i></a></p>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell set-bell">
                            <Link href={`/chef/notification/notification?id=${userData}`}><i className="fa-solid fa-bell"></i></Link>
                            {countdata ? (
                                <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: 'red', marginLeft: '5px' }}>{countdata}</span>
                            ) : null}
                        </p>
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
        </>
    )
}
