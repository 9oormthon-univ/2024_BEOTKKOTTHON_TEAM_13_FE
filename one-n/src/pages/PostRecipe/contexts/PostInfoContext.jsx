import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

import { EMPTY_INGREDIENT, EMPTY_PROCESS } from "../consts/const";

const PostInfoValueContext = createContext();
const PostInfoActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const usePostInfoValue = () => {
    return useContext(PostInfoValueContext);
};

const usePostInfoAction = () => {
    return useContext(PostInfoActionContext);
};

/**
 * NOTE: 공동구매 게시글 작성을 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns PostInfo Provider
 */
function PostInfoProvider({ children }) {
    // NOTE: 레시피 이름
    const [recipeName, setRecipeName] = useState("");
    // NOTE: 레시피 소개
    const [recipeIntroduction, setRecipeIntroduction] = useState("");
    // NOTE: 레시피 표지 이미지
    const [recipeCoverImage, setRecipeCoverImage] = useState(null);
    // NOTE: 레시피 재료 목록
    const [recipeIngredients, setRecipeIngredients] = useState([
        EMPTY_INGREDIENT,
        EMPTY_INGREDIENT,
        EMPTY_INGREDIENT,
    ]);
    // NOTE: 레시피 과정 목록
    const [recipeProcesses, setRecipeProcesses] = useState([EMPTY_PROCESS]);

    // NOTE: 게시글의 모든 요소를 입력했는지 검증
    const validatePostInfo = () => {
        if (typeof recipeName !== "string" || !recipeName) {
            alert("레시피 이름을 입력해주세요.");
            return false;
        }

        if (typeof recipeIntroduction !== "string" || !recipeIntroduction) {
            alert("레시피 소개를 입력해주세요.");
            return false;
        }

        if (!recipeCoverImage) {
            alert("레시피 표지 이미지를 업로드해주세요.");
            return false;
        }

        if (
            recipeProcesses.length === 0 ||
            !recipeIngredients[0].name ||
            !recipeIngredients[0].amount
        ) {
            alert("최소 하나 이상의 레시피 재료를 입력해주세요.");
            return false;
        }

        if (
            recipeIngredients.some(
                (ing) => (ing.name && !ing.amount) || (!ing.name && ing.amount)
            )
        ) {
            alert("레시피 재료를 입력해주세요.");
            return false;
        }

        if (
            recipeProcesses.length === 0 ||
            !recipeProcesses[0].image ||
            !recipeProcesses[0].description
        ) {
            alert("최소 하나 이상의 레시피 과정을 입력해주세요.");
            return false;
        }

        return true;
    };

    // NOTE: 게시글 업로드
    const uploadPostInfo = async () => {
        const response = await axios.post(
            "/api2/recipe/recipes",
            {
                title: recipeName,
                contents: recipeIntroduction,
                // TODO: 추후에 이미지 업로드 기능이 구현되면 recipeCoverImage를 서버로 전송
                thumbnailImagePath:
                    "11520ba5e6-5495-4659-b065-09d6fa42352e.jpg",
                ingredients: recipeIngredients.filter(
                    (ingredient) => ingredient.name && ingredient.amount
                ),
                processes: recipeProcesses.map((process) => ({
                    // TODO: 추후에 이미지 업로드 기능이 구현되면 process.image를 서버로 전송
                    imagePath: "1290a43755-c9e3-497a-a223-bff98df937df.jpg",
                    contents: process.description,
                })),
            },
            {
                withCredentials: true,
            }
        );

        // NOTE: 게시글 업로드에 실패한 경우
        if (response?.status !== 200) {
            return false;
        }

        return true;
    };

    /**
     * NOTE: PostInfoContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({
            recipeName,
            recipeIntroduction,
            recipeCoverImage,
            recipeIngredients,
            recipeProcesses,
        }),
        [
            recipeName,
            recipeIntroduction,
            recipeCoverImage,
            recipeIngredients,
            recipeProcesses,
        ]
    );

    const memoizedActions = useMemo(
        () => ({
            setRecipeName,
            setRecipeIntroduction,
            setRecipeCoverImage,
            setRecipeIngredients,
            setRecipeProcesses,
            validatePostInfo,
            uploadPostInfo,
        }),
        [
            recipeName,
            recipeIntroduction,
            recipeCoverImage,
            recipeIngredients,
            recipeProcesses,
        ]
    );

    return (
        <PostInfoActionContext.Provider value={memoizedActions}>
            <PostInfoValueContext.Provider value={memoizedValues}>
                {children}
            </PostInfoValueContext.Provider>
        </PostInfoActionContext.Provider>
    );
}

export { usePostInfoValue, usePostInfoAction, PostInfoProvider };
