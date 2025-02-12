import React from "react";

import { ReactComponent as BasketIcon } from "../../../../../../../../assets/icons/basket.svg";

import styles from "./PopoverButton.module.scss";

function PopoverButton() {
    return (
        <div className={styles.PopoverButton}>
            <div className={styles.container}>
                <BasketIcon width={16} height={16} />
                <p>+4</p>
            </div>
            <div className={styles.popover}>
                <div className={styles["popover-elements"]}>
                    <p>당근</p>
                    <p>닭고기ㅋㅋㅋㅋㅋ</p>
                    <p>고구마</p>
                    <p>양파</p>
                </div>
            </div>
        </div>
    );
}

export default PopoverButton;
