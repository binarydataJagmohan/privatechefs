import React, { useState, useEffect } from 'react'
import { getSingleReceiptAdmin } from "../../../lib/adminapi"
import moment from 'moment';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";


export default function MyProfile(props: any) {

    interface User {
        id: number,
        chefname: string,
        chefsurname: string,
        chefphone: string,
        chefaddress: string,
        useraddress: string,
        username: string,
        usersurname: string,
        orderdate: string,
        chefpic: string,
        chefemail: string,
        useremail: string,
    }

    const [getUsers, setUsers] = useState<User>({
        id: 0,
        chefname: "",
        chefsurname: "",
        chefphone: "",
        chefaddress: "",
        useraddress: "",
        username: "",
        usersurname: "",
        orderdate: "",
        chefpic: "",
        chefemail: "",
        useremail: "",

    });


    let id = props.userId;

    useEffect(() => {
        const data = isPageVisibleToRole('concierge-single-receipt');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			GetSingleReceiptAdmin(id);
		}
    }, []);

    const GetSingleReceiptAdmin = async (id: any) => {
        getSingleReceiptAdmin(id)
            .then(res => {
                if (res.status == true) {
                    setUsers(res.data);

                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const formatDate = (value: any) => {
        return moment(value).format('D/M/YY');
    }


    return (
        <>
            <h5 style={{ color: "#ff4e00" }}>Chefs Detail</h5>
            <div className="user-class pt-5">
                <div className="userImg" style={{ flex: "1" }}>
                    {getUsers.chefpic ? (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + getUsers.chefpic} alt="" width={100} height={100} />
                    ) : (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="" width={100} height={100} />
                    )}
                </div>
                <div style={{ flex: "2" }}>
                    <p><span id="book-user">Chef Name  </span> : {getUsers.chefname}</p>
                    {getUsers.chefsurname ? (
                        <p><span id="book-user">Chef Surname</span> : {getUsers.chefsurname}</p>
                    ) : (
                        null
                    )}
                    {getUsers.chefemail ? (
                        <p><span id="book-user">Chef Email</span> : {getUsers.chefemail}</p>
                    ) : (
                        null
                    )}
                    {getUsers.chefphone ? (
                        <p><span id="book-user">Chef phone no.</span> : {getUsers.chefphone}</p>
                    ) : (
                        null
                    )}
                    {getUsers.chefaddress ? (
                        <p><span id="book-user">Chef Address</span> : {getUsers.chefaddress}</p>
                    ) : (
                        null
                    )}
                    {getUsers.orderdate ? (
                        <p><span id="book-user">Oder Date</span> : {getUsers.orderdate}</p>
                    ) : (
                        null
                    )}
                </div>
                <div style={{ flex: "2" }}>
                    {getUsers.username ? (
                        <p><span id="book-user">Recipient Name </span> : {getUsers.username} </p>
                    ) : (
                        null
                    )}
                    {getUsers.usersurname ? (
                        <p><span id="book-user">Recipient Surname </span> : {getUsers.usersurname} </p>
                    ) : (
                        null
                    )}
                    {getUsers.useremail ? (
                        <p><span id="book-user">Recipient Email</span> : {getUsers.useremail}</p>
                    ) : (
                        null
                    )}
                    {getUsers.useraddress ? (
                        <p><span id="book-user">Recipient Address </span>: {getUsers.useraddress}</p>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </>
    )
}