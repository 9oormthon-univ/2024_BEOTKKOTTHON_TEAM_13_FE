import React from "react";
import cn from "classnames";

import styles from "./ImageButton.module.scss";

function ImageButton({
    size = "md",
    color = "grey",
    icon = null,
    onClick = () => {},
}) {
    return (
        <div
            className={cn(
                styles.ImageButton,
                size === "sm" && styles["ImageButton--sm"],
                size === "md" && styles["ImageButton--md"],
                styles[color]
            )}
            onClick={onClick}
        >
            {icon}
        </div>
    );
}

export default ImageButton;
