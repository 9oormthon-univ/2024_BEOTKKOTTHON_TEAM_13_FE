import React from "react";

import Textarea from "../../../../../../components/Textarea/Textarea";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

function RecipeIntroduction() {
    const { recipeIntroduction } = usePostInfoValue();
    const { setRecipeIntroduction } = usePostInfoAction();

    return (
        <Textarea
            full
            value={recipeIntroduction}
            onChange={(e) => setRecipeIntroduction(e.target.value)}
            placeholder="최소 10자 이상의 레시피에 대한 소개를 입력해주세요. "
            height="6.5625rem"
        />
    );
}

export default RecipeIntroduction;
