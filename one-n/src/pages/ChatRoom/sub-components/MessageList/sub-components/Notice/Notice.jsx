import React from "react";

import styles from "./Notice.module.scss";

function Notice({ children }) {
    return <div className={styles.Notice}>{children}</div>;
}

export default Notice;
