import React from "react";

import { useChatMessageValue } from "../../contexts/ChatMessageContext";

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
                        userName={message.senderUserName}
                        messageTime={message.createdAt}
                        message={message.message}
                        self={message.self}
                    />
                );
            })}
        </div>
    );
}

function MessageDivider({ type, userName, messageTime, message, self }) {
    switch (type) {
        case "NOTICE":
            return <Notice>{message}</Notice>;
        case "COMPLETE":
            return <RequestReviewCard />;
        default:
            return (
                <UserChat
                    self={self}
                    userName={userName}
                    messageTime={messageTime}
                >
                    {message}
                </UserChat>
            );
    }
}

export default MessageList;
