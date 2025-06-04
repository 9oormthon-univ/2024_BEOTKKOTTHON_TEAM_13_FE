import React from "react";

import styles from "./BottomBorderInput.module.scss";

function BottomBorderInput({ type = "text", value, onChange, placeholder }) {
    return (
        <div className={styles.BottomBorderInput}>
            <input
                className={styles.input}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default BottomBorderInput;
