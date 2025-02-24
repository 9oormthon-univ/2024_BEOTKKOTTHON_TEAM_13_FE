import React from "react";

import MainHeader from "./sub-components/MainHeader/MainHeader";
import SubHeader from "./sub-components/SubHeader/SubHeader";

import styles from "./Header.module.scss";

function Header() {
    return (
        <div className={styles.Header}>
            <MainHeader />
            <SubHeader />
        </div>
    );
}

export default Header;
