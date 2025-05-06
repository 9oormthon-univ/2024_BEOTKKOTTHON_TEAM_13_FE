import React from "react";

import styles from "./BannerImage.module.scss";

function BannerImage({ src = "" }) {
    return (
        <div className={styles.BannerImage}>
            <img className={styles.image} src={src} alt="Product Image" />
        </div>
    );
}

export default BannerImage;
