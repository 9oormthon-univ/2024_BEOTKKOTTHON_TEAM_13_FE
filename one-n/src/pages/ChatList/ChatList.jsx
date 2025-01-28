import React from "react";

import { ChatRoomsProvider } from "./contexts/ChatRoomsContext";

import Header from "./sub-components/Header/Header";
import ChatTypeSelector from "./sub-components/ChatTypeSelector/ChatTypeSelector";
import List from "./sub-components/List/List";

import styles from "./ChatList.module.scss";

function ChatList() {
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
