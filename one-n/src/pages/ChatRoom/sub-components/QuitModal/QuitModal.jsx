import React from "react";

import Button from "../../../../components/Button/Button";

import {
    useChatRoomValue,
    useChatRoomAction,
} from "../../contexts/ChatRoomContext";

import openedDoorIcon from "../../../../assets/icons/opened-door.png";
import styles from "./QuitModal.module.scss";

function QuitModal() {
    const { isVisibleQuitModal } = useChatRoomValue();
    const { setVisibleQuitModal } = useChatRoomAction();

    const closeQuitModal = () => {
        setVisibleQuitModal(false);
    };

    // NOTE: 이벤트 버블링 방지
    const stopEventPropgation = (e) => {
        e.stopPropagation();
    };

    return (
        isVisibleQuitModal && (
            <div className={styles.QuitModal} onClick={closeQuitModal}>
                <div
                    className={styles.modalContainer}
                    onClick={stopEventPropgation}
                >
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
                        <Button
                            color="white"
                            size="md"
                            fullWidth
                            onClick={closeQuitModal}
                        >
                            취소
                        </Button>
                        <Button
                            color="yellow"
                            size="md"
                            fullWidth
                            onClick={closeQuitModal}
                        >
                            나가기
                        </Button>
                    </div>
                </div>
            </div>
        )
    );
}

export default QuitModal;
