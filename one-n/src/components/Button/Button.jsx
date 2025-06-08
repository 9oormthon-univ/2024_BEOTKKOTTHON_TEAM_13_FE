import React from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

function Button({
    color = "white",
    size = "md",
    fullWidth = false,
    onClick = () => {},
    icon: Icon = null,
    children,
}) {
    return (
        <div
            className={cn(
                styles.Button,
                fullWidth && styles["Button--full"],
                size === "md" && styles["Button--md"],
                styles[color]
            )}
            onClick={onClick}
        >
            {Icon && <Icon className={styles.icon} />}
            {children}
        </div>
    );
}

export default Button;
