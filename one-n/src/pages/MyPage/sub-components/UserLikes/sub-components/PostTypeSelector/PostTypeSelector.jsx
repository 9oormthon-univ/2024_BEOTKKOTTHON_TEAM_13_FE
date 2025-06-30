import React from "react";
import cn from "classnames";

import { MY_LIKES_PRODUCT_TYPES } from "../../../../consts/const";

import { usePageValue, usePageAction } from "../../../../contexts/PageContext";

import styles from "./PostTypeSelector.module.scss";

function PostTypeSelector() {
    const { selectedPostType } = usePageValue();
    const { setSelectedPostType } = usePageAction();

    // NOTE: 각 항목 선택시 호출됨
    const onSelectorClicked = (type) => {
        setSelectedPostType(type);
    };

    return (
        <div className={styles.PostTypeSelector}>
            {MY_LIKES_PRODUCT_TYPES.map(({ id, label, type }) => (
                <div
                    id={id}
                    key={id.description}
                    className={cn(
                        styles.selector,
                        selectedPostType === id && styles.selected
                    )}
                    onClick={() => {
                        onSelectorClicked(id, type);
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}

export default PostTypeSelector;
