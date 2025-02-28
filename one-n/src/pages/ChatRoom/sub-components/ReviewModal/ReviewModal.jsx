import React, { useState } from "react";

import Textarea from "../../../../components/Textarea/Textarea";
import MagneticSlider from "../../../../components/MagneticSlider/MagneticSlider";
import Button from "../../../../components/Button/Button";

import {
    useChatRoomValue,
    useChatRoomAction,
} from "../../contexts/ChatRoomContext";

import styles from "./ReviewModal.module.scss";

function ReviewModal() {
    const { isVisibleReviewModal } = useChatRoomValue();
    const { setVisibleReviewModal } = useChatRoomAction();

    const [value, setValue] = useState(0);

    const closeReviewModal = () => {
        setVisibleReviewModal(false);
    };

    // NOTE: 이벤트 버블링 방지
    const stopEventPropgation = (e) => {
        e.stopPropagation();
    };

    return (
        isVisibleReviewModal && (
            <div className={styles.ReviewModal} onClick={closeReviewModal}>
                <div
                    className={styles.modalContainer}
                    onClick={stopEventPropgation}
                >
                    <p className={styles.title}>리뷰 작성</p>
                    <Textarea
                        full
                        height={96}
                        placeholder="거래에 대한 후기를 작성해주세요."
                    />
                    <div className={styles.satisfaction}>
                        <p className={styles.title}>만족도</p>
                        <MagneticSlider
                            className={styles.slider}
                            min={0}
                            max={4}
                            value={value}
                            onChange={setValue}
                        />
                        <div className={styles.sliderDesc}>
                            <div className={styles.descElem}>
                                <span>😢</span>
                                <p>별로예요</p>
                            </div>
                            <div className={styles.descElem}>
                                <span>🥲</span>
                                <p>아쉬워요</p>
                            </div>
                            <div className={styles.descElem}>
                                <span>😐</span>
                                <p>괜찮아요</p>
                            </div>
                            <div className={styles.descElem}>
                                <span>😊</span>
                                <p>좋아요</p>
                            </div>
                            <div className={styles.descElem}>
                                <span>😄</span>
                                <p>최고예요</p>
                            </div>
                        </div>
                    </div>
                    <Button fullWidth color="yellow" onClick={closeReviewModal}>
                        작성하기
                    </Button>
                </div>
            </div>
        )
    );
}

export default ReviewModal;
