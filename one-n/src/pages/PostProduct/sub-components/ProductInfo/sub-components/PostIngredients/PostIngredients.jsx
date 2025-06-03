import React, { useEffect } from "react";

import BottomBorderInput from "../../../../../../components/BottomBorderInput/BottomBorderInput";
import Button from "../../../../../../components/Button/Button";

import {
    EMPTY_INGREDIENT,
    INGREDIENT_POST_TYPE,
} from "../../../../consts/const";

import {
    usePostInfoValue,
    usePostInfoAction,
} from "../../../../contexts/PostInfoContext";

import { ReactComponent as PlusIcon } from "../../../../../../assets/icons/plus.svg";

import styles from "./PostIngredients.module.scss";

function PostIngredients() {
    const { postType, postIngredients } = usePostInfoValue();
    const { setPostIngredients } = usePostInfoAction();

    // NOTE: 게시글 유형이 변경되는 경우 일부 재료 요소들을 제거
    useEffect(() => {
        if (postType === INGREDIENT_POST_TYPE && postIngredients.length > 1) {
            setPostIngredients([postIngredients[0]]);
        }
    }, [postType]);

    // NOTE: 사용자가 추가한 재료명 및 URL이 변경되었을 때 호출되는 함수
    const updateIngredientInfo = ({ index, field, value }) => {
        const updatedIngredients = [...postIngredients];
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [field]: value,
        };
        setPostIngredients(updatedIngredients);
    };

    // NOTE: 재료명 및 URL 추가
    const addIngredient = () => {
        setPostIngredients([...postIngredients, EMPTY_INGREDIENT]);
    };

    // NOTE: 게시글 유형이 '재료'인 경우 재료는 하나만 입력할 수 있도록 제한
    if (postType === INGREDIENT_POST_TYPE) {
        return (
            <PostIngredientInfo
                index={0}
                name={postIngredients[0]?.name || ""}
                url={postIngredients[0]?.url || ""}
                onInputChanged={updateIngredientInfo}
            />
        );
    }

    return (
        <div className={styles.PostIngredients}>
            {postIngredients.map((ingredient, index) => (
                <PostIngredientInfo
                    key={index}
                    index={index}
                    name={ingredient.name}
                    url={ingredient.url}
                    onInputChanged={updateIngredientInfo}
                />
            ))}
            <Button
                icon={PlusIcon}
                color="white"
                size="md"
                fullWidth={true}
                onClick={addIngredient}
            >
                재료 추가
            </Button>
        </div>
    );
}

function PostIngredientInfo({
    index = -1,
    name = "",
    url = "",
    onInputChanged = () => {},
}) {
    return (
        <div className={styles.PostIngredient}>
            <BottomBorderInput
                value={name}
                onChange={(e) => {
                    onInputChanged({
                        index,
                        field: "name",
                        value: e.target.value,
                    });
                }}
                placeholder="재료명을 입력해주세요."
            />
            <BottomBorderInput
                value={url}
                onChange={(e) => {
                    onInputChanged({
                        index,
                        field: "url",
                        value: e.target.value,
                    });
                }}
                placeholder="URL 링크를 입력해주세요."
            />
        </div>
    );
}

export default PostIngredients;
