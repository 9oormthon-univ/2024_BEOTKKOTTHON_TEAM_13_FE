import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";
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
 * NOTE: 레시피 페이지의 레시피 리스트를 관리하는 컨텍스트
 * @param {*} children Children 요소
 * @returns RecipeProvider
 */
function RecipeProvider({ children }) {
    const [searchParams] = useSearchParams();
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [recipes, setRecipes] = useState([]);
    const [isKeywordInitialized, setIsKeywordInitialized] = useState(false);

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

    // NOTE: URL에서 keyword 쿼리 파라미터 가져오기
    useEffect(() => {
        const keywordFromURL = searchParams.get("keyword");

        // NOTE: 쿼리 파라미터가 존재하면 해당 키워드를 사용하고, 없으면 빈 문자열로 초기화
        if (keywordFromURL) {
            setKeyword(decodeURIComponent(keywordFromURL));
        } else {
            setKeyword("");
            setRecipes([]);
            setPage(1);
        }
        setIsKeywordInitialized(true);
    }, [searchParams]);

    // NOTE: 키워드와 페이지가 변경될 때 레시피 리스트를 가져옴
    useEffect(() => {
        if (isKeywordInitialized) {
            fetchRecipes();
        }
    }, [keyword, page, isKeywordInitialized]);

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
