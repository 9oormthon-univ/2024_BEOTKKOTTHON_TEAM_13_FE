import axios from "axios";
import { useEffect, useMemo, useState } from "react";

/**
 * 유저의 채팅방 목록을 가져오는 훅
 * @param {Symbol} chatroomType 채팅방 종류를 구분하는 심볼
 * @returns
 */
const useChatroomList = (chatroomType) => {
    const [isLoading, setIsLoading] = useState(true);
    const [chatrooms, setChatrooms] = useState([]);

    // NOTE: 채팅방 구분이 변경될 때 API를 재전송함
    useEffect(() => {
        axios
            .get("/api2/chat/chatroom/list", {
                withCredentials: true,
            })
            .then((res) => {
                if (res.data) {
                    setChatrooms(res.data);
                    setIsLoading(false);
                }
            });
    }, [chatroomType]);

    return useMemo(() => {
        return { isLoading, chatrooms };
    }, [chatroomType, chatrooms]);
};

export default useChatroomList;
