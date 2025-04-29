import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as ExploreIcon } from "../../assets/icons/explore.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import { ReactComponent as MessageIcon } from "../../assets/icons/message.svg";
import { ReactComponent as HomeOutlineIcon } from "../../assets/icons/home-outline.svg";
import { ReactComponent as ExploreOutlineIcon } from "../../assets/icons/explore-outline.svg";
import { ReactComponent as LocationOutlineIcon } from "../../assets/icons/location-outline.svg";
import { ReactComponent as MessageOutlineIcon } from "../../assets/icons/message-outline.svg";

import "./NavBar.css";

export const NavBar = () => {
    const location = useLocation();

    // NOTE: 현재 location에 파라미터의 URL Path 중 하나라도 포함되었는지 판별
    const hasPathInPathname = (paths) => {
        return (
            Array.isArray(paths) &&
            paths.some((path) => !!location.pathname.match(path))
        );
    };

    return (
        <div className="navbar">
            <div className="navbar-container">
                <div className="icon-cont">
                    <NavLink exact to="/" className="nav-home">
                        <ConditionalIcon
                            condition={hasPathInPathname([
                                /^\/$/,
                                /^\/search/,
                                /^\/scrap/,
                                /^\/products/,
                            ])}
                            activeIcon={<HomeIcon />}
                            inactiveIcon={<HomeOutlineIcon />}
                        />
                    </NavLink>
                    <span className="icon-title">홈</span>
                </div>
                <div className="icon-cont">
                    <NavLink to="/explore" className="nav-explore">
                        <ConditionalIcon
                            condition={hasPathInPathname([
                                /^\/explore/,
                                /^\/recipe\/search/,
                                /^\/recipes/,
                            ])}
                            activeIcon={<ExploreIcon />}
                            inactiveIcon={<ExploreOutlineIcon />}
                        />
                    </NavLink>
                    <span className="icon-title">레시피</span>
                </div>
                <div className="icon-cont">
                    <NavLink to="/map" className="nav-map">
                        <ConditionalIcon
                            condition={hasPathInPathname([/^\/map/])}
                            activeIcon={<LocationIcon />}
                            inactiveIcon={<LocationOutlineIcon />}
                        />
                    </NavLink>
                    <span className="icon-title">지도</span>
                </div>
                <div className="icon-cont">
                    <NavLink to="/chatroom/list" className="nav-chat">
                        <ConditionalIcon
                            condition={hasPathInPathname([/^\/chatroom/])}
                            activeIcon={<MessageIcon />}
                            inactiveIcon={<MessageOutlineIcon />}
                        />
                    </NavLink>
                    <span className="icon-title">채팅</span>
                </div>
            </div>
        </div>
    );
};

/**
 * condition에 따라 activeIcon 혹은 inactiveIcon을 보여주는 컴포넌트
 * @param {boolean} condition 컨디션 값
 * @param {Element} activeIcon condition 값이 참일 때 보여줄 컴포넌트
 * @param {Element} inactiveIcon condition 값이 거짓일 때 보여줄 컴포넌트
 * @returns
 */
function ConditionalIcon({
    condition = false,
    activeIcon = null,
    inactiveIcon = null,
}) {
    if (condition) {
        return activeIcon;
    }
    return inactiveIcon;
}
