import React, { useState, useEffect } from 'react'
import { getAllConcierge } from '../../../lib/adminapi'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import { ToastContainer, toast } from 'react-toastify';

export default function Users() {

    interface User {
        id: number,
        name: string,
        surname: string,
        address: string,
        phone: number,
        pic: string,
    }
    interface Location {
        lat: number,
        name: string;
        surname: string;
        address: string;
        pic: string;
        approved_by_admin: string;
        profile_status: string;
        cuisine_name: string;
        amount: string;
        id: number,
        phone: number,
    }
    
    const [getallusers, setAllUsers] = useState<User[]>([]);
    const [totalMenu, setTotalMenu]: any = useState({});
    const [currentPage, setCurrentPage] = useState(1);
   

    const pageSize = 10;

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        const data = isPageVisibleToRole('admin-users');
        if (data == 2) {
            window.location.href = '/';
        }
        if (data == 0) {
            window.location.href = '/404';
        }
        if (data == 1) {
            getAllUsersData();
        }
    }

   
    const getAllUsersData = async () => {
        getAllConcierge()
            .then(res => {
                if (res.status == true) {
                    setTotalMenu(res.data);
                    const paginatedPosts = paginate(res.data, currentPage, pageSize);
                    setAllUsers(paginatedPosts);

                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

   
    const onPageChange = (page: any) => {
        setCurrentPage(page);
        getAllUsers()
            .then(res => {
                if (res.status == true) {
                    setTotalMenu(res.data);
                    const paginatedPosts = paginate(res.data, page, pageSize);
                    setAllUsers(paginatedPosts);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <>
            <div className="table-part">
                <h2>Concierge</h2>
               
               
                <div className="table-box">
                    {getallusers.length > 0 ?
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                   
                                    <th scope="col">Photo</th>
                                    <th scope="col">Name/Surname</th>
                                    <th scope="col">Email</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {(
                                    getallusers.map((user, index) => (
                                        <tr key={index}>
                                            <td className="chefs_pic">
                                                {user.pic ? (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + user.pic} alt="" />
                                                ) : (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="" />
                                                )}
                                            </td>
                                            <td>{user.name || ''} {user.surname || ''}</td>
                                            <td>{user.email || ''}</td>
                                           
                                           
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        :
                        <p className='book1 text-center'>No Records Found</p>
                    }
                </div>
            </div>

            
            <Pagination
                items={totalMenu.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
            <ToastContainer/>
        </>
    )
}
