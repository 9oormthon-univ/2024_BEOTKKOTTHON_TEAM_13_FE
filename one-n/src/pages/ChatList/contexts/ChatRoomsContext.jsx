import React, { createContext, useContext, useMemo, useState } from "react";

import { CHATROOM_SELECTOR_TYPES } from "../consts/const";

const ChatRoomsValueContext = createContext();
const ChatRoomsActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useChatRoomsValue = () => {
    return useContext(ChatRoomsValueContext);
};

const useChatRoomsAction = () => {
    return useContext(ChatRoomsActionContext);
};

// TODO: 테스트용 임시 채팅방 목록 상수값 (추후 제거해야 함)
const CHATROOMS = [
    {
        title: "닭갈비 1kg 공동구매 합니다.",
        lastMsgTime: "오후 3:31",
        lastMsg: "안녕하세요 닭갈비 1kg 공동구매하려고요!",
        newMsgAlert: true,
    },
    {
        title: "감자볶음 재료 공동구매 같이 하실 분",
        lastMsgTime: "오후 3:31",
        lastMsg: "어디서 거래하는게 좋으신가요??",
        newMsgAlert: true,
    },
    {
        title: "종가집 김치 1kg 공동구매 모집해요.",
        lastMsgTime: "오후 2:31",
        lastMsg: "안녕하세요 김치 공동구매하려고 연락드렸어요 ^^",
        newMsgAlert: true,
    },
    {
        title: "마늘 1kg공동구매",
        lastMsgTime: "오후 2:31",
        lastMsg: "마늘 공동구매 참여합니다!!! :)",
        newMsgAlert: false,
    },
];

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
    // NOTE: 채팅방 목록
    const [chatrooms, setChatrooms] = useState(CHATROOMS);

    /**
     * NOTE: ChatRoomsContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(() => ({
        chatroomType,
        chatrooms,
    }));

    const memoizedActions = useMemo(() => ({
        setChatroomType,
        setChatrooms,
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
