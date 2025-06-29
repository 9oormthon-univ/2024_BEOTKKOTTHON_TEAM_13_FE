import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";

import { usePageValue } from "./PageContext";

const EditProfileValueContext = createContext();
const EditProfileActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useEditProfileValue = () => {
    return useContext(EditProfileValueContext);
};

const useEditProfileAction = () => {
    return useContext(EditProfileActionContext);
};

/**
 * NOTE: 마이페이지에서 프로필 수정에 필요한 상태들을 관리하기 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns EditProfile Provider
 */
function EditProfileProvider({ children }) {
    const { myInfo } = usePageValue();

    const [userIdInput, setUserIdInput] = useState(myInfo.email);
    const [userNicknameInput, setUserNicknameInput] = useState(myInfo.nickname);
    const [userProfileImageInput, setUserProfileImageInput] = useState(
        myInfo.profileImage
    );
    const [userPasswordInput, setUserPasswordInput] = useState("");

    // NOTE: 유저 정보를 가져온 경우 유저 정보 상태 업데이트
    useEffect(() => {
        setUserIdInput(myInfo.email);
        setUserNicknameInput(myInfo.nickname);
        setUserProfileImageInput(myInfo.profileImage);
    }, [myInfo]);

    /**
     * NOTE: EditProfileContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({
            userIdInput,
            userNicknameInput,
            userProfileImageInput,
            userPasswordInput,
        }),
        [
            userIdInput,
            userNicknameInput,
            userProfileImageInput,
            userPasswordInput,
        ]
    );

    const memoizedActions = useMemo(
        () => ({
            setUserIdInput,
            setUserNicknameInput,
            setUserProfileImageInput,
            setUserPasswordInput,
        }),
        []
    );

    return (
        <EditProfileActionContext.Provider value={memoizedActions}>
            <EditProfileValueContext.Provider value={memoizedValues}>
                {children}
            </EditProfileValueContext.Provider>
        </EditProfileActionContext.Provider>
    );
}

export { useEditProfileValue, useEditProfileAction, EditProfileProvider };
