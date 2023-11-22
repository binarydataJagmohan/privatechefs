import React, { useState, useEffect } from 'react';
import { removeToken,removeStorageData,getCurrentUserData } from '../../../lib/session';
import { getNotificationConcierge } from '../../../lib/notificationapi';
import Link from 'next/link'

export default function Header(): JSX.Element {

    const [currentUserData, setCurrentUserData]: any = useState({});
    const [countdata, setCountData] = useState("");

    useEffect(() => {
        getAllNotify();
    }, []);

    useEffect(() => {
        const userData:any = getCurrentUserData();
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
        getNotificationConcierge(id)
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


    return (
        <>
            <div className="right-header mt-4 text-right">
                <div className="row">
                    <div className="col-lg-7 col-md-4 col-2">
                        <a href="#" className="bars-icon"><i className="fa-solid fa-bars"></i></a>
                     <div className='d-none d-lg-block'>   {currentUserData.approved_by_admin === 'no' && (
                            <p className="alert alert-danger text-center">
                                Your account approval pending at administrative end.
                            </p>
                        )}</div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        {/* <form className="form-Search">
                            <input type="text" placeholder="Search" />
                        </form> */}     
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell"><a href="/concierge/chats"><i className="fa-solid fa-comments"></i></a></p>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell">
                        <Link href={`/concierge/notification/notification?id=${currentUserData.id}`}><i className="fa-solid fa-bell"></i></Link>
                            {countdata ? (
                                <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: 'red', marginLeft: '5px' }}>{countdata}</span>
                            ) : null}
                        </p>
                    </div>
                </div>
                <div className='d-block d-lg-none'>
                     {currentUserData.approved_by_admin === 'no' && (
                            <p className="alert alert-danger text-center">
                                Your account approval pending at administrative end.
                            </p>
                        )}
            </div>
            </div>
        </>
    )
}
