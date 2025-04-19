import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../../../../assets/icons/plus.svg";
import { ReactComponent as BreadIcon } from "../../../../assets/icons/bread.svg";
import { ReactComponent as CartIcon } from "../../../../assets/icons/cart.svg";

import styles from "./FloatingActionButton.module.scss";

function FloatingActionButton() {
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);

    // NOTE: 드롭다운 열기/닫기
    const toggleDropdown = () => {
        setIsDropdownOpened((prev) => !prev);
    };

    return (
        <div className={styles.FloatingActionButton} onClick={toggleDropdown}>
            <PlusIcon
                className={cn(
                    styles.fabIcon,
                    isDropdownOpened && styles.active
                )}
                size="24"
            />
            {isDropdownOpened && (
                <div className={styles.dropdown}>
                    <Link
                        to="/recipeRegister"
                        className={styles.dropdownElement}
                    >
                        <BreadIcon className={styles.icon} size="24" />
                        <p className={styles.label}>레시피</p>
                    </Link>
                    <Link to="/product-post" className={styles.dropdownElement}>
                        <CartIcon className={styles.icon} size="24" />
                        <p className={styles.label}>공동구매</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default FloatingActionButton;
