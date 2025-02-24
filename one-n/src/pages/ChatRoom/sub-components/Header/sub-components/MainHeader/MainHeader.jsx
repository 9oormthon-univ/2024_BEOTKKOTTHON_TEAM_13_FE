import React from "react";

import { ReactComponent as BackIcon } from "../../../../../../assets/icons/back.svg";
import { ReactComponent as ExitIcon } from "../../../../../../assets/icons/exit.svg";
import { ReactComponent as MoreIcon } from "../../../../../../assets/icons/more.svg";
import { ReactComponent as ParticipantsIcon } from "../../../../../../assets/icons/participants.svg";

import { useChatRoomAction } from "../../../../contexts/ChatRoomContext";

import sampleImage from "../../../../../../assets/samples/food1.png";

import styles from "./MainHeader.module.scss";

function MainHeader() {
    const { setVisibleQuitModal } = useChatRoomAction();

    const showQuitModal = () => {
        setVisibleQuitModal(true);
    };

    return (
        <div className={styles.MainHeader}>
            <div className={styles.leftSection}>
                <BackIcon width={24} height={24} />
                <HeaderPostInfo />
            </div>
            <div className={styles.rightSection}>
                <ExitIcon width={24} height={24} onClick={showQuitModal} />
                <MoreIcon width={24} height={24} />
            </div>
        </div>
    );
}

function HeaderPostInfo() {
    return (
        <div className={styles.HeaderPostInfo}>
            <img
                className={styles.postImage}
                src={sampleImage}
                width={40}
                height={40}
            />
            <div className={styles.titleAndParticipants}>
                <p className={styles.title}>닭갈비 공동구매</p>
                <div className={styles.participants}>
                    <ParticipantsIcon size={16} />
                    <p>4</p>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;
