import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../../../components/Button/Button";

import { ReactComponent as CelebrateSuccessIcon } from "../../../../../../assets/celebrate-success.svg";

import styles from "./SuccessModal.module.scss";

function SuccessModal() {
    const navigate = useNavigate();

    // NOTE: 확인 버튼 클릭 시 홈으로 이동
    const handleConfirm = () => {
        navigate("/");
    };

    return (
        <div className={styles.SuccessModal}>
            <div className={styles.container}>
                <CelebrateSuccessIcon />
                <p className={styles.description}>성공적으로 등록되었습니다!</p>
                <Button
                    color="yellow"
                    size="md"
                    fullWidth
                    onClick={handleConfirm}
                >
                    확인
                </Button>
            </div>
        </div>
    );
}

export default SuccessModal;
