import React from "react";

import { useChatMessageValue } from "../../contexts/ChatMessageContext";
import { useChatRoomValue } from "../../contexts/ChatRoomContext";

import Notice from "./sub-components/Notice/Notice";
import UserChat from "./sub-components/UserChat/UserChat";
import RequestReviewCard from "./sub-components/RequestReviewCard/RequestReviewCard";

import styles from "./MessageList.module.scss";

function MessageList() {
    const { messages } = useChatMessageValue();

    return (
        <div className={styles.MessageList}>
            {messages.map((message) => {
                return (
                    <MessageDivider
                        key={message.createdAt}
                        type={message.type}
                        userId={message.senderUserId}
                        userName={message.senderUserName}
                        messageTime={message.createdAt}
                        message={message.message}
                    />
                );
            })}
        </div>
    );
}

function MessageDivider({ type, userId, userName, messageTime, message }) {
    // NOTE: 현재 사용자의 유저 ID
    const { userId: currentUserId } = useChatRoomValue();

    switch (type) {
        case "NOTICE":
            return <Notice>{message}</Notice>;
        case "COMPLETE":
            return <RequestReviewCard />;
        default:
            return (
                <UserChat
                    self={userId === currentUserId}
                    userName={userName}
                    messageTime={messageTime}
                >
                    {message}
                </UserChat>
            );
    }
}

export default MessageList;
