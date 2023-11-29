import React, { useState, useEffect } from 'react'
import { getAllConcierge,approveConciergeProfile } from '../../../lib/adminapi'
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
        email:string,
        approved_by_admin:string
    }
    
    const [getallusers, setAllUsers] = useState<User[]>([]);
    const [totalMenu, setTotalMenu]: any = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setChefName] = useState('');

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
        getAllConcierge()
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

    const ApproveChefProfile = (e:any,id: any) => {

        const selectedValue = e.target.value;
        const data = {
            approved_by_admin: selectedValue,
          id : id
        }

        approveConciergeProfile(data)
        .then(res => {
          if (res.status == true) {
            
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: '#ffff',
                  borderLeft: '4px solid #ff4e00d1',
                  color: '#454545',
                  "--toastify-icon-color-success": "#ff4e00d1",
                },
                progressStyle: {
                  background: '#ffff',
                },
              });
          } else {

            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                closeButton: true,
                hideProgressBar: false,
                style: {
                  background: '#ffff',
                  borderLeft: '4px solid #e74c3c',
                  color: '#454545',
                },
                progressStyle: {
                  background: '#ffff',
                },
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }


    const handleChef = (e: any) => {
        const searchTerm = e.target.value;

        if(!searchTerm){
          
            getAllUsersData();
            setChefName(searchTerm)
        }else {
            setChefName(searchTerm);
    
        const filteredUsers = totalMenu.filter((user:any) => {
            const fullName = `${user.name} ${user.surname}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        });
        setAllUsers(filteredUsers);
        }

        
    };
    

    return (
        <>
            <div className="table-part">
               
                <ul className="table_header_button_section p-r mt-4">
                <li className='float-end mt-0'>
                   
                     <input type="text"  className="form-control" placeholder='Search concierge here..' onChange={handleChef} />
                </li>
                
                
                <li className="text-right">
                    <h2>Concierge</h2>
                </li>
                </ul>
               
                <div className="table-box">
                    {getallusers.length > 0 ?
                        <table className="table table-borderless common_booking">
                            <thead>
                                <tr>
                                    <th scope="col">Sr no</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Name/Surname</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {(
                                    getallusers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td className="chefs_pic">
                                                {user.pic ? (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + user.pic} alt="" />
                                                ) : (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="" />
                                                )}
                                            </td>
                                            <td>{user.name || ''} {user.surname || ''}</td>
                                            <td>{user.email || ''}</td>
                                                    
                                            <td>
                                            <select aria-label="Default select example" name="approved_by_admin"
                                                onChange={(e) => ApproveChefProfile(e, user.id)}
                                            >
                                                <option value='yes' selected={user.approved_by_admin === 'yes'}>Approved</option>
                                                <option value='no' selected={user.approved_by_admin === 'no'}>Unapproved</option>
                                            </select>
                                            </td>
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
