import React from "react";

import Textarea from "../../../../../../components/Textarea/Textarea";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

function RecipeName() {
    const { recipeName } = usePostInfoValue();
    const { setRecipeName } = usePostInfoAction();

    return (
        <Textarea
            full
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="레시피 이름을 입력해주세요."
            height="4.4375rem"
        />
    );
}

export default RecipeName;
