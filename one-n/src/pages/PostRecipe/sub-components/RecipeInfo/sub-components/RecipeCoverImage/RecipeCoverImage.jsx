import React, { useRef } from "react";

import { ReactComponent as CamerIcon } from "../../../../../../assets/icons/camera.svg";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import styles from "./RecipeCoverImage.module.scss";

function RecipeCoverImage() {
    const inputRef = useRef(null);

    const { recipeCoverImage } = usePostInfoValue();
    const { setRecipeCoverImage } = usePostInfoAction();

    // NOTE: 선택된 사진이 변경될 경우 실행
    const onInputChanged = (e) => {
        if (e.target.files?.length > 0) {
            setRecipeCoverImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div
            className={styles.RecipeCoverImage}
            onClick={() => inputRef.current?.click()}
        >
            <input
                className={styles.input}
                ref={inputRef}
                type="file"
                onChange={onInputChanged}
                accept="image/*"
            />

            {/* NOTE: 업로드된 이미지가 없는 경우 아이콘 표시 */}
            {!recipeCoverImage && <CamerIcon />}

            {/* NOTE: 업로드된 이미지가 있는 경우 이미지 표시 */}
            {recipeCoverImage && (
                <img
                    className={styles.image}
                    src={recipeCoverImage}
                    alt="레시피 표지 이미지"
                />
            )}
        </div>
    );
}

export default RecipeCoverImage;
