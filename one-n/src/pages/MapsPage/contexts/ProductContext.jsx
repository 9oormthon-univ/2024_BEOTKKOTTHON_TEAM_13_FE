import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";
import { useMapsValue } from "./MapsContext";
import axios from "axios";

const ProductValueContext = createContext();
const ProductActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useProductValue = () => {
    return useContext(ProductValueContext);
};
const useProductAction = () => {
    return useContext(ProductActionContext);
};

// NOTE: BottomMenu의 무한 스크롤을 위한 스크롤 엘리먼트 ID
const SCROLL_ELEMENT_ID = "product-list-scroll-element";

/**
 * NOTE: 지도 페이지의 식품 리스트를 관리하는 컨텍스트
 * @param {*} children Children 요소
 * @returns ProductProvider
 */
function ProductProvider({ children }) {
    const { userLocation } = useMapsValue();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    // NOTE: page 증가
    const increasePage = () => {
        setPage((prev) => prev + 1);
    };

    // NOTE: 사용자 위치가 확인되면, API 호출
    useEffect(() => {
        if (!userLocation.isLoading) {
            axios
                .get(
                    `/api2/post/list?type=all&bcode=${userLocation.bCode}&keyword=&page=${page}`
                )
                .then((response) => {
                    if (response.status === 200 && response.data) {
                        setProducts((prev) => [...prev, ...response.data]);
                    }
                });
        }
    }, [userLocation, page]);

    /**
     * NOTE: ProductProvider는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ SCROLL_ELEMENT_ID, products, page }),
        [products, page]
    );

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
