import React from "react";
import { GiBarracksTent } from "react-icons/gi";
import {
  BsInstagram,
  BsTwitter,
  BsPinterest,
  BsLinkedin,
} from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
// import { IoTicketSharp } from "react-icons/io5";
import { IoIosMailOpen } from "react-icons/io";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-black mt-28">
      {/* list Show */}
      <div>
        <div className="flex justify-between text-white ml-16 mr-16 bg-black items-center">
          <div className="flex">
            <GiBarracksTent className="text-4xl mt-2" />{" "}
            <p className="ml-2 text-lg mt-2 font-sans">List your Show</p>
            <div className="ml-4 text-lg mt-2 mb-4 font-thin">
              Got a show, event, activity or a great experience? Partner with us
              &amp; get listed on ReelRush
            </div>
          </div>
        </div>
      </div>

      {/* list Show */}
      {/* Customer care */}
      <div
        className="flex justify-between h-32 items-center"
        style={{ backgroundColor: "white" }}
      >
        <div className="ml-10">
          <RiCustomerService2Fill className="text-5xl ml-12" />
          <p className="">24/7CUSTOMER CARE</p>
        </div>
        {/* <div className="ml-8">
          <IoTicketSharp className="text-5xl ml-20" />
          <p>Present Booking CONFIRMATION</p>
        </div> */}
        <div className="">
          <IoIosMailOpen className="text-5xl" />
          <p className="-ml-14">SUBSCRIBE NEWSLETTER</p>
        </div>
      </div>
      {/* Customer care */}
      {/* Details */}
      <div className="bg-black text-white ml-16 mr-16">
        
        <h6 className="mt-3 mb-3 font-semibold">COUNTRIES</h6>
        <p>Indonesia |Singapore |UAE |Sri Lanka |West Indies | </p>
        <h6 className="mt-3 mb-3 font-semibold">HELP</h6>
        <p>
          Contact Us |Current Openings |Press Release | Press Release |Terms &
          Conditions |Privacy Policy |FAQs |Sitemap{" "}
        </p>
        <h6 className="mt-3 mb-3 font-semibold">REELRUSH EXCLUSIVE</h6>
        <p>
          Watch Guide | Superstar | List Shows | Offers | Stream{" "}
        </p>
      </div>

      {/* Details */}
      {/* book my show logo and social media connect */}

      <div className="bg-black flex ">
        <img
          src="//logo.svg"
          alt=""
          className="m-auto mt-4 "
        />
      </div>
      <div className="flex bg-white justify-center  mt-4 mb-4">
        <div className="flex mt-5 mb-4">
          <AiFillFacebook className="ml-2 mr-2 text-3xl" />
          <BsInstagram className="ml-2 mr-2 text-3xl" />
          <BsTwitter className="ml-2 mr-2 text-3xl" />
          <AiFillYoutube className="ml-2 mr-2 text-3xl" />
          <BsPinterest className="ml-2 mr-2 text-3xl" />
          <BsLinkedin className="ml-2 mr-2 text-3xl" />
        </div>
      </div>
      <div>
        <p className="text-center text-white font-mono">
          Copyright 2023 © Reelrush Entertainment Pvt. Ltd. All Rights Reserved
        </p>
        <p className="text-center text-white font-serif">
          The content and images used on this site are copyright protected and
          copyrights vests with the respective owners. The usage of the content
          and images on this website is intended to promote the works and no
          endorsement of the artist shall be implied. Unauthorized use is
          prohibited and punishable by law.
        </p>
      </div>
      {/* book my show logo and social media connect */}
    </div>
  );
};

export default Footer;
