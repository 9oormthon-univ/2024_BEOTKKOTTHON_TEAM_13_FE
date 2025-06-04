import React from "react";

import BottomBorderInput from "../../../../../../components/BottomBorderInput/BottomBorderInput";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

function PostParticipant() {
    const { postParticipant } = usePostInfoValue();
    const { setPostParticipant } = usePostInfoAction();

    // NOTE: 게시글 인원수가 변경되었을 때 호출되는 함수
    const onInputChanged = (e) => {
        if (!isNaN(e.target.value)) {
            setPostParticipant(Number(e.target.value));
        }
    };

    return (
        <BottomBorderInput
            type="number"
            value={postParticipant || ""}
            onChange={onInputChanged}
            placeholder="모임에 참여할 인원 수를 정해주세요."
        />
    );
}

export default PostParticipant;
