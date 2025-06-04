import React from "react";

import Textarea from "../../../../../../components/Textarea/Textarea";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import styles from "./PostDesc.module.scss";

function PostDesc() {
    const { postDesc } = usePostInfoValue();
    const { setPostDesc } = usePostInfoAction();

    return (
        <div className={styles.PostDesc}>
            <Textarea
                full
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
                height={128}
                placeholder="상품에 대한 설명을 넣어주세요."
            />
        </div>
    );
}

export default PostDesc;
