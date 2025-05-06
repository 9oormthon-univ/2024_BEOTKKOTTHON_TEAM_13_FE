import React, { createContext, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";

import useProductDetail from "../hooks/useProductDetail";

const ProductDetailValueContext = createContext();
const ProductDetailActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useProductDetailValue = () => {
    return useContext(ProductDetailValueContext);
};
const useProductDetailAction = () => {
    return useContext(ProductDetailActionContext);
};

/**
 * NOTE: 공동구매 게시글 데이터를 관리하는 컨텍스트 프로바이더
 * @param {*} children Children 요소
 * @returns ProductDetailProvider
 */
function ProductDetailProvider({ children }) {
    const { productId } = useParams();
    const { productData, isLoading } = useProductDetail(productId);

    /**
     * NOTE: ProductDetailContext는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ productData, isLoading }),
        [productData, isLoading]
    );

    const memoizedActions = useMemo(() => ({}), []);

    return (
        <ProductDetailActionContext.Provider value={memoizedActions}>
            <ProductDetailValueContext.Provider value={memoizedValues}>
                {children}
            </ProductDetailValueContext.Provider>
        </ProductDetailActionContext.Provider>
    );
}

export { useProductDetailAction, useProductDetailValue, ProductDetailProvider };
