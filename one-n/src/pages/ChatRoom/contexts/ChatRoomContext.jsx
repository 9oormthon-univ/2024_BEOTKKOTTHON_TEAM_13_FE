import React, { createContext, useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import useInitChatroom from "../hooks/useInitChatroom";

const ChatRoomValueContext = createContext();
const ChatRoomActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useChatRoomValue = () => {
    return useContext(ChatRoomValueContext);
};
const useChatRoomAction = () => {
    return useContext(ChatRoomActionContext);
};

/**
 * NOTE: 전반적인 채팅방 관리를 위한 컨텍스트 프로바이더
 * @param {*} children Children 요소
 * @returns ChatRoomProvider
 */
function ChatRoomProvider({ children }) {
    // NOTE: 퇴장 모달 표시 여부
    const [isVisibleQuitModal, setVisibleQuitModal] = useState(false);
    // NOTE: 리뷰 작성 모달 표시 여부
    const [isVisibleReviewModal, setVisibleReviewModal] = useState(false);

    // NOTE: 채팅방 초기 데이터
    const { chatroomId } = useParams();
    const {
        isLoading,
        chatroomData: { token, postId, numberOfJoined, initMessages },
    } = useInitChatroom(chatroomId);

    /**
     * NOTE: ChatRoomContext는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({
            isVisibleQuitModal,
            isVisibleReviewModal,
            token,
            postId,
            numberOfJoined,
            initMessages,
        }),
        [isVisibleQuitModal, isVisibleReviewModal, isLoading]
    );

    const memoizedActions = useMemo(
        () => ({ setVisibleQuitModal, setVisibleReviewModal }),
        []
    );

    return (
        <ChatRoomActionContext.Provider value={memoizedActions}>
            <ChatRoomValueContext.Provider value={memoizedValues}>
                {children}
            </ChatRoomValueContext.Provider>
        </ChatRoomActionContext.Provider>
    );
}

export { useChatRoomAction, useChatRoomValue, ChatRoomProvider };
