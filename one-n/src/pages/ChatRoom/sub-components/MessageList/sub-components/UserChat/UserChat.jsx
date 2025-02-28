import React from "react";
import cn from "classnames";

import MessageCard from "./sub-components/MessageCard/MessageCard";

import styles from "./UserChat.module.scss";

function UserChat({
    self = false,
    profileImageUrl = "",
    userName = "",
    messageTime = "",
    children,
}) {
    if (self) {
        return (
            <div className={cn(styles.UserChat, styles.self)}>
                <div className={styles.nameAndMessage}>
                    <div className={styles.messageAndTime}>
                        <p className={styles.messageTime}>{messageTime}</p>
                        <MessageCard self={self} message={children} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.UserChat}>
            <img className={styles.profileImage} src={profileImageUrl} alt="" />
            <div className={styles.nameAndMessage}>
                <p className={styles.name}>{userName}</p>
                <div className={styles.messageAndTime}>
                    <MessageCard self={self} message={children} />
                    <p className={styles.messageTime}>{messageTime}</p>
                </div>
            </div>
        </div>
    );
}

export default UserChat;
