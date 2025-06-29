import React from "react";
import cn from "classnames";

import styles from "./InfoInputTemplate.module.scss";

function InfoInputTemplate({ label = "", value, onChnage, disabled = false }) {
    return (
        <div className={styles.InfoInputTemplate}>
            <p className={styles.label}>{label}</p>
            <InfoInput
                value={value}
                onChange={(e) => onChnage(e.target.value)}
                disabled={disabled}
            />
        </div>
    );
}

function InfoInput({ value, type = "text", onChange, disabled = false }) {
    return (
        <input
            type={type}
            className={cn(styles.InfoInput, disabled && styles.disabled)}
            placeholder="정보를 입력해주세요."
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
}

export default InfoInputTemplate;
