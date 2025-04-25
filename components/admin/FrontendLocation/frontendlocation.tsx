import React, { useState, useEffect } from "react";
import {
  getSingleLocationById,
  SaveFrontendLocation,
  UpdateFrontendLocation,
} from "../../../lib/adminapi";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { showToast } from "../../commoncomponents/toastUtils";
import { Errors } from "../../../lib/types";
import { isPageVisibleToRole } from "../../../helpers/isPageVisibleToRole";
import Link from "next/link";

export default function FrontendLocation(props: any) {
  const [locationName, setLocationName] = useState("");
  const [headingOne, setHeadingOne] = useState("");
  const [peragraphOne, setParagraphOne] = useState("");
  const [headingTwo, sethHeadingTwo] = useState("");
  const [headingThree, setHeadingThree] = useState("");
  const [peragraphTwo, setParagraphTwo] = useState("");
  const [headingBoxOne, setheadingBoxOne] = useState("");
  const [peragraphBoxOne, setParagraphBoxOne] = useState("");
  const [headingBoxTwo, setHeadingBoxTwo] = useState("");
  const [peragraphBoxTwo, setParagraphBoxTwo] = useState("");
  const [headingBoxThree, setHeadingBoxThree] = useState("");
  const [peragraphBoxThree, setParagraphBoxThree] = useState("");
  const [headingBoxFour, setHeadingBoxFour] = useState("");
  const [peragraphBoxFour, setParagraphBoxFour] = useState("");
  const [heading_box_five, setHeadingBoxFive] = useState("");
  const [peragraphBoxFive, setParagraphBoxFive] = useState("");
  const [headingFour, setHeadingFour] = useState("");
  const [peragraphFour, setParagraphFour] = useState("");
  const [headingFive, setHeadingFive] = useState("");
  const [peragraphFive, setParagraphFive] = useState("");
  const [headingSix, setHeadingSix] = useState("");
  const [selectedImage, setSelectedImage]: any = useState(null);
  const [buttonStatus, setButtonState] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [singleLocationData, setLocationData] = useState([]);

  const router = useRouter();
  let id = props.locationId;
  const imageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSaveLocation = (event: any) => {
    event.preventDefault();

    const newErrors: any = {};
    // Validate all fields
    if (!locationName) newErrors.location = "Location is required";
    if (!headingOne) newErrors.heading_one = "Heading One is required";
    if (!peragraphOne) newErrors.peragraph_one = "Paragraph One is required";
    if (!headingTwo) newErrors.heading_two = "Heading Two is required";
    if (!headingThree) newErrors.heading_three = "Heading Three is required";
    if (!peragraphTwo) newErrors.peragraph_two = "Paragraph Two is required";
    if (!selectedImage) newErrors.image = "Image is required";

    if (!headingBoxOne)
      newErrors.heading_box_one = "Heading Box One is required";
    if (!peragraphBoxOne)
      newErrors.peragraph_box_one = "Paragraph Box One is required";
    if (!headingBoxTwo)
      newErrors.heading_box_two = "Heading Box Two is required";
    if (!peragraphBoxTwo)
      newErrors.peragraph_box_two = "Paragraph Box Two is required";
    if (!headingBoxThree)
      newErrors.heading_box_three = "Heading Box Three is required";
    if (!peragraphBoxThree)
      newErrors.peragraph_box_three = "Paragraph Box Three is required";
    if (!headingBoxFour)
      newErrors.heading_box_four = "Heading Box Four is required";
    if (!peragraphBoxFour)
      newErrors.peragraph_box_four = "Paragraph Box Four is required";
    if (!heading_box_five)
      newErrors.heading_box_five = "Heading Box Five is required";
    if (!peragraphBoxFive)
      newErrors.peragraph_box_five = "Paragraph Box Five is required";

    if (!headingFour) newErrors.heading_four = "Heading Four is required";
    if (!peragraphFour) newErrors.peragraph_four = "Paragraph Four is required";

    if (!headingFive) newErrors.heading_five = "Heading Five is required";
    if (!peragraphFive) newErrors.peragraph_five = "Paragraph Five is required";
    if (!headingSix) newErrors.heading_Six = "Heading Six is required";

    setErrors(newErrors); // update UI

    if (Object.keys(newErrors).length > 0) {
      return; // Stop submission if any field is invalid
    }
    const data = {
      location: locationName || "",
      image: selectedImage ? selectedImage : null,
      heading_one: headingOne || "",
      peragraph_one: peragraphOne || "",
      heading_two: headingTwo || "",
      heading_three: headingThree || "",
      peragraph_two: peragraphTwo || "",
      heading_box_one: headingBoxOne || "",
      peragraph_box_one: peragraphBoxOne || "",
      heading_box_two: headingBoxTwo || "",
      peragraph_box_two: peragraphBoxTwo || "",
      heading_box_three: headingBoxThree || "",
      peragraph_box_three: peragraphBoxThree || "",
      heading_box_four: headingBoxFour || "",
      peragraph_box_four: peragraphBoxFour || "",
      heading_box_five: heading_box_five || "",
      peragraph_box_five: peragraphBoxFive || "",
      heading_four: headingFour || "",
      peragraph_four: peragraphFour || "",
      heading_five: headingFive || "",
      peragraph_five: peragraphFive || "",
      heading_Six: headingSix || "",
      id: id || null,
    };
    const apiCall = id
      ? UpdateFrontendLocation(data, id)
      : SaveFrontendLocation(data);

    apiCall
      .then((res) => {
        if (res.status === true) {
          showToast("success", res.message);
          router.push("/admin/cms");
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

  const getSingleLocationData = async () => {
    getSingleLocationById(id)
      .then((res) => {
        if (res.status == true) {
          const data = res.data;
          setLocationData(res.data);
          setLocationName(data.location || "");
          setHeadingOne(data.heading_one || "");
          setParagraphOne(data.peragraph_one || "");
          sethHeadingTwo(data.heading_two || "");
          setHeadingThree(data.heading_three || "");
          setParagraphTwo(data.peragraph_two || "");
          setheadingBoxOne(data.heading_box_one || "");
          setParagraphBoxOne(data.peragraph_box_one || "");
          setHeadingBoxTwo(data.heading_box_two || "");
          setParagraphBoxTwo(data.peragraph_box_two || "");
          setHeadingBoxThree(data.heading_box_three || "");
          setParagraphBoxThree(data.peragraph_box_three || "");
          setHeadingBoxFour(data.heading_box_four || "");
          setParagraphBoxFour(data.peragraph_box_four || "");
          setHeadingBoxFive(data.heading_box_five || "");
          setParagraphBoxFive(data.peragraph_box_five || "");
          setHeadingFour(data.heading_four || "");
          setParagraphFour(data.peragraph_four || "");

          setHeadingFive(data.heading_five || "");
          setParagraphFive(data.peragraph_five || "");
          setHeadingSix(data.heading_Six || "");

          if (data.image) {
            setSelectedImage(
              `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/location/${data.image}`
            );
          }
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const data = isPageVisibleToRole("admin-frontendlocations");
    if (data == 2) {
      window.location.href = "/login";
    } else if (data == 0) {
      window.location.href = "/404";
    }
    if (data == 1) {
      getSingleLocationData();
    }
  }, []);

  return (
    <>
      <div className="table-part">
        <Link href="/admin/cms">
          <button className="table-btn mb-4">Back</button>
        </Link>
        <h5>Add Location</h5>
        <div className="tab-part change-btn-colors">
          <div className="tab-content mt-4" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <form onSubmit={handleSaveLocation}>
                <div className="row">
                  <div
                    className="col-lg-12 col-md-12"
                    style={{ padding: "20px" }}
                  >
                    <div className="all-form">
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <label>Location Name</label>
                          <input
                            type="text"
                            name="location"
                            onChange={(e) => setLocationName(e.target.value)}
                            value={locationName}
                          />
                          {errors.location && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.location}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading One</label>
                          <input
                            type="text"
                            name="heading_one"
                            onChange={(e) => setHeadingOne(e.target.value)}
                            value={headingOne}
                          />
                          {errors.heading_one && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_one}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Two</label>
                          <input
                            type="text"
                            name="heading_two"
                            onChange={(e) => sethHeadingTwo(e.target.value)}
                            value={headingTwo}
                          />
                          {errors.heading_two && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_two}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Three</label>
                          <input
                            id="address-input"
                            type="text"
                            name="heading_three"
                            onChange={(e) => setHeadingThree(e.target.value)}
                            value={headingThree}
                          />
                          {errors.heading_three && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_three}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph One</label>
                          <textarea
                            // type="text"
                            name="peragraph_one"
                            onChange={(e) => setParagraphOne(e.target.value)}
                            value={peragraphOne}
                          />
                          {errors.peragraph_one && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_one}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Two</label>
                          <textarea
                            // type="text"
                            name="peragraph_two"
                            onChange={(e) => setParagraphTwo(e.target.value)}
                            value={peragraphTwo}
                          />

                          {errors.peragraph_two && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_two}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading box One</label>
                          <input
                            type="text"
                            name="heading_box_one"
                            onChange={(e) => setheadingBoxOne(e.target.value)}
                            value={headingBoxOne}
                          />

                          {errors.heading_box_one && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_box_one}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Box Two</label>
                          <input
                            type="text"
                            name="heading_box_two"
                            onChange={(e) => setHeadingBoxTwo(e.target.value)}
                            value={headingBoxTwo}
                          />

                          {errors.heading_box_two && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_box_two}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Box Three</label>
                          <input
                            type="text"
                            name="heading_box_three"
                            onChange={(e) => setHeadingBoxThree(e.target.value)}
                            value={headingBoxThree}
                          />

                          {errors.heading_box_three && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_box_three}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Box One</label>
                          <textarea
                            // type="text"
                            name="peragraph_box_one"
                            onChange={(e) => setParagraphBoxOne(e.target.value)}
                            value={peragraphBoxOne}
                          />

                          {errors.peragraph_box_one && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_box_one}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph box Two</label>
                          <textarea
                            // type="text"
                            name="peragraph_box_two"
                            onChange={(e) => setParagraphBoxTwo(e.target.value)}
                            value={peragraphBoxTwo}
                          />

                          {errors.peragraph_box_two && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_box_two}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Box Three</label>
                          <textarea
                            // type="text"
                            name="peragraph_box_three"
                            onChange={(e) =>
                              setParagraphBoxThree(e.target.value)
                            }
                            value={peragraphBoxThree}
                          />

                          {errors.peragraph_box_three && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_box_three}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Box Four</label>
                          <input
                            type="text"
                            name="heading_box_four"
                            onChange={(e) => setHeadingBoxFour(e.target.value)}
                            value={headingBoxFour}
                          />

                          {errors.heading_box_four && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_box_four}
                            </span>
                          )}
                        </div>{" "}
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Box Five</label>
                          <input
                            type="text"
                            name="heading_box_five"
                            onChange={(e) => setHeadingBoxFive(e.target.value)}
                            value={heading_box_five}
                          />

                          {errors.heading_box_five && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_box_five}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Four</label>
                          <input
                            type="text"
                            name="heading_four"
                            onChange={(e) => setHeadingFour(e.target.value)}
                            value={headingFour}
                          />

                          {errors.heading_four && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_four}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Box Four</label>
                          <textarea
                            // type="text"
                            name="peragraph_box_four"
                            onChange={(e) =>
                              setParagraphBoxFour(e.target.value)
                            }
                            value={peragraphBoxFour}
                          />

                          {errors.peragraph_box_four && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_box_four}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Box Five</label>
                          <textarea
                            // type="text"
                            name="peragraph_box_five"
                            onChange={(e) =>
                              setParagraphBoxFive(e.target.value)
                            }
                            value={peragraphBoxFive}
                          />

                          {errors.peragraph_box_five && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_box_five}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Four</label>
                          <textarea
                            // type="text"
                            name="peragraph_four"
                            onChange={(e) => setParagraphFour(e.target.value)}
                            value={peragraphFour}
                          />

                          {errors.peragraph_four && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_four}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Five</label>
                          <input
                            type="text"
                            name="heading_five"
                            onChange={(e) => setHeadingFive(e.target.value)}
                            value={headingFive}
                          />

                          {errors.heading_five && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_five}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Heading Six</label>
                          <input
                            type="text"
                            name="heading_Six"
                            onChange={(e) => setHeadingSix(e.target.value)}
                            value={headingSix}
                          />

                          {errors.heading_Six && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.heading_Six}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6"></div>
                        <div className="col-lg-4 col-md-6">
                          <label>Paragraph Five</label>
                          <textarea
                            // type="text"
                            name="peragraph_five"
                            onChange={(e) => setParagraphFive(e.target.value)}
                            value={peragraphFive}
                          />

                          {errors.peragraph_five && (
                            <span className="small error text-danger mb-2 d-inline-block error_login">
                              {errors.peragraph_five}
                            </span>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-6">
                          <label>Location Image</label>
                          <div className="text-left">
                            <div className="picture-profile">
                              <div className="user-img2 set-change-img">
                                {selectedImage ? (
                                  <img
                                    src={
                                      typeof selectedImage === "string"
                                        ? selectedImage
                                        : URL.createObjectURL(selectedImage)
                                    }
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/placeholder.jpg`}
                                    alt=""
                                  />
                                )}
                                <label>
                                  <input
                                    type="file"
                                    name="image"
                                    id="uploadfile"
                                    className="d-none"
                                    onChange={imageChange}
                                    accept=".jpg, .jpeg, .gif, .png, .webp"
                                  />
                                  <i className="fa-solid fa-camera"></i>
                                </label>
                                {errors.image && (
                                  <span className="small error text-danger d-inline-block mt-2">
                                    {errors.image}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button className="table-btn" disabled={buttonStatus}>
                    {buttonStatus ? "Please wait.." : "Save Location"}
                  </button>
                </div>
                <hr />
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
