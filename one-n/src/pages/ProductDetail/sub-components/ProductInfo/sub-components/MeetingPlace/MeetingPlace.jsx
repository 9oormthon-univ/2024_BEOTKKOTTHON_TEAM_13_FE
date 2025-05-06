import React from "react";

import styles from "./MeetingPlace.module.scss";

function MeetingPlace({ address = "" }) {
    return (
        <div className={styles.MeetingPlace}>
            <p className={styles.title}>거래 희망 장소</p>
            <div className={styles.addressContainer}>
                <p className={styles.address}>{address}</p>
                <div className={styles.showMap}>지도보기</div>
            </div>
        </div>
    );
}

export default MeetingPlace;
