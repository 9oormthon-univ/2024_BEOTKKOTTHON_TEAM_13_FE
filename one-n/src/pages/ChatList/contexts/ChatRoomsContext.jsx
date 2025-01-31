import React, { createContext, useContext, useMemo, useState } from "react";

import { CHATROOM_SELECTOR_TYPES } from "../consts/const";
import useChatroomList from "../hooks/useChatroomList";

const ChatRoomsValueContext = createContext();
const ChatRoomsActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useChatRoomsValue = () => {
    return useContext(ChatRoomsValueContext);
};

const useChatRoomsAction = () => {
    return useContext(ChatRoomsActionContext);
};

/**
 * NOTE: 채팅방 목록을 관리하기 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns ChatRooms Provider
 */
function ChatRoomsProvider({ children }) {
    // NOTE: 채팅방 구분
    const [chatroomType, setChatroomType] = useState(
        CHATROOM_SELECTOR_TYPES[0].id
    );

    // NOTE: 채팅방 목록 API 훅
    const { chatrooms } = useChatroomList(chatroomType);

    /**
     * NOTE: ChatRoomsContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({
            chatroomType,
            chatrooms,
        }),
        [chatroomType, chatrooms]
    );

    const memoizedActions = useMemo(() => ({
        setChatroomType,
    }));

    return (
        <ChatRoomsActionContext.Provider value={memoizedActions}>
            <ChatRoomsValueContext.Provider value={memoizedValues}>
                {children}
            </ChatRoomsValueContext.Provider>
        </ChatRoomsActionContext.Provider>
    );
}

export { useChatRoomsValue, useChatRoomsAction, ChatRoomsProvider };
