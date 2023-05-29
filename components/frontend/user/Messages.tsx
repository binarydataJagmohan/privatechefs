import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserMessageData,getClickUserChefChatData,ContactChefByUser } from "../../../lib/userapi";
import { ToastContainer, toast } from "react-toastify";
export default function Booking(props: any) {
  let id = props.UserId;

  const [currentPage, setCurrentPage] = useState(1);
  const [userchatsidebar, setUserChatSiderBar] = useState<UserSideBarChatMessages[]>([]);

  const [userchatmesage, setUserChatMessage] = useState<UserChatMessages[]>([]);

  const [booking_id, setCurrentChatBookingId] = useState("");

  const [receiver_id, setCurrentChatReceiverid] = useState("");

  const [message, setMessage] = useState("");

  const receiverIdRef = useRef(null);

  const BookingIdRef = useRef(null);

  const [currentUserData, setCurrentUserData] = useState<CurrentUserData>({
    id: "",
    name: "",
    email: "",
    pic: null,
    surname: "",
    role: "",
    approved_by_admin: "",
  });

  interface CurrentUserData {
    id: string;
    name: string;
    email: string;
    pic: string | null;
    surname: string;
    role: string;
    approved_by_admin: string;
  }

  interface UserSideBarChatMessages {
    booking_id: number;
    sender_id?: string;
    receiver_id?: string;
    name?: string;
    pic?: string;
    unreadcount?:string;
  }

  interface UserChatMessages {
    sender_id: number;
    receiver_id?: number;
    sender_name?: string;
    receiver_name?: string;
    sender_pic?: string;
    receiver_pic?: string;
    sender_role?: string;
    receiver_role?: string;
    message?: string;
    booking_id?: number;
  }


  interface Errors {
    message?: string
  }

  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const data = isPageVisibleToRole("user-bookings");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    } else if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      const userData = getCurrentUserData() as CurrentUserData;
      fetchUserMessageDetails(userData.id);
      setCurrentUserData({
        ...userData,
        id: userData.id,
        name: userData.name,
        pic: userData.pic,
        surname: userData.surname,
        role: userData.role,
        approved_by_admin: userData.approved_by_admin,
      });

      const fetchData = async () => {
        const data = {
          message: message,
          sender_id: userData.id,
          receiver_id: receiverIdRef.current,
          booking_id : BookingIdRef.current
        };
  
      
        getClickUserChefChatData(data)
            .then(res => {
              if (res.status == true) {
              
                setUserChatMessage(res.userchatdata);
                setUserChatSiderBar(res.userchatsider);
              } else {
                 
                toast.error(res.message, {
                  position: toast.POSITION.TOP_RIGHT
                });
              }
            })
              .catch(err => {
                console.log(err);
        });
      };
    
      const interval = setInterval(fetchData, 2000); // Run every 2 seconds
    
      return () => {
        clearInterval(interval); // Clean up the interval when the component is unmounted
      };
      
    }
    
  }, []);

  const fetchUserMessageDetails = async (id: any) => {
    try {
      const data = {
        id: id,
      };
      const res = await getUserMessageData(data);
      if (res.status == true) {
        setUserChatSiderBar(res.userchatsider);
        setUserChatMessage(res.userchatdata);
        setCurrentChatBookingId(res.booking_id);
        // setCurrentChatReceiverid(res.userchatsidebar[0].receiver_id);
        setCurrentChatReceiverid(res.userchatsider[0].receiver_id);
        receiverIdRef.current = res.userchatsider[0].receiver_id;
        BookingIdRef.current = res.booking_id;
      } else {
        // toast.error(res.message, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    } catch (err: any) {
      // toast.error(err.message, {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    }
  };

  const handleRegisterBlur = (event: any) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value) {
          newErrors.message = "Name is required";
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleBookingAssignJobSubmit = (event:any) => {
		event.preventDefault();

    const newErrors: Errors = {};
    if (!message) {
      newErrors.message = "Message cant be blank";
    }

    setErrors(newErrors);


    if (Object.keys(newErrors).length === 0) {
   
      const data = {
        message: message,
        sender_id: currentUserData.id,
        receiver_id: receiver_id,
        booking_id : booking_id
      };
      ContactChefByUser(data)
        .then(res => {
          if (res.status == true) {
            setMessage("");
            setUserChatMessage(res.userchatdata);
            scrollToBottom();
            handleButtonClick(receiver_id,booking_id)
          } else {
             
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
          .catch(err => {
            console.log(err);
          });
    }
		
	};

  const handleButtonClick = (receiver_id:any,booking_id:any) => {
    setCurrentChatBookingId(booking_id);
    setCurrentChatReceiverid(receiver_id);
    receiverIdRef.current = receiver_id;
    BookingIdRef.current = booking_id;
    const data = {
      message: message,
      sender_id: currentUserData.id,
      receiver_id: receiver_id,
      booking_id : booking_id
    };
  
    getClickUserChefChatData(data)
        .then(res => {
          if (res.status == true) {
            setUserChatSiderBar(res.userchatsider);
            setUserChatMessage(res.userchatdata);
            scrollToBottom();
          } else {
             
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
          .catch(err => {
            console.log(err);
    });
  };

  const userMessRef = useRef<HTMLUListElement>(null);

  const scrollToBottom = () => {
    if (userMessRef.current) {
      const userMessElement = userMessRef.current;
      userMessElement.scrollTop = userMessElement.scrollHeight - userMessElement.clientHeight;
    }
  };
 

  // useEffect(() => {
  //   scrollToBottom();
  // }, [userchatmesage]);

  return (
    <>
      <section className="userprofile-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="table-part">
                <h2>Chats</h2>

                <div className="chats-box">
                  <div className="d-flex">
                    <div className="users-all">
                      <div className="chats-btns mt-4">
                     
                        <ul className="table_header_button_section p-r ">
                          <li>
                            <button className="table-btn  ">All</button>
                          </li>
                          <li>
                            <button className="table-btn btn-2 ">read </button>
                          </li>
                          <li>
                            <button className="table-btn btn-2 ">Unread</button>
                          </li>
                          {/* <li className="right-li">
                            <i className="fa-solid fa-plus"></i>
                          </li> */}
                        </ul> 
                      </div>
                      <div className="chats-h">
                        <div className="chats-user-profile mt-1">
                         
                            {userchatsidebar.length > 0 ? (
                              userchatsidebar.map((message,index) => (
                                <a href="#" className="chats-user-a"  onClick={() => handleButtonClick(message.receiver_id,message.booking_id)}>
                                <div className={`row p-2 ${receiver_id == message.receiver_id ? 'chatactive' : ''}`} key={index}>
                                  <div className="col-lg-3 col-md-3 col-3 pr-0">
                                   
                                      {message.pic == null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.pic}
                                      alt="chats-user"
                                    />}
                                      

                                      {/* <i className="fa-solid fa-circle chats-circle"></i> */}
                                   
                                  </div>
                                  
                                  <div className="col-lg-7 col-md-7 col-7">
                                    <div className="user-profile-chats mt-1">
                                      <h5 className={`position-relative ${receiver_id == message.receiver_id ? 'text-white' : ''}`}>{message.name}{Number(message.unreadcount) > 0 && (
                                            <span className={`badge text-danger position-absolute mx-2 ${receiver_id == message.sender_id ? 'bg-white' : 'chatactive text-white'}`}>
                                              {message.unreadcount}
                                            </span>
                                          )}</h5>
                                     
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-2 text-right">
                                   
                                    <p className={`f-12 mt-3 ${receiver_id == message.receiver_id ? 'text-white' : ''}`}>22m</p>
                                  </div>
                                  </div>
                                  </a>
                              ))
                            ) : (
                              <p>No messages found.</p>
                            )}
                         
                        </div>
                      </div>
                    </div>
                    <div className="users-chats">
                      <div className="msg-head">
                        <div className="row">
                          <div className="col-lg-8 col-md-8 col-8">
                            <h3>Booking #{booking_id}</h3>
                          </div>
                          <div className="col-lg-4 col-md-4 col-4 text-right">
                            <div className="icon-head-chats">
                              {/* <a href="#">
                                <i className="fa-solid fa-pen"></i>
                              </a> */}
                              {/* <a href="#">
                                <i className="fa-solid fa-circle-info"></i>
                              </a> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="msg-body" >
                        <div className="user-box">
                          
                          <ul className="user-mess" ref={userMessRef}>
                          {userchatmesage.length > 0 ? (
                              userchatmesage.map((message,index) => (
                                <React.Fragment key={index}>
                                {message.sender_role == 'chef' && (
                                  <li className="reply">
                                     {message.receiver_pic != null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.receiver_pic}
                                      alt="chats-user"
                                    />}
                                    <span className="bg-f1">
                                      {message.message}
                                    </span>
                                  </li> )}
                                  
                                  {message.sender_role == 'user' && (
                                  <li className="reply-two">
                                    {" "}
                                    <span className="bg-f1">
                                    {message.message}
                                    </span>{" "}
                                    {message.sender_pic != null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.sender_pic}
                                      alt="chats-user"
                                    />}
                                  </li>
                                  )}
                            </React.Fragment>
                              ))
                            ) : (
                              <p>No messages found.</p>
                            )}
                          </ul>
                        </div>
                        {userchatsidebar.length > 0 && (
                        <div className="send-box">
                        <form onSubmit={handleBookingAssignJobSubmit} className="form-Search send-message">
                          <div className="row">
                            <div className="col-sm-10 col-9">
                            
                                <input
                                  type="text"
                                  placeholder="Write a message"
                                  value={message} onChange={(e) => setMessage(e.target.value)} onBlur={handleRegisterBlur}
                                />
                                 {errors.message && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.message}</span>}
                            </div>
                            <div className="col-sm-2 col-3">
                              <div className="send-part">
                               <button type="submit" className="chat_msg_send">
                                  <i className="fa-solid fa-paper-plane"></i>
                                </button>
                               
                              </div>
                            </div>
                          </div>
                          </form>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
