import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../../../lib/adminapi'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";

export default function Users() {

    interface User {
        id:number,
        name: string,
        surname: string,
        address: string,
        phone: number,
        pic: string,
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
        getAllUsers()
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

    const onPageChange = (page:any) => {
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
                <h2>Users</h2>
                <button className="table-btn">Total</button>
                <div className="table-box">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Photo</th>
                                <th scope="col">Name/Surname</th>
                                <th scope="col">Current Location</th>
                                <th scope="col">Phone no.</th>
                                {/* <th scope="col">Column</th>
								<th scope="col">Column</th>
								<th scope="col">Column</th> */}
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getallusers.map((user, index) => (
                                <tr key={index}>
                                    <td className='chefs_pic'>
                                        {user.pic ? (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + user.pic} alt="" />
                                        ) : (
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="" />
                                        )}
                                    </td>
                                    <td>{user.name || ''} {user.surname || ''}</td>
                                    <td>{user.address || ''}</td>
                                    <td>{user.phone || ''}</td>
                                    <td style={{paddingLeft : "25px"}}>
                                    <a href={process.env.NEXT_PUBLIC_BASE_URL + 'admin/users/' + user.id}>
                                        <i className="fa fa-eye" aria-hidden="true"></i></a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination
				items={totalMenu.length}
				currentPage={currentPage}
				pageSize={pageSize}
				onPageChange={onPageChange}
			/>
        </>
    )
}