import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect,
} from "react";
import { useLocation } from "react-router-dom";

import fetchMyProducts from "../apis/fetchMyProducts";
import fetchMyRecipes from "../apis/fetchMyRecipes";
import fetchMyLikePosts from "../apis/fetchMyLikePosts";

import { usePageValue } from "./PageContext";

import { MY_LIKES_INGREDIENT, MY_LIKES_RECIPE_INGD } from "../consts/const";

const UserContentsValueContext = createContext();
const UserContentsActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useUserContentsValue = () => {
    return useContext(UserContentsValueContext);
};

const useUserContentsAction = () => {
    return useContext(UserContentsActionContext);
};

/**
 * NOTE: 유저 작성 글/레시피/찜 리스트를 관리하는 컨텍스트
 * @param {*} children Children 요소
 * @returns UserContents Provider
 */
function UserContentsProvider({ children }) {
    const location = useLocation();

    // NOTE: 내 찜 목록의 게시글 구분
    const { selectedPostType } = usePageValue();

    const [myProducts, setMyProducts] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);
    const [myLikedIngdProducts, setMyLikedIngdProducts] = useState([]);
    const [myLikesRecipeProducts, setMyLikesRecipeProducts] = useState([]);

    // NOTE: 내 게시글 목록 가져오기
    const loadMyProducts = useCallback(async () => {
        // NOTE: 처음 로딩 시에만 API 호출
        if (myProducts.length === 0) {
            const products = await fetchMyProducts();

            setMyProducts(products);
        }
    }, [myProducts]);

    // NOTE: 내 레시피 목록 가져오기
    const loadMyRecipes = useCallback(async () => {
        // NOTE: 처음 로딩 시에만 API 호출
        if (myRecipes.length === 0) {
            const recipes = await fetchMyRecipes();

            setMyRecipes(recipes);
        }
    }, [myRecipes]);

    // NOTE: 내 찜한 게시글 목록 가져오기
    const loadMyLikedProducts = useCallback(
        async (type = MY_LIKES_INGREDIENT) => {
            // NOTE: 처음 로딩 시에만 API 호출
            if (
                type === MY_LIKES_INGREDIENT &&
                myLikedIngdProducts.length === 0
            ) {
                const products = await fetchMyLikePosts(0);

                setMyLikedIngdProducts(products);
            } else if (
                type === MY_LIKES_RECIPE_INGD &&
                myLikesRecipeProducts.length === 0
            ) {
                const products = await fetchMyLikePosts(1);

                setMyLikesRecipeProducts(products);
            }
        },
        [myLikedIngdProducts, myLikesRecipeProducts]
    );

    useEffect(() => {
        if (location.pathname.includes("/my/products")) {
            loadMyProducts();
        } else if (location.pathname.includes("/my/recipes")) {
            loadMyRecipes();
        } else if (location.pathname.includes("/my/likes")) {
            loadMyLikedProducts(selectedPostType);
        }
    }, [location.pathname, selectedPostType]);

    /**
     * NOTE: UserContentsContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({
            myProducts,
            myRecipes,
            myLikedIngdProducts,
            myLikesRecipeProducts,
        }),
        [myProducts, myRecipes, myLikedIngdProducts, myLikesRecipeProducts]
    );

    const memoizedActions = useMemo(() => ({}), []);

    return (
        <UserContentsActionContext.Provider value={memoizedActions}>
            <UserContentsValueContext.Provider value={memoizedValues}>
                {children}
            </UserContentsValueContext.Provider>
        </UserContentsActionContext.Provider>
    );
}

export { useUserContentsValue, useUserContentsAction, UserContentsProvider };
