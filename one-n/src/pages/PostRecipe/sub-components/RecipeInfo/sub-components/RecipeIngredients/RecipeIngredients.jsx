import React from "react";

import Button from "../../../../../../components/Button/Button";

import { EMPTY_INGREDIENT } from "../../../../consts/const";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import { ReactComponent as PlusIcon } from "../../../../../../assets/icons/plus.svg";

import styles from "./RecipeIngredients.module.scss";

function RecipeIngredients() {
    const { recipeIngredients } = usePostInfoValue();
    const { setRecipeIngredients } = usePostInfoAction();

    // NOTE: 사용자가 추가한 재료명 및 양이 변경되었을 때 호출되는 함수
    const updateIngredientInfo = ({ index, field, value }) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value,
        };
        setRecipeIngredients(updatedIngredients);
    };

    // NOTE: 재료명 및 양 추가
    const addIngredient = () => {
        setRecipeIngredients([...recipeIngredients, EMPTY_INGREDIENT]);
    };

    return (
        <div className={styles.RecipeIngredients}>
            <div className={styles.ingredients}>
                {recipeIngredients.map((ingredient, index) => (
                    <RecipeIngredient
                        key={index}
                        index={index}
                        ingredient={ingredient}
                        onInputChanged={updateIngredientInfo}
                    />
                ))}
            </div>
            <Button
                icon={PlusIcon}
                color="white"
                size="md"
                onClick={addIngredient}
            >
                재료 추가
            </Button>
        </div>
    );
}

function RecipeIngredient({ index, ingredient, onInputChanged }) {
    return (
        <div className={styles.RecipeIngredient}>
            <IngredientInput
                value={ingredient.name}
                placeholder="재료 이름"
                onInputChanged={(value) =>
                    onInputChanged({ index, field: "name", value })
                }
            />
            <IngredientInput
                value={ingredient.amount}
                placeholder="양"
                onInputChanged={(value) =>
                    onInputChanged({ index, field: "amount", value })
                }
            />
        </div>
    );
}

function IngredientInput({ value, placeholder, onInputChanged }) {
    return (
        <input
            className={styles.IngredientInput}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onInputChanged(e.target.value)}
        />
    );
}

export default RecipeIngredients;
