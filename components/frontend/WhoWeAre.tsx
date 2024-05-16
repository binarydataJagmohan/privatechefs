import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getTestimonials } from "../../lib/adminapi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WhoWeAre(props: any) {
  interface PageSlug {
    name: string;
    slug: string;
    meta_desc: string;
    meta_tag: string;
  }

  interface Testimonial {
    id: number;
    stars: number;
    name: string;
    description: string;
    image: string;
  }

  const [pageslug, setSlug] = useState<PageSlug | null>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stars, setStar] = useState([]);

  useEffect(() => {
    if (props) {
      setSlug(props.pages.data);
      fetchTestimonialDetails();
    }
  }, []);

  const fetchTestimonialDetails = async () => {
    try {
      const res = await getTestimonials();
      if (res.status) {
        setTestimonials(res.data);
        setStar(res.data.stars);
        //console.log(res.data);
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
    } catch (err: any) {}
  };

  const handleStarHover = (num: number) => {
    const starColor = num > 0 ? "#ff4e00d1" : "#ff4e00d1";
    const stars = document.querySelectorAll(".fa-star");
    stars.forEach((star, index) => {
      (star as HTMLElement).style.color = index < num ? starColor : "#ff4e00d1";
    });
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
              <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/banner-7.jpg"} alt="banner-4" className="w-100 border-0 banner-left" />
            </div>
            <div className="col-sm-6">
              <div className="banner-text pages-text">
                <h1>
                  <span className="sab-title-banner">What is</span> <br />
                  Private Chefs?
                </h1>
                <div className="banner-btn mb-5">
                  <a href="/bookings/step1">Start your journey</a>
                </div>
                <p>Private Chefs World, is more than just a culinary service. We are a global culinary movement, operating in 30 countries and powered by a passionate team of over 2500 talented chefs. </p>
                <p>
                  We're the curators of extraordinary dining experiences, bringing the world's flavors to your Villa, Estate, or Yacht. Whether you're seeking fine dining perfection or a deep dive into culinary culture, we're here to tantalize your
                  taste buds and deliver an unparalleled experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-part location-how mt-5 mobile-m-0">
        <div className="container">
          <h2>About us</h2>
          <p className="dis-max-width mb-4">At Private Chefs World, we are dedicated to elevating your dining experience. Our team is driven by a shared passion for exceptional cuisine and culinary innovation.</p>
          <p className="dis-max-width mb-4">We believe that every meal is an opportunity to explore new flavors and create unforgettable memories. Our commitment to excellence ensures that each dish we serve is a masterpiece in its own right.</p>
          <p className="dis-max-width mb-4">With a focus on fine dining and a deep respect for culinary traditions, we bring the world's flavors to your table, all within the comfort of your Villa, Estate, or Yacht.</p>
          <p className="dis-max-width mb-4">Welcome to a culinary journey where your taste is our top priority, and your dining experience is truly exceptional.</p>
        </div>
      </section>

      <section className="events-part mobile-p-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="text-same-formatting top-pad text-right mobile-left tab-m-0 left-areya">
                {/* <h2>Mission</h2> */}
                <h2>
                  Alex Samoilis -<br /> The Man Behind the Scenes
                </h2>
                <p className="mt-3 mb-3 max-80 tab-m-0 f-r ">
                  Meet Alex Samoilis, the culinary visionary behind Private Chefs World. With a Michelin star and the prestigious title of Ambassador of Taste for Global Gastronomy, his culinary journey is nothing short of exceptional.
                </p>
                <p className="mb-3 max-80 tab-m-0 f-r ">
                  A blend of Greek and Mexican heritage has enhanced his palate from a young age, and his passion for celebrating diverse flavors has taken him around the world. His experiences range from renowned establishments like The Fat Duck UK
                  to Gordon Ramsay's three Michelin-starred restaurant in London.
                </p>
                <p className="mb-3 max-80 tab-m-0 f-r ">
                  As the owner of Private Chefs World, Alex has delighted the palates of dignitaries and celebrities from all corners of the globe, including the likes of the Prince of Qatar, Princes of Morocco, Bruce Willis, Tom Hanks, Dr. Oz, Grant
                  and Elena Cardone, Will Smith, and Giannis Antetokounmpo, as well as government high-ranked officials from various countries.
                </p>
                <p className="mb-3 max-80 tab-m-0 f-r ">His vision is to make every meal a cultural exploration, a celebration of flavor. Welcome to the culinary world of Alex Samoilis, where excellence knows no bounds.</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="side-img">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/AlexSamoilis.jpg"} alt="banner-4" className="w-100 border-0 banner-left" />
              </div>
            </div>
            <div className="text-same-formatting mt-5 mobile-left ">
              <div className="max-80 f-r text-cen">
                <h2 className="mt-5 tab-m-0 text-center">Our vision</h2>
                <p className=" mb-3 tab-m-0 ">
                  At Private Chefs World, we believe in the magic of culinary artistry, where every dish is a love story waiting to be told. Our vision is inspired by the passion and dedication of Alex Samoilis, a culinary visionary with a heart
                  filled with flavors from around the world.
                </p>
                <p className=" mb-3 tab-m-0 ">
                  Our dream is to create a culinary world where every meal is a cherished memory, a taste of enchantment, and an exploration of love for food. We envision a global dining experience where the boundaries of culture dissolve, and
                  flavors from diverse corners of the world dance on your palate.
                </p>
                <p className=" mb-3 tab-m-0 ">
                  Our goal is to craft a journey that nourishes not just your body but also your soul. We aim to spark connections, ignite passion, and inspire culinary exploration. The flavors on your plate will tell stories of ancient cultures,
                  vibrant celebrations, and the joy of savoring life's delights.
                </p>
                <p className=" mb-3 tab-m-0 ">
                  As we move forward, we continue to embrace the essence of culinary love and adventure. We see Private Chefs World as a platform for lovers of food, where the romance of flavors and the art of dining take center stage. We envision a
                  world where every meal is an ode to love, culture, and shared experiences.
                </p>
                <p className=" mb-3 tab-m-0 ">
                  Join us on this culinary story and savor the taste of our vision. With each meal we create, we hope to ignite the same love and passion for food that has been the driving force behind Alex Samoilis's culinary journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-side">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/Secondphoto.jpg"} alt="7" className="border-radius" />
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="contant-box mt-5 mt-0-1024">
                <h2>Design your next experience</h2>
                <p>
                  At Private Chefs World, we believe that every moment deserves a touch of extraordinary. Our feature empowers you to create a culinary journey as unique as you are. Whether it's an intimate dinner for two, a lavish celebration, or a
                  themed event, we offer a canvas for your imagination. Select from our team of world-class chefs, butlers, waiters, and bartenders to craft a one-of-a-kind experience that reflects your tastes and aspirations. Together, we'll bring
                  your vision to life, ensuring that every detail is tailored to perfection, from the menu to the ambiance. Your next memorable experience awaits – let's design it together.
                </p>
                <div className="banner-btn">
                  <a href="/bookings/step1">Start your journey</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-part mt-2">
        <div className="container">
          <h2 className="text-center">What they say about us...</h2>
          <h4 className="text-center">So proud to create such beautiful memories!</h4>
          <div className="row">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div className="col-lg-4 col-md-12" key={testimonial.id}>
                <div className="test-box">
                  <p>{testimonial.description.slice(0, 200)}.</p>
                  <div className="row">
                    <div className="col-3" id="test-img">
                      {testimonial.image ? <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/admin/testimonial/" + testimonial.image} alt="ava4" /> : <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "/images/users.jpg"} alt="ava4" />}
                    </div>
                    <div className="col-9">
                      <div className="say">
                        <h5 className="mt-2">{testimonial.name}</h5>
                        {/* <p className="font-12"> */}
                        <p className="star-list blue-star" id="star-color">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <i key={num} className={`fa${num <= testimonial.stars ? "s" : "r"} fa-star`} onMouseEnter={() => handleStarHover(num)} onClick={() => setStar(stars)} />
                          ))}
                        </p>
                        {/* </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-part text-center">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-3">
              <div className="customers">
                <p>10,500</p>
                <span>Happy customers</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="customers">
                <p>3,800</p>
                <span>Bookings</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="customers">
                <p>2,500</p>
                <span>Chefs</span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="customers">
                <p>30</p>
                <span>Countries operating​</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-part mt-5">
        <div className="container">
          <h2>Instagram Feed</h2>
          <div className="row  mt-5">
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/1.jpg"} alt="logo-1" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst ">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/2.jpg"} alt="logo-2" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/3.jpg"} alt="logo-3" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/4.jpg"} alt="logo-4" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/5.jpg"} alt="logo-5" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/6.jpg"} alt="logo-6" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/7.jpg"} alt="logo-7" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/8.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/9.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/10.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/11.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/12.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/13.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/14.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/15.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/16.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/17.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/18.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/19.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/20.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/21.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/22.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/23.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/24.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/25.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/26.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/27.jpg"} alt="logo-8" />
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="logos width-set-inst">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/instragram-feed/28.jpg"} alt="logo-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-part">
        <div className="container">
          <h2>Trusted by pioneers around the world</h2>
          <p>
            Serving exelence and quality services to clients around the globe. <br /> Our paramount priority? You...
          </p>

          <div className="row   mt-5">
            <div className="col-lg-4 col-md-6 col-6">
              <div className="logos img-set-log">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo-1.png"} alt="logo-1" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-6">
              <div className="logos img-set-log">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo-2.png"} alt="logo-2" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-6">
              <div className="logos img-set-log">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo-3.png"} alt="logo-3" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-6">
              <div className="logos img-set-log">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo-4.png"} alt="logo-4" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-6">
              <div className="logos img-set-log">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo-5.png"} alt="logo-5" />
              </div>
            </div>

            {/* <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-1.png'} alt="logo-7" />
                            </div>
                        </div> */}
            <div className="col-lg-4 col-md-6 col-6">
              <div className="logos img-set-log">
                <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/logo-8.png"} alt="logo-8" />
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-6 col-6">
                            <div className="logos img-set-log">
                                <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/logo-6.png'} alt="logo-6" style={{objectFit:'cover'}} className="w-100"/>
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
