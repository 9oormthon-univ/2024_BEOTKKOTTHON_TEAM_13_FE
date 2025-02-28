import React, { useState } from "react";
import cn from "classnames";

import { ReactComponent as BasketIcon } from "../../../../../../../../assets/icons/basket.svg";

import styles from "./PopoverButton.module.scss";

function PopoverButton() {
    const [isPopoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = () => setPopoverActive((prev) => !prev);

    return (
        <div
            className={cn(
                styles.PopoverButton,
                isPopoverActive && styles.active
            )}
            onClick={togglePopoverActive}
        >
            <div className={styles.container}>
                <BasketIcon width={16} height={16} />
                <p>+4</p>
            </div>
            <div className={styles.popover}>
                <div className={styles["popover-elements"]}>
                    <p>당근</p>
                    <p>닭고기</p>
                    <p>고구마</p>
                    <p>양파</p>
                </div>
            </div>
        </div>
    );
}

export default PopoverButton;
