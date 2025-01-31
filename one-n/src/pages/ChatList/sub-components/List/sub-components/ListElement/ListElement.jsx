import React from "react";
import moment from "moment";
import "moment/locale/ko";

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
            <img
                className={styles.image}
                src={chatrooms[index].post.imagePath}
            />
            <div className={styles.contents}>
                <div className={styles.header}>
                    <p className={styles.title}>
                        {chatrooms[index].post.title}
                    </p>
                    <p className={styles.lastTime}>
                        {moment(chatrooms[index].lastMessage.createdAt).format(
                            "A hh:mm"
                        )}
                    </p>
                </div>
                <div className={styles.footer}>
                    <p className={styles.lastMessage}>
                        {chatrooms[index].lastMessage.message}
                    </p>
                    {chatrooms[index].unreadMsgsCounter > 0 && (
                        <NewMessageAlert />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListElement;
