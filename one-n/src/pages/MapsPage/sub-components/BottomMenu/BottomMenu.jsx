import React, { useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import FilterSection from "./sub-components/FilterSection/FilterSection";
import ProductList from "./sub-components/ProductList/ProductList";

import { useProductValue } from "../../contexts/ProductContext";

import styles from "./BottomMenu.module.scss";
import "./react-spring-bottom-sheet.css";

function BottomMenu() {
    const bottomSheetRef = useRef(null);

    /**
     * NOTE: container 내의 요소가 무한 스크롤되려면 BottomSheet의 최대 높이를
     * 알아야하는데, 이를 위해 snapPoints의 maxHeight를 이용하여 최대 높이를 가져옴
     */
    const [sheetHeight, setSheetHeight] = useState("100%");
    const { SCROLL_ELEMENT_ID } = useProductValue();

    return (
        <BottomSheet
            ref={bottomSheetRef}
            open={true}
            blocking={false}
            snapPoints={({ maxHeight }) => {
                setSheetHeight(maxHeight * 0.8);
                return [300, maxHeight * 0.6, maxHeight * 0.8];
            }}
            expandOnContentDrag={true}
        >
            <div
                id={SCROLL_ELEMENT_ID}
                className={styles.container}
                style={{ height: sheetHeight }}
            >
                <FilterSection />
                <ProductList />
            </div>
        </BottomSheet>
    );
}

export default BottomMenu;
