import React from "react";
import cn from "classnames";

import { ReactComponent as StarOutlineIcon } from "../../../../assets/icons/star-outline.svg";

import { useProductDetailValue } from "../../contexts/ProductDetailContext";

import styles from "./ActionGroup.module.scss";

function ActionGroup() {
    const { productData } = useProductDetailValue();

    return (
        <div className={styles.ActionGroup}>
            <ActionButton color="grey">
                <div className={styles["ActionButton--contents__flex"]}>
                    <StarOutlineIcon />
                    찜하기
                </div>
            </ActionButton>
            <ActionButton color="primary" full>
                <div className={styles["ActionButton--contents__flex"]}>
                    <p className={styles["ActionButton--label__bold"]}>
                        {productData.pricePerUser?.toLocaleString("ko-KR")}원~
                    </p>
                    <p>구매하기</p>
                </div>
            </ActionButton>
        </div>
    );
}

function ActionButton({ color = "grey", full = false, children }) {
    return (
        <button
            className={cn(
                styles.ActionButton,
                styles[color],
                full && styles.full
            )}
        >
            {children}
        </button>
    );
}

export default ActionGroup;
