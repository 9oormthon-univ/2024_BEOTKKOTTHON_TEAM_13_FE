import React from "react";

import DropdownMenu from "../../../../components/DropdownMenu/DropdownMenu";

import styles from "./FilterSection.module.scss";

function FilterSection() {
    return (
        <div className={styles.FilterSection}>
            <div className={styles.leftContainer}>
                <DropdownMenu label="가격" caret outline>
                    <DropdownMenu.Item>0 ~ 10,000원</DropdownMenu.Item>
                    <DropdownMenu.Item>10,000 ~ 20,000원</DropdownMenu.Item>
                    <DropdownMenu.Item>20,000 ~ 30,000원</DropdownMenu.Item>
                    <DropdownMenu.Item>30,000 ~ 40,000원</DropdownMenu.Item>
                    <DropdownMenu.Item>40,000 ~ 50,000원</DropdownMenu.Item>
                    <DropdownMenu.Item>50,000 ~</DropdownMenu.Item>
                </DropdownMenu>
            </div>
            <div className={styles.rightContainer}>
                <DropdownMenu label="최신순" caret right>
                    <DropdownMenu.Item>최신순</DropdownMenu.Item>
                    <DropdownMenu.Item>낮은 가격순</DropdownMenu.Item>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default FilterSection;
