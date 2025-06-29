import React, { useRef } from "react";

import {
    useEditProfileValue,
    useEditProfileAction,
} from "../../contexts/EditProfileContext";

import styles from "./EditProfileImage.module.scss";

function EditProfileImage() {
    const imageInputRef = useRef(null);

    const { userProfileImageInput } = useEditProfileValue();
    const { setUserProfileImageInput } = useEditProfileAction();

    // NOTE: 선택된 사진이 변경될 경우 실행
    const onImageInputChanged = (e) => {
        if (e.target.files?.[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setUserProfileImageInput(file);
        }
    };

    return (
        <div
            className={styles.EditProfileImage}
            onClick={() => imageInputRef.current.click()}
        >
            <img
                className={styles.image}
                src={userProfileImageInput}
                alt="프로필 이미지"
            />
            <input
                className={styles.imageInput}
                ref={imageInputRef}
                type="file"
                onChange={onImageInputChanged}
                accept="image/*"
            />
        </div>
    );
}

export default EditProfileImage;
