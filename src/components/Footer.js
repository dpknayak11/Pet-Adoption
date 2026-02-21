import React from "react";
import "../styles.css";
// import { footerData } from "./footerData";

const Footer = () => {
  // footerData.js

  const footerData = {
    styles: {
      headingColor: "text-white",
      textColor: "text-light",
      linkColor: "text-info",
    },

    about: {
      title: "Pet Adoption System",
      description:
        "Connecting loving pets with caring families. Give a pet a forever home and experience the joy of unconditional love.",
    },

    quickLinks: [
      { name: "Browse Pets", path: "/" },
      { name: "Login", path: "/login" },
      { name: "Register", path: "/register" },
    ],

    contact: {
      phone: "(555) 123-4567",
      email: "info@petadoption.com",
      address: "123 Pet Lane, City, State",
    },

    bottomLinks: [
      { name: "Privacy Policy", path: "#" },
      { name: "Terms of Service", path: "#" },
      { name: "FAQ", path: "#" },
    ],
  };

  const currentYear = new Date().getFullYear();
  const { styles } = footerData;

  return (
    <footer className="bg-dark mt-5 py-5 border-top border-secondary">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* About */}
          <div className="col-md-4">
            <h5 className={`mb-3 ${styles.headingColor}`}>
              <i className="bi bi-paw me-2"></i>
              {footerData.about.title}
            </h5>
            <p className={`small ${styles.textColor}`}>
              {footerData.about.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className={`mb-3 ${styles.headingColor}`}>Quick Links</h5>
            <ul className="list-unstyled small">
              {footerData.quickLinks.map((link, index) => (
                <li className="mb-2" key={index}>
                  <a
                    href={link.path}
                    className={`text-decoration-none ${styles.linkColor} hover-link`}
                  >
                    <i className="bi bi-chevron-right me-2"></i>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h5 className={`mb-3 ${styles.headingColor}`}>Contact Us</h5>
            <ul className={`list-unstyled small ${styles.textColor}`}>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                {footerData.contact.phone}
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className={`text-decoration-none ${styles.linkColor}`}
                >
                  {footerData.contact.email}
                </a>
              </li>
              <li>
                <i className="bi bi-geo-alt me-2"></i>
                {footerData.contact.address}
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Bottom */}
        <div className="row align-items-center">
          <div className={`col-md-6 small ${styles.textColor}`}>
            <p className="mb-0">
              &copy; {currentYear} {footerData.about.title}. All rights
              reserved.
            </p>
          </div>

          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3 small">
              {footerData.bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  className={`text-decoration-none ${styles.linkColor} hover-link`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
