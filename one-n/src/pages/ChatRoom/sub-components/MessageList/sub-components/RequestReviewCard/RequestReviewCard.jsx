import React from "react";

import { useChatRoomAction } from "../../../../contexts/ChatRoomContext";

import styles from "./RequestReviewCard.module.scss";

function RequestReviewCard() {
    const { setVisibleReviewModal } = useChatRoomAction();

    const showReviewModal = () => {
        setVisibleReviewModal(true);
    };

    return (
        <div className={styles.RequestReviewCard}>
            <p className={styles.title}>리뷰를 남겨주세요.</p>
            <p className={styles.description}>
                이번 거래는 어떠셨나요?
                <br />
                회원님의 소중한 리뷰를 남겨주세요. :&#41;
            </p>
            <button className={styles.writeReview} onClick={showReviewModal}>
                리뷰 작성하기
            </button>
        </div>
    );
}

export default RequestReviewCard;
