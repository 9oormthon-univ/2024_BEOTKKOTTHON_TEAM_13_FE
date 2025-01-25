import React, { useState } from "react";
import cx from "classnames";

import {
    useChatRoomsAction,
    useChatRoomsValue,
} from "../../contexts/ChatRoomsContext";

import { CHATROOM_SELECTOR_TYPES } from "../../consts/const";

import styles from "./ChatTypeSelector.module.scss";

function ChatTypeSelector() {
    const { chatroomType } = useChatRoomsValue();
    const { setChatroomType } = useChatRoomsAction();

    // NOTE: 각 항목 선택시 호출됨
    const onSelectorClicked = (id) => {
        setChatroomType(id);
    };

    return (
        <div className={styles.ChatTypeSelector}>
            {CHATROOM_SELECTOR_TYPES.map(({ id, label }) => (
                <div
                    key={id.description}
                    className={cx(
                        styles.selector,
                        chatroomType === id && styles.selected
                    )}
                    onClick={() => {
                        onSelectorClicked(id);
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}

export default ChatTypeSelector;
