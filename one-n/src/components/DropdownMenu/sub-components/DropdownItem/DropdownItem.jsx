import React from "react";

import styles from "./DropdownItem.module.scss";

function DropdownItem({ children }) {
    return <div className={styles.DropdownItem}>{children}</div>;
}

export default DropdownItem;
