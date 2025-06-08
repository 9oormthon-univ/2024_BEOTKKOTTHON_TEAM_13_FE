import React from "react";
import { debounce } from "lodash";

import Button from "../../../../../../components/Button/Button";

import { usePostInfoAction } from "../../../../contexts/PostInfoContext";
import { usePageAction } from "../../../../contexts/PageContext";

import styles from "./ActionGroup.module.scss";

function ActionGroup() {
    const { validatePostInfo, uploadPostInfo } = usePostInfoAction();
    const { setIsSuccessModalOpened } = usePageAction();

    // NOTE: 게시글 업로드 버튼 이벤트 핸들러
    const uploadPost = debounce(() => {
        if (validatePostInfo()) {
            const uploadResult = uploadPostInfo();
            if (!uploadResult) {
                alert("게시글 업로드에 실패했습니다. 다시 시도해주세요.");
                return;
            }
            setIsSuccessModalOpened(true);
        }
    }, 500);

    return (
        <div className={styles.ActionGroup}>
            <Button color="yellow" size="md" fullWidth onClick={uploadPost}>
                완료하기
            </Button>
        </div>
    );
}

export default ActionGroup;
