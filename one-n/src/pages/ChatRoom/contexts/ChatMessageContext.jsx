import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useRef,
} from "react";
import { useParams } from "react-router-dom";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

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
    // NOTE: 채팅방 파라미터
    const { chatroomId } = useParams();
    // NOTE: 초기 메시지 데이터
    const { token, initMessages } = useChatRoomValue();

    // NOTE: 웹소켓 객체
    const [wsClient, setWsClient] = useState(null);
    // NOTE: 메시지 리스트
    const [messages, setMessages] = useState(initMessages);
    // NOTE: 메시지 전송 시 스크롤 다운 효과를 위한 ref
    const lastMsgRef = useRef(null);

    // NOTE: 소켓 초기화
    const initSocket = () => {
        const client = new Client({
            webSocketFactory: () =>
                new SockJS("http://localhost:5153/ws/chat/"),
            onConnect: (conn) => {
                client.subscribe(
                    "/ws/subscribe/" + chatroomId,
                    onSocketMessage,
                    { Authorization: token }
                );
            },
            onWebSocketError: (err) => console.err(err),
        });

        client.activate();

        setWsClient(client);
    };

    // NOTE: 소켓 메시지 수신
    const onSocketMessage = ({ body }) => {
        if (body) {
            const message = JSON.parse(body);
            setMessages((prev) => [...prev, message]);
        }
    };

    // NOTE: 소켓 메시지 전송
    const sendSocketMessage = ({ type, message }) => {
        wsClient.publish({
            destination: `/ws/publish/${chatroomId}`,
            body: JSON.stringify({ type, message }),
        });
    };

    // NOTE: 초기 메시지 데이터 주입 후 웹소켓 초기화
    useEffect(() => {
        // NOTE: 메시지 데이터 주입
        setMessages(initMessages);

        // NOTE: 채팅 토큰값이 있는 경우에만 웹소켓 초기화
        if (token) {
            initSocket();
        }
    }, [token, initMessages]);

    // NOTE: 메시지 요소가 변경될 때마다 최하단으로 스크롤함
    useEffect(() => {
        lastMsgRef?.current?.scrollIntoView();
    }, [messages]);

    /**
     * NOTE: ChatMessageContext는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ messages, lastMsgRef }),
        [messages]
    );
    const memoizedActions = useMemo(
        () => ({ setMessages, sendSocketMessage }),
        [wsClient]
    );

    return (
        <ChatMessageActionContext.Provider value={memoizedActions}>
            <ChatMessageValueContext.Provider value={memoizedValues}>
                {children}
            </ChatMessageValueContext.Provider>
        </ChatMessageActionContext.Provider>
    );
}

export { useChatMessageValue, useChatMessageAction, ChatMessageProvider };
