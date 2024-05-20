import React, { useState, useEffect } from "react";
export default function Villas2() {
  return (
    <>
      <div className="table-part mt-3">
        <h2>
          Villa’s Name
          <a href="#" className="t-icon">
            <i className="fa-solid fa-pencil"></i>
          </a>
          <a href="#" className="t-icon">
            <i className="fa-solid fa-trash"></i>
          </a>
          <button className="rating">
            4.8 <i className="fa-solid fa-star"></i>
          </button>
        </h2>

        <div className="row">
          <div className="col-lg-7 col-md-12">
            <div className="table-box concierge">
              <table className="table table-borderless common_booking">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Chef</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2493</td>
                    <td>Devon Lane</td>
                    <td>2/11/12</td>
                    <td>One time</td>
                    <td className="chefs_pic">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" />
                    </td>
                    <td>
                      <button className="t-btn completed">Completed</button>
                    </td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2493</td>
                    <td>Devon Lane</td>
                    <td>2/11/12</td>
                    <td>One time</td>
                    <td className="chefs_pic">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" />
                    </td>
                    <td>
                      <button className="t-btn Pending">Pending</button>
                    </td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2493</td>
                    <td>Devon Lane</td>
                    <td>2/11/12</td>
                    <td>One time</td>
                    <td className="chefs_pic">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" />
                    </td>
                    <td>
                      <button className="t-btn Upcoming">Upcoming</button>
                    </td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2493</td>
                    <td>Devon Lane</td>
                    <td>2/11/12</td>
                    <td>One time</td>
                    <td className="chefs_pic">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" />
                    </td>
                    <td>
                      <button className="t-btn completed">Completed</button>
                    </td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2493</td>
                    <td>Devon Lane</td>
                    <td>2/11/12</td>
                    <td>One time</td>
                    <td className="chefs_pic">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" />
                    </td>
                    <td>
                      <button className="t-btn completed">Completed</button>
                    </td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>2493</td>
                    <td>Devon Lane</td>
                    <td>2/11/12</td>
                    <td>One time</td>
                    <td className="chefs_pic">
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" />
                    </td>
                    <td>
                      <button className="t-btn completed">Completed</button>
                    </td>
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-box  mb-4">
              <div className="text-right">
                <div>
                  <a href="#" className="plus-add">
                    <i className="fa-solid fa-plus "></i> <button className="Filter"> Filter</button>
                  </a>
                </div>
                <div className="user-box">
                  <ul className="user-mess">
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend.</span>
                    </li>
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Lorem ipsum dolor sit amet, consectetur interdum.</span>
                    </li>
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Viverra magna malesuada vestibulum leo sed.</span>
                    </li>
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Viverra</span>
                    </li>
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Viverra</span>
                    </li>
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Viverra</span>
                    </li>
                    <li>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/booking_chef_pic.png"} alt="" /> <span className="bg-f1">Viverra</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5  col-md-12">
            <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/villa.png"} alt="villa" className="boder-img" />
            <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/map-2.png"} alt="map-2" className="boder-img mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}
