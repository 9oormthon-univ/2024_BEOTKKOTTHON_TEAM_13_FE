import React from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import Button from "../../../../components/Button/Button";
import PickerButton from "./sub-components/PickerButton/PickerButton";

import { usePageAction } from "../../contexts/PageContext";
import { usePostInfoAction } from "../../contexts/PostInfoContext";

import styles from "./ActionGroup.module.scss";

function ActionGroup() {
    const navigate = useNavigate();

    const { setIsEndDateOpened } = usePageAction();
    const { validatePostInfo, uploadPostInfo } = usePostInfoAction();

    // NOTE: 거래 희망 장소 선택 버튼 이벤트 핸들러
    const handleMeetingPlaceClick = () => {
        navigate("/post/product/meeting-place");
    };

    // NOTE: 거래 마감일 선택 버튼 이벤트 핸들러
    const handleEndDateClick = () => {
        setIsEndDateOpened(true);
    };

    // NOTE: 게시글 업로드 버튼 이벤트 핸들러
    const uploadPost = debounce(() => {
        if (validatePostInfo()) {
            uploadPostInfo();
        }
    }, 500);

    return (
        <div className={styles.ActionGroup}>
            <PickerButton
                title="거래 희망 장소"
                onClick={handleMeetingPlaceClick}
            />
            <PickerButton title="거래 마감일" onClick={handleEndDateClick} />
            <Button color="yellow" size="md" fullWidth onClick={uploadPost}>
                올리기
            </Button>
        </div>
    );
}

export default ActionGroup;
