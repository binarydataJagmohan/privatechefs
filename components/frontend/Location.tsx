import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { getTestimonials } from "../../lib/adminapi";
import Head from "next/head";
import { getAllLocation } from "../../lib/frontendapi";
import {
  LocationSlug,
  PageSlug,
  Testimonial,
  LocationData,
  LocationFields,
} from "../../lib/types";

export default function Location(props: any) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [stars, setStar] = useState([]);
  const [pageslug, setSlug] = useState<PageSlug | null>(null);
  const [address, setAddress] = useState<LocationSlug[]>([]);
  const [locationData, setLocationData] = useState<LocationFields>();

  useEffect(() => {
    if (props) {
      setSlug(props.pages.data);
      setAddress(props.locations.data);
      setLocationData(props.singlelocationdata);
      fetchLocationDetails();
    }
  }, []);

  useEffect(() => {
    fetchTestimonialDetails();
  }, []);

  const fetchLocationDetails = async () => {
    try {
      const res = await getAllLocation();
      if (res.status) {
        setLocations(res.data);
      } else {
        console.log("error");
      }
    } catch (err: any) {
      console.log("error");
    }
  };

  const fetchTestimonialDetails = async () => {
    try {
      const res = await getTestimonials();
      if (res.status) {
        setTestimonials(res.data);
        setStar(res.data.stars);
      } else {
        console.log(res.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleStarHover = (num: number) => {
    const starColor = num > 0 ? "#ff4e00d1" : "#ff4e00d1";
    const stars = document.querySelectorAll(".fa-star");
    stars.forEach((star, index) => {
      (star as HTMLElement).style.color = index < num ? starColor : "#ff4e00d1";
    });
  };

  const settings = {
    rows: 1,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  };
  return (
    <>
      <Head>
        <title>
          {pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}
        </title>
        <meta
          name="description"
          content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`}
        />
      </Head>
      <section className="banner-part p-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <img
                src={
                  locationData?.image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/location/${locationData.image}`
                    : "/images/placeholder.jpg"
                }
                alt="slider-1"
                id="single-img1"
                className="w-100 border-0 banner-left"
              />
            </div>
            <div className="col-sm-6">
              <div className="pages-text pt-4 mt-5">
                <h1>{locationData?.location ? locationData?.location : ""}</h1>
                <div className="banner-btn mb-4">
                  <a href="/bookings/step1">Start your journey</a>
                </div>
                <div className="">
                  <>
                    {locationData?.heading_one || "Culinary Odyssey in"}{" "}
                    {locationData?.location} <br />
                    <br></br>
                    {locationData?.peragraph_one}
                    <br></br>
                    <br></br>
                    {/* Indulge in the extraordinary, where the ancient spirit of
                    Athens meets the modern magic of Private Chefs World. */}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-part mt-5" id="boxes-id">
        <div className="container">
          <h2 className="text-uppercase">
            {locationData?.heading_two || "How it works?"}{" "}
          </h2>
          <div className="services-id">
            <p className="dis-max-width mb-3 text-uppercase">
              {locationData?.heading_three ||
                "We know chefs. We know the materials. We deliver results."}
            </p>
          </div>
          <p className="dis-max-width mb-4 text-capital">
            {locationData?.peragraph_two ||
              "The aim of our service is to make the booking process from choosing a menu to the arrival of your Private Chefs (at the place & time you want them) as quick & easy as possible for you."}
          </p>
          <div className="row g-3 mt-5">
            <div className="col-lg-4 col-md-6">
              <div className="num-list h-100" id="num-list-id">
                <h4>
                  <span className="big-48" id="big-id">
                    <i className="fa-solid fa-spoon"></i>
                  </span>{" "}
                </h4>
                <h4>
                  {" "}
                  {locationData?.heading_box_one || "We tailor your menu"}
                </h4>
                <p>
                  {locationData?.peragraph_box_one ||
                    "Every menu is tailored specifically for you and your guests."}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="num-list h-100" id="num-list-id">
                <h4>
                  <span className="big-48">
                    <i className="fas fa-bacon"></i>
                  </span>{" "}
                </h4>
                <h4>
                  {locationData?.heading_box_two || "We buy the ingredients"}
                </h4>
                <p>
                  {locationData?.peragraph_box_two ||
                    "All shopping is taken care by our Chefs prior their arrival."}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="num-list h-100" id="num-list-id">
                <h4>
                  <span className="big-48">
                    <i className="fa-solid fa-kitchen-set"></i>
                  </span>{" "}
                </h4>
                <h4>
                  {" "}
                  {locationData?.heading_box_three || "We cook in your kitchen"}
                </h4>
                <p>
                  {locationData?.peragraph_box_three ||
                    "All the magic is prepared before your eyes in your own house."}
                </p>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-lg-4 mt-1">
            <div className="col-lg-2 col-md-12 d-none d-lg-block"> </div>
            <div className="col-lg-4 col-md-6">
              <div className="num-list h-100" id="num-list-id">
                <h4>
                  <span className="big-48">
                    <i className="fa-solid fa-cutlery"></i>
                  </span>{" "}
                </h4>
                <h4>
                  {locationData?.heading_box_four || "We serve each dish"}
                </h4>
                <p>
                  {locationData?.peragraph_box_four ||
                    "All dishes are served by our Chefs so you can relax and enjoy."}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="num-list h-100" id="num-list-id">
                <h4>
                  <span className="big-48">
                    <i className="fa-solid fa-brush"></i>
                  </span>
                </h4>
                <h4>{locationData?.heading_box_five || "We clean up"} </h4>
                <p>
                  {locationData?.peragraph_box_five ||
                    "Don't worry about cleaning. Just sit and enjoy your experience."}
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 d-none d-lg-block"> </div>
          </div>
        </div>
      </section>

      <section className="services-part location-how mt-5 mobile-m-0">
        <div className="container">
          <h2>{locationData?.heading_four || "Chefs for this location"}</h2>
          <p className="dis-max-width mb-4">
            {locationData?.peragraph_four ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris."}
          </p>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <Slider {...settings}>
              {address.map((location: any, index: any) => (
                <div className="col-lg-2 col-md-6" key={index}>
                  <div className="slider-img-plase" id="location-img">
                    {location.pic ? (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/chef/users/" +
                          location.pic
                        }
                        alt="2"
                      />
                    ) : (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_IMAGE_URL +
                          "/images/users.jpg"
                        }
                        alt="2"
                      />
                    )}
                    <p className="plase-btn">
                      {location.address ? (
                        <a href={`/privatechef/${location.slug}`}>
                          Chef {location.name && location.name.split(" ")[0]}
                        </a>
                      ) : (
                        <span></span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* <div className="text-center view-more mt-4"><a href="#">View More</a></div> */}
        </div>
      </section>

      <section className="services-part location-how mt-5 mobile-m-0">
        <div className="container">
          <h2>{locationData?.heading_five || "Our customers said"}</h2>
          <p className="dis-max-width mb-4">
            {locationData?.peragraph_five ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt lobortis sed mauris."}{" "}
          </p>
          <div className="row mt-5 g-3">
            {testimonials.slice(0, 3).map((testimonial: any, index: any) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div
                  className="step-box text-center customers-review py-4"
                  id="test-img"
                  style={{ height: "300px" }}
                >
                  {testimonial.image ? (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        "/images/admin/testimonial/" +
                        testimonial.image
                      }
                      alt="ava4"
                    />
                  ) : (
                    <img
                      src={
                        process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"
                      }
                      alt="ava4"
                    />
                  )}
                  <h4>{testimonial.name}</h4>
                  <p className="star-list blue-star" id="star-color">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <i
                        key={num}
                        className={`fa${
                          num <= testimonial.stars ? "s" : "r"
                        } fa-star`}
                        onMouseEnter={() => handleStarHover(num)}
                        onClick={() => setStar(stars)}
                      />
                    ))}
                  </p>
                  <p>{testimonial.description.slice(0, 200)}.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-slider mt-5">
        <div className="container">
          <h2 className="text-center">
            {locationData?.heading_Six || "Things to explore"}
          </h2>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <Slider {...settings}>
              {locations.map((location: any, index) => (
                <div className="col-lg-2 col-md-6" key={index}>
                  <a
                    href={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "location/" +
                      location.location_slug
                    }
                  >
                    <div className="slider-img-plase" id="location_idd">
                      <img
                        src={
                          location?.location_image
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/location/${location.location_image}`
                            : "/images/placeholder.jpg"
                        }
                        id="loc_id"
                        alt="slider-1"
                      />
                      <p className="plase-btn">
                        <a
                          href={
                            process.env.NEXT_PUBLIC_BASE_URL +
                            "location/" +
                            location.location_slug
                          }
                        >
                          {location.location_name.slice(0, 35)}
                        </a>
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
