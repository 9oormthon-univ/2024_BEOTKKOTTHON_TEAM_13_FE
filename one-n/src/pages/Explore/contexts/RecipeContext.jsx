import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from "react";
import axios from "axios";

const RecipeValueContext = createContext();
const RecipeActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useRecipeValue = () => {
    return useContext(RecipeValueContext);
};
const useRecipeAction = () => {
    return useContext(RecipeActionContext);
};

/**
 * NOTE: 메인 페이지의 식품 리스트를 관리하는 컨텍스트
 * @param {*} children Children 요소
 * @returns ProductProvider
 */
function RecipeProvider({ children }) {
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);

    // NOTE: 레시피 리스트 요청
    const fetchRecipes = async () => {
        const response = await axios.get(
            `/api2/recipe/list?keyword=${keyword}&page=${page}`
        );

        if (response.status === 200 && response.data) {
            setRecipes((prev) => [...prev, ...response.data]);
        }
    };

    // NOTE: 페이지 증가 메서드
    const increasePage = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        fetchRecipes();
    }, [keyword, page]);

    /**
     * NOTE: RecipeProvider는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ keyword, page, recipes }),
        [keyword, page, recipes]
    );

    const memoizedActions = useMemo(() => ({ setKeyword, increasePage }), []);

    return (
        <RecipeActionContext.Provider value={memoizedActions}>
            <RecipeValueContext.Provider value={memoizedValues}>
                {children}
            </RecipeValueContext.Provider>
        </RecipeActionContext.Provider>
    );
}

export { useRecipeValue, useRecipeAction, RecipeProvider };
