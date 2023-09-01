import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: "rgb(87,168,204)" }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)" }} to="/">
              CINE <span style={{ color: "rgb(30,29,34)" }}>BOOK</span>
            </Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)" }} to="/">
              Home
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Contact us
            </Link>

            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Term of services
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              About us
            </Link>
          </div>
          <div className="footer__content__menu">
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Live
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              FAQ
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Premium
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Pravacy policy
            </Link>
          </div>
          <div className="footer__content__menu">
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              You must watch
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Recent release
            </Link>
            <Link style={{ textDecoration: "none", color: "rgb(243,241,241)"  }} to="/">
              Top IMDB
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
