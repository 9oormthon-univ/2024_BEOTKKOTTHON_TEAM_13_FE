import React from "react";

import styles from "./MessageInput.module.scss";

function MessageInput({ text, onChange, onKeyDown }) {
    return (
        <input
            className={styles.MessageInput}
            placeholder="메세지를 입력해주세요."
            value={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}

export default MessageInput;
