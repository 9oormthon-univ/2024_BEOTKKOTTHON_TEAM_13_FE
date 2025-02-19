import React from "react";

import openedDoorIcon from "../../../../assets/icons/opened-door.png";

import styles from "./QuitModal.module.scss";
import Button from "../../../../components/Button/Button";

function QuitModal() {
    return (
        <div className={styles.QuitModal}>
            <div className={styles.modalContainer}>
                <img
                    className={styles.quitIcon}
                    src={openedDoorIcon}
                    alt="Quit Icon"
                />
                <p className={styles.title}>정말 퇴장하시겠어요?</p>
                <p className={styles.description}>
                    채팅방은 영구적으로 삭제되며
                    <br />
                    거래는 자동으로 취소됩니다.
                </p>
                <div className={styles.rowButtons}>
                    <Button color="white" size="md" fullWidth>
                        취소
                    </Button>
                    <Button color="yellow" size="md" fullWidth>
                        나가기
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default QuitModal;
