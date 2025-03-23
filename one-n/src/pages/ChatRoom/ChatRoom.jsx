import React from "react";

import Header from "./sub-components/Header/Header";
import MessageList from "./sub-components/MessageList/MessageList";
import Footer from "./sub-components/Footer/Footer";
import QuitModal from "./sub-components/QuitModal/QuitModal";
import ReviewModal from "./sub-components/ReviewModal/ReviewModal";

import { ChatRoomProvider } from "./contexts/ChatRoomContext";
import { ChatMessageProvider } from "./contexts/ChatMessageContext";

function ChatRoom() {
    return (
        <ChatRoomProvider>
            <ChatMessageProvider>
                <Header />
                <MessageList />
                <Footer />
                <QuitModal />
                <ReviewModal />
            </ChatMessageProvider>
        </ChatRoomProvider>
    );
}

export default ChatRoom;
