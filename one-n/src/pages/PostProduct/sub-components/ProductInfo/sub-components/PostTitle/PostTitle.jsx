import React from "react";

import BottomBorderInput from "../../../../../../components/BottomBorderInput/BottomBorderInput";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

function PostTitle() {
    const { postTitle } = usePostInfoValue();
    const { setPostTitle } = usePostInfoAction();

    // NOTE: 게시글 제목이 변경되었을 때 호출되는 함수
    const onInputChanged = (e) => {
        setPostTitle(e.target.value);
    };

    return (
        <BottomBorderInput
            value={postTitle}
            onChange={onInputChanged}
            placeholder="글 제목을 입력해주세요."
        />
    );
}

export default PostTitle;
