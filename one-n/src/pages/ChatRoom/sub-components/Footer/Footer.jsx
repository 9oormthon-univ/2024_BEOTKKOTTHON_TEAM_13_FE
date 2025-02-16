import React from "react";

import ImageButton from "../../../../components/ImageButton/ImageButton";
import MessageInput from "./sub-components/MessageInput/MessageInput";

import { ReactComponent as PhotoIcon } from "../../../../assets/icons/photo.svg";
import { ReactComponent as SendIcon } from "../../../../assets/icons/send.svg";

import styles from "./Footer.module.scss";

function Footer() {
    const onUploadPhoto = () => {
        console.log("Upload photo");
    };

    const onSendMessage = () => {
        console.log("Send message");
    };

    return (
        <div className={styles.Footer}>
            <ImageButton
                size="md"
                color="grey"
                icon={<PhotoIcon />}
                onClick={onUploadPhoto}
            />
            <MessageInput />
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
