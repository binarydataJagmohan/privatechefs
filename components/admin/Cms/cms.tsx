import React, { useState, useEffect } from "react";
import { getCurrentUserData } from "../../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import { getLocationData, deleteSingleLocation } from "../../../lib/adminapi";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import PageFound from "../../pageFound";
import Link from "next/link";

interface FormErrors {
  name?: string;
  description?: string;
  image?: string;
  stars?: number;
}

export default function Cms() {
  const [locationData, setLocationdatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [currentUserData, setCurrentUserData] = useState({});
  const [allLocationData, setAllLocationData] = useState([]);
  useEffect(() => {
    const data = isPageVisibleToRole("admin-cms");
    if (data == 2) {
      window.location.href = "/login";
    } else if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      const userData = getCurrentUserData();
      setCurrentUserData(userData);
    }
    fetchLocationDetails();
  }, [currentPage, pageSize]);

  const fetchLocationDetails = async () => {
    try {
      const res = await getLocationData();
      if (res.status) {
        setAllLocationData(res.data);
        const paginatedPosts = paginate(res.data, currentPage, pageSize);
        setLocationdatas(paginatedPosts);
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
    } catch (err: any) {
      toast.error(err.message, {
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
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const deleteLocation = (id: any) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete the location",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willDelete) => {
      if (willDelete) {
        deleteSingleLocation(id)
          .then((res) => {
            if (res.status == true) {
              fetchLocationDetails();
              swal("Your Villa has been deleted!", {
                icon: "success",
              });
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
          })
          .catch((err) => {});
      } else {
      }
    });
  };

  return (
    <>
      <div className="table-part">
        <div className="row align-items-center mt-3 mb-3">
          <div className="col-8">
            <h2>Locations</h2>
          </div>
          <div className="col-sm-4 col-12 text-end">
            <ul className="table_header_button_section p-r">
              <li className="" id="allergy-id">
                <Link href="/admin/frontendlocations">
                  <button className="table-btn border-radius round-white">
                    Add Location Information
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="table-box  mt-4" id="ffff">
          {locationData.length > 0 ? (
            <table className="table table-borderless common_booking">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Location Name</th>

                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {locationData.map((allergy: any, index) => (
                  <tr key={allergy.id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td className="chefs_pic">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="">
                          <p>
                            {allergy.image ? (
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  "/images/location/" +
                                  allergy.image
                                }
                                alt=""
                              />
                            ) : (
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_IMAGE_URL +
                                  "/images/placeholder.jpg"
                                }
                                alt=""
                              />
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="chefs_pic">
                      <div className="d-flex gap-2 align-items-center">
                        <div className="">{allergy.location}</div>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown" id="none-class">
                        <a
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/frontendlocations/" +
                                allergy.id
                              }
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={(e) => deleteLocation(allergy.id)}
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <PageFound
                iconClass={"fa-solid fa-comment-dots"}
                heading={" No Locations yet "}
                subText={"Be the first to leave a location!"}
              />
            </>
          )}
        </div>
        <Pagination
          items={allLocationData.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>

      <ToastContainer />
    </>
  );
}
