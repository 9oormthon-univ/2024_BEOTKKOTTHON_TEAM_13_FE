import React, { useState } from "react";

import ImageButton from "../../../../components/ImageButton/ImageButton";
import MessageInput from "./sub-components/MessageInput/MessageInput";

import { ReactComponent as PhotoIcon } from "../../../../assets/icons/photo.svg";
import { ReactComponent as SendIcon } from "../../../../assets/icons/send.svg";

import { useChatMessageAction } from "../../contexts/ChatMessageContext";

import styles from "./Footer.module.scss";

function Footer() {
    const { sendSocketMessage } = useChatMessageAction();

    const [inputText, setInputText] = useState("");

    // NOTE: 사진 업로드
    const onUploadPhoto = () => {
        console.log("Upload photo");
    };

    // NOTE: 메시지 전송
    const onSendMessage = () => {
        sendSocketMessage({ type: "MESSAGE_TEXT", message: inputText });
        setInputText("");
    };

    return (
        <div className={styles.Footer}>
            <ImageButton
                size="md"
                color="grey"
                icon={<PhotoIcon />}
                onClick={onUploadPhoto}
            />
            <MessageInput
                text={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 && onSendMessage()}
            />
            <ImageButton
                size="md"
                color="yellow"
                icon={<SendIcon />}
                onClick={onSendMessage}
            />
        </div>
    );
}

export default Footer;
