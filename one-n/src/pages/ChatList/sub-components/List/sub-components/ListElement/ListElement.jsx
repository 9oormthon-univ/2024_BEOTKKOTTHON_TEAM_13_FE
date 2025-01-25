import React from "react";

import food1Icon from "../../../../../../assets/samples/food1.png";

import styles from "./ListElement.module.scss";
import { useChatRoomsValue } from "../../../../contexts/ChatRoomsContext";

function NewMessageAlert() {
    return <div className={styles.NewMessageAlert} />;
}

function ListElement({ index }) {
    const { chatrooms } = useChatRoomsValue();

    return (
        <div className={styles.ListElement}>
            <img className={styles.image} src={food1Icon} />
            <div className={styles.contents}>
                <div className={styles.header}>
                    <p className={styles.title}>{chatrooms[index].title}</p>
                    <p className={styles.lastTime}>
                        {chatrooms[index].lastMsgTime}
                    </p>
                </div>
                <div className={styles.footer}>
                    <p className={styles.lastMessage}>
                        {chatrooms[index].lastMsg}
                    </p>
                    {chatrooms[index].newMsgAlert && <NewMessageAlert />}
                </div>
            </div>
        </div>
    );
}

export default ListElement;
