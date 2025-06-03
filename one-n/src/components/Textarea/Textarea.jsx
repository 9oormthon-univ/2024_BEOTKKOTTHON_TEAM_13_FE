import React from "react";
import cn from "classnames";

import styles from "./Textarea.module.scss";

function Textarea({
    value = "",
    onChange = () => {},
    placeholder = "",
    height = "auto",
    full = false,
}) {
    return (
        <textarea
            className={cn(styles.Textarea, full && styles["Textarea--full"])}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ height, resize: "none" }}
        ></textarea>
    );
}

export default Textarea;
