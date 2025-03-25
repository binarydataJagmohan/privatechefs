import React, { useState, useEffect } from "react";
import { getSingleReceiptAdmin } from "../../../lib/adminapi";
import moment from "moment";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Link from "next/link";

export default function MyProfile(props: any) {
  interface User {
    id: number;
    chefname: string;
    chefsurname: string;
    chefphone: string;
    chefaddress: string;
    useraddress: string;
    username: string;
    usersurname: string;
    orderdate: string;
    chefpic: string;
    chefemail: string;
    useremail: string;
    amount: string;
    userphone: string;
    location: string;
    booking_phone: string;
  }

  const [getUsers, setUsers] = useState<User>({
    id: 0,
    chefname: "",
    chefsurname: "",
    chefphone: "",
    chefaddress: "",
    useraddress: "",
    username: "",
    usersurname: "",
    orderdate: "",
    chefpic: "",
    chefemail: "",
    useremail: "",
    amount: "",
    userphone: "",
    location: "",
    booking_phone: "",
  });

  let id = props.userId;

  useEffect(() => {
    const data = isPageVisibleToRole("admin-single-receipt");
    if (data == 2) {
      window.location.href = "/";
    }
    if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      GetSingleReceiptAdmin(id);
    }
  }, []);

  const GetSingleReceiptAdmin = async (id: any) => {
    getSingleReceiptAdmin(id)
      .then((res) => {
        if (res.status == true) {
          setUsers(res.data);
        } else {
          console.log("error");
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
      <div className="row">
      <Link href="/admin/receipts">
        <button className="table-btn mb-4">Back</button>
      </Link>
        <div className="col-sm-1 ">
          <div className="receiptsImage">
            {getUsers.chefpic ? (
              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + getUsers.chefpic} alt="" width={100} height={100} />
            ) : (
              <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" width={100} height={100} />
            )}
          </div>
        </div>
      
        <div className="col-lg-10 text-left">
      
          <h2>Booking Details</h2>
          {/* <strong>Street:</strong> <span>109, 1st Flr, Om Chambers, Kemps Corner, Nr Peddar Rdfly Over, Kemps Corner</span> */}
          <strong>Street:</strong> <span>{getUsers.location}</span>
          {/* <br />
          <strong>City:</strong> <span> Mumbai</span>
          <br />
          <strong>State/province/area:</strong> <span> Maharashtra</span>*/}
          <br />
          <strong>Phone number: </strong> <span> {getUsers.booking_phone}</span>
          <br />
          {/* <strong>Zip code:</strong> <span>400036</span>
          <br />
          <strong>Country calling code: </strong> <span> +91</span>
          <br /> */}
          {/* <strong>Country: </strong> <span>India</span> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="user-class pt-5 align-items-center">
            <h4>User Details</h4>
            <div>
              <p>
                <span id="book-user">Name : </span> {getUsers.username}
              </p>
              {getUsers.usersurname ? (
                <p>
                  <span id="book-user">Surname : </span> {getUsers.usersurname}
                </p>
              ) : null}
              {getUsers.useremail ? (
                <p>
                  <span id="book-user">Email : </span> {getUsers.useremail}
                </p>
              ) : null}
              {getUsers.userphone ? (
                <p>
                  <span id="book-user">phone no : </span> {getUsers.userphone}
                </p>
              ) : null}
              {getUsers.useraddress ? (
                <p>
                  <span id="book-user">Address : </span> {getUsers.useraddress}
                </p>
              ) : null}
            </div>

            <div>
              {getUsers.orderdate ? (
                <p>
                  <span id="book-user">Oder Date : </span> {getUsers.orderdate}
                </p>
              ) : null}

              {getUsers.username ? (
                <p>
                  <span id="book-user">Recipient Name : </span> {getUsers.username}{" "}
                </p>
              ) : null}
              {getUsers.usersurname ? (
                <p>
                  <span id="book-user">Recipient Surname : </span> {getUsers.usersurname}{" "}
                </p>
              ) : null}
              {getUsers.useremail ? (
                <p>
                  <span id="book-user">Recipient Email : </span> {getUsers.useremail}
                </p>
              ) : null}

              {getUsers.amount ? (
                <p>
                  <span id="book-user">Recipient Amount : </span> <strong>{getUsers.amount}</strong>
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="user-class pt-5 align-items-center">
            <h4>Chefs Details</h4>
            <div>
              <p>
                <span id="book-user">Chef Name : </span> {getUsers.chefname}
              </p>
              {getUsers.chefsurname ? (
                <p>
                  <span id="book-user">Chef Surname : </span> {getUsers.chefsurname}
                </p>
              ) : null}
              {getUsers.chefemail ? (
                <p>
                  <span id="book-user">Chef Email : </span> {getUsers.chefemail}
                </p>
              ) : null}
              {getUsers.chefphone ? (
                <p>
                  <span id="book-user">Chef phone no : </span> {getUsers.chefphone}
                </p>
              ) : null}
              {getUsers.chefaddress ? (
                <p>
                  <span id="book-user">Chef Address : </span> {getUsers.chefaddress}
                </p>
              ) : null}
            </div>

            <div>
              {getUsers.orderdate ? (
                <p>
                  <span id="book-user">Oder Date : </span> {getUsers.orderdate}
                </p>
              ) : null}

              {getUsers.username ? (
                <p>
                  <span id="book-user">Recipient Name : </span> {getUsers.username}{" "}
                </p>
              ) : null}
              {getUsers.usersurname ? (
                <p>
                  <span id="book-user">Recipient Surname : </span> {getUsers.usersurname}{" "}
                </p>
              ) : null}
              {getUsers.useremail ? (
                <p>
                  <span id="book-user">Recipient Email : </span> {getUsers.useremail}
                </p>
              ) : null}

              {getUsers.amount ? (
                <p>
                  <span id="book-user">Recipient Amount : </span> <strong>{getUsers.amount}</strong>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
