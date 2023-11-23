import React, { useState, useEffect } from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { getSetting, getSingleSetting, UpdatePageInfo } from '../../../lib/adminapi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";


export default function Pages() {

    interface Setting {
        id: number;
        name: string;
        meta_tag: string;
        meta_desc: string;
    }
    const [setting, setSetting] = useState([]);
    const [SingleSetting, setSingleSetting] = useState<Setting>({
        id: 0,
        name: "",
        meta_tag: "",
        meta_desc: ""
    });
    const [metatag, setMetaTag] = useState('');
    const [metadesc, setMetaDesc] = useState('');
    const [modalConfirm, setModalConfirm] = useState(false);


    const modalConfirmOpen = () => {
        setModalConfirm(true);
    }
    const modalConfirmClose = () => {
        setModalConfirm(false);
    };

    useEffect(() => {

        const data = isPageVisibleToRole('admin-pages');
        if (data == 2) {
            window.location.href = '/login';
        }
        if (data == 0) {
            window.location.href = '/404';
        }
        if (data == 1) {
            getSettingData();
        }
    }, []);

    const getSettingData = () => {
        getSetting()
            .then((res) => {
                if (res.status) {
                    console.log(res);
                    setSetting(res.data);
                } else {
                    console.log(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getSingleSettingData = async (id: any) => {
        getSingleSetting(id)
            .then(res => {
                if (res.status == true) {
                    modalConfirmOpen();
                    setSingleSetting(res.data);
                    setMetaTag(res.data.meta_tag);
                    console.log(res.data.meta_tag);
                    setMetaDesc(res.data.meta_desc);
                } else {
                    console.log("error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleSettingUpdate = (e: any) => {
        e.preventDefault();
        const id = SingleSetting.id;
        const data = {
            meta_tag: metatag,
            meta_desc: metadesc,
        };

        UpdatePageInfo(id, data)
            .then(res => {
                if (res.status == true) {
                    console.log(res.status);
                    getSettingData();
                    modalConfirmClose();
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
                <h2>Pages</h2>
                <div className="table-box" id="villa_table">
                    <table className="table table-borderless common_booking">
                        <thead>
                            <tr>
                                <th scope="col">Page Name</th>
                                <th scope="col">Meta Tag</th>
                                <th scope="col">Meta Desc</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {setting.map((data: any, index) => (
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.meta_tag}</td>
                                    <td>{data.meta_desc ? data.meta_desc.substring(0, 100) : ''}</td>
                                    <td style={{ paddingLeft: "25px" }}>
                                        <a href="#" onClick={() => { getSingleSettingData(data.id); }}>
                                            <i className="fas fa-edit"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PopupModal
                show={modalConfirm}
                handleClose={modalConfirmClose}
                staticClass="var-login"
            >
                <div className="all-form">
                    <form
                        onSubmit={handleSettingUpdate}
                        className="common_form_error"
                        id="menu_form"
                    >
                        <div className="login_div">
                            <label htmlFor="name">Page Name:</label>
                            <input
                                name="name"
                                disabled
                                value={SingleSetting.name}
                            />
                        </div>
                        <div className="login_div">
                            <label htmlFor="meta_tag">Meta Tag:</label>
                            <textarea
                                name="meta_tag"
                                value={metatag}
                                onChange={(e) => setMetaTag(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="login_div">
                            <label htmlFor="meta_desc">Meta Desc:</label>
                            <textarea
                                name="meta_desc"
                                value={metadesc}
                                onChange={(e) => setMetaDesc(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            className="btn-send w-100"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </PopupModal>

            <ToastContainer />
        </>
    );
}