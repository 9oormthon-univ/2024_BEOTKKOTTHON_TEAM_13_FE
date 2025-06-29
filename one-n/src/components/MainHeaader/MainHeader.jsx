import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as TargetLocationIcon } from "../../assets/icons/target-location.svg";
import { ReactComponent as CaretDownIcon } from "../../assets/icons/caret-down.svg";
import { ReactComponent as HeaderSearchIcon } from "../../assets/icons/header-search.svg";
import { ReactComponent as PersonIcon } from "../../assets/icons/person.svg";

import styles from "./MainHeader.module.scss";

function MainHeader({
    title = "",
    searchKeyword = "",
    toSearch = "/search",
    paddingTop = "0",
}) {
    return (
        <div className={styles.MainHeader}>
            <div style={{ paddingTop }} />
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    {title && <p className={styles.title}>{title}</p>}
                    {!title && (
                        <>
                            <TargetLocationIcon
                                className={styles.targetLocationIcon}
                            />
                            <p className={styles.setLocationLabel}>동네 설정</p>
                            <CaretDownIcon />
                        </>
                    )}
                </div>
                <div className={styles.rightContainer}>
                    {searchKeyword && (
                        <Link to={`${toSearch}?keyword=${searchKeyword}`}>
                            <div className={styles.searchContainer}>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="검색어를 입력하세요"
                                    value={searchKeyword}
                                />
                                <HeaderSearchIcon />
                            </div>
                        </Link>
                    )}
                    {!searchKeyword && (
                        <Link
                            to={`${toSearch}?keyword=${searchKeyword}`}
                            className={styles.searchIcon}
                        >
                            <HeaderSearchIcon />
                        </Link>
                    )}
                    <Link to="/my/products">
                        <PersonIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;
