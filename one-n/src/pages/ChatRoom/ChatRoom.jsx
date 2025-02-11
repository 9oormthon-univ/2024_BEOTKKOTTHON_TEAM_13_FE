import React from "react";

import Header from "./sub-components/Header/Header";
import MessageList from "./sub-components/MessageList/MessageList";
import Footer from "./sub-components/Footer/Footer";

function ChatRoom() {
    return (
        <div>
            <Header />
            <MessageList />
            <Footer />
        </div>
    );
}

export default ChatRoom;
