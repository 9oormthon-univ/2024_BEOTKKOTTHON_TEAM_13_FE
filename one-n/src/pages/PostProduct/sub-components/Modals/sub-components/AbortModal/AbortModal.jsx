import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../../../components/Button/Button";

import { usePageAction } from "../../../../contexts/PageContext";

import { ReactComponent as WarningTriangleIcon } from "../../../../../../assets/warning-triangle.svg";

import styles from "./AbortModal.module.scss";

function AbortModal() {
    const navigate = useNavigate();

    const { setIsAbortModalOpened } = usePageAction();

    // NOTE: 취소하기 버튼 핸들러
    const handleCancel = () => {
        setIsAbortModalOpened(false);
    };

    // NOTE: 계속하기 버튼 핸들러
    const handleContinue = () => {
        navigate("/");
    };

    return (
        <div className={styles.AbortModal}>
            <div className={styles.container}>
                <WarningTriangleIcon />
                <div className={styles.titleAndDescription}>
                    <p className={styles.title}>작성을 취소하시겠어요?</p>
                    <p className={styles.description}>
                        작성하신 글은 모두 사라지며
                        <br />
                        임시저장되지 않습니다.
                    </p>
                </div>
                <div className={styles.rowButtons}>
                    <Button
                        color="white"
                        size="md"
                        fullWidth
                        onClick={handleCancel}
                    >
                        취소하기
                    </Button>
                    <Button
                        color="yellow"
                        size="md"
                        fullWidth
                        onClick={handleContinue}
                    >
                        계속하기
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AbortModal;
