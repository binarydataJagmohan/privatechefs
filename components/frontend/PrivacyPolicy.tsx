import React, { useState, useEffect } from 'react'
import Head from 'next/head';

export default function PrivacyPolicy(props: any) {

    interface PageSlug {
        name: string;
        slug: string;
        meta_desc: string;
        meta_tag: string;
    }

    const [pageslug, setSlug] = useState<PageSlug | null>(null);

    useEffect(() => {
        if (props) {
            setSlug(props.pages.data);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{pageslug?.meta_tag ? pageslug.meta_tag : `Private Chefs`}</title>
                <meta name="description" content={pageslug?.meta_desc ? pageslug?.meta_desc : `Private Chefs`} />
            </Head>
            <section className="pages-banner ">
            <div className="container">
                    <h1>Privacy & Policy</h1>
                    <h2>Description</h2>
                    <p>
                        A.S ABOVE AND BEYOND WORLDWIDE LTD, a limited company with various brands, (hereinafter for this website and service referred to as "Private Chefs World") and has developed an advertising intermediation website that can be accessed from the website <a href="https://www.privatechefsworld.com">www.privatechefsworld.com</a>, designed to put diners who wish to contract private chef services with chefs offering their services as independent providers of such services.
                    </p>
                    <p>
                        These terms and conditions are intended to regulate access and terms of use of the Website. Please read these conditions carefully. You understand and acknowledge that Private Chefs Worldwide acts as an intermediate between the Chefs and the Clients and is not a party to any contract, agreement, or contractual relationship, of any kind.
                    </p>
                    <p>
                        By registering with an email address, you acknowledge that you have read and accepted these general conditions of use.
                    </p>

                    <h2>1. Users</h2>

                    <h5>1.1.1 Diners</h5>
                    <p>
                        As a Diner, you can request a Service through the Platform, entering the information related to the Service you require (date, location, type of cuisine, etc.).
                    </p>
                    <p>
                        By submitting your Request, you will receive from our team an email confirmation that we received your request and we are processing it.
                    </p>

                    <h5>1.1.2 Chef</h5>
                    <p>
                        As a Chef, as long as you meet the conditions established below, you can offer private chef services to Diners in the region that you have requested.
                    </p>
                    <p>
                        You can only respond to a Request if you meet each and every one of the conditions indicated below:
                    </p>
                    <ul>
                        <li>(i) you are of legal age.</li>
                        <li>(ii) you have extensive professional experience in the gastronomic field as a cook, a minimum of 5 years.</li>
                        <li>(iii) you have the legal regulations on food handling, hygiene, and sanitary conditions, and therefore you are in possession of the appropriate licenses.</li>
                        <li>(iv) you comply with the legal requirements demanded by the current local labor legislation, either as a mercantile company or as a self-employed worker.</li>
                        <li>(v) you have civil liability insurance against any damage that may occur in the provision of private chef services, concerning eventual food poisoning, as well as damage to movable and immovable property used during the provision of services, as well as damage to real property that is in the domicile of the Diner and that could suffer damage during the time you are managing the Service.</li>
                        <li>(vi) you comply with the applicable legislation in your territory regarding the transport of raw materials, cooked or not, guaranteeing the hygiene and food safety conditions required by the corresponding authority within the geographical location where the Service is provided.</li>
                        <li>(vii) you use utensils in good conditions and take the necessary measures to guarantee their correct hygiene.</li>
                        <li>(viii) you guarantee the good condition of the raw materials used during the provision of services.</li>
                    </ul>
                    <p>
                        You acknowledge that you are solely responsible for the content of the Offer that you accept and sign from Private Chefs World that is acting as an intermediate between the chef and the client. Therefore, you acknowledge and guarantee the veracity and precision of all the information included in your Menus, and you agree to perform the Service under the conditions described in your Offer.
                    </p>

                    <h2>2. Booking a Service</h2>

                    <h5>2.1.1 Service reservation procedure</h5>
                    <p>
                        To book a service through Private Chefs World, it is necessary that (1) the Diner submits a Request on the website, which will be forwarded to Private Chefs World office team. Private Chefs World will find the available Chef at the location set by the Diner, and contact them for the Client's proposal.
                    </p>
                    <p>
                        Once both users have agreed to the conditions of the Service, the Diner can book it through a payment link or bank wire transfer that will be provided by Private Chefs World paying the full amount set by the Offer.
                    </p>
                    <p>
                        Once the Reservation has been made, both users (Diner and Chef) will receive an email notification confirming the Reservation and detailing the contact details of the other party, in order to communicate more comfortably by telephone contact or email.
                    </p>

                    <h2>3. Evaluation system</h2>

                    <h5>3.1.1 Function</h5>
                    <p>
                        Take a Chef encourages you as a Diner to send us your opinions about a Chef after enjoying a Service contracted through the Platform.
                    </p>

                    <h5>4.3.3 Limit</h5>
                    <p>
                        Private Chefs World reserves the right to suspend or reject any further contracts between the Chef and the Client if you have received at least three reviews and the average opinions you have received have a score of 3 or less.
                    </p>

                    <h2>5. Financial conditions</h2>

                    <h5>5. Price</h5>
                    <p>
                        Registering with Private Chefs World does not imply any cost. However, the Reservation will be confirmed after the corresponding payment of a Price, under the conditions described below.
                    </p>

                    <h5>5.1.1 Specific conditions for the Chef</h5>
                    <p>
                        You are exclusively responsible to accept or refuse the Price (including Taxes, if applicable) in the Offer. When setting the we will always give you the net price after deducting the percentage corresponding to Management Expenses. Once a Diner reserves the Offer, you will not be able to demand that the Diner pay a Price higher than the one set in your Offer.
                    </p>
                    <p>
                        The images used in your Chef Profile must accurately reflect the quality and condition of your Services. Private Chefs World reserves the right to require that your Chef Profile has a minimum number of Images of a certain format, size, and resolution.
                    </p>
                    <p>
                        When you accept the Offer in response to a Request and the Diner confirms the Reservation, you will be signing a legally binding contract with the latter, which forces you to provide the Service in accordance with the conditions described in your Offer. You also agree to pay the corresponding Management Expenses and Applicable Taxes.
                    </p>
                    <p>
                        Private Chefs World recommends that Chefs take out adequate insurance for the Service provided to the Diner. Please review the corresponding insurance policy carefully, and make sure in particular to know and understand any exceptions and reductions that may apply to said insurance policy, including, without limitation, whether or not it covers the actions or inactions of the Diners during the Service.
                    </p>
                    <p>
                        The chef will be responsible for generating an invoice to Private Chefs World for the total amount paid. Private Chefs, for its part, will send the chef an invoice for the management costs.
                    </p>
                    <p>
                        You acknowledge and agree that Private Chefs World may request invoices from you to process specific payments.
                    </p>

                    <h5>5.1.2 Specific conditions for the diner</h5>
                    <p>
                        As a Diner, you can book a Service through the website following the corresponding reservation process. Upon receipt of a Booking confirmation by email from Private Chefs World, a legally binding contract is formed between Commensal and Chef, subject to any terms and conditions agreed. Private Chefs World will charge the Price agreed by the Client and then after the completion of the service will pay the Chef deducting the agreed commission for Management services.
                    </p>
                    <p>
                        If you book a Service on behalf of several people and one of them is a minor, you declare and guarantee to be legally authorized to act on behalf of the minor. Minors can only participate in a Service if they are accompanied by an adult who is responsible for them.
                    </p>

                    <h5>5.2 Management fees</h5>
                    <p>
                        Private Chefs World will charge Management Fees for the use of the website and acting as an intermediate between the Client and Chef, always calculated as a percentage based on the price set by the Offer. The Management Expenses will be charged at the moment of confirming the Reservation.
                    </p>
                    <p>
                        The methods for calculating the Management Expenses and the applicable VAT will vary according to the geographical location of the Service and the applicable legislation.
                    </p>

                    <h5>5.3 Price rounding</h5>
                    <p>
                        You acknowledge and agree that Private Chefs World may, at its sole discretion, round up or down the Management Fee.
                    </p>

                    <h5>5.4 Payment and repayment methods of shared costs to the coordinator</h5>

                    <h5>5.4.1 Authorization to recover</h5>
                    <p>
                        Being contracted as a Chef, you grant Private Chefs World an authorization to collect the amount corresponding to the Management Fees on your behalf and in your name.
                    </p>
                    <p>
                        Consequently, after the Diners' Reservation, Private Chefs World collects the total amount paid by the Diner. The amount corresponding to the Chef's Fee received by Private Chefs World is deposited in an account dedicated to the payment of Chefs' services.
                    </p>
                    <p>
                        You acknowledge and agree that none of the above mentioned amounts received by Private Chefs World on behalf of the Chef entitle you to the collection of interests. You undertake to respond with due diligence to any request from Private Chefs World, and in general, to any competent administrative or judicial authority, especially in relation to the prevention of money laundering. You fundamentally agree to provide, upon request, any evidence of your address and/or identity that may be useful.
                    </p>
                    <p>
                        In case of lack of response to such requests, Private Chefs World may take the measures it considers necessary, such as freezing the amounts to be paid.
                    </p>

                    <h5>5.4.2 Payment of the Chef's Fee</h5>
                    <p>
                        After the Service, Chefs will have a period of 24 hours from the time the Service has ended to submit a claim to Private Chefs World about it. In the absence of a complaint from the Chefs during this period, Private Chefs World must consider the Service confirmed.
                    </p>
                    <p>
                        From the moment of this express or tacit confirmation, you will be transferred the amount agreed of the service booking.
                    </p>
                    <p>
                        The payment order in your name will be sent up to 7 business days after the execution of the Service (as long as Private Chefs World has your bank information).
                    </p>
                    <p>
                        Once the applicable time limits have expired, any amount that has not been claimed will be considered as belonging to Take a Chef.
                    </p>

                    <h2>7. Cancellation Policy</h2>

                    <h5>6.1 Payment refund conditions in case of cancellation</h5>
                    <p>
                        The cancellation of a Service will be subject to the following:
                    </p>
                    <p>
                        - In the event that the cancellation is made by the Chef, the Diner will be refunded in full and Chefs cancellation policies apply.
                    </p>
                    <p>
                        - In case of cancellation by the guest:
                    </p>
                    <ul>
                        <li>If the guest cancels the service more than 45 days in advance, the guest will be entitled to a full refund of the reservation.</li>
                        <li>If the guest cancels the service more than 30 days in advance and less than 45 days before the time set for the service, the guest will only be entitled to a 50% refund of the amount paid (the remaining will be paid to the chef), OR will have the option of rescheduling the reservation with the same chef within the following 90 days.</li>
                        <li>If the guest cancels the service less than 29 days before the scheduled date, there will be no refund to the guest. The chef will receive the Service Fee established in the proposal, and Private Chefs World will keep the Management Expenses.</li>
                    </ul>
                    <p>
                        Private Chefs World reserves the right to assess, according to the information available, the legitimacy of the refund requests.
                    </p>
                    <p>
                        In the event that a refund applies, Private Chefs World will retain 3% of the total service cost that covers the non-refundable transactional fees.
                    </p>

                    <h5>6.2 Refund deadlines</h5>
                    <p>
                        In case that the Client wishes to make a claim regarding a contracted Service, they must contact Private Chefs World within the next 24 hours starting from the date and time scheduled for the execution of the Service.
                    </p>
                    <p>
                        Once said period has elapsed, if the object of the Client's claim was the refund of the amount paid when contracting the Service for any reason or defect related to its execution, even when said reason or defect was not the responsibility of the Client, and as long as the Service had already been paid to the Chef, the claim will be denied.
                    </p>

                    <h5>6.3 Right of Withdrawal</h5>
                    <p>
                        In accordance with the provisions of Article 103 a) of the General Law for the Defense of Consumers and Users, you will not have the right of withdrawal from the moment of delivery of the Confirmation of reservation.
                    </p>

                    <h2>8. Behavior of website visitors and Users</h2>

                    <h5>7.1 Commitment of all visitors to the Platform</h5>
                    <p>
                        You acknowledge that you are solely responsible for complying with all laws, regulations, and obligations applicable to the use of the website or any Private Chefs World service.
                    </p>
                    <ul>
                        <li>(i) not to send to Private Chefs World (especially at the time of the creation of a booking) false, confused, malicious, or fraudulent information;</li>
                        <li>(ii) not to speak or behave or publish any content on the website that may be defamatory, offensive, obscene, pornographic, vulgar, offensive, aggressive, inappropriate, violent, threatening, harassing, racist or xenophobic in nature, or that has sexual connotations, incites violence, discrimination or hatred, or that encourages activities or the use of illegal substances or in a more general way that is contrary to the objectives of the Platform and that may infringe the rights of Private Chefs World or a third party, or that may be contrary to good customs;</li>
                        <li>(iii) not to infringe the rights and not to harm the image of Private Chefs World, in particular with regard to its intellectual property rights;</li>
                        <li>(iv)  not to accept or make payment outside the website;</li>
                    </ul>

                    <h5>7.2 Commitments of the Chefs</h5>
                    <p>
                        When you are contracted as a Chef by Private Chefs World, you commit to:
                    </p>
                    <ul>
                        <li>(i) to respect all laws, regulations and codes regarding the activity of private chef, especially to have liability insurance in force at the time of the Service;</li>
                        <li>(ii)verify that your insurance policy covers the services offered in each Offer sent to the Customer;</li>
                        <li>(iii) not assume any risk during the performance of the Service, nor take any product or substance that may adversely affect your care and due diligence required by the activity of the Service itself;</li>
                        <li>(iv)to execute the Service as described in the Offer and to respect the times and places agreed with the Guest;</li>
                        <li>(v) use utensils in good condition, complying with all legal regulations in this area, especially those relating to hygiene;</li>
                        <li>(vi) to use raw materials in perfect condition, which comply with the sanitary requirements demanded by the current legislation applicable to the matter;</li>
                        <li>(vii) comply with the legal regulations on food transport, especially those referring to the respect of the cold chain;</li>
                        <li>(viii) not to send any Offer to those Requests that you are not going to execute personally;</li>
                        <li>(ix) ensure that Diners can contact you at the telephone number registered to us</li>
                        <li>(x) not have any contraindication or medical incapacity to perform the activity of the Service;</li>
                        <li>(xi) behave appropriately and responsibly during the Service.</li>
                    </ul>


                    <h5>7.3 Commitments of Diners</h5>
                    <p>
                        When you use the website as a diner, you commit to:
                    </p>
                    <ul>
                        <li>(i) communicate to Private Chefs World any changes or modifications regarding the conditions of service agreed.</li>
                        <li>(ii)ensure that Chef can contact you at the telephone number registered to Private Chefs World.</li>
                        <li>(iii) to communicate to Private Chefs World, or to any Chef who requests it, your identity card or any other document that proves your identity;</li>
                        <li>(iv)nform the Chef of any relevant information that he/she should know about the real and personal property that he/she will have to use/occupy during the Service, especially in case of countertops, walls, glass, glass-ceramics or any other equipment that could be damaged during the execution of the Service;</li>
                        <li>(v) provide the Chef with the dishes, glassware, cutlery and other utensils and equipment that are necessary to carry out the Service;</li>
                        <li>(vi) wait for the Chef at least 30 minutes after the appointed time.
                            In the event that you have made a Reservation on behalf of a third party, in accordance with the provisions of the previous Article 4.2.3, you guarantee that said third party will respect the conditions established in said Article and, in general. Private Chefs World reserves the to terminate the service and not refund the Client in the event of non-compliance by the third party on whose behalf you have reserved the Service.</li>
                    </ul>

                    <h3>9. Personal Data</h3>
                    <p>
                    In the context of your use of the website and services, Private Chefs World will collect and process your personal information. By using the website and services, you acknowledge and accept the processing of your personal data by Private Chefs World in accordance with applicable legislation and the provisions of the Privacy Policy.
                    </p>
                    <p>
                    9. Intellectual property
                    </p>

                    <h5>10. Content published by Private Chefs World</h5>
                    <p>
                    Subject to the content provided by Private Chefs World, is the only owner of all intellectual property rights related to the Service, the website, its content (specifically the texts, images, designs, logos, videos, sound, data and graphics) and with the software and databases that ensure its operation.
                    </p>
                    <p>
                    Private Chefs World guarantees you a personal, non-exclusive and non-transferable right to use the Platform, for your personal and private use, and in accordance with the purpose of the website.
                    </p>
                    <p>
                    It is totally forbidden to use or exploit the website, including its content, for any purpose other than that foreseen without the prior written consent of Private Chefs World Specifically, the following is totally prohibited:
                    </p>
                    <ul>
                        <li>(i) reproduce, modify, adapt, distribute, publicly represent and disseminate the website and all its content, except with the prior express authorization of Private Chefs World;</li>
                        <li>(ii) decompile and reverse engineer the website, with the exceptions stipulated by the applicable texts;</li>
                        <li>(iii) extract or attempt to extract (specifically using data extraction robots or similar data collection tools) a substantial part of the websites data.</li>
                    </ul>


                    <h3>10. Operation, availability and functionalities of the website</h3>
                    <p>
                    Private Chefs World will try as much as possible to keep the website running smoothly 7 days a week and 24 hours a day. However, it is possible that access to the website may be temporarily suspended, without prior notice, for technical reasons, maintenance, migration or update operations, or due to supply cuts or restrictions related to network operation.
                    </p>
                    <p>
                    Furthermore, Private Chefs World reserves the right to modify or suspend access to the website or its functionalities, in whole or in part, at its discretion, either temporarily or permanently.
                    </p>

                    <h3>12. Applicable law – Litigation</h3>
                    <p>
                    These terms and conditions have been drafted in English, in accordance with Spanish legislation.
                    </p>
                    <p>
                    If necessary, you can also submit your claims regarding our website on the European Commission’s online dispute resolution platform, which you can access from the following link. The European Commission will send your claim to the competent national authority. In compliance with the legislation applicable to arbitration, you have the obligation, before requesting arbitration, to inform Private Chefs World in writing of any claim or dispute in order to obtain a friendly settlement.
                    </p>

                    <h3>12. Legal warning</h3>
                    <p>
                    The Platform is edited by A.S ABOVE AND BEYOND LTD, a limited company, an entity of Cypriot nationality with registered office 118 Eleftherias, Derinia, Larnaca, Cyprus), and provided with TAX/ITC CY10438208Q , Company ID 611241, and registered in the Cypriot Mercantile Registry, represented by its Administrator, Alexandros Samoilis, director of the edition of the Website.
                    </p>
                    <p>
                    For any questions, you can contact Private Chefs World using the contact form available on the website.
                    </p>
                  
                </div>
            </section>

        </>
    )
}