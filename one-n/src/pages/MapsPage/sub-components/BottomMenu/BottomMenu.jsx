import React from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

import FilterSection from "./sub-components/FilterSection/FilterSection";
import ProductList from "./sub-components/ProductList/ProductList";

import styles from "./BottomMenu.module.scss";
import "./react-spring-bottom-sheet.css";

function BottomMenu() {
    return (
        <BottomSheet
            open={true}
            blocking={false}
            snapPoints={({ maxHeight }) => [
                300,
                maxHeight * 0.6,
                maxHeight * 0.8,
            ]}
            expandOnContentDrag={true}
        >
            <div className={styles.container}>
                <FilterSection />
                <ProductList />
            </div>
        </BottomSheet>
    );
}

export default BottomMenu;
