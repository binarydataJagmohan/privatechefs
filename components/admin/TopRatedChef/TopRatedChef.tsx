import React, { useState, useEffect } from 'react';
import { getAllChefDetails, updateTopratedChef,getTopRatedChef} from '../../../lib/adminapi';
import { getCurrentUserData } from '../../../lib/session'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";

export default function TopRatedChef() {


    const [chefdata, setChefData] = useState([]);
    const [currentdata, setCurrentData] = useState({
        id: 0,
    });
    const [topratedchef, setTopRatedChef] = useState<number[]>([]);
    const [topchef, setTopchef] = useState({});

    useEffect(() => {
        const data = isPageVisibleToRole('admin-top-rated-chef');
        if (data === 2) {
            window.location.href = '/login';
        }
        if (data === 0) {
            window.location.href = '/404';
        }
        if (data === 1) {
            const userData: any = getCurrentUserData();
            getTopRatedChefData(userData.id);
            setCurrentData(userData);
            getAllChefData();
        }
    }, []);

    const getAllChefData = () => {
        getAllChefDetails()
            .then((res) => {
                if (res.status) {
                    setChefData(res.data);
                } else {
                    console.log(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getTopRatedChefData = (id:any) => {
        getTopRatedChef(id)
            .then((res) => {
                if (res.status) {
                    if (res.data.top_rated) {
                        const topRatedChefIds = res.data.top_rated.split(',').map(Number);
                        setTopRatedChef(topRatedChefIds);
                      }
                } else {
                    console.log(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleCheckboxChange = (e: any, chefId: number) => {
        if (e.target.checked) {
            setTopRatedChef((prevTopRatedChefs) => [...prevTopRatedChefs, chefId]);
        } else {
            setTopRatedChef((prevTopRatedChefs) =>
                prevTopRatedChefs.filter((id) => id !== chefId)
            );
        }
    };

      
    const handleTopRatedChef = (e: any) => {
        e.preventDefault();
        const id = currentdata.id;
        const data = {
            top_rated: topratedchef,
        };
        console.log(data);
        updateTopratedChef(id, data)
            .then(res => {
                if (res.status == true) {
                    console.log(res.status);
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
    };

    return (
        <>
            <div className="table-part">
                <h2>Top Rated Chef</h2>
                <div className="table-box" id="villa_table">
                    <form onSubmit={handleTopRatedChef}>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Top Rated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chefdata.map((data: any, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td >
                                            <input
                                                type="checkbox"
                                                name="top_rated"
                                                 id="top-rated"
                                                onChange={(e) => handleCheckboxChange(e, data.id)}
                                                checked={topratedchef.includes(data.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                         <div className="top-class-btn"><button className="table-btn">Update</button></div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
