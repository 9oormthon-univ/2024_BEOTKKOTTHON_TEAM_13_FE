import React from "react";

import styles from "./Participants.module.scss";

function Participants({ joined = 0, total = 0 }) {
    return (
        <div className={styles.Participants}>
            <p className={styles.title}>공동구매 인원</p>
            <div className={styles.participantInfo}>
                <p className={styles.joined}>{joined}명 / </p>
                <p className={styles.total}>{total}명</p>
            </div>
        </div>
    );
}

export default Participants;
