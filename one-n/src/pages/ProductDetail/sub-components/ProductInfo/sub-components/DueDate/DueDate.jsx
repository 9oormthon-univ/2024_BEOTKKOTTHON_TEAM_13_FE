import React from "react";
import moment from "moment";
import cn from "classnames";

import styles from "./DueDate.module.scss";

function DueDate({ date = new Date() }) {
    // NOTE: YYYY. MM. DD. 형식으로 변환
    const formatDate = (date) => {
        return moment(date).format("YYYY. MM. DD.");
    };

    // NOTE: 날짜 차이 계산
    const getDateDifference = (date) => {
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays < 0) {
            return "D-" + Math.abs(diffInDays);
        } else if (diffInDays === 0) {
            return "D-0";
        } else {
            return "D+" + diffInDays;
        }
    };

    // NOTE: dateLeft의 클래스명 반환 (3일 이내인 경우 빨간 글씨로 표시)
    const getDateLeftClassName = (date) => {
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const stylesArr = [styles.dateLeft];

        if (diffInDays <= 3) {
            stylesArr.push(styles.red);
        }

        return stylesArr;
    };

    return (
        <div className={styles.DueDate}>
            <p className={styles.title}>모집 마감일</p>
            <div className={styles.dueDateContainer}>
                <p className={styles.dueDate}>{formatDate(date)}</p>
                <p className={cn(getDateLeftClassName(date))}>
                    {getDateDifference(date)}
                </p>
            </div>
        </div>
    );
}

export default DueDate;
