import React from "react";

import Header from "./sub-components/Header/Header";
import MessageList from "./sub-components/MessageList/MessageList";
import Footer from "./sub-components/Footer/Footer";
import QuitModal from "./sub-components/QuitModal/QuitModal";

function ChatRoom() {
    return (
        <div>
            <Header />
            <MessageList />
            <Footer />
            {/* <QuitModal /> */}
        </div>
    );
}

export default ChatRoom;
