import React from "react";

import styles from "./MessageInput.module.scss";

function MessageInput() {
    return (
        <input
            className={styles.MessageInput}
            placeholder="메세지를 입력해주세요."
        />
    );
}

export default MessageInput;
