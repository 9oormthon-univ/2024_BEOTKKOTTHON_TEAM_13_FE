import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as MyPageIcon } from "../../../../assets/icons/new-mypage.svg";

import styles from "./Header.module.scss";

function Header() {
    const navigate = useNavigate();

    const onMyPageButtonClicked = () => {
        navigate("#");
    };

    return (
        <div className={styles.Header}>
            <h1 className={styles.headerTitle}>채팅</h1>
            <div
                className={styles.myPageButton}
                onClick={onMyPageButtonClicked}
            >
                <MyPageIcon width="16" height="17" />
            </div>
        </div>
    );
}

export default Header;
