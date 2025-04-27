import React, { useState } from "react";
import cn from "classnames";

import DropdownItem from "./sub-components/DropdownItem/DropdownItem";

import { ReactComponent as CaretDownIcon } from "../../assets/icons/caret-down.svg";

import styles from "./DropdownMenu.module.scss";

function DropdownMenu({ label, caret, outline, right, children }) {
    const [isOpen, setIsOpen] = useState(false);

    // NOTE: 드롭다운 메뉴 열기/닫기
    const handleToggle = (e) => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className={cn(
                styles.DropdownMenu,
                isOpen && styles.opened,
                outline && styles.outline
            )}
            onClick={handleToggle}
        >
            <div className={styles.label}>
                {label}
                {caret && <CaretDownIcon className={styles.caretIcon} />}
            </div>
            {isOpen && (
                <div
                    className={cn(styles.itemContainer, right && styles.right)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

// NOTE: 컴파운드 컴포넌트
DropdownMenu.Item = DropdownItem;

export default DropdownMenu;
