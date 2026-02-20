import React from 'react';
import '../styles.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-5 py-5 border-top border-secondary">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* About Section */}
          <div className="col-md-4">
            <h5 className="mb-3">
              <i className="bi bi-paw me-2"></i>Pet Adoption System
            </h5>
            <p className="text-muted small">
              Connecting loving pets with caring families. Give a pet a forever home and experience the joy of unconditional love.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-muted hover-link">
                  <i className="bi bi-chevron-right me-2"></i>Browse Pets
                </a>
              </li>
              <li className="mb-2">
                <a href="/login" className="text-decoration-none text-muted hover-link">
                  <i className="bi bi-chevron-right me-2"></i>Login
                </a>
              </li>
              <li className="mb-2">
                <a href="/register" className="text-decoration-none text-muted hover-link">
                  <i className="bi bi-chevron-right me-2"></i>Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>(555) 123-4567
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                <a href="mailto:info@petadoption.com" className="text-muted text-decoration-none">
                  info@petadoption.com
                </a>
              </li>
              <li>
                <i className="bi bi-geo-alt me-2"></i>123 Pet Lane, City, State
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-6 small text-muted">
            <p className="mb-0">
              &copy; {currentYear} Pet Adoption System. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3 small">
              <a href="#" className="text-muted text-decoration-none hover-link">
                Privacy Policy
              </a>
              <a href="#" className="text-muted text-decoration-none hover-link">
                Terms of Service
              </a>
              <a href="#" className="text-muted text-decoration-none hover-link">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
