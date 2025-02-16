import React from "react";

import styles from "./MessageList.module.scss";
import UserChat from "./sub-components/UserChat/UserChat";

function MessageList() {
    return (
        <div className={styles.MessageList}>
            <UserChat self messageTime="19:24">
                넵 5kg에 20,900원짜리 구매 예정이고
            </UserChat>
            <UserChat self messageTime="19:24">
                국민 0000-00000000으로 10,450원 보내주시면 됩니다!
            </UserChat>
            <UserChat userName="군고구마애호가" messageTime="19:24">
                위치는 어디서 만나면 될까요?
            </UserChat>
            <UserChat self messageTime="19:24">
                거래는 강남역 10번 출구 입니다!
            </UserChat>
            <UserChat userName="자연사랑나라사랑" messageTime="19:24">
                넵!
            </UserChat>
            <UserChat userName="자연사랑나라사랑" messageTime="19:24">
                zzzzxcvzxcvzxcvzxcvzxcvzxcvzxcvzxcvzxc
            </UserChat>
        </div>
    );
}

export default MessageList;
