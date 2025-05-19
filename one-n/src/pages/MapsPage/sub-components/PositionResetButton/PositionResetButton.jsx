import React from "react";

import { ReactComponent as TargetLocationIcon } from "../../../../assets/icons/target-location-3.svg";

import { useMapsAction } from "../../contexts/MapsContext";

import styles from "./PositionResetButton.module.scss";

function PositionResetButton() {
    const { resetPosition } = useMapsAction();

    return (
        <div className={styles.PositionResetButton} onClick={resetPosition}>
            <TargetLocationIcon />
        </div>
    );
}

export default PositionResetButton;
