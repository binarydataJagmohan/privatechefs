import React, { useState, useEffect, useRef } from "react";
import { getCurrentUserData } from "../../../lib/session";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import { getUserMessageData,getClickUserChefChatData,ContactChefByUser,ContactChefByUserWithShareFile } from "../../../lib/userapi";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { formatDistanceToNow } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
export default function Booking(props: any) {
  let id = props.UserId;

  const [currentPage, setCurrentPage] = useState(1);
  const [userchatsidebar, setUserChatSiderBar] = useState<UserSideBarChatMessages[]>([]);

  const [userchatmesage, setUserChatMessage] = useState<UserChatMessages[]>([]);

  const [booking_id, setCurrentChatBookingId] = useState("");

  const [receiver_id, setCurrentChatReceiverid] = useState("");

  const [receiver_name, setCurrentChatReceiverName] = useState("");

  const [message, setMessage] = useState("");

  const receiverIdRef = useRef(null);

  const BookingIdRef = useRef(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [activeChat, setActiveChat] = useState(-1);
  
  const [activeButton, setActiveButton] = useState('desc');

  const ChatSortBy = useRef('desc');

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
    sender_name?: string;
    unreadcount?:string;
    latest_message: string;
    latest_created_at: string;
    timezone: string;
    latest_type?:string;
    is_online?:string;
  }

  interface UserChatMessages {
    sender_id: number;
    receiver_id?: number;
    sender_name: string;
    receiver_name?: string;
    sender_pic?: string;
    receiver_pic?: string;
    sender_role?: string;
    receiver_role?: string;
    message?: string;
    booking_id?: number;
    chatdate?:string;
    type?:string
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
          booking_id : BookingIdRef.current,
          sort :ChatSortBy.current
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
        setCurrentChatReceiverName(res.userchatdata[0].receiver_name)
        receiverIdRef.current = res.userchatsider[0].receiver_id;
        BookingIdRef.current = res.booking_id;
        setIsFormSubmitted(true);
        setActiveChat(0);
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
      newErrors.message = "Message can't be blank";
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
            
            handleButtonClick(0,receiver_id,booking_id);
            setIsFormSubmitted(true);
            setActiveButton('desc');
            ChatSortBy.current = 'desc';
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

  const handleButtonClick = (index: number,receiver_id:any,booking_id:any) => {
  
    setCurrentChatBookingId(booking_id);
    setCurrentChatReceiverid(receiver_id);
    setActiveChat(index);
    receiverIdRef.current = receiver_id;
    BookingIdRef.current = booking_id;
    const data = {
      message: message,
      sender_id: currentUserData.id,
      receiver_id: receiver_id,
      booking_id : booking_id,
      index:index,
      sort :ChatSortBy.current
    };
  
    getClickUserChefChatData(data)
        .then(res => {
          if (res.status == true) {
            setUserChatSiderBar(res.userchatsider);
            setUserChatMessage(res.userchatdata);
            setCurrentChatReceiverName(res.userchatdata[0].receiver_name);
            setIsFormSubmitted(true);
            
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
 
  useEffect(() => {
    if (isFormSubmitted) {
      scrollToBottom();
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const formatDate = (value:any) => {
    return moment(value).format('D/M/YYYY HH:mm');
  }

 

  const imageChange = async (e: any) => {
    const file = e.target.files[0];
  
    console.log(file);
  
    // Check file type
    const fileType = file.type;
    let formData = new FormData();
  
    if (fileType.startsWith('image/')) {
      // Image file
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        // Invalid image extension
        // console.log('Invalid image extension. Allowed extensions are: jpg, jpeg, png');
        toast.info('Invalid image extension. Allowed extensions are: jpg, jpeg, png', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      if (file.size > 200 * 1024) {
        // Image size exceeds 200KB
        console.log('Image size should be less than or equal to 200KB');
        toast.info('Image size should be less than or equal to 200KB', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      formData.append('type', 'image');
    } else if (fileType === 'application/pdf') {
      // PDF file
      if (file.size > 1024 * 1024) {
        // PDF size exceeds 1MB
        // console.log('PDF size should be less than or equal to 1MB');
        toast.info('PDF size should be less than or equal to 1MB', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      formData.append('type', 'pdf');
    } else if (fileType === 'video/mp4') {
      // MP4 video file
      if (file.size >2* 1024 * 1024) {
        // Video size exceeds 1MB
        console.log('Video size should be less than or equal to 1MB');
        toast.info('Video size should be less than or equal to 2MB', {
          position: toast.POSITION.TOP_RIGHT
        });
        return;
      }
      formData.append('type', 'video');
    } else {
      // Invalid file type
      // console.log('Invalid file type');
      toast.info('Invalid file type', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }
  
    formData.append('data', file);
    formData.append('sender_id', currentUserData.id);
    formData.append('receiver_id', receiver_id);
    formData.append('booking_id', booking_id);
  
    ContactChefByUserWithShareFile(formData)
      .then(res => {
        if (res.status === true) {
          setMessage('');
          setUserChatMessage(res.userchatdata);
          setCurrentChatReceiverName(res.userchatdata[0].receiver_name)
          handleButtonClick(0,receiver_id,booking_id);
          setIsFormSubmitted(true);
          setActiveButton('desc');
          ChatSortBy.current = 'desc';
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  const handleFilterButtonClick = (buttonName:any) => {
    setActiveButton(buttonName);
    ChatSortBy.current = buttonName;
    // handleButtonClick(0,receiver_id,booking_id);
    // Additional logic or actions you want to perform
  };

  return (
    <>
      <section className="userprofile-part">
        <div className="container-fluid p-5">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="table-part">
                <h2>Chats</h2>

                <div className="chats-box">
                  <div className="d-flex">
                    <div className="users-all">
                      <div className="chats-btns mt-4">
                     
                      <ul className="table_header_button_section p-r">
                        <li>
                          <button
                            className={`${activeButton === 'desc' ? 'table-btn' : 'table-btn btn-2'}`}
                            onClick={() => handleFilterButtonClick('desc')}
                          >
                            Recent
                          </button>
                        </li>
                        <li>
                          <button
                            className={`${activeButton === 'asc' ? 'table-btn' : 'table-btn btn-2'}`}
                            onClick={() => handleFilterButtonClick('asc')}
                          >
                            Oldest
                          </button>
                        </li>
                        <li>
                          <button
                            className={`${activeButton === 'unread' ? 'table-btn' : 'table-btn btn-2'}`}
                            onClick={() => handleFilterButtonClick('unread')}
                          >
                            Unread
                          </button>
                        </li>
                      </ul>
                      </div>
                      <div className="chats-h">
                        <div className="chats-user-profile mt-1">
                         
                        {
                                userchatsidebar.length > 0 ? (
                                  userchatsidebar.map((message, index: number) => {
                                    // Convert the latest_created_at to the specified time zone
                                    const formattedDate = zonedTimeToUtc(new Date(message.latest_created_at), message.timezone);

                                    return (
                                      <a href="#" className={`chats-user-a ${activeChat === index ? 'chatactive' : ''}`} onClick={() => handleButtonClick(index, message.sender_id, message.booking_id)} key={index}>
                                        <div className="row p-2">
                                          <div className="col-lg-3 col-md-3 col-3 pr-0">
                                            {message.pic == null ? (
                                              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'} alt="chats-user" />
                                            ) : (
                                              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' + message.pic} alt="chats-user" />
                                            )}
                                            {message.is_online == 'yes' && ( <i className="fa-solid fa-circle chats-circle"></i>)}
                                             
                                          </div>
                                          <div className="col-lg-9 col-md-7 col-7">
                                            <div className="user-profile-chats mt-1">
                                              <h5 className={`chat_color position-relative ${activeChat === index ? 'text-white' : ''}`}>
                                              
                                                {message.sender_name && message.sender_name.length > 25 ? `${message.sender_name.slice(0, 25)}...` : message.sender_name}
                                                {Number(message.unreadcount) > 0 && (
                                                  <span className={`chat_color badge text-danger position-absolute mx-2 chat_badge ${activeChat === index ? 'bg-white' : 'text-white bg-secondary'}`}>
                                                    {message.unreadcount}
                                                  </span>
                                                )}
                                              </h5>


                                            {message.latest_type == 'image' && <div className="image_sider_bar d-flex align-items-center"> <img
                                                src={process.env.NEXT_PUBLIC_BASE_URL + '/images/small_image.png'}
                                                className="sidebar_chat_border rounded"
                                                width={30} height={30}
                                                alt="chats-user"
                                              /><span className="small_font mx-2 text-secondary">image</span></div>}

                                            {message.latest_type == 'pdf' && <div className="image_sider_bar d-flex align-items-center"> <img
                                                src={process.env.NEXT_PUBLIC_BASE_URL + '/images/small_pdf.png'}
                                                className="sidebar_chat_border rounded"
                                                width={30} height={30}
                                                alt="chats-user"
                                              /><span className="small_font mx-2 text-secondary">Pdf</span></div>}

                                            {message.latest_type == 'video' && <div className="image_sider_bar d-flex align-items-center"> <img
                                                src={process.env.NEXT_PUBLIC_BASE_URL + '/images/small_video.png'}
                                                className="sidebar_chat_border rounded"
                                                width={30} height={30}
                                                alt="chats-user"
                                              /><span className="small_font mx-2 text-secondary">video</span></div>}

                                              {message.latest_type !== 'image' && message.latest_type !== 'pdf' && message.latest_type !== 'video' && (
                                                <p className="chat_color mb-0">
                                                  {message.latest_message.length > 40 ? `${message.latest_message.slice(0, 40)}...` : message.latest_message}
                                                </p>
                                              )}


                                            </div>
                                            <p className={`chat_color f-12 ${activeChat === index ? 'text-white' : ''}`}>
                                              {formatDistanceToNow(formattedDate, { addSuffix: true })}
                                            </p>
                                          </div>
                                          
                                        </div>
                                      </a>
                                    );
                                  })
                                ) : (
                                  <p>No messages found.</p>
                                )
                              }
                         
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
                          
                          <ul className="user-mess" ref={userMessRef} >
                          {userchatmesage.length > 0 ? (
                              userchatmesage.map((message,index) => (
                                <React.Fragment key={index}>
                                {message.sender_role == 'chef' && (
                                
                                <li className="reply"> 
                                                         
                                     {message.receiver_pic == null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.receiver_pic}
                                      alt="chats-user"
                                    />}
                                  <span className="bg-f1">
                                    {message.type === 'image' && <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/'+message.message} target="_blank" rel="noopener noreferrer">  <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/'+message.message}
                                        className="chat_shared_image"
                                        width={128} height={128}
                                        alt="chats-user"
                                      /></a>}
                                    {message.type === 'pdf' && (
                                      <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/pdf/'+message.message} target="_blank" rel="noopener noreferrer">  <img
                                      src={process.env.NEXT_PUBLIC_BASE_URL + '/images/pdf.png'}
                                      className="chat_shared_image"
                                      alt="chats-user"
                                    /></a>
                                    )}
                                     {message.type === 'video' && (
                                      <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message} target="_blank" rel="noopener noreferrer">
                                        <video className="chat_shared_video" controls width={150} height={150}>
                                          <source src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message} type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>
                                      </a>
                                    )}
                                    {message.type !== 'image' && message.type !== 'pdf' && message.type !== 'video' && message.message}

                                    <div className="mt-2 small_font">  {formatDate(message.chatdate)}  </div>     
                                    </span>{" "}

                                    <div className="mt-2 small_font name_chat">
                                      {message && message.sender_name && message.sender_name.length > 8 ? (
                                        message.sender_name.substring(0, 8) + ''
                                      ) : (
                                        message && message.sender_name
                                      )}
                                    </div>

                                    
                                  </li> )}
                                  
                                  {message.sender_role == 'user' && (
                                  <li className="reply-two">
                                    {" "}
                                    <span className="bg-f1">
                                    {message.type === 'image' && <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/'+message.message} target="_blank" rel="noopener noreferrer">  <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/images/'+message.message}
                                        className="chat_shared_image"
                                        width={128} height={128}
                                        alt="chats-user"
                                      /></a>}
                                    {message.type === 'pdf' && (
                                      <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/pdf/'+message.message} target="_blank" rel="noopener noreferrer">  <img
                                      src={process.env.NEXT_PUBLIC_BASE_URL + '/images/pdf.png'}
                                      className="chat_shared_image"
                                      alt="chats-user"
                                    /></a>
                                    )}
                                    {message.type === 'video' && (
                                      <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message} target="_blank" rel="noopener noreferrer">
                                        <video className="chat_shared_video" controls width={150} height={150}>
                                          <source src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message} type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>
                                      </a>
                                    )}
                                    {message.type !== 'image' && message.type !== 'pdf' && message.type !== 'video' && message.message}

                                    <div className="mt-2 small_font">  {formatDate(message.chatdate)}  </div>     
                                    </span>{" "}
                                    {message.sender_pic == null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.sender_pic}
                                      alt="chats-user"
                                    />}
                                    <div className="mt-2 small_font name_chat_two">You</div>
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
                                <label className="mx-2"> <input
                                    type="file"
                                    name="image"
                                    id="uploadfile"
                                    className="d-none"
                                    onChange={imageChange}
                                  /> <i className="fa-solid fa-paperclip" style={{color:'#ff4e00'}} role="button"></i>
                                  </label>
                                 </div>
                                
                              </div>
                            
                           
                          </div>
                          </form>
                        </div>
                        )}
                      </div>
                    </div>
                    <div className="users-groups">
                     
                      <ul className="nav nav-pills mt-3 mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Chat Members</button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Shared file</button>
                        </li> 
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="sp-4 ">
                       
                        {
                          userchatmesage.slice(0, 1).map((message, index) => (
                            <React.Fragment key={index}>
                              
                            {message.receiver_role == 'chef' && (
                              <p className="g-text">
                                {message.receiver_pic == null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.receiver_pic}
                                      alt="chats-user"
                                    />}

                                <span> {message.receiver_name && message.receiver_name.length > 25 ? `${message.receiver_name.slice(0, 25)}...` : message.receiver_name}</span>
                              </p>
                              )}
                              {message.sender_role == 'user' && (
                              <p className="g-text">
                                  {message.sender_pic == null ? <img
                                        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/users.jpg'}
                                        alt="chats-user"
                                      /> : <img
                                      src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/'+message.sender_pic}
                                      alt="chats-user"
                                    />}
                                <span>{message.sender_name && message.sender_name.length > 25 ? `${message.sender_name.slice(0, 25)}...` : message.sender_name} </span>
                              </p>
                              )}
                            </React.Fragment>
                          ))
                        }
  

                        </div>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="sp-4 tab_share_file">
                          <ul className="user-mess">
                          {
                              userchatmesage.some((message) => message.type !== null) ? (
                                <>
                                  {userchatmesage
                                    .filter((message) => message.type !== null && message.chatdate)
                                    .sort((a, b) => {
                                      const dateA = new Date(a.chatdate as string);
                                      const dateB = new Date(b.chatdate as string );
                                      return dateB.getTime() - dateA.getTime();
                                    })
                                    .map((message, index) => (
                                      <React.Fragment key={index}>
                                        <li className="reply new_reply_msg d-flex align-items-center">
                                          <span>
                                            {message.type === 'image' && (
                                              <a
                                                href={
                                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                                  '/images/chat/images/' +
                                                  message.message
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={
                                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                                    '/images/chat/images/' +
                                                    message.message
                                                  }
                                                  className="chat_shared_image"
                                                  width={128}
                                                  height={128}
                                                  alt="chats-user"
                                                />
                                              </a>
                                            )}
                                            {message.type === 'pdf' && (
                                              <a
                                                href={
                                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                                  '/images/chat/pdf/' +
                                                  message.message
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={process.env.NEXT_PUBLIC_BASE_URL + '/images/pdf.png'}
                                                  className="chat_shared_image"
                                                  alt="chats-user"
                                                />
                                              </a>
                                            )}
                                            {message.type === 'video' && (
                                              <a href={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message} target="_blank" rel="noopener noreferrer">
                                                <video className="chat_shared_video" controls width={150} height={150}>
                                                  <source src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chat/video/' + message.message} type="video/mp4" />
                                                  Your browser does not support the video tag.
                                                </video>
                                              </a>
                                            )}
                                          </span>

                                          <span className="mx-2 small_font">
                                          {message.sender_role === 'user' && (message.sender_name.length <= 20 ? message.sender_name : message.sender_name.substring(0, 20) + '...')}
                                          {message.receiver_role === 'user' && (message.sender_name.length <= 20 ? message.sender_name : message.sender_name.substring(0, 20) + '...')}
                                            <div className="mt-2 small_font">{formatDate(new Date(message.chatdate as string))}</div>
                                          </span>
                                        </li>
                                      </React.Fragment>
                                    ))}
                                  {userchatmesage.filter((message) => message.type !== null && message.chatdate).length === 0 && (
                                    <p>No data found.</p>
                                  )}
                                </>
                              ) : (
                                <p>No data found.</p>
                              )
                            }
                          </ul>
                        </div>
                        </div> 
                        </div>							
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
}
