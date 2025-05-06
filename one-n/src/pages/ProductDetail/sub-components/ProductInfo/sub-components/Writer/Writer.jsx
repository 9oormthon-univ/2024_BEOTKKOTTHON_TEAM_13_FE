import React from "react";

import styles from "./Writer.module.scss";

function Writer({ userImage = "", userName = "", userRating = 0 }) {
    return (
        <div className={styles.Writer}>
            <div className={styles.profile}>
                <img
                    src={userImage}
                    alt="User Profile"
                    className={styles.userImage}
                />
                <p className={styles.userName}>{userName}</p>
            </div>
            <div className={styles.userRating}>
                <UserRatingBar rating={userRating} />
                <p className={styles.ratingHelp}>만족지수</p>
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

        return Math.max(rating + (THRESHOLD - rating) * 0.2, 25);
    };

    return (
        <div className={styles.UserRatingBar}>
            <div
                className={styles.innerBar}
                style={{
                    width: `${correctInnerBarWidth(rating)}%`,
                }}
            ></div>
            <p className={styles.ratingLabel}>{rating}%</p>
        </div>
    );
}

export default Writer;
