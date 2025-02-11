import React from "react";

import styles from "./BorderButton.module.scss";

function BorderButton({ icon, label, onClick }) {
    return (
        <div className={styles.BorderButton}>
            {icon}
            <p>{label}</p>
        </div>
    );
}

export default BorderButton;
