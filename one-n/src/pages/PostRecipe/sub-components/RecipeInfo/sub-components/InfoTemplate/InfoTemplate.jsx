import React from "react";

import styles from "./InfoTemplate.module.scss";

function InfoTemplate({ title, children, withPadding = true }) {
    return (
        <div className={styles.InfoTemplate}>
            <p className={styles.title}>{title}</p>
            <div className={withPadding && styles.padding}>{children}</div>
        </div>
    );
}

export default InfoTemplate;
