import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { motion } from "framer-motion";
import { useAuth } from "../AuthContext";

const fadeIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay: 0.3, duration: 0.5 },
};

const Navbar = () => {
  const nav = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      nav("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="navbar navbar-expand-lg navbar-dark glass-navbar fixed-top"
    >
      <div className="container-fluid">
        <motion.div {...fadeIn}>
          <NavLink className="navbar-brand fw-bold" to="/">
            JOBXIE
          </NavLink>
        </motion.div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <motion.div {...fadeIn}>
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div {...fadeIn}>
                <a className="nav-link" href="/register">
                  Register Now
                </a>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div {...fadeIn}>
                <NavLink className="nav-link" to="/job">
                  Find Job
                </NavLink>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div {...fadeIn}>
                <NavLink className="nav-link" to="/skills">
                  Skills
                </NavLink>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div {...fadeIn}>
                <a className="nav-link" href="/#about">
                  About Us
                </a>
              </motion.div>
            </li>
            <li className="nav-item">
              <motion.div {...fadeIn}>
                <a className="nav-link" href="/#contact">
                  Contact Us
                </a>
              </motion.div>
            </li>

            <li className="nav-item ms-2">
              {!user ? (
                <motion.div {...fadeIn}>
                  <button
                    className="btn btn-primary p-2 rounded"
                    onClick={() => nav("/login")}
                  >
                    Login
                  </button>
                </motion.div>
              ) : (
                <motion.div {...fadeIn} className="dropdown">
                  <button
                    className="btn btn-light fw-bold dropdown-toggle"
                    onClick={() => setShowDropdown((prev) => !prev)}
                  >
                    {user.email}
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu show">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => nav("/dashboard")}
                        >
                          Dashboard
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </motion.div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
