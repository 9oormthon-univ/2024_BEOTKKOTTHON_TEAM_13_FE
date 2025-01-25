import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ChatRoomsProvider } from "./contexts/ChatRoomsContext";

import Header from "./sub-components/Header/Header";
import ChatTypeSelector from "./sub-components/ChatTypeSelector/ChatTypeSelector";
import List from "./sub-components/List/List";

import styles from "./ChatList.module.scss";

function ChatList() {
    // const baseUrl = "https://n1.junyeong.dev/api";
    // const navigate = useNavigate();

    // const [chat, setChat] = useState([]);
    // const [unreadCounts, setUnreadCounts] = useState({});

    // const [signinData, setSigninData] = useState(null);

    // useEffect(() => {
    //     const storedSigninData = sessionStorage.getItem("signinData");
    //     if (storedSigninData) {
    //         setSigninData(JSON.parse(storedSigninData));
    //         console.log(signinData);
    //     }
    // }, []);

    // const handleChatClick = (chatId) => {
    //     navigate(`/chatroom/${chatId}`);
    // };

    // useEffect(() => {
    //     // 참가 채팅방
    //     const apiUrl = `${baseUrl}/chats/list?session_id=test_session_id`;
    //     // 미확인 채팅
    //     const unreadApiUrl = `${baseUrl}/chats/unread-messages?session_id=test_session_id`;

    //     // 채팅 목록
    //     axios
    //         .get(apiUrl)
    //         .then((response) => {
    //             setChat(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("API 요청 에러:", error);
    //         });

    //     // 안 읽은 채팅 개수
    //     axios
    //         .get(unreadApiUrl)
    //         .then((response) => {
    //             // chat_id를 기준으로 그룹화, 채팅방마다 안 읽은 메시지 갯수를 카운트
    //             const unreadCountsData = response.data.reduce(
    //                 (counts, chat) => {
    //                     counts[chat.chat_id] = (counts[chat.chat_id] || 0) + 1;
    //                     return counts;
    //                 },
    //                 {}
    //             );
    //             setUnreadCounts(unreadCountsData);
    //         })
    //         .catch((error) => {
    //             console.error("API 요청 에러:", error);
    //         });
    // }, []);

    return (
        <ChatRoomsProvider>
            <div className={styles.ChatList}>
                <Header />
                <div className={styles.contents}>
                    <ChatTypeSelector />
                    <List />
                </div>
            </div>
        </ChatRoomsProvider>
    );
}

export default ChatList;
