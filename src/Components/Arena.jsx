// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "../App.css";
import appLogo from "../assets/app-logo.png";

const Arena = () => {
  const location = useLocation();
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(location.state);
  }, []);
  return (
    <div className="arena">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/app/draw">
              {({ isActive }) => (
                <span className={isActive ? "linkTextA" : "linkTextI"}>
                  Draw Cards
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/app/mycards">
              {({ isActive }) => (
                <span className={isActive ? "linkTextA" : "linkTextI"}>
                  My Cards
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/app/trade">
              {({ isActive }) => (
                <span className={isActive ? "linkTextA" : "linkTextI"}>
                  Trade Cards
                </span>
              )}
            </NavLink>
          </li>
          <li className="nav-item username">{user}</li>
        </ul>
      </nav>

      <Outlet context={user} />
    </div>
  );
};

export default Arena;
