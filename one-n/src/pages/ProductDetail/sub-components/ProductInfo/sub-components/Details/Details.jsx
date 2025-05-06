import React from "react";

import styles from "./Details.module.scss";

function Details({
    title = "",
    price = 0,
    postDate = new Date(),
    contents = "",
    likesCount = 0,
}) {
    // NOTE: 날짜 차이 계산
    // 오늘 날짜를 기준으로 인자로 들어온 date와의 차이를 계산하고, 그 차이가 1일 이내인 경우 몇 시간 전인지, 1시간 이내인 경우 몇 분인지 변환
    const getDateDifference = (date) => {
        const now = new Date();
        const diffInMs = now - date;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

        if (diffInMinutes < 1) {
            return "방금 전";
        } else if (diffInHours < 1) {
            return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        }

        return `${Math.floor(diffInHours / 24)}일 전`;
    };

    return (
        <div className={styles.Details}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.price}>{price.toLocaleString()}원</p>
                <div className={styles.etc}>
                    <p>{getDateDifference(postDate)}</p>
                    <p>레시피 재료</p>
                </div>
            </div>
            <div className={styles.contents}>{contents}</div>
            <div className={styles.likesCount}>찜 {likesCount}</div>
        </div>
    );
}

export default Details;
