import React from "react";

import BottomBorderInput from "../../../../../../components/BottomBorderInput/BottomBorderInput";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import styles from "./PostPrice.module.scss";

function PostPrice() {
    const { postPrice } = usePostInfoValue();
    const { setPostPrice } = usePostInfoAction();

    // NOTE: 게시글 가격이 변경되었을 때 호출되는 함수
    const onInputChanged = (e) => {
        if (!isNaN(e.target.value)) {
            setPostPrice(Number(e.target.value));
        }
    };

    return (
        <div className={styles.PostPrice}>
            <div className={styles.inputContainer}>
                <BottomBorderInput
                    type="number"
                    value={postPrice || ""}
                    onChange={onInputChanged}
                    placeholder="가격을 입력해주세요 (인당 가격)"
                />
            </div>
            <p className={styles.unit}>원</p>
        </div>
    );
}

export default PostPrice;
