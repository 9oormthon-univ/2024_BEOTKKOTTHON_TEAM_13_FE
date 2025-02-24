import React from "react";

import styles from "./DateDivider.module.scss";

function DateDivider({ date = "" }) {
    return (
        <div className={styles.DateDivider}>
            <p>{date}</p>
        </div>
    );
}

export default DateDivider;
