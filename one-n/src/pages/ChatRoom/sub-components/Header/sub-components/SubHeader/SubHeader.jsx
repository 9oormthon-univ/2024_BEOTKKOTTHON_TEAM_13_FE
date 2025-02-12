import React from "react";

import BorderButton from "./sub-components/BorderButton/BorderButton";
import PopoverButton from "./sub-components/PopoverButton/PopoverButton";

import { ReactComponent as CalendarIcon } from "../../../../../../assets/icons/calendar.svg";
import { ReactComponent as WonIcon } from "../../../../../../assets/icons/won.svg";

import styles from "./SubHeader.module.scss";

function SubHeader() {
    return (
        <div className={styles.SubHeader}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <BorderButton icon={<CalendarIcon />} label="N분약속" />
                    <BorderButton icon={<WonIcon />} label="N명송금" />
                </div>
                <div className={styles.rightSection}>
                    <PopoverButton />
                </div>
            </div>
        </div>
    );
}

export default SubHeader;
