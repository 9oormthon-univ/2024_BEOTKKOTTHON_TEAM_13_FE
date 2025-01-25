import React from "react";

import { useChatRoomsValue } from "../../contexts/ChatRoomsContext";

import ListElement from "./sub-components/ListElement/ListElement";

function List() {
    const { chatrooms } = useChatRoomsValue();

    return (
        <div>
            {chatrooms.map((chatroom, index) => (
                // TODO: ListElement key 요소 변경
                <ListElement key={chatroom.title} index={index} />
            ))}
        </div>
    );
}

export default List;
