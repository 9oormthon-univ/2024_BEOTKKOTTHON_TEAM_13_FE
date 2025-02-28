import React from "react";
import cn from "classnames";

import styles from "./MessageCard.module.scss";

function MessageCard({ self, message }) {
    return (
        <div className={cn(styles.MessageCard, self && styles.self)}>
            {message}
        </div>
    );
}

export default MessageCard;
