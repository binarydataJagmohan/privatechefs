import React, {useState, useEffect} from 'react';
import { getCurrentUserData } from '../../../lib/session'
import {notificationForUserAdmin} from '../../../lib/notificationapi';
import Link from 'next/link'

export default function Header(): JSX.Element {

    interface User {
        id: string;
        name: string;
        surname: string;
        email: string;
        approved_by_admin: string;
      }

    const [userData, setUserData] = useState('');
    const [countdata, setCountData] = useState("");

    useEffect(() => {
		getAllNotify();
	}, []);

    const getAllNotify = async () => {
            const userData: User = getCurrentUserData() as User;
			setUserData(userData.id);
			getNotification(userData.id);
	}

    const getNotification = async (id:any) => {
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
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <form className="form-Search">
                            <input type="text" placeholder="Search" />
                        </form>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell"><a href="/chef/chats"><i className="fa-solid fa-comments"></i></a></p>
                    </div>
                    <div className="col-lg-1 col-md-1 col-2">
                        <p className="mb-0 comments-bell">
                        <Link href={`/chef/notification/notification?id=${userData}`}><i className="fa-solid fa-bell"></i></Link>
                        {countdata ? (
                                <span className="badge badge-danger rounded-circle noti-icon-badge" style={{ backgroundColor: 'red', marginLeft: '5px' }}>{countdata}</span>
                            ) : null}
                        </p>
                    </div>
                </div>
            </div>             
        </>
    )
}