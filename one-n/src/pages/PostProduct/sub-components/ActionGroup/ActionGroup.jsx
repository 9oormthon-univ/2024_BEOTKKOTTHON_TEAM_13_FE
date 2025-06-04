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

    const { setIsEndDateOpened, setIsSuccessModalOpened } = usePageAction();
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
