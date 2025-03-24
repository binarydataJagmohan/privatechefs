import React, { useState, useEffect } from "react";
import { getSingleChefProfile } from "../../../lib/userapi";
import { getChefAppliedBooking } from "../../../lib/chefapi";
import moment from "moment";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import Link from "next/link";
import PageFound from "../../pageFound";

export default function MyProfile(props: any) {
  interface User {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    BIC: string;
    IBAN: string;
    address: string;
    bank_address: string;
    bank_name: string;
    holder_name: string;
    passport_no: string;
    pic: string;
    tax_id: string;
    vat_no: string;
    about: string;
    description: string;
    services_type: string;
    favorite_dishes: string;
    languages: string;
    love_cooking: string;
    experience: string;
    favorite_chef: string;
    skills: string;
    addresses: string;
  }

  const [getUsers, setUsers] = useState<User>({
    id: 0,
    name: "",
    surname: "",
    phone: "",
    email: "",
    address: "",
    BIC: "",
    IBAN: "",
    bank_address: "",
    bank_name: "",
    holder_name: "",
    passport_no: "",
    pic: "",
    tax_id: "",
    vat_no: "",
    about: "",
    description: "",
    services_type: "",
    favorite_dishes: "",
    languages: "",
    love_cooking: "",
    experience: "",
    favorite_chef: "",
    skills: "",
    addresses: "",
  });
  const [bookingUsers, setBookingUser] = useState([]);
  const [totalMenu, setTotalMenu]: any = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  let id = props.userId;

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getSingleChefProfile(id);
      setUsers(userData.data);
    };
    fetchUserData();
    getSingleBookingUser(id);
  }, []);

  const getSingleBookingUser = (id: any) => {
    getChefAppliedBooking(id).then((res) => {
      setBookingUser(res.data);
      console.log(res.data);
    });
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getChefAppliedBooking(id)
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
      <Link href="/admin/chefs">
        <button className="table-btn mb-4">Back</button>
      </Link>
      <h5 style={{ color: "#ff4e00d1" }}>Chefs Detail </h5>
      <div className="user-class pt-5 align-items-center">
        <div className="userImg chef-img-set">
          {getUsers.pic ? (
            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + getUsers.pic} alt="" width={100} height={100} />
          ) : (
            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" width={100} height={100} />
          )}
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
              <span id="book-user">Phone no.</span> : {getUsers.phone}
            </p>
          ) : null}
          {getUsers.address ? (
            <p>
              <span id="book-user">Address</span> : {getUsers.address}
            </p>
          ) : null}
          {getUsers.passport_no ? (
            <p>
              <span id="book-user">ID/Passport No. </span>: {getUsers.passport_no}
            </p>
          ) : null}
          {getUsers.vat_no ? (
            <p>
              <span id="book-user">VAT Number. </span>: {getUsers.vat_no}
            </p>
          ) : null}
        </div>
        <div style={{ flex: "2" }}>
          {getUsers.IBAN ? (
            <p>
              <span id="book-user">IBAN</span> : {getUsers.IBAN}
            </p>
          ) : null}
          {getUsers.holder_name ? (
            <p>
              <span id="book-user">Bank Holder Name </span>: {getUsers.holder_name}
            </p>
          ) : null}
          {getUsers.bank_name ? (
            <p>
              <span id="book-user">Bank Name </span>: {getUsers.bank_name}
            </p>
          ) : null}
          {getUsers.bank_address ? (
            <p>
              <span id="book-user">Bank Address </span>: {getUsers.bank_address}
            </p>
          ) : null}
          {getUsers.BIC ? (
            <p>
              <span id="book-user">BIC </span>: {getUsers.BIC}
            </p>
          ) : null}
          {getUsers.tax_id ? (
            <p>
              <span id="book-user">TAX ID </span>: {getUsers.tax_id}
            </p>
          ) : null}
        </div>
      </div>
      <div className="user-class mt-4 align-items-center d-flex">
        <div className="userImg chef-img-set">
          {/* {getUsers.pic ? (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' +getUsers.pic} alt="" width={100} height={100} />
                    ) : (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="" width={100} height={100} />
                    )} */}
        </div>
        <div style={{ flex: "1" }}>
          {getUsers.description ? (
            <p>
              <span id="book-user">Personal Culinary Expert.</span> : {getUsers.description}
            </p>
          ) : null}
          {getUsers.services_type ? (
            <p>
              <span id="book-user">Service Offerings</span> : {getUsers.services_type}
            </p>
          ) : null}
          {getUsers.languages ? (
            <p>
              <span id="book-user">Language Proficiency. </span>: {getUsers.languages}
            </p>
          ) : null}

          {getUsers.favorite_dishes ? (
            <p>
              <span id="book-user">Cuisines Offered</span> : {getUsers.favorite_dishes}
            </p>
          ) : null}
          {getUsers.skills ? (
            <p>
              <span id="book-user">Special Skills and Knowledge </span>: {getUsers.skills}
            </p>
          ) : null}
        </div>
      </div>
      <div className="user-class mt-4 align-items-center d-flex">
        <div className="userImg chef-img-set">
          {/* {getUsers.pic ? (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/chef/users/' +getUsers.pic} alt="" width={100} height={100} />
                    ) : (
                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/placeholder.jpg'} alt="" width={100} height={100} />
                    )} */}
        </div>
        <div style={{ flex: "1" }}>
          {getUsers.about ? (
            <p>
              <span id="book-user">About Me.</span> : {getUsers.about}
            </p>
          ) : null}
          {getUsers.love_cooking ? (
            <p>
              <span id="book-user">Passion for Cooking</span> : {getUsers.love_cooking}
            </p>
          ) : null}
          {getUsers.experience ? (
            <p>
              <span id="book-user">Culinary Journey. </span>: {getUsers.experience}
            </p>
          ) : null}

          {getUsers.favorite_chef ? (
            <p>
              <span id="book-user">Favorite Chefs. </span>: {getUsers.favorite_chef}
            </p>
          ) : null}
          {getUsers.addresses ? (
            <p className="mt-4">
              <span id="book-user">Chef Location. </span>: {getUsers.addresses}
            </p>
          ) : null}
        </div>
      </div>
      <div className="users-boking">
        <div className="table-box ">
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
                  <th scope="col">User</th>
                  <th scope="col">Applied Jobs Status</th>
                  <th scope="col">Status</th>
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
                      <td>{user.applied_jobs_status}</td>
                      <td>{user.booking_status}</td>
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
      {/* // pagination */}
      <Pagination items={totalMenu.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
    </>
  );
}
