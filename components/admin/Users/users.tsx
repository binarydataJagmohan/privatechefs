import React, { useState, useEffect } from 'react'
import { getAllUsers, getUserLocationByFilter, getUserAllLocation } from '../../../lib/adminapi'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import PopupModal from '../../../components/commoncomponents/PopupModal';

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
    const [modalConfirm, setModalConfirm] = useState(false);
    const [getlocation, setGetLocation] = useState<Location[]>([]);
    const [filterLocation, setFilterLocation] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location[]>([]);
    const [getallusers, setAllUsers] = useState<User[]>([]);
    const [totalMenu, setTotalMenu]: any = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        getUserData();
        getAllUserLocation();
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

    useEffect(() => {
        const locationsArray = Array.isArray(selectedLocation) ? selectedLocation : [selectedLocation];
        //console.log(locationsArray);
        getUserLocationByFilter({ locations: locationsArray.join(',') })
            .then((res) => {
                if (res.status) {
                    setFilterLocation(res.data);
                } else {
                    console.log(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedLocation]);
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

    const handleCheckboxLocationChange = (e: any) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelectedLocation((prevLocations) => [...prevLocations, value]);
        } else {
            setSelectedLocation((prevLocations) =>
                prevLocations.filter((c) => c !== value)
            );
        }
    };

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

    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

    const getAllUserLocation = () => {
        getUserAllLocation()
            .then((res) => {
                if (res.status) {
                    setGetLocation(res.data);
                } else {
                    console.log(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="table-part">
                <h2>Users</h2>
                <button className="table-btn">Total</button>{" "}
                <button className="table-btn" onClick={() => setModalConfirm(true)}>
                    Filter{" "}
                </button>
                <div className="table-box">
                    {getallusers.length > 0 ?
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Name/Surname</th>
                                    <th scope="col">Current Location</th>
                                    <th scope="col">Phone no.</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterLocation.length > 0 ? (
                                    filterLocation.map((user, index) => (
                                        <tr key={index}>
                                            <td className="chefs_pic">
                                                {user.pic ? (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + user.pic} alt="" />
                                                ) : (
                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="" />
                                                )}
                                            </td>
                                            <td>{user.name || ''} {user.surname || ''}</td>
                                            <td>{user.address || ''}</td>
                                            <td>{user.phone || ''}</td>
                                            <td style={{ paddingLeft: "25px" }}>
                                                <a href={process.env.NEXT_PUBLIC_BASE_URL + 'admin/users/' + user.id}>
                                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
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
                                            <td>{user.address || ''}</td>
                                            <td>{user.phone || ''}</td>
                                            <td style={{ paddingLeft: "25px" }}>
                                                <a href={process.env.NEXT_PUBLIC_BASE_URL + 'admin/users/' + user.id}>
                                                    <i className="fa fa-eye" aria-hidden="true"></i>
                                                </a>
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
            <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
                <div className="accordion" id="accordionExample">

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                Locations
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body" id="location-filter">
                                {getlocation.map((location, index) => (
                                    <div className="col-sm-12" key={index}>
                                        <input
                                            type="checkbox"
                                            value={location.address}
                                            onChange={handleCheckboxLocationChange}
                                            style={{ marginRight: "5px" }}
                                        />
                                        <label style={{ marginLeft: "5px" }}>
                                            {location.address}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </PopupModal>
            <Pagination
                items={totalMenu.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
            />
        </>
    )
}