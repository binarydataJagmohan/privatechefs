import React, { useState, useEffect } from 'react'
import PopupModal from '../../../components/commoncomponents/PopupModal';
import { getAllChefDetails, getChefByFilter, getCuisine } from '../../../lib/adminapi';
import { toast } from 'react-toastify';
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Pagination from "../../commoncomponents/Pagination";
import { paginate } from "../../../helpers/paginate";


export default function Chefs() {

	interface FilterData {
		id: number;
		name: string;
		surname: string;
		address: string;
		pic: string;
		cuisine_name: string;
	}
	interface chefData {
		id: number;
		name: string;
		surname: string;
		address: string;
		pic: string;
		cuisine_name: string;
	}
	interface GetCuisine {
		name: string;
	}

	const [modalConfirm, setModalConfirm] = useState(false);
	const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
	const [filteredChefs, setFilteredChefs] = useState<FilterData[]>([]);
	const [chefs, setChefs] = useState<chefData[]>([]);
	const [getcuisine, setGetCuisine] = useState<GetCuisine[]>([]);
	const [showAllCuisines, setShowAllCuisines] = useState(false);
	const [activeIndex, setActiveIndex] = useState(null);
	const [totalMenu, setTotalMenu]: any = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const modalConfirmOpen = () => {
		setModalConfirm(true);
	}
	const modalConfirmClose = () => {
		setModalConfirm(false);
	}

	useEffect(() => {

		const data = isPageVisibleToRole('admin-chefs');
		if (data == 2) {
			window.location.href = '/login'; // redirect to login if not logged in
		}
		if (data == 0) {
			window.location.href = '/404'; // redirect to 404 if not authorized
		}
		if (data == 1) {
			getAllChef();
			getAllCuisine();
			const cuisinesArray = Array.isArray(selectedCuisines) ? selectedCuisines : [selectedCuisines];
			getChefByFilter({ cuisines: cuisinesArray.join(',') })
				.then(res => {
					if (res.status) {
						console.log(res.data);
						setFilteredChefs(res.data);
					}
				})
				.catch(error => {
					console.error(error);
				});
		}

	}, [selectedCuisines]);

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
					});
				}
			})
			.catch((err) => {
				toast.error(err.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
			});
	}

	const getAllCuisine = () => {
		getCuisine()
			.then((res) => {
				if (res.status) {
					console.log(res);
					setGetCuisine(res.data);

				} else {
					toast.error(res.message, {
						position: toast.POSITION.TOP_RIGHT,
					});
				}
			})
			.catch((err) => {
				toast.error(err.message, {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
			});
	}

	const handleCheckboxChange = (e: any) => {
		const value = e.target.value;
		if (e.target.checked) {
			setSelectedCuisines((prevCuisines) => [...prevCuisines, value]);
		} else {
			setSelectedCuisines((prevCuisines) =>
				prevCuisines.filter((c) => c !== value)
			);
		}
	};

	const onPageChange = (page: any) => {
		setCurrentPage(page);
		getAllChefDetails()
			.then(res => {
				if (res.status == true) {
					setTotalMenu(res.data);
					const paginatedPosts = paginate(res.data, page, pageSize);
					setChefs(paginatedPosts);
				} else {
					console.log(res.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

      const removeCuisine = (cuisine) => {
	  setSelectedCuisines((prevSelectedCuisines) => prevSelectedCuisines.filter((c) => c !== cuisine));
	};

	const handleShowAllCuisines = () => {
		setShowAllCuisines(true);
	  };

	  const handleClosePopup = () => {
		setShowAllCuisines(false);
	  };

	  const handleCollapse = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	  };

	return (
    <>
      <div className="table-part">
        <h2>Chefs</h2>
        <ul className="table_header_button_section p-r">
          <li>
            {/* <button className="table-btn">Total</button> */}
            {selectedCuisines.map((cuisine, index) => (
              <li>
                {" "}
                <div key={index} className="table-btn">
                  <span>{cuisine}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeCuisine(cuisine)}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </li>
          <li className="right-li">
            <button
              className="table-btn border-radius round-white"
              onClick={() => setModalConfirm(true)}
            >
              Filter{" "}
            </button>
          </li>
        </ul>

        <div className="table-box">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Name/Surname</th>
                <th scope="col">Current Location</th>
                <th scope="col">Cuisines</th>
                {/* <th scope="col">Location</th> */}
                {/* <th scope="col">Dietary restrictios</th>
								<th scope="col">Rating</th> */}
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredChefs.length > 0 ? (
                filteredChefs.map((filter) => (
                  <tr key={filter.id}>
                    {filter.pic ? (
                      <td className="chefs_pic">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/chef/users/" +
                            filter.pic
                          }
                          alt=""
                        />
                      </td>
                    ) : (
                      <td className="chefs_pic">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/placeholder.jpg"
                          }
                          alt=""
                        />
                      </td>
                    )}
                    <td>
                      {filter.name || ""} {filter.surname || ""}
                    </td>
                    <td>{filter.address || ""}</td>
                    <td>
                      <ul>
                        <ul>
                          {filter.cuisine_name
                            .split(",")
                            .map((cuisine, index) => {
                              if (index < 2) {
                                return <li key={index}>{cuisine}</li>;
                              } else if (index === 2) {
                                return (
                                  <li
                                    key={index}
                                    onClick={() => setShowAllCuisines(true)}
                                  >
                                    +{filter.cuisine_name.split(",").length - 2}
                                  </li>
                                );
                              }
                              return null;
                            })}
                        </ul>
                      </ul>
                    </td>
                    {/* <td>Ut pulvinar.</td> */}
                    {/* <td>Arcu nibh non.</td>
										<td>Eu nibh.</td> */}
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
                    </td>
                  </tr>
                ))
              ) : chefs.length > 0 ? (
                chefs.map((chef) => (
                  <tr key={chef.id}>
                    {chef.pic ? (
                      <td className="chefs_pic">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/chef/users/" +
                            chef.pic
                          }
                          alt=""
                        />
                      </td>
                    ) : (
                      <td className="chefs_pic">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                            "/images/placeholder.jpg"
                          }
                          alt=""
                        />
                      </td>
                    )}
                    <td>
                      {chef.name || ""} {chef.surname || ""}
                    </td>
                    <td>{chef.address || ""}</td>
                    <td>
                      {/* <ul>
                        <li>{chef.cuisine_name || ""}</li>
                        <li>Italian</li>
                        <li>+4</li>
                      </ul> */}

                      {/* <ul>
                        {chef.cuisine_name && (
                          <>
                            {chef.cuisine_name
                              .split(",")
                              .map((cuisine, index) => {
                                if (index < 2) {
                                  return <li key={index}>{cuisine}</li>;
                                } else if (index === 2) {
                                  return (
                                    <li
                                      key={index}
                                      onClick={() => setShowAllCuisines(true)}
                                    >
                                      +{chef.cuisine_name.split(",").length - 2}
                                    </li>
                                  );
                                }
                                return null;
                              })}
                          </>
                        )}
                      </ul>  */}

                       <ul>
                        {chef.cuisine_name && (
                          <>
                            {chef.cuisine_name
                              .split(",")
                              .map((cuisine, index) => {
                                if (index < 2) {
                                  return <li key={index}>{cuisine}</li>;
                                } else if (index === 2) {
                                  return (
                                    <li
                                      key={index}
                                      onClick={handleShowAllCuisines}
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapseCuisines"
                                      aria-expanded={showAllCuisines}
                                    >
                                      +{chef.cuisine_name.split(",").length - 2}
                                    </li>
                                  );
                                }
                                return null;
                              })}
                          </>
                        )}
                      </ul> 

                      <div
                        className={`collapse${showAllCuisines ? " show" : ""}`}
                        id="collapseCuisines"
                      >
                        <ul>
                          {chef.cuisine_name &&
                            chef.cuisine_name
                              .split(",")
                              .map((cuisine, index) => (
                                <li key={index}>{cuisine}</li>
                              ))}
                        </ul>
                      </div>
                    </td>
                    {/* <td>Ut pulvinar.</td> */}
                    {/* <td>Arcu nibh non.</td>
					<td>Eu nibh.</td> */}
                    <td>
                      <a href="#">
                        <i className="fa-solid fa-ellipsis"></i>
                      </a>
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
      <Pagination
        items={totalMenu.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      <PopupModal show={modalConfirm} handleClose={modalConfirmClose}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Cuisines
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="container chkbox">
                  <div className="row">
                    {getcuisine.map((cuisines, index) => (
                      <div className="col-sm-4" key={index}>
                        <input
                          type="checkbox"
                          value={cuisines.name}
                          onChange={handleCheckboxChange}
                          style={{ marginRight: "5px" }}
                        />
                        <label style={{ marginLeft: "5px" }}>
                          {cuisines.name}
                        </label>{" "}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Locations
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classNamees that we use to style each element. These
                classNamees control the overall appearance, as well as the
                showing and hiding via CSS transitions. You can modify any of
                this with custom CSS or overriding our default variables. It's
                also worth noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Dietaty Restrictions
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse show"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is
                hidden by default, until the collapse plugin adds the
                appropriate classNamees that we use to style each element. These
                classNamees control the overall appearance, as well as the
                showing and hiding via CSS transitions. You can modify any of
                this with custom CSS or overriding our default variables. It's
                also worth noting that just about any HTML can go within the{" "}
                <code>.accordion-body</code>, though the transition does limit
                overflow.
              </div>
            </div>
          </div>
        </div>
      </PopupModal>
    </>
  );
}