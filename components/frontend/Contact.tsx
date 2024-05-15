import React, { useState, useEffect } from 'react'
import { saveContact } from "../../lib/frontendapi";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Head from 'next/head';
import { showToast } from '../commoncomponents/toastUtils';

export default function Contact(props: any) {

    interface PageSlug {
        name: string;
        slug: string;
        meta_desc: string;
        meta_tag: string;
    }

    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_no, setPhoneno] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors]: any = useState({});
    const [buttonStatus, setButtonState] = useState(false);
    const [activeButton, setActiveButton] = useState('button1');

    const [pageslug, setSlug] = useState<PageSlug | null>(null);

    useEffect(() => {
        if (props) {
            setSlug(props.pages.data);
        }

    }, []);

    const handleButtonClick = (button: any) => {
        setActiveButton(button);
    };

    const handleContactSubmit = (e: any) => {
        e.preventDefault();
        // Validate form data
        const errors: any = {};
        if (!name) {
            errors.name = "Name is required";
        }
        if (!email) {
            errors.email = "Email is required";
        }
        if (!phone_no) {
            errors.phone_no = "Phone No. is required";
        }
        if (!message) {
            errors.message = "Message is required";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            setButtonState(true);
            // Call an API or perform some other action to register the user
            const data = {
                name: name,
                email: email,
                phone_no: phone_no,
                message: message,
            };

            saveContact(data)
                .then(res => {
                    if (res.status == true) {
                        console.log(res.status);
                        setButtonState(false);
                        showToast('success', res.message);

                    } else {
                        setButtonState(false);
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            closeButton: true,
                            hideProgressBar: false,
                            style: {
                                background: '#ffff',
                                borderLeft: '4px solid #e74c3c',
                                color: '#454545',
                            },
                            progressStyle: {
                                background: '#ffff',
                            },
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    return (
        <>
            <Head>
                <title>{pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}</title>
                <meta name="description" content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`} />
            </Head>
            <section className="banner-part ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/contact.jpg'} alt="banner-6" className="w-100   img-b" />
                            {/* <img src={process.env.NEXT_PUBLIC_BASE_URL + 'images/banner-6.jpg'} alt="banner-6" className="w-100   img-b" /> */}
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <form onSubmit={handleContactSubmit}>
                                <div className="all-form" id="formid">
                                    <h2>Contact us</h2>
                                    <label>Name Surname</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        placeholder="Name Surname"
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                    {errors.name && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.name}</span>}
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.email}</span>}
                                    <label>Phone Number</label>
                                    <PhoneInput
                                        country={"us"}
                                        value={phone_no}
                                        placeholder="Phone Number"
                                        onChange={(phone_no) => setPhoneno(phone_no)}
                                    // add the required attribute here
                                    />
                                    {errors.phone_no && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.phone_no}</span>}
                                    <label>Your message</label>
                                    <textarea name="message" value={message || ''} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message"></textarea>
                                    {errors.message && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.message}</span>}
                                    <div className="text-right" id="contact-fromid">
                                        <button className="table-btn" type="submit" disabled={buttonStatus}>{buttonStatus ? 'Please wait..' : 'Save Contact Information'}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq-part" id="faq">
                <div className="container">
                    <h3>Frequently Asked Questions (FAQ)</h3>
                    <ul className="table_header_button_section mt-5" >
                        <li><button onClick={() => handleButtonClick('button1')}
                            className={`table-btn btn-2 ${activeButton === 'button1' ? 'btn-class' : ''}`}
                        >Guest area</button></li>
                        <li><button onClick={() => handleButtonClick('button2')}
                            className={`table-btn btn-2 ${activeButton === 'button2' ? 'btn-class1' : ''}`}>Chefs area</button></li>

                        <li><button onClick={() => handleButtonClick('button3')}
                            className={`table-btn btn-2 ${activeButton === 'button3' ? 'btn-class2' : ''}`}>Cancelation policy</button></li>
                    </ul>
                    {activeButton === 'button1' && (
                        <div className="accordion-part mt-5">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            What is Private Chefs?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Private Chefs World, is more than just a culinary service. We are a global culinary movement, operating in 30 countries and powered by a passionate team of over 2500 talented chefs.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How Can I Hire a Chef Through Private Chefs?                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Hiring a chef through Private Chefs is a straightforward process. Simply go through our booking process and request the type of experience that you wish. One of our destination specialists will communicate with you to discuss further details regarding your enquiry and your preferences. When we will have all the necessary information, we will introduce to you Chefs that match your preferences and type of cuisine you wish to explore. Its up to you then to choose the Chef that best matches your style, and you are ready to begin your culinary journey.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Who Are Our Chefs?                                         </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Our Chefs are culinary artists from around the world, each with their unique style and expertise. They are carefully selected based on their culinary talents, creativity, and passion for delivering extraordinary dining experiences.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading4">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                            Why Choose to Book a Private Chefs?
                                        </button>
                                    </h2>
                                    <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Booking a Private Chefs means you can enjoy a dining experience customized just for you in the comfort of your own space. You get to relax, focus on your guests, and relish a menu that perfectly matches your tastes, dietary needs, and cultural preferences.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading5">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">

                                            Can I communicate with the Chef Prior to Completing My Reservation?
                                        </button>
                                    </h2>
                                    <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            At Private Chefs World, we understand the importance of seamless communication throughout the booking process. While we value open dialogue, we encourage clients to go through our dedicated team to discuss their needs and preferences. Our team is experienced in ensuring that your booking process is smooth and successful, allowing you to focus on the delightful culinary experience that awaits. Our approach helps maintain a secure and hassle-free booking process while allowing our talented chefs to do what they do best – creating exceptional dining experiences for you.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading6">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                        What does a One-Time-Experience include?
                                        </button>
                                    </h2>
                                    <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                        Our single service includes a one-time dining experience where you can choose the cuisine, menu, and style of your meal. Your Private Chefs will prepare, serve, and clean up, ensuring a seamless and memorable culinary experience.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading7">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                            What does the Multiple experiences include?
                                        </button>
                                    </h2>
                                    <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Our multiple services cater to those looking for extended culinary experiences, such as vacation villa or chalet rentals. These services can encompass multiple meals throughout the day, offering you the convenience of having a Private Chefs at your disposal for the duration of your stay.


                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading8">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                            What Happens If the Chef Cancels My Booking?
                                        </button>
                                    </h2>
                                    <div id="collapse8" className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            While it's rare, if a chef cancels your booking, we will assist you in finding a suitable replacement. Your satisfaction is our top priority, and we are dedicated to ensuring that your culinary experience goes as smoothly as possible.
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading8">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                            How can I receive requests through Take a Chef?
                                        </button>
                                    </h2>
                                    <div id="collapse8" className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Private Chefs allows you to enjoy the experience of having a Private Chefs anywhere in the world. As a guest, you simply fill in the details of your event in an easy and dynamic way, and the best four local chefs interested will respond with a personalized menu and budget for you. Once you decide on a candidate based on their chef profile, menu proposal, and conversation, you can reserve the experience and the chef will take care of the rest.
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )}
                    {activeButton === 'button2' && (
                        <div className="accordion-part mt-5">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Who can be a Chef?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Private Chefs World exclusively accepts chefs with a culinary degree and those with high-end training in fine dining restaurants and 5-star hotels. This rigorous standard ensures our platform maintains a commitment to excellence and delivers exceptional culinary experiences to our discerning clientele
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            How can I communicate with my guests?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            You can communicate with your guests through our messaging platform on the Private Chefs website. This ensures a secure and organized channel for discussing their needs and preferences and keeps us in a loop so we can help you when needed.

                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How can I receive requests through Private Chefs?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            You can receive requests by creating a chef profile on our platform. Once your profile is live, potential clients can browse your skills and expertise, and they have the option to request you for their unique dining experiences. Our advanced system also matches clients' preferences with your skills, the type of cuisine you specialize in, and other criteria, increasing the likelihood of receiving requests that align with your culinary expertise.

                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading4">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                            How much does a service cost?
                                        </button>
                                    </h2>
                                    <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            The pricing of a service is based on your culinary expertise and the services you offer. The pricing can vary depending on factors such as the complexity of the menu, the number of guests, and the location of the experience.

                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading5">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                            What is included in the price of a One-Time-Experience menu?
                                        </button>
                                    </h2>
                                    <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            The price of the menu should include all expenses related to the food, preparation, and service. This encompasses the cost of ingredients, your time, your assistant if needed and any necessary equipment.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading6">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                            What is included in the price for multiple services?
                                        </button>
                                    </h2>
                                    <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            When offering multiple services, such as a full-day or a half board culinary experience, your pricing should cover the labor for the meals requested, preparation of the food, shopping, serving and cleanup and any additional services that our guests have requested during the day.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading7">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                            Why can't I communicate with the client before the reservation is made?
                                        </button>
                                    </h2>
                                    <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            To maintain the integrity of our platform and ensure a secure booking process, direct communication between chefs and guests is restricted before a reservation is confirmed. This helps prevent any unauthorized sharing of contact information.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading8">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                            Do I have to pay tax on my income from Private Chefs?
                                        </button>
                                    </h2>
                                    <div id="collapse8" className="accordion-collapse collapse" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Tax regulations may vary by location and individual circumstances. It's important to understand and comply with tax requirements in your area. We recommend seeking advice from a tax professional to ensure you meet your obligations.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading9">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                                            How much time do I have to answer or reject a request?
                                        </button>
                                    </h2>
                                    <div id="collapse9" className="accordion-collapse collapse" aria-labelledby="heading9" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            It's highly advisable to respond as swiftly as you can! Time plays a crucial role here, especially since we give priority to incoming chef confirmations. Additionally, please bear in mind that the platform values chefs with superior response rates and quicker response times.
                                            If you are unable to confirm a booking due to other bookings you might have, rejecting it makes it easier to know your availability calendar and send you bookings for the dates you will be available.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading10">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                                            What happens if I don't show up to my experience?
                                        </button>
                                    </h2>
                                    <div id="collapse10" className="accordion-collapse collapse" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Punctuality is crucial. We understand that there are unexpected situations that can occur and for you not be able to attend a scheduled experience. If you can't make it to an experience, please inform the client and our support team as soon as possible. Failure to show up without prior notice may result in penalties and without a cause of force majeure, will result in a permanent deactivation of your account..
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading11">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
                                            Do I need to pay in order to use Private Chefs platform?
                                        </button>
                                    </h2>
                                    <div id="collapse11" className="accordion-collapse collapse" aria-labelledby="heading11" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            No, you don't! At Private Chefs you can sign up and offer your services as a Private Chefs completely free of charge. We only earn a commission on each confirmed booking.
                                        </div>
                                    </div>
                                </div>


                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading12">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
                                            How much is your commission on each confirmed booking?
                                        </button>
                                    </h2>
                                    <div id="collapse12" className="accordion-collapse collapse" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Our commission for each confirmed booking is only 10%. This fee is essential for the operation of Private Chefs and allows us to provide our services. Additionally, we offer a rewarding star rating system for chefs. The more stars you earn, the greater the possibility of reducing the commission we charge you. This creates an incentive for chefs to excel and deliver outstanding culinary experiences.
                                        </div>
                                    </div>
                                </div>


                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="heading13">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse13" aria-expanded="false" aria-controls="collapse13">
                                            How does the star rating system work?
                                        </button>
                                    </h2>
                                    <div id="collapse13" className="accordion-collapse collapse" aria-labelledby="heading13" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Our star rating system is comprehensive and objective. It encompasses an internal rating based on various factors, including the chef's performance, creativity, feedback from our customers, consistency, communication, and their overall appearance. In addition, we send post-experience surveys to customers to gather their valuable feedback and insights. All these components are meticulously considered and combined to create a star rating system that ranges from 1 to 5, reflecting the chef's overall excellence and the quality of the culinary experience they provide.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeButton === 'button3' && (
                        <div className="accordion-part mt-5">
                            <div className="accordion" id="accordionExample">

                                <div  className="accordion-body">All cancellations (no matter on whose behalf) should be communicated in written to the Private Chefs team at info@privatechefsworld.com</div>

                                <div className="accordion-item mt-5">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Cancellation policy for guests
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p>When a guest cancels a reservation they are eligible for a refund under the following conditions:</p>
                                            
                                            <p>Cancelling up to 45 days before the reservation date: The entire value of the experience will be reimbursed.</p>
                                            <p>Cancelling between 30 and 44 days prior to the reservation: 50% of the experience value will be reimbursed.</p>
                                            <p>Cancelling less than 30 days prior to the reservation: No refund applies.
                                                Refunds may take between 3 to 5 business days to process! But do not worry, it will be on its way. If you have any questions or want additional information, please contact us info@privatechwfsworld.com</p>
                                        </div>
                                    </div>
                                </div>



                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            When a guest cancels a reservation they are eligible for a refund under the following conditions:
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Cancelling up to 45 days before the reservation date: The entire value of the experience will be reimbursed.
                                            Cancelling between 30 and 44 days prior to the reservation: 50% of the experience value will be reimbursed.
                                            Cancelling less than 30 days prior to the reservation: No refund applies.
                                            Refunds may take between 3 to 5 business days to process! But do not worry, it will be on its way. If you have any questions or want additional information, please contact us info@privatechwfsworld.com
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Cancellation policy for chefs
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            As a Private Chefs World member, it is incredibly important to fulfill your commitments with each guest who decided to reserve your menu. We strongly advise against cancelling any reservations you previously accepted since these can cause a great inconvenience to the guests, you would have disqualified other chefs for no reason, and ultimately, affected the credibility of our website.

                                            <p>If you have no choice but to cancel a reservation, and not due to a reason of force majeure, you should be aware that you may incur on the following penalties:</p>
                                            <p>In any case, please contact the guest as soon as possible to inform them of the cancellation, as well as the Take a Chef team info@privatechefsworld.com</p>
                                            <p>Your ranking in search results when receiving service requests will be negatively affected.</p>
                                            <p>There will be a 20% penalty on the next reservation.</p>
                                            <p>Your calendar will not be available for the dates of the canceled reservation.</p>
                                            <p>You are subject to expulsion from Private Chefs World if you cancel more than 2 reservations in a six-month period.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            What happens if my client cancels the reservation?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <p> If a guest cancels a confirmed reservation, you will be informed and, as a chef, you will be entitled to receive one of the following compensations:</p>
                                            <p>If your guest cancels up to 45 days before the experience: they will be entirely reimbursed.</p>
                                            <p>If your guest cancels between 30 and 44 days prior to the experience: you are entitled to 50% of the reservations’ value.</p>
                                            <p>If your guest cancels with less than 30 days in advance: you are entitled to the entire coverage of the experience.</p>
                                            <p>What happens if the chef cancels my reservation?</p>
                                            <p>It is very unlikely for this to happen, but in case it does, don’t worry! We will refund you fully, or help you find a new chef and menu similar to the one you originally requested if you prefer. You can also request a coupon with no expiration date, to enjoy another event from Private Chefs World at any given destination. *Please keep in mind that a reimbursement can take between 3-5 working days to process</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <ToastContainer />
        </>
    )
}