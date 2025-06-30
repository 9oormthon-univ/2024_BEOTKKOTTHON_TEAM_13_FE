import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/more.svg";

import styles from "./DetailHeader.module.scss";

function DetailHeader({
    label = "",
    enableOption = true,
    onBackClicked = null,
    optionItems = [],
    onOptionItemClicked = () => {},
}) {
    const navigate = useNavigate();

    const [isOptionOpened, setIsOptionOpened] = useState(false);

    // NOTE: 뒤로가기 버튼 이벤트 핸들러
    const handleBack = () => {
        // NOTE: onBackClicked가 정의되어 있다면 해당 함수를 호출
        if (onBackClicked) {
            onBackClicked();
            return;
        }

        navigate(-1);
    };

    // NOTE: 옵션 버튼 이벤트 핸들러
    const handleOption = () => {
        setIsOptionOpened((prev) => !prev);
    };

    // NOTE: 옵션 아이템 클릭 이벤트 핸들러
    const handleOptionItemClick = (item) => {
        const clickedOptionIndex = optionItems.indexOf(item);

        if (clickedOptionIndex === -1) {
            console.error("Invalid option item clicked");
            return;
        }

        onOptionItemClicked(clickedOptionIndex);
        setIsOptionOpened(false);
    };

    return (
        <div className={styles.DetailHeader}>
            <BackIcon onClick={handleBack} />
            {label && <div className={styles.label}>{label}</div>}
            <div>{enableOption && <MoreIcon onClick={handleOption} />}</div>
            {isOptionOpened && (
                <div className={styles.options}>
                    {optionItems.map((item) => (
                        <div
                            key={item}
                            className={styles.optionItem}
                            onClick={() => handleOptionItemClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DetailHeader;
