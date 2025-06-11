import React from "react";

import Button from "../../../../components/Button/Button";

import { usePageAction } from "../../contexts/PageContext";

import { ReactComponent as WarningTriangleIcon } from "../../../../assets/warning-triangle.svg";

import styles from "./LoginFailedModal.module.scss";

function LoginFailedModal() {
    const { setIsFailedLoginModalOpened } = usePageAction();

    // NOTE: 계속하기 버튼 핸들러
    const handleConfirm = () => {
        setIsFailedLoginModalOpened(false);
    };

    return (
        <div className={styles.LoginFailedModal}>
            <div className={styles.container}>
                <WarningTriangleIcon />
                <div className={styles.titleAndDescription}>
                    <p className={styles.title}>존재하지 않는 계정입니다.</p>
                    <p className={styles.description}>
                        존재하지 않는 아이디 또는 비밀번호입니다.
                        <br />
                        문제가 지속될 시 고객센터로 문의해주세요.
                    </p>
                </div>
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

export default LoginFailedModal;
