import React, { useState, useEffect } from 'react'
import { getSingleUserProfile, updateUsersImage } from "../../../lib/userapi"
import { getUserBookingById ,getAllergyDetails,getAllCuisine, UpdateSetting} from "../../../lib/adminapi";
import {notificationForUserAdmin} from "../../../lib/notificationapi";
import moment from 'moment';
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import Link from 'next/link';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from '../../commoncomponents/toastUtils';

export default function MyProfile(props: any) {

    interface User {
        id: number,
        name: string,
        surname: string,
        phone: string,
        email: string,
        timezone: string,
        currency: string,
        birthday: string,
        pic: string,
        city: string,
        country: string,
        post_code: string,
        business_email: string,
        business_phoneno: number,
        company_name: string,
        vat_no: string,
        tax_id: string,
        address: string,
        user_address: string,
        user_city: string,
        user_country: string,
        user_post_code: string,
        allergy_id:string,
        additional_notes:string,
        cuisine_id:string
        role: string;
    }

    const [getUsers, setUsers] = useState<User>({
        id: 0,
        name: "",
        surname: "",
        phone: "",
        email: "",
        address: "",
        timezone: "",
        currency: "",
        birthday: "",
        pic: "",
        city: "",
        country: "",
        post_code: "",
        business_email: "",
        business_phoneno: 0,
        company_name: "",
        vat_no: "",
        tax_id: "",
        user_address: "",
        user_city: "",
        user_country: "",
        user_post_code: "",
        allergy_id: "",
        additional_notes: "",
        cuisine_id: "",
        role: ""
    });

    interface Allergies {
        id: string;
        allergy_name: string;
        image: string | null;
      }

    
    type Cuisine = {
        id: number;
        name: string;
        image: string;
    };

    

    const [bookingUsers, setBookingUser] = useState([]);
    const [totalMenu, setTotalMenu]: any = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const [allergiesdata, setAllergies] = useState<Allergies[]>([]);
    const [cuisinedata, setCuisine] = useState<Cuisine[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [image, setImage] = useState("");

    const [userNotifications, setUserNotifications] = useState([]);

    const pageSize = 10;

    let id = props.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getSingleUserProfile(id);
                setUsers(userData.data);
    
                // Move the getAllergyDetailsData call here
                await getAllergyDetailsData();
    
                // Continue with other operations after both data sets are fetched
                await getAllCuisineData();
                getSingleBookingUser(id);
                getSingleUserNotifications(id);
            } catch (err) {
                // Handle errors here
                toast.error((err as Error).message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        };
    
        fetchData();
        initializeTabs();
    }, [id]);

    const getAllergyDetailsData = async () => {
        try {
          const res = await getAllergyDetails();
          if (res.status) {
            setAllergies(res.data);
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (err) {
          toast.error((err as Error).message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      };
    
      const getAllCuisineData = async () => {
        try {
          const res = await getAllCuisine();
          if (res.status) {
            setCuisine(res.data);
    
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
        } catch (err) {
          toast.error((err as Error).message, {
            position: toast.POSITION.BOTTOM_RIGHT,
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
      };
    
    

    const getSingleBookingUser = async (id: any) => {
        const res = await getUserBookingById(id);
        if (res.status) {
            setBookingUser(res.data);
            setLoading(false);
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
            setLoading(true);
        }
    };

    const getSingleUserNotifications = async (id: any) => {
        const res = await notificationForUserAdmin(id);
        if (res.status) {
            setUserNotifications(res.data);
            setLoading(false);
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
            setLoading(true);
        }
    };

    const onPageChange = (page: any) => {
        setCurrentPage(page);
        getUserBookingById(id)
            .then(res => {
                if (res.status == true) {
                    setTotalMenu(res.data);
                    const paginatedPosts = paginate(res.data, page, pageSize);
                    setBookingUser(paginatedPosts);
                } else {
                    console.log(res.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const formatDate = (value: any) => {
        return moment(value).format('D/M/YY');
    }

    const openCity = (evt: any, cityName: string) => {
        var i: number, tabcontent: HTMLCollectionOf<Element>, tablinks: HTMLCollectionOf<Element>;
    
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            (tabcontent[i] as HTMLElement).style.display = "none";
        }
    
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    
        const cityElement = document.getElementById(cityName);
        if (cityElement) {
            (cityElement as HTMLElement).style.display = "block";
        }
    
        if (evt.currentTarget instanceof HTMLElement) {
            evt.currentTarget.className += " active";
        }
    }
    
    const initializeTabs = () => {
        const tablinks = document.getElementsByClassName("tablinks");
        if (tablinks.length > 0) {
            const firstTab = tablinks[0];
            if (firstTab instanceof HTMLElement) {
                firstTab.click();
            }
        }
    }
    const handleUpdateProfile = async (e: any) => {
		e.preventDefault();
		const userid = getUsers.id;

		const data = {
			name: name || '',
			email: email,
			phone: phone || '',
			password: password,
		};

        console.log(data);

		// UpdateSetting(userid,data)
		// 	.then((res:any) => {
		// 		// window.localStorage.setItem("name", res.data.name);
		// 		// window.localStorage.setItem("email", res.data.email);
		// 		// window.localStorage.setItem("phone", res.data.phone);
		// 		showToast('success', res.message);
		// 	})
		// 	.catch((err:any) => {
		// 		toast.error("Error occurred", {
		// 			position: toast.POSITION.BOTTOM_RIGHT,
		// 			closeButton: true,
		// 			hideProgressBar: false,
		// 			style: {
		// 				background: '#ffff',
		// 				borderLeft: '4px solid #e74c3c',
		// 				color: '#454545',
		// 			},
		// 			progressStyle: {
		// 				background: '#ffff',
		// 			},
		// 		});
		// 	});
	};

	const imageChange = async (e: any) => {
		const file = e.target.files[0];
		setImage(file);

		updateUsersImage(getUsers.id, file)
			.then((res:any) => {
				//window.localStorage.setItem("pic", res.data.pic);
				showToast('success', res.message);
				// window.location.reload();
			})
			.catch((error:any) => {
				console.error(error);
				toast.error('Invalid file format', {
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
			});
	};
    return (
        <>
            <Link href="/admin/users">
                <button
                    className="table-btn mb-4"
                >
                    Back
                </button>
            </Link>
            <h5 style={{color:"#ff4e00d1"}}>User Detail</h5>
            <div className="row user-class pt-5">
                <div className="col-sm-2 chef-img-set">
                    {getUsers.pic ? (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + getUsers.pic} alt="" width={300} height={180} style={{borderRadius:"10px"}}/>
                    ) : (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="" width={300} height={180} style={{borderRadius:"10px"}}/>
                    )}
                </div>
                <div className='col-sm-10'>
                    <h2 style={{fontSize:"22px", fontWeight: 600}}>{getUsers.name} {getUsers.surname}</h2>
                    <ul style={{listStyle: "none", paddingBottom: "20px", display: "inline-flex"}}>
                    {getUsers.role ? <li style={{paddingRight:"10px", textTransform:"capitalize"}}><i className='fa fa-address-card' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i>{getUsers.role}</li> : '' }
                    {getUsers.currency ? <li style={{paddingRight:"10px"}}><i className='fa fa-sack-dollar' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i>{getUsers.currency}</li> : '' }
                    {getUsers.address ? <li style={{paddingRight:"10px"}}><i className='fa fa-location-dot' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i>{getUsers.address}</li> : '' }
                    {getUsers.city ? <li style={{paddingRight:"10px"}}><i className='fa fa-city' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i>{getUsers.city}</li> : '' }
                    {getUsers.country ? <li style={{paddingRight:"10px"}}><i className='fa fa-flag' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i>{getUsers.country}</li> : '' }
                    {getUsers.post_code ? <li style={{paddingRight:"10px"}}><i className='fa fa-map-pin' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i>{getUsers.post_code}</li> : '' }
                    </ul>
                    {getUsers.phone ? (
                        <p style={{paddingBottom:"10px"}}><i className='fa fa-phone' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i><span id="book-user">Phone</span> : {getUsers.phone}</p>
                    ) : (
                        null
                    )}
                    {getUsers.email ? (
                        <p style={{paddingBottom:"10px"}}><i className='fa fa-envelope' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i><span id="book-user">Email</span> : {getUsers.email}</p>
                    ) : (
                        null
                    )}
                    {getUsers.birthday ? (
                        <p style={{paddingBottom:"10px"}}><i className='fa fa-birthday-cake' style={{paddingRight:"10px", fontSize:"14px", color:"#ff4e00d1"}}></i><span id="book-user">Birthday</span> : {getUsers.birthday}</p>
                    ) : (
                        null
                    )}
                </div>
                <hr style={{marginTop:"20px", marginBottom:"10px"}}/>
                <div className="tab">
                    <button className="tablinks" onClick={(event) => openCity(event, 'Booking')}>Booking</button>
                    <button className="tablinks" onClick={(event) => openCity(event, 'Payments')}>Payments</button>
                    <button className="tablinks" onClick={(event) =>openCity(event, 'Notifications')}>Notifications</button>
                    {/* <button className="tablinks" onClick={(event) =>openCity(event, 'Activity')}>Activity</button> */}
                    <button className="tablinks" onClick={(event) =>openCity(event, 'Edit profile')}>Edit profile</button>
                    <button className="tablinks" onClick={(event) =>openCity(event, 'Profile status')}>Profile status</button>
                </div>
            </div>
            <div id="Booking" className="tabcontent">
                <div className="table-box">
                    {
						loading == false 
						?
                            bookingUsers.length > 0 ?
                                <table className="table table-borderless common_booking common_booking">
                                    <thead>
                                        <tr>
                                            <th scope="col">BookingID</th>
                                            {/* <th scope="col">Image</th>
                                            <th scope="col">Customer</th> */}
                                            <th scope="col">Date Requested</th>
                                            <th scope="col">Booking Date</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Category</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {bookingUsers.map((user: any, index) => {

                                            const datesString = user.dates;
                                            const dates: Date[] = datesString.split(',').map((dateString: string) => formatDate(dateString));
                                            const startDate = dates[0];
                                            const endDate = dates[dates.length - 1];
                                            const output = `${startDate} to ${endDate}`;

                                            return (
                                                <tr key={index}>
                                                    <td>#{user.booking_id}</td>
                                                    {/* <td className="chefs_pic">
                                                        {user.pic ? <img
                                                            src={
                                                                process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                "/images/chef/users/" + user.pic
                                                            }
                                                            alt=""
                                                        /> : <img
                                                            src={
                                                                process.env.NEXT_PUBLIC_IMAGE_URL +
                                                                "/images/users.jpg"
                                                            }
                                                            alt=""
                                                        />}
                                                    </td>
                                                    <td>{`${user.name} ${user.surname}`.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td> */}

                                                    <td>{formatDate(user.latest_created_at)}</td>

                                                    <td>{user.category == 'onetime' ? formatDate(user.dates) : output}</td>
                                                    <td>{user.location}</td>
                                                    <td>{user.category == 'onetime' ? 'One time' : 'Mutiple Times'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            :
                                <p className="book1 text-center">No Booking Records Found</p>
                        :
                            <div className="text-center">
								<img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/chef_loading_img_3.gif`} width={50}/><p>Loading</p>
							</div>
                    }
                </div>
                <Pagination
                items={totalMenu.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                />
            </div>
            <div id="Payments" className="tabcontent">
                <h3>Payments</h3>
            </div>
            <div id="Notifications" className="tabcontent">
                <div className="container notifications-container">
                    <div className="row header">
                        <div className="col-7">
                            <p className="title">
                            Notifications
                            <span className="unread-notifications-number">{userNotifications.length}</span>
                            </p>
                        </div>
                        {/* <div className="col-5 mark-as-read text-end">
                            <a href="#" id="markAllAsRead" className="mark-as-read-button align-middle">Mark all as read</a>
                        </div> */}
                    </div>
                    <div className="row notifications">
                        <div className="col-12">
                            {loading == false 
						        ?  
                                    userNotifications.length > 0 
                                    ?
                                    userNotifications.map((notification: any) => {
                                        return(
                                            <div className="row single-notification-box unread" key={notification.id}>
                                                {/* <div className="col-1 profile-picture">
                                                    <img src="./assets/images/avatar-mark-webber.webp" alt="profile picture" className="img-fluid"/>
                                                </div> */}
                                                <div className="col-11 notification-text">
                                                    <p>
                                                    <span className="description">{notification?.description}</span>

                                                    {notification?.notifications_status == 'unseen' ? <span className="unread-symbol">•</span> : ''}
                                                    </p>
                                                    {/* <p className="time">1m ago</p> */}
                                                </div>
                                            </div>
                                        )})
                                    :
                                        <p className="book1 text-center">No Booking Records Found</p>
                                :
                                    <div className="text-center">
                                        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/chef_loading_img_3.gif`} width={50}/><p>Loading</p>
                                    </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* <div id="Activity" className="tabcontent">
                <h3>Activity</h3>
            </div> */}
            <div id="Edit profile" className="tabcontent">
                <form onSubmit={handleUpdateProfile}>
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="user-img" id="admin-profile">
                                {getUsers.pic ? (
                                    <img
                                        src={
                                            image && (typeof image !== 'string')
                                                ? URL.createObjectURL(image)
                                                : (getUsers.pic ? process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + getUsers.pic : '')
                                        }
                                        style={{objectFit:'contain'}}
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src={
                                            image && (typeof image !== 'string')
                                                ? URL.createObjectURL(image)
                                                : process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'
                                        }
                                        style={{objectFit:'contain'}}
                                        alt=""
                                    />
                                )}
                                <label> <input
                                    type="file"
                                    name="image"
                                    id="uploadfile"
                                    className="d-none"
                                    onChange={imageChange}
                                    accept=".jpg, .jpeg, .gif, .png, .webp"
                                /><i className="fa-solid fa-camera"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            <div className="all-form tab-m-0 pt-0 right-left-spacing">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-6">
                                        <label>Name </label>
                                        <input type="text" name="name" defaultValue={getUsers.name || ''} placeholder="Name " onChange={(e) => setFullName(e.target.value)} required />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-6">
                                        <label>Email</label>
                                        <input type="email" defaultValue="email" value={getUsers.email || ''} placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-6">
                                        <label>Password</label>
                                        <input type="password" id="loginpassword" name="password" value={password || ''} placeholder="*******" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-6">
                                        <label>Phone</label>
                                        <input type="text" defaultValue="phone" maxLength={10} value={getUsers.phone || ''} placeholder="Phone" onChange={(e) => {
                                            const re = /^[0-9\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setPhone(e.target.value);
                                            }
                                        }} required />
                                    </div>
                                    <div className="text-right mt-5"><button className="table-btn">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div id="Profile status" className="tabcontent">
                <h3>Profile status</h3>
            </div>
        </>
    )
}