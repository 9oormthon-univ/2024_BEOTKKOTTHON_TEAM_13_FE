import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import home from "../../assets/footer-icons/basic/home.svg";
import explore from "../../assets/footer-icons/basic/explore.svg";
import chat from "../../assets/footer-icons/basic/chat.svg";
import map from "../../assets/footer-icons/basic/map.svg";
import inhome from "../../assets/footer-icons/active/home.svg";
import inexplore from "../../assets/footer-icons/active/explore.svg";
import inchat from "../../assets/footer-icons/active/chat.svg";
import inmap from "../../assets/footer-icons/active/map.svg";

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="icon-cont">
        <NavLink
          exact
          to="/home"
          className="nav-home"
          isActive={() => location.pathname === "/"}
        >
          {location.pathname === "/home" ? (
            <img src={inhome} alt="home" />
          ) : (
            <img src={home} alt="home" />
          )}
        </NavLink>
        <span className="icon-title">홈</span>
      </div>
      <div className="icon-cont">
        <NavLink
          to="/explore"
          className="nav-explore"
          isActive={() => location.pathname === "/explore"}
        >
          {location.pathname === "/explore" ? (
            <img src={inexplore} alt="explore" />
          ) : (
            <img src={explore} alt="explore" />
          )}
        </NavLink>
        <span className="icon-title">레시피</span>
      </div>
      <div className="icon-cont">
        <NavLink
          to="/map"
          className="nav-map"
          isActive={() => location.pathname === "/map"}
        >
          {location.pathname === "/map" ? (
            <img src={inmap} alt="map" />
          ) : (
            <img src={map} alt="map" />
          )}
        </NavLink>
        <span className="icon-title">지도</span>
      </div>
      <div className="icon-cont">
        <NavLink
          to="/chat"
          className="nav-chat"
          isActive={() => location.pathname === "/chat"}
        >
          {location.pathname === "/chat" ? (
            <img src={inchat} alt="chat" />
          ) : (
            <img src={chat} alt="chat" />
          )}
        </NavLink>
        <span className="icon-title">채팅</span>
      </div>
    </div>

    // <div className="navbar">
    //     <NavLink to="/" activeClassName="active">
    //         <img src={home} alt='home'/>
    //     </NavLink>

    //     <NavLink to="/explore" activeClassName="active">
    //         <img src={explore} alt='explore'/>
    //     </NavLink>

    //     <NavLink to="/map" activeClassName="active">
    //         <img src={map} alt='map'/>
    //     </NavLink>

    //     <NavLink to="/chat" activeClassName="active">
    //         <img src={chat} alt='chat'/>
    //     </NavLink>
    // </div>
  );
};
