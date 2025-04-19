import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import axios from "axios";

import useUserBCode from "../hooks/useUserBCode";

const ProductValueContext = createContext();
const ProductActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useProductValue = () => {
    return useContext(ProductValueContext);
};
const useProductAction = () => {
    return useContext(ProductActionContext);
};

/**
 * NOTE: 메인 페이지의 식품 리스트를 관리하는 컨텍스트
 * @param {*} children Children 요소
 * @returns ProductProvider
 */
function ProductProvider({ children }) {
    const { status: bCodeStatus, bCode } = useUserBCode();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    // NOTE: page 증가
    const increasePage = () => {
        setPage((prev) => prev + 1);
    };

    // NOTE: bcode가 유효한 경우에 API 호출
    useEffect(() => {
        axios
            .get(
                `/api2/post/list?type=all&bcode=${bCode}&keyword=&page=${page}`
            )
            .then((response) => {
                console.log(response);
                if (response.status === 200 && response.data) {
                    setProducts((prev) => [...prev, ...response.data]);
                }
            });
    }, [bCodeStatus, page]);

    /**
     * NOTE: ProductProvider는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(() => ({ products }), [products]);

    const memoizedActions = useMemo(() => ({ increasePage }), []);

    return (
        <ProductActionContext.Provider value={memoizedActions}>
            <ProductValueContext.Provider value={memoizedValues}>
                {children}
            </ProductValueContext.Provider>
        </ProductActionContext.Provider>
    );
}

export { useProductValue, useProductAction, ProductProvider };
