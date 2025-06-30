import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";

import fetchMyInfo from "../apis/fetchMyInfo";

import { useLoginValue } from "../../../contexts/LoginProvider";

import { MY_LIKES_INGREDIENT, EMPTY_MY_INFO } from "../consts/const";

const PageValueContext = createContext();
const PageActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const usePageValue = () => {
    return useContext(PageValueContext);
};

const usePageAction = () => {
    return useContext(PageActionContext);
};

/**
 * NOTE: 마이페이지에서 내 정보 / 선택한 찜 게시글 종류 등의 정보를 관리하기 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns Page Provider
 */
function PageProvider({ children }) {
    const { isLogin } = useLoginValue();

    const [myInfo, setMyInfo] = useState(EMPTY_MY_INFO);
    const [selectedPostType, setSelectedPostType] =
        useState(MY_LIKES_INGREDIENT);

    // NOTE: 내 정보 가져오기
    const loadMyInfo = useCallback(async () => {
        const fetchedMyInfo = await fetchMyInfo();

        setMyInfo(fetchedMyInfo);
    }, []);

    // NOTE: 내 정보 리셋
    const resetMyInfo = () => {
        setMyInfo(EMPTY_MY_INFO);
    };

    // NOTE: 내 정보가 비어있는 경우에만 내 정보 가져오기
    useEffect(() => {
        if (isLogin && myInfo.id === EMPTY_MY_INFO.id) {
            loadMyInfo();
        }
    }, [isLogin, myInfo]);

    /**
     * NOTE: PageContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ myInfo, selectedPostType }),
        [myInfo, selectedPostType]
    );

    const memoizedActions = useMemo(
        () => ({ resetMyInfo, setSelectedPostType }),
        []
    );

    return (
        <PageActionContext.Provider value={memoizedActions}>
            <PageValueContext.Provider value={memoizedValues}>
                {children}
            </PageValueContext.Provider>
        </PageActionContext.Provider>
    );
}

export { usePageValue, usePageAction, PageProvider };
