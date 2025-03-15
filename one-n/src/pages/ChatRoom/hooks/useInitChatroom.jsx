import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const useInitChatroom = (chatroomId) => {
    // NOTE: 데이터 로딩 유무
    const [isLoading, setIsLoading] = useState(true);
    // NOTE: 채팅방 데이터
    const [chatroomData, setChatroomData] = useState({
        token: "", // NOTE: 채팅 메시지 전송을 위한 토큰
        postId: null, // NOTE: 채팅방의 포스트 ID
        numberOfJoined: 0, // NOTE: 채팅방 참여자 수
        initMessages: [], // NOTE: 채팅방 초기 메시지 데이터
    });

    // NOTE: 첫 렌더링에만 채팅방 데이터를 가져옴
    useEffect(() => {
        axios
            .get(`/api2/chat/chatroom?id=${chatroomId}`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data) {
                    setChatroomData((prev) => {
                        setIsLoading(false);
                        return {
                            ...prev,
                            token: res.data.chat_token,
                            postId: res.data.postId,
                            numberOfJoined:
                                Array.isArray(res.data.userIds) &&
                                res.data.userIds.length,
                            initMessages: res.data.messages,
                        };
                    });
                }
            });
    }, []);

    return useMemo(() => ({ isLoading, chatroomData }), [isLoading]);
};

export default useInitChatroom;
