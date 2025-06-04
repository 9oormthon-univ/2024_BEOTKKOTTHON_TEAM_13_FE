import React from "react";
import cn from "classnames";

import { POST_PRODUCT_TYPES } from "../../../../consts/const";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import styles from "./PostTypeSelector.module.scss";

function PostTypeSelector() {
    const { postType } = usePostInfoValue();
    const { setPostType } = usePostInfoAction();

    // NOTE: 각 항목 선택시 호출됨
    const onSelectorClicked = (id) => {
        setPostType(id);
    };

    return (
        <div className={styles.PostTypeSelector}>
            {POST_PRODUCT_TYPES.map(({ id, label }) => (
                <div
                    key={id.description}
                    className={cn(
                        styles.selector,
                        postType === id && styles.selected
                    )}
                    onClick={() => {
                        onSelectorClicked(id);
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}

export default PostTypeSelector;
