import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { getAllTopRatedChef } from "../../lib/frontendapi";
import Head from "next/head";

export default function OurLocations(props: any) {
  interface PageSlug {
    name: string;
    slug: string;
    meta_desc: string;
    meta_tag: string;
  }

  const [allchef, setAllChef] = useState([]);

  const [pageslug, setSlug] = useState<PageSlug | null>(null);

  useEffect(() => {
    if (props) {
      setSlug(props.pages.data);
      //console.log(props.pages.data);
    }
  }, []);

  useEffect(() => {
    fetchBookingAdminDetails();
  }, []);

  const fetchBookingAdminDetails = async () => {
    const res = await getAllTopRatedChef();
    if (res.status) {
      setAllChef(res.data);
    }
  };

  const settings = {
    rows: 1,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    //slidesToScroll: 1,
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
        <title>{pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}</title>
        <meta name="description" content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`} />
      </Head>
      <section className="banner-part p-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/banner-4.jpg"} alt="banner-4" className="w-100 border-0 banner-left" />
            </div>
            <div className="col-sm-6">
              <div className="banner-text pages-text">
                <h1>Our chefs</h1>
                <div className="banner-btn mb-5">
                  <a href="/bookings/step1">Start your journey</a>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus
                  tincidunt lobortis sed mauris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-part location-how mt-5 mobile-m-0">
        <div className="container">
          <h2>Related chefs</h2>
          <p className="dis-max-width mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie laoreet eget penatibus cum lectus. Accumsan, in odio bibendum praesent sollicitudin. Nascetur sapien sollicitudin eu consequat. Sem sed accumsan aliquet dapibus tincidunt
            lobortis sed mauris.
          </p>
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <Slider {...settings}>
              {allchef.map((data) => (
                <div className="col-lg-2 col-md-6">
                  <div className="slider-img-plase" id="chef-img">
                    {data.pic ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/chef/users/" + data.pic} alt="2" id="chef_id" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="2" id="chef_id" />}
                    <p className="plase-btn">
                      <a href="/frontchefs">{data.name}</a>
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
