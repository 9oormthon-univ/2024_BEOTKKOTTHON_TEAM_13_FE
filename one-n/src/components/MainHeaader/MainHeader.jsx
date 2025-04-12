import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as TargetLocationIcon } from "../../assets/icons/target-location.svg";
import { ReactComponent as CaretDownIcon } from "../../assets/icons/caret-down.svg";
import { ReactComponent as HeaderSearchIcon } from "../../assets/icons/header-search.svg";
import { ReactComponent as PersonIcon } from "../../assets/icons/person.svg";

import styles from "./MainHeader.module.scss";

function MainHeader() {
    return (
        <div className={styles.MainHeader}>
            <div className={styles.leftContainer}>
                <TargetLocationIcon className={styles.targetLocationIcon} />
                <p className={styles.setLocationLabel}>동네 설정</p>
                <CaretDownIcon />
            </div>
            <div className={styles.rightContainer}>
                <Link to="/search">
                    <HeaderSearchIcon />
                </Link>
                <Link to="/scrap">
                    <PersonIcon />
                </Link>
            </div>
        </div>
    );
}

export default MainHeader;
