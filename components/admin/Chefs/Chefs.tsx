import React, { useState, useEffect } from "react";
import PopupModal from "../../../components/commoncomponents/PopupModal";
import { getAllChefDetails, getChefByFilter, getCuisine, approveChefProfile, getChefAllLocation, getChefLocationByFilter, chefPriceFilter, chefDelete } from "../../../lib/adminapi";
import { getCurrentUserData } from "../../../lib/session";
import { createChef } from "../../../lib/concierge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";
import Link from "next/link";
import { showToast } from "../../commoncomponents/toastUtils";
import swal from "sweetalert";

export default function Chefs() {
  interface FilterData {
    id: number;
    name: string;
    surname: string;
    address: string;
    pic: string;
    cuisine_name: string;
    profile_status: string;
    approved_by_admin: string;
    amount: string;
    email: string;
    slug: string;
  }
  interface chefData {
    id: number;
    name: string;
    surname: string;
    address: string;
    pic: string;
    approved_by_admin: string;
    profile_status: string;
    cuisine_name: string;
    amount: string;
    email: string;
    slug: any;
  }
  interface GetCuisine {
    name: string;
  }
  interface Location {
    id: number;
    lat: number;
    name: string;
    surname: string;
    address: string;
    pic: string;
    approved_by_admin: string;
    profile_status: string;
    cuisine_name: string;
    amount: string;
    email: string;
    slug: string;
  }

  interface Errors {
    email?: string;
    name?: string;
    surname?: string;
  }

  interface Menu {
    approved_by_admin: string; // Assuming 'approved_by_admin' is a string
    // Other properties of your object
  }

  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [filteredChefs, setFilteredChefs] = useState<FilterData[]>([]);
  const [chefs, setChefs] = useState<chefData[]>([]);
  const [getcuisine, setGetCuisine] = useState<GetCuisine[]>([]);
  const [showAllCuisines, setShowAllCuisines] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [totalMenu, setTotalMenu]: any = useState({});
  const [approvestatus, setApproveStatus]: any = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [getlocation, setGetLocation] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location[]>([]);
  const [filterLocation, setFilterLocation] = useState<Location[]>([]);

  const [selectedPrice, setSelectedPrice] = useState<Location[]>([]);
  const [filterPrice, setFilterPrice] = useState<Location[]>([]);

  const [modalConfirmTwo, SetModalConfirmTwo] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [buttonStatus, setButtonState] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [namedata, setChefName] = useState("");

  const modalConfirmOpen = () => {
    setModalConfirm(true);
  };
  const modalConfirmClose = () => {
    setModalConfirm(false);
  };

  const modalConfirmTwoClose = () => {
    SetModalConfirmTwo(false);
  };

  useEffect(() => {
    const data = isPageVisibleToRole("admin-chefs");
    if (data == 2) {
      window.location.href = "/login"; // redirect to login if not logged in
    }
    if (data == 0) {
      window.location.href = "/404"; // redirect to 404 if not authorized
    }
    if (data == 1) {
      getAllChef();
      getAllCuisine();
      getAllChefLocation();
      const cuisinesArray = Array.isArray(selectedCuisines) ? selectedCuisines : [selectedCuisines];
      getChefByFilter({ cuisines: cuisinesArray.join(",") })
        .then((res) => {
          if (res.status) {
            console.log(res.data);
            setFilteredChefs(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCuisines]);

  useEffect(() => {
    const locationsArray = Array.isArray(selectedLocation) ? selectedLocation : [selectedLocation];
    //console.log(locationsArray);
    getChefLocationByFilter({ locations: locationsArray.join(",") })
      .then((res) => {
        if (res.status) {
          setFilterLocation(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedLocation]);

  useEffect(() => {
    const priceArray = Array.isArray(selectedPrice) ? selectedPrice : [selectedPrice];
    chefPriceFilter({ price: priceArray.join(",") })
      .then((res) => {
        if (res.status) {
          setFilterPrice(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedPrice]);

  const getAllChefLocation = () => {
    getChefAllLocation()
      .then((res) => {
        if (res.status) {
          setGetLocation(res.data);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegisterSubmit = (event: any) => {
    event.preventDefault();

    // Validate form data
    const newErrors: Errors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);

    // Submit form data if there are no errors
    if (Object.keys(newErrors).length === 0) {
      const userData: any = getCurrentUserData();
      setButtonState(true);

      // Call an API or perform some other action to register the user
      const data = {
        name: name,
        email: email,
        created_by: userData.id,
      };
      console.log(data);
      createChef(data)
        .then((res) => {
          if (res.status == true) {
            SetModalConfirmTwo(false);
            getAllChef();
            setButtonState(false);
            showToast("success", res.message);
          } else {
            setButtonState(false);
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
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getAllChef = () => {
    getAllChefDetails()
      .then((res) => {
        if (res.status) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, currentPage, pageSize);
          setChefs(paginatedPosts);
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
      .catch((err) => {
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
      });
  };

  const ApproveChefProfile = async (e: any, id: any) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    const data = {
      approved_by_admin: selectedValue,
    };
    approveChefProfile(id, data)
      .then((res) => {
        if (res.status == true) {
          getAllChef();
          window.localStorage.setItem("approved_by_admin", res.data.approved_by_admin);
          setApproveStatus(res.data.approved_by_admin);
          showToast("success", res.message);
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
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCuisine = () => {
    getCuisine()
      .then((res) => {
        if (res.status) {
          setGetCuisine(res.data);
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
      .catch((err) => {
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
      });
  };

  const handleCheckboxChange = (e: any) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCuisines((prevCuisines) => [...prevCuisines, value]);
    } else {
      setSelectedCuisines((prevCuisines) => prevCuisines.filter((c) => c !== value));
    }
  };

  const handleCheckboxLocationChange = (e: any) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedLocation((prevLocations) => [...prevLocations, value]);
    } else {
      setSelectedLocation((prevLocations) => prevLocations.filter((c) => c !== value));
    }
  };

  const handleCheckboxPriceChange = (e: any) => {
    const value = e.target.value;
    setSelectedPrice((prevPrice) => (prevPrice === value ? "" : value));
  };

  const onPageChange = (page: any) => {
    setCurrentPage(page);
    getAllChefDetails()
      .then((res) => {
        if (res.status == true) {
          setTotalMenu(res.data);
          const paginatedPosts = paginate(res.data, page, pageSize);
          setChefs(paginatedPosts);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeCuisine = (cuisine: any) => {
    setSelectedCuisines((prevSelectedCuisines) => prevSelectedCuisines.filter((c) => c !== cuisine));
  };

  const handleShowAllCuisines = () => {
    setShowAllCuisines(true);
  };

  const handleClosePopup = () => {
    setShowAllCuisines(false);
  };

  const handleCollapse = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const resetFields = () => {
    setName("");
    setEmail("");
  };

  const [selectedApprovalFilter, setSelectedApprovalFilter] = useState("all");

  const handleApprovalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setSelectedApprovalFilter(filterValue);
    if (filterValue === "yes") {
      const approvedChefs = totalMenu.filter((totalMenus: { approved_by_admin: string }) => totalMenus.approved_by_admin === "yes");
      console.log(approvedChefs);
      setFilteredChefs(approvedChefs);
    } else if (filterValue === "no") {
      const unapprovedChefs = totalMenu.filter((totalMenus: { approved_by_admin: string }) => totalMenus.approved_by_admin === "no");
      console.log(unapprovedChefs);
      setFilteredChefs(unapprovedChefs);
    } else {
      setFilteredChefs(chefs);
    }
  };

  const handleChef = (e: any) => {
    const searchTerm = e.target.value;

    if (!searchTerm) {
      getAllChef();
      setChefName(searchTerm);
    } else {
      setChefName(searchTerm);

      const filteredUsers = totalMenu.filter((user: any) => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
      setChefs(filteredUsers);
    }
  };

  const handleDelete = (e: any, id: any) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You want to delete the Chef Profile",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willDelete) => {
      if (willDelete) {
        chefDelete(id)
          .then((res) => {
            if (res.status === true) {
              swal("Your Chef has been deleted!", {
                icon: "success",
              });
              getAllChef();
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
          .catch((err) => {
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
          });
      } else {
        // handle cancel
      }
    });
  };
  return (
    <>
      <div className="table-part">
        <div className="row align-items-center mt-3 mb-3">
          <div className="col-8">
            <h2>Chefs</h2>
          </div>
          <div className="col-sm-4 col-12">
            <ul className="table_header_button_section">
              <input type="text" className="form-control" placeholder="Search chef here.." onChange={handleChef} />
            </ul>
          </div>
        </div>

        <div className="row align-items-center mt-3 mb-3 table_header_button_section p-r">
          <div className="col-12">
            <ul className="table_header_button_section p-r">
              <li>
                {/* <button className="table-btn">Total</button> */}
                {selectedCuisines.map((cuisine, index) => (
                  <li key={index}>
                    {" "}
                    <div className="table-btn">
                      <span>{cuisine}</span>
                      <button className="remove-btn" onClick={() => removeCuisine(cuisine)}>
                        x
                      </button>
                    </div>
                  </li>
                ))}
              </li>
              <li>
                <div className="">
                  <button
                    className="table-btn border-radius round-white table-btn"
                    onClick={() => {
                      SetModalConfirmTwo(true);
                      resetFields();
                    }}
                  >
                    Invitation
                  </button>
                </div>
              </li>
              <li>
                <div className="">
                  <Link href="/admin/chefprofile">
                    <button className="table-btn border-radius round-white table-btn">Add Chefs Information</button>
                  </Link>
                </div>
              </li>
              <li className="">
                <button className="table-btn border-radius round-white" onClick={() => setModalConfirm(true)}>
                  Filter{" "}
                </button>{" "}
                <button className="table-btn border-radius round-white" onClick={() => window.location.reload()}>
                  Clear All{" "}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="table-box  " id="villa_table">
          <table className="table table-borderless common_booking">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Profile Status</th>
                <th scope="col" className="text-sm-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filterPrice.length > 0 ? (
                filterPrice.map((filter, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <div className="">
                          {filter.pic ? (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + filter.pic} alt="" />
                              </a>
                            </div>
                          ) : (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug} target="_blank">
                            {filter.name || ""} {filter.surname || ""}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>{filter.email || "N/A"}</td>
                    <td>{filter.address || "N/A"}</td>
                    <td>{filter.profile_status || ""}</td>
                    <td>
                      <select aria-label="Default select example" name="approved_by_admin" onChange={(e) => ApproveChefProfile(e, filter.id)}>
                        <option value="yes" selected={filter.approved_by_admin === "yes"}>
                          Approved
                        </option>
                        <option value="no" selected={filter.approved_by_admin === "no"}>
                          Unapproved
                        </option>
                      </select>
                    </td>

                    <td className="text-center">
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/chefs/" + filter.id}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
                ))
              ) : filterLocation.length > 0 ? (
                filterLocation.map((filter, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <div className="">
                          {filter.pic ? (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + filter.pic} alt="" />
                              </a>
                            </div>
                          ) : (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug} target="_blank">
                            {filter.name || ""} {filter.surname || ""}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>{filter.email || ""}</td>
                    <td>{filter.address || ""}</td>
                    <td>{filter.profile_status || ""}</td>
                    <td>
                      <select aria-label="Default select example" name="approved_by_admin" onChange={(e) => ApproveChefProfile(e, filter.id)}>
                        <option value="yes" selected={filter.approved_by_admin === "yes"}>
                          Approved
                        </option>
                        <option value="no" selected={filter.approved_by_admin === "no"}>
                          Unapproved
                        </option>
                      </select>
                    </td>

                    <td style={{ paddingLeft: "25px" }}>
                      <div className="dropdown text-sm-center" id="none-class">
                        <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis " role="button"></i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li>
                            <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                              See Full Profile
                            </a>
                          </li>

                          <li>
                            <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "admin/chefs/" + filter.id}>
                              See Backend Profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredChefs.length > 0 ? (
                filteredChefs.map((filter) => (
                  <tr key={filter.id}>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <div className="">
                          {filter.pic ? (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + filter.pic} alt="" />
                              </a>
                            </div>
                          ) : (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" />
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + filter.slug} target="_blank">
                            {filter.name || ""} {filter.surname || ""}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>{filter.address || ""}</td>
                    <td>{filter.email || ""}</td>
                    <td>{filter.profile_status || ""}</td>
                    <td>
                      <select aria-label="Default select example" name="approved_by_admin" onChange={(e) => ApproveChefProfile(e, filter.id)}>
                        <option value="yes" selected={filter.approved_by_admin === "yes"}>
                          Approved
                        </option>
                        <option value="no" selected={filter.approved_by_admin === "no"}>
                          Unapproved
                        </option>
                      </select>
                    </td>

                    <td style={{ paddingLeft: "25px" }}>
                      {/* <a
                        href={
                          process.env.NEXT_PUBLIC_BASE_URL +
                          "admin/chefs/" +
                          filter.id
                        }
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </a> */}
                      <div className="dropdown text-sm-center" id="none-class">
                        <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis " role="button"></i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li>
                            <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + chefs.slug}>
                              See Full Profile
                            </a>
                          </li>

                          <li>
                            <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "admin/chefs/" + chefs.id}>
                              See Backend Profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : chefs.length > 0 ? (
                chefs.map((chef) => (
                  <tr key={chef.id}>
                    <td>
                      <div className="flex-commn">
                        <div className="">
                          {chef.pic ? (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + chef.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + chef.pic} alt="" width={35} height={35} />
                              </a>
                            </div>
                          ) : (
                            <div className="chefs_pic">
                              <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + chef.slug}>
                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/placeholder.jpg"} alt="" width={35} height={35} />
                              </a>
                            </div>
                          )}
                        </div>
                        <div className="">
                          <a href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + chef.slug} target="_blank">
                            {chef.name || ""} {chef.surname || ""}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>{chef.email || ""}</td>
                    <td>{chef.address || "N/A"}</td>
                    <td>{chef.profile_status || ""}</td>

                    <td>
                      <select aria-label="Default select example" name="approved_by_admin" onChange={(e) => ApproveChefProfile(e, chef.id)}>
                        <option value="yes" selected={chef.approved_by_admin === "yes"}>
                          Approved
                        </option>
                        <option value="no" selected={chef.approved_by_admin === "no"}>
                          Unapproved
                        </option>
                      </select>
                    </td>
                    <td style={{ paddingLeft: "25px" }}>
                      <div className="dropdown text-sm-center" id="none-class">
                        <a className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis " role="button"></i>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li>
                            <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "privatechef/" + chef.slug}>
                              See Full Profile
                            </a>
                          </li>

                          <li>
                            <a className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "admin/chefs/" + chef.id}>
                              See Backend Profile
                            </a>
                          </li>

                          <li style={{ cursor: "pointer" }}>
                            <a className="dropdown-item" onClick={(e) => handleDelete(e, chef.id)}>
                              Delete Profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No record found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination items={totalMenu.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Cuisines
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                {/* <div className="container chkbox"> */}
                <div className="row">
                  {getcuisine.map((cuisines, index) => (
                    <div className="col-sm-4" key={index}>
                      <input type="checkbox" value={cuisines.name} onChange={handleCheckboxChange} style={{ marginRight: "5px" }} checked={selectedCuisines.includes(cuisines.name)} />
                      <label style={{ marginLeft: "5px" }}>{cuisines.name}</label>{" "}
                    </div>
                  ))}
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Locations
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body" id="location-filter">
                {getlocation.map((location, index) => (
                  <div className="col-sm-12" key={index}>
                    <input type="checkbox" value={location.lat} onChange={handleCheckboxLocationChange} style={{ marginRight: "5px" }} />
                    <label style={{ marginLeft: "5px" }}>{location.address}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Pricing
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="row">
                  <div className="col-sm-12">
                    <input type="checkbox" value="249" checked={selectedPrice === "249"} onChange={handleCheckboxPriceChange} style={{ marginRight: "5px" }} />
                    <label style={{ marginLeft: "5px" }}>Under ₹250</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="checkbox" value="250" checked={selectedPrice === "250"} onChange={handleCheckboxPriceChange} style={{ marginRight: "5px" }} />
                    <label style={{ marginLeft: "5px" }}>₹250-₹500</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="checkbox" value="900" checked={selectedPrice === "900"} onChange={handleCheckboxPriceChange} style={{ marginRight: "5px" }} />
                    <label style={{ marginLeft: "5px" }}>₹500-₹1,000</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="checkbox" value="1000" checked={selectedPrice === "1000"} onChange={handleCheckboxPriceChange} style={{ marginRight: "5px" }} />
                    <label style={{ marginLeft: "5px" }}>₹1,000-₹2,000</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="checkbox" value="2000" checked={selectedPrice === "2000"} onChange={handleCheckboxPriceChange} style={{ marginRight: "5px" }} />
                    <label style={{ marginLeft: "5px" }}>Over ₹2000</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Approved
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <div className="row">
                  <div className="col-sm-12">
                    <input type="checkbox" value="yes" style={{ marginRight: "5px" }} onChange={handleApprovalFilterChange} checked={selectedApprovalFilter == "yes"} />
                    <label style={{ marginLeft: "5px" }}>Approved Chefs</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="checkbox" value="no" style={{ marginRight: "5px" }} onChange={handleApprovalFilterChange} checked={selectedApprovalFilter == "no"} />
                    <label style={{ marginLeft: "5px" }}>Unapproved Chefs</label>
                  </div>
                  <div className="col-sm-12">
                    <input type="checkbox" value="all" style={{ marginRight: "5px" }} onChange={handleApprovalFilterChange} checked={selectedApprovalFilter == "all"} />
                    <label style={{ marginLeft: "5px" }}>All chefs</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopupModal>

      <PopupModal show={modalConfirmTwo} handleClose={modalConfirmTwoClose} staticClass="var-login">
        <h4 style={{ color: "#ff4e00d1", textAlign: "center" }}>Send Invitation</h4>
        <div className="all-form">
          <form onSubmit={handleRegisterSubmit} className="common_form_error" id="register_form">
            <div className="login_div">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login ">{errors.name}</span>}
            </div>
            <div className="login_div">
              <label htmlFor="email">Email:</label>
              <input type="email" id="registeremail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
            </div>
            <button type="submit" className="btn-send w-100" disabled={buttonStatus}>
              {buttonStatus ? "Please wait.." : "Submit Invitation Information"}
            </button>
          </form>
        </div>
      </PopupModal>
      <ToastContainer />
    </>
  );
}
