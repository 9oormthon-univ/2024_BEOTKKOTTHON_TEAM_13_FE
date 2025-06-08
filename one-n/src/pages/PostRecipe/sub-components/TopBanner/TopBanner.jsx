import React from "react";

import styles from "./TopBanner.module.scss";

function TopBanner() {
    return (
        <div className={styles.TopBanner}>
            <p className={styles.label}>
                어떤 레시피를
                <br />
                공유하고 싶으신가요?
            </p>
        </div>
    );
}

export default TopBanner;
