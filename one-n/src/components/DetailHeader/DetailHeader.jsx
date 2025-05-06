import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/more.svg";

import styles from "./DetailHeader.module.scss";

function DetailHeader({
    label = "",
    enableOption = true,
    // optionItems = [],
    // onOptionItemClicked = () => {},
}) {
    const navigate = useNavigate();

    // TODO: 추후 옵션 아이템 사용 시 주석 해제
    // const [isOptionOpened, setIsOptionOpened] = useState(true);

    // NOTE: 뒤로가기 버튼 이벤트 핸들러
    const handleBack = () => {
        navigate(-1);
    };

    // NOTE: 옵션 버튼 이벤트 핸들러
    const handleOption = () => {
        // setIsOptionOpened((prev) => !prev);
    };

    // NOTE: 옵션 아이템 클릭 이벤트 핸들러
    // const handleOptionItemClick = (item) => {
    //     const clickedOptionIndex = optionItems.indexOf(item);

    //     if (clickedOptionIndex === -1) {
    //         console.error("Invalid option item clicked");
    //         return;
    //     }

    //     onOptionItemClicked(clickedOptionIndex);
    //     setIsOptionOpened(false);
    // };

    return (
        <div className={styles.DetailHeader}>
            <BackIcon onClick={handleBack} />
            {label && <div className={styles.label}>{label}</div>}
            {enableOption && <MoreIcon onClick={handleOption} />}
            {/* {isOptionOpened && (
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
            )} */}
        </div>
    );
}

export default DetailHeader;
