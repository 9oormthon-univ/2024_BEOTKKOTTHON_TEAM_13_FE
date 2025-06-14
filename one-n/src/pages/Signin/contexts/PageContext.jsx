import React, { createContext, useContext, useMemo, useState } from "react";

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
 * NOTE: 공동구매 게시글 페이지 전반에 걸쳐 사용되는 상태 및 관리하기 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns Page Provider
 */
function PageProvider({ children }) {
    // NOTE: 로그인 실패 모달 표시 여부
    const [isFailedLoginModalOpened, setIsFailedLoginModalOpened] =
        useState(false);

    /**
     * NOTE: PageContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ isFailedLoginModalOpened }),
        [isFailedLoginModalOpened]
    );

    const memoizedActions = useMemo(
        () => ({
            setIsFailedLoginModalOpened,
        }),
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
