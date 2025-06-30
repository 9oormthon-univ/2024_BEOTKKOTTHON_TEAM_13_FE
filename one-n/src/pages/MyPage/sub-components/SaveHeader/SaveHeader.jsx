import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../../../assets/icons/back.svg";

import styles from "./SaveHeader.module.scss";

function SaveHeader({ onBackClicked = null, onSaveClicked = () => {} }) {
    const navigate = useNavigate();

    // NOTE: 뒤로가기 버튼 이벤트 핸들러
    const handleBack = () => {
        // NOTE: onBackClicked가 정의되어 있다면 해당 함수를 호출
        if (onBackClicked) {
            onBackClicked();
            return;
        }

        navigate(-1);
    };

    // NOTE: 옵션 버튼 이벤트 핸들러
    const handleSave = () => {
        onSaveClicked();
    };

    return (
        <div className={styles.SaveHeader}>
            <BackIcon onClick={handleBack} />
            <button className={styles.save} onClick={handleSave}>
                저장
            </button>
        </div>
    );
}

export default SaveHeader;
