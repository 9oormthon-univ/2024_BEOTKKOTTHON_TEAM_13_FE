import React from "react";

import InfoTemplate from "./sub-components/InfoTemplate/InfoTemplate";
import RecipeName from "./sub-components/RecipeName/RecipeName";
import RecipeIntroduction from "./sub-components/RecipeIntroduction/RecipeIntroduction";
import RecipeCoverImage from "./sub-components/RecipeCoverImage/RecipeCoverImage";
import RecipeIngredients from "./sub-components/RecipeIngredients/RecipeIngredients";
import RecipeProcesses from "./sub-components/RecipeProccesses/RecipeProcesses";

import styles from "./RecipeInfo.module.scss";

function RecipeInfo() {
    return (
        <div className={styles.RecipeInfo}>
            {/* NOTE: 레시피 이름 */}
            <InfoTemplate title="레시피 이름">
                <RecipeName />
            </InfoTemplate>

            {/* NOTE: 레시피 소개 */}
            <InfoTemplate title="소개">
                <RecipeIntroduction />
            </InfoTemplate>

            {/* NOTE: 레시피 표지 이미지 */}
            <InfoTemplate title="표지 이미지">
                <RecipeCoverImage />
            </InfoTemplate>

            {/* NOTE: 레시피 필요 재료 */}
            <InfoTemplate title="필요 재료">
                <RecipeIngredients />
            </InfoTemplate>

            {/* NOTE: 레시피 과정 */}
            <InfoTemplate title="레시피 과정">
                <RecipeProcesses />
            </InfoTemplate>
        </div>
    );
}

export default RecipeInfo;
