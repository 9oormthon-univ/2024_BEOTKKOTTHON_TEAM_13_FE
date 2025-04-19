import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as CaretDownSmIcon } from "../../../../assets/icons/caret-right-sm.svg";

import styles from "./ExploreHeader.module.scss";

function ExploreHeader({ title = "", to = "" }) {
    return (
        <div className={styles.ExploreHeader}>
            <p className={styles.title}>{title}</p>
            <Link to={to} className={styles.link}>
                <div className={styles.more}>
                    <p className={styles.label}>더보기</p>
                    <CaretDownSmIcon />
                </div>
            </Link>
        </div>
    );
}

export default ExploreHeader;
