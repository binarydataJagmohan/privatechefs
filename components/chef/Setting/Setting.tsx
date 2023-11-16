import React, { useState, useEffect } from 'react'
import { getCurrentUserData } from '../../../lib/session'
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getSingleUserProfile,UpdateNewSetting } from '../../../lib/userapi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function UserProfile() {

	interface CurrentUserData {
		id: string;
		name: string;
		email: string;
		pic: string | null;
		surname: string;
		role: string;
		approved_by_admin: string
	}

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
		id: '',
		name: '',
		email: '',
		pic: null,
		surname: '',
		role: '',
		approved_by_admin: ''
	});

	const [buttonStatus, setButtonState] = useState(false);


	useEffect(() => {
		getUserData();

	}, []);

	const handleUpdateProfile = async (e: any) => {
		e.preventDefault();
		setButtonState(true);
		const data = {
			email: email || '',
			password: password || '',
			userid:currentUserData.id,
			name :currentUserData.name
		};

		UpdateNewSetting(data)
			.then((res) => {
				setButtonState(false);
				window.localStorage.setItem("email", email);
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
			})
			.catch((err) => {
				
			});
	};


	const getUserData = async () => {
		const data = isPageVisibleToRole('chef-menu');
		if (data == 2) {
			window.location.href = '/';
		}
		if (data == 0) {
			window.location.href = '/404';
		}
		if (data == 1) {
			const userData = getCurrentUserData() as CurrentUserData;
			setCurrentUserData({
				...userData,
				id: userData.id,
				name: userData.name,
				pic: userData.pic,
				surname: userData.surname,
				role: userData.role,
				approved_by_admin: userData.approved_by_admin,

			});
			getSingleUserData(userData.id)
		}
	}

	const getSingleUserData = async (id: any) => {
		getSingleUserProfile(id)
			.then(res => {
				if (res.status == true) {
					setEmail(res.data.email);
					setPassword(res.data.view_password);
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

	return (
		<>
			<section className="userprofile-part">
				<div className="container">
					<div className="my-profile mt-5 mb-5 tab-m-0">
						<h2> Setting </h2>
					</div>
					<form onSubmit={handleUpdateProfile}>
						<div className="row">
							
							<div className="col-lg-12 col-md-12">
								<div className="all-form tab-m-0 pt-0">
									<div className="row">
									
										<div className="col-lg-4 col-md-6">
											<label>Email</label>
											<input type="email" defaultValue="email" value={email || ''} placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} required />
										</div>
										<div className="col-lg-4 col-md-6">
											<label>Password</label>
											<input type="text" id="loginpassword" name="password" value={password || ''} placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
										</div>

										<div className="col-lg-4 col-md-6">
											<label></label>
											<button style={{padding:"6px 20px"}} type='submit' className="table-btn" disabled={buttonStatus}>{buttonStatus ? 'please wait...' : 'Update'}</button>
										</div>

									</div>
								</div>
							</div>
						</div>
					</form>
					<ToastContainer />
				</div>
			</section>
		</>
	)
}