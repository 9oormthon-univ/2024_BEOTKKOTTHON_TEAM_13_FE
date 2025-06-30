import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as EditIcon } from "../../../../assets/icons/edit.svg";

import { usePageValue } from "../../contexts/PageContext";

import styles from "./UserProfile.module.scss";

function UserProfile() {
    const navigate = useNavigate();

    const { myInfo } = usePageValue();

    // NOTE: 유저 정보 수정 버튼 클릭 핸들러
    const handleEditProfile = () => {
        navigate("/my/edit");
    };

    return (
        <div className={styles.UserProfile}>
            <img
                src={myInfo.profileImage}
                alt="User Profile Image"
                className={styles.profileImage}
            />
            <div className={styles.userInfoContainer}>
                <div className={styles.userNickname}>
                    <p className={styles.label}>{myInfo.nickname}</p>
                    <EditIcon onClick={handleEditProfile} />
                </div>
                <div className={styles.userRating}>
                    <p className={styles.label}>만족도 {myInfo.rating}%</p>
                    <UserRatingBar rating={myInfo.rating} />
                </div>
            </div>
        </div>
    );
}

function UserRatingBar({ rating }) {
    // NOTE: innerBar 너비 보정
    const correctInnerBarWidth = (rating) => {
        const THRESHOLD = 90;

        if (rating >= THRESHOLD) {
            return Math.min(rating, 100);
        }

        return Math.max(rating + (THRESHOLD - rating) * 0.05, 10);
    };

    return (
        <div className={styles.UserRatingBar}>
            <div
                className={styles.innerBar}
                style={{
                    width: `${correctInnerBarWidth(rating)}%`,
                }}
            ></div>
        </div>
    );
}

export default UserProfile;
