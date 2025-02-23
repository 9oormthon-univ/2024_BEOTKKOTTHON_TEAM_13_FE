import React from "react";
import cn from "classnames";

import styles from "./Textarea.module.scss";

function Textarea({ full = false, placeholder = "", height = "auto" }) {
    return (
        <textarea
            className={cn(styles.Textarea, full && styles["Textarea--full"])}
            placeholder={placeholder}
            style={{ height, resize: "none" }}
        ></textarea>
    );
}

export default Textarea;
