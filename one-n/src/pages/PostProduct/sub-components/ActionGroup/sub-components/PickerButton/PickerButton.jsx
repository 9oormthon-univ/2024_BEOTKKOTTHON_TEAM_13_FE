import React from "react";

import { ReactComponent as ChevronRightIcon } from "../../../../../../assets/icons/chevron-right-2.svg";

import styles from "./PickerButton.module.scss";

function PickerButton({ title = "", onClick = () => {} }) {
    return (
        <div className={styles.PickerButton} onClick={onClick}>
            <p className={styles.title}>{title}</p>
            <ChevronRightIcon />
        </div>
    );
}

export default PickerButton;
