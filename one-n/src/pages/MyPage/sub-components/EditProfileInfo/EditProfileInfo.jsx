import React from "react";

import InfoInputTemplate from "./sub-components/InfoInputTemplate/InfoInputTemplate";

import {
    useEditProfileAction,
    useEditProfileValue,
} from "../../contexts/EditProfileContext";

import styles from "./EditProfileInfo.module.scss";

function EditProfileInfo() {
    const { userIdInput, userNicknameInput, userPasswordInput } =
        useEditProfileValue();
    const { setUserIdInput, setUserNicknameInput, setUserPasswordInput } =
        useEditProfileAction();

    return (
        <div className={styles.EditProfileInfo}>
            <InfoInputTemplate
                disabled
                label="아이디"
                value={userIdInput}
                onChange={setUserIdInput}
            />
            <InfoInputTemplate
                label="닉네임"
                value={userNicknameInput}
                onChange={setUserNicknameInput}
            />
            <InfoInputTemplate
                disabled
                label="비밀번호 수정하기"
                value={userPasswordInput}
                onChange={setUserPasswordInput}
            />
        </div>
    );
}

export default EditProfileInfo;
