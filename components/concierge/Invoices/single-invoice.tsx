import React, { useState, useEffect } from 'react'
import { getSingleInvoice } from "../../../lib/adminapi"
import moment from 'moment';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";

export default function SingleInvoice(props: any) {

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
        phone: number,
        amount: number,
        menu_name: string,
        dish_names: string
    }

    interface MenuData {
        id: number;
        name?: string;
        menu_name?: string;
        image?: string;
        item_name?: string;
        type?: string;
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
        phone: 0,
        amount: 0,
        menu_name: "",
        dish_names: ""

    });

    const [menu, setMenu] = useState<MenuData[]>([]);


    let id = props.userId;

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const data = isPageVisibleToRole('concierge-single-invoice');
        if (data == 2) {
            window.location.href = '/';
        }
        if (data == 0) {
            window.location.href = '/404';
        }
        if (data == 1) {
            getReceiptData();
        }
    }

    const getReceiptData = async () => {
        getSingleInvoice(id)
            .then(res => {
                if (res.status == true) {
                    setUsers(res.data);
                    setMenu(res.dishNames);
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
            <div className="invoice mt-5">
                <div className="invoice-header">
                    <div className="company-info">
                        <img
                            src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo.png"}
                            alt="food"
                            width={160}
                        />
                    </div>
                    <div className="company-info">
                        <h2>Invoice</h2>
                        <p>{getUsers.chefname}{getUsers.chefsurname}</p>
                        <p>{getUsers.chefemail}</p>
                        <p>{getUsers.chefaddress}</p>
                        <p>Phone: {getUsers.chefphone}</p>
                    </div>
                </div>
                <div className="invoice-body">
                    <h2 style={{ color: "#fd5100", fontSize: "17px" }}>Menu name:{getUsers.menu_name
                    }</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Starter</th>
                                <th>First Course</th>
                                <th>Main Course</th>
                                <th>Desert</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.length > 0 ? (
                                <tr>
                                    <td>{menu.find(item => item.type === 'firstcourse')?.item_name || ''}</td>
                                    <td>{menu.find(item => item.type === 'desert')?.item_name || ''}</td>
                                    <td>{menu.find(item => item.type === 'maincourse')?.item_name || ''}</td>
                                    <td>{menu.find(item => item.type === 'starter')?.item_name || ''}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td className="">No menu items available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="invoice-footer">
                    <p className="total">Total: €{getUsers.amount}</p>
                </div>
            </div>
        </>
    )
}

