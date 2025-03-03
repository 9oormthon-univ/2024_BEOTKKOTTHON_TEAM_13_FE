import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from "react";

import { useChatRoomValue } from "./ChatRoomContext";

const ChatMessageValueContext = createContext();
const ChatMessageActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useChatMessageValue = () => {
    return useContext(ChatMessageValueContext);
};
const useChatMessageAction = () => {
    return useContext(ChatMessageActionContext);
};

/**
 * NOTE: 채팅방 메시지 관리를 위한 컨텍스트 프로바이더
 * @param {*} children Children 요소
 * @returns ChatMessageProvider
 */
function ChatMessageProvider({ children }) {
    const { initMessages } = useChatRoomValue();

    // NOTE: 메시지 리스트
    const [messages, setMessages] = useState(initMessages);

    // NOTE: 초기 메시지 데이터 주입
    useEffect(() => {
        setMessages(initMessages);
    }, [initMessages]);

    /**
     * NOTE: ChatMessageContext는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(() => ({ messages }), [messages]);
    const memoizedActions = useMemo(() => ({ setMessages }), []);

    return (
        <ChatMessageActionContext.Provider value={memoizedActions}>
            <ChatMessageValueContext.Provider value={memoizedValues}>
                {children}
            </ChatMessageValueContext.Provider>
        </ChatMessageActionContext.Provider>
    );
}

export { useChatMessageValue, useChatMessageAction, ChatMessageProvider };
