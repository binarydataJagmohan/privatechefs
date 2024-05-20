import React, { useState, useEffect } from "react";
import { getSingleUserProfile } from "../../../lib/userapi";
import { getUserBookingById, getAllergyDetails, getAllCuisine } from "../../../lib/adminapi";
import moment from "moment";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageFound from "../../pageFound";

export default function MyProfile(props: any) {
  interface User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    timezone: string;
    currency: string;
    birthday: string;
    pic: string;
    city: string;
    country: string;
    post_code: string;
    business_email: string;
    business_phoneno: number;
    company_name: string;
    vat_no: string;
    tax_id: string;
    address: string;
    user_address: string;
    user_city: string;
    user_country: string;
    user_post_code: string;
    allergy_id: string;
    additional_notes: string;
    cuisine_id: string;
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
      } catch (err) {
        // Handle errors here
        toast.error((err as Error).message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    };

    fetchData();
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
            background: "#ffff",
            borderLeft: "4px solid #e74c3c",
            color: "#454545",
          },
          progressStyle: {
            background: "#ffff",
          },
        });
      }
    } catch (err) {
      toast.error((err as Error).message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeButton: true,
        hideProgressBar: false,
        style: {
          background: "#ffff",
          borderLeft: "4px solid #e74c3c",
          color: "#454545",
        },
        progressStyle: {
          background: "#ffff",
        },
      });
    }
  };

  const getSingleBookingUser = (id: any) => {
    getUserBookingById(id).then((res) => {
      setBookingUser(res.data);
      console.log(res.data);
    });
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getUserBookingById(id)
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setBookingUser(paginatedPosts);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (value: any) => {
    return moment(value).format("D/M/YY");
  };

  return (
    <>
      <Link href="/admin/users">
        <button className="table-btn mb-4">Back</button>
      </Link>
      <h5 style={{ color: "#ff4e00d1" }}>User Detail</h5>
      <div className="user-class pt-5 align-items-center">
        <div className="userImg chef-img-set">
          {getUsers.pic ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + getUsers.pic} alt="" width={100} height={100} /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" width={100} height={100} />}
        </div>
        <div style={{ flex: "2" }}>
          <p>
            <span id="book-user">Name</span> : {getUsers.name} {getUsers.surname}
          </p>
          <p>
            <span id="book-user">Email</span> : {getUsers.email}
          </p>
          {getUsers.phone ? (
            <p>
              <span id="book-user">Phone</span> : {getUsers.phone}
            </p>
          ) : null}
          {getUsers.birthday ? (
            <p>
              <span id="book-user">Birthday</span> : {getUsers.birthday}
            </p>
          ) : null}
          {getUsers.timezone ? (
            <p>
              <span id="book-user">Timezone </span>: {getUsers.timezone}
            </p>
          ) : null}
        </div>
        <div style={{ flex: "2" }}>
          {getUsers.currency ? (
            <p>
              <span id="book-user">Currency</span> : {getUsers.currency}
            </p>
          ) : null}

          {getUsers.user_address ? (
            <p>
              <span id="book-user">Address</span> : {getUsers.user_address}
            </p>
          ) : null}
          {getUsers.user_city ? (
            <p>
              <span id="book-user">City</span> : {getUsers.user_city}
            </p>
          ) : null}
          {getUsers.user_country ? (
            <p>
              <span id="book-user">Country </span>: {getUsers.user_country}
            </p>
          ) : null}
          {getUsers.user_post_code ? (
            <p>
              <span id="book-user">Post Code </span>: {getUsers.user_post_code}
            </p>
          ) : null}
        </div>
      </div>

      <div className="user-class pt-5 align-items-center">
        <div className="userImg chef-img-set">
          <p>
            <span id="book-user">Invoice Details</span>
          </p>
        </div>
        <div style={{ flex: "2" }}>
          {getUsers.address ? (
            <p>
              <span id="book-user">Address</span> : {getUsers.address}
            </p>
          ) : null}
          {getUsers.city ? (
            <p>
              <span id="book-user">City</span> : {getUsers.city}
            </p>
          ) : null}
          {getUsers.country ? (
            <p>
              <span id="book-user">Country </span>: {getUsers.country}
            </p>
          ) : null}
          {getUsers.post_code ? (
            <p>
              <span id="book-user">Post Code </span>: {getUsers.post_code}
            </p>
          ) : null}
        </div>
        <div style={{ flex: "2" }}>
          {getUsers.business_email ? (
            <p>
              <span id="book-user">Business Email </span>: {getUsers.business_email}
            </p>
          ) : null}
          {getUsers.business_phoneno ? (
            <p>
              <span id="book-user">Business Phone No. </span>: {getUsers.business_phoneno}
            </p>
          ) : null}
          {getUsers.company_name ? (
            <p>
              <span id="book-user">Company Name</span> : {getUsers.company_name}
            </p>
          ) : null}
          {getUsers.vat_no ? (
            <p>
              <span id="book-user">VAT Number </span>: {getUsers.vat_no}
            </p>
          ) : null}
          {getUsers.tax_id ? (
            <p>
              <span id="book-user">TAX ID</span> : {getUsers.tax_id}
            </p>
          ) : null}
        </div>
      </div>

      <div className="user-class d-flex align-items-center">
        <div className="userImg chef-img-set">
          <p>
            <span id="book-user" style={{ wordWrap: "break-word" }}>
              Preferences
            </span>
          </p>
        </div>
        <div style={{ flex: "2" }}>
          {getUsers.allergy_id && allergiesdata.length > 0 ? (
            <p>
              <span id="book-user">Allergies:</span>{" "}
              {getUsers.allergy_id
                .split(",")
                .map((id) => {
                  const allergy = allergiesdata.find((allergy) => allergy.id == id);
                  return allergy ? allergy.allergy_name : "";
                })
                .filter(Boolean)
                .join(", ")}
            </p>
          ) : null}

          {getUsers.cuisine_id && cuisinedata.length > 0 ? (
            <p>
              <span id="book-user">Cuisine:</span>{" "}
              {getUsers.cuisine_id
                .split(",")
                .map((id) => {
                  const cuisine = cuisinedata.find((cuisine) => cuisine.id == id);
                  return cuisine ? cuisine.name : "";
                })
                .filter(Boolean)
                .join(", ")}
            </p>
          ) : null}

          {getUsers.additional_notes ? (
            <p>
              <span id="book-user">Additonal Notes</span> : {getUsers.additional_notes}
            </p>
          ) : null}
        </div>
      </div>

      <div className="users-boking">
        <div className="table-box">
          {bookingUsers.length > 0 ? (
            <table className="table table-borderless common_booking common_booking">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Date Requested</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Address</th>
                  <th scope="col">Category</th>
                  <th scope="col">Image</th>
                </tr>
              </thead>
              <tbody>
                {bookingUsers.map((user: any, index) => {
                  const datesString = user.dates;
                  const dates: Date[] = datesString.split(",").map((dateString: string) => formatDate(dateString));
                  const startDate = dates[0];
                  const endDate = dates[dates.length - 1];
                  const output = `${startDate} to ${endDate}`;

                  return (
                    <tr key={index}>
                      <td>#{user.booking_id}</td>
                      <td>
                        {`${user.name} ${user.surname}`
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </td>

                      <td>{formatDate(user.latest_created_at)}</td>

                      <td>{user.category == "onetime" ? formatDate(user.dates) : output}</td>
                      <td>{user.location}</td>
                      <td>{user.category == "onetime" ? "One time" : "Mutiple Times"}</td>
                      <td className="chefs_pic">{user.pic ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + user.pic} alt="" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="" />}</td>
                      {/* <td>{user.booking_status}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <PageFound iconClass={"fa-solid fa-user"} heading={" No users"} subText={"available"} />
            </>
          )}
        </div>
      </div>
      <Pagination items={totalMenu.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
    </>
  );
}
