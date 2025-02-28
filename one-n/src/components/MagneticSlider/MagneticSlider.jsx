import React from "react";
import ReactSlider from "react-slider";

import styles from "./MagneticSlider.module.scss";

function MagneticSlider({
    className = "",
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    onChange = () => {},
}) {
    return (
        <div className={className}>
            <ReactSlider
                marks
                className={styles.MagneticSlider}
                trackClassName={styles.track}
                thumbClassName={styles.thumb}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                renderMark={({ key, style }) => (
                    <ReactiveSliderMark
                        markKey={key}
                        value={value}
                        style={style}
                    />
                )}
            />
        </div>
    );
}

function ReactiveSliderMark({ markKey, value, style }) {
    // NOTE: Mark 활성화
    if (markKey <= value) {
        return (
            <span
                className={`${styles.mark} ${styles.active}`}
                style={style}
            ></span>
        );
    }
    // NOTE: Mark 비활성화
    return <span className={styles.mark} style={style}></span>;
}

export default MagneticSlider;
