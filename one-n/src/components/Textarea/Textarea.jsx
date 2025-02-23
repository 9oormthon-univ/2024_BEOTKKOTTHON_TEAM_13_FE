import React from "react";
import cn from "classnames";

import styles from "./Textarea.module.scss";

function Textarea({ full = false, placeholder = "", height = "auto" }) {
    return (
        <textarea
            className={cn(styles.Textarea, full && styles["Textarea--full"])}
            placeholder={placeholder}
            style={{ height }}
        ></textarea>
    );
}

export default Textarea;
