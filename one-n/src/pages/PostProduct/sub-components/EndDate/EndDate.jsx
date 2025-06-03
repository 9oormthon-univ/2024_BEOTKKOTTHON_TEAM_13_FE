import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "../../../../components/Button/Button";

import { usePageValue, usePageAction } from "../../contexts/PageContext";
import { usePostInfoAction } from "../../contexts/PostInfoContext";

import "./DateCalendar.css";
import styles from "./EndDate.module.scss";

function EndDate() {
    const { isEndDateOpened } = usePageValue();
    const { setIsEndDateOpened } = usePageAction();
    const { setPostEndDate } = usePostInfoAction();

    const [selectedDate, setSelectedDate] = useState(new Date());

    // NOTE: 거래 마감일 창이 열려있지 않으면 아무것도 렌더링하지 않음
    if (!isEndDateOpened) {
        return null;
    }

    // NOTE: 선택한 날짜가 변경되었을 때 호출되는 함수
    const handleOnDateChanged = (newValue) => {
        setSelectedDate(new Date(newValue));
    };

    // NOTE: 거래 마감일 선택 후 창을 닫는 함수
    const handleSelect = () => {
        setPostEndDate(selectedDate);
        setIsEndDateOpened(false);
    };

    return (
        <div className={styles.EndDate}>
            <div className={styles.container}>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ko"
                >
                    <DateCalendar
                        className={styles.calendar}
                        showDaysOutsideCurrentMonth
                        value={dayjs(selectedDate)}
                        fixedWeekNumber={6}
                        views={["day"]}
                        onChange={handleOnDateChanged}
                    />
                    <Button
                        color="yellow"
                        size="md"
                        fullWidth
                        onClick={handleSelect}
                    >
                        선택하기
                    </Button>
                </LocalizationProvider>
            </div>
        </div>
    );
}

export default EndDate;
