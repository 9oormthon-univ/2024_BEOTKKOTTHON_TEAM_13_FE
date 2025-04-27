import React, { useEffect } from "react";
import { debounce } from "lodash";

import MainHeader from "../../components/MainHeaader/MainHeader";
import FilterSection from "./sub-components/FilterSection/FilterSection";
import ProductList from "./sub-components/ProductList/ProductList";

import {
    ProductProvider,
    useProductValue,
    useProductAction,
} from "./contexts/ProductContext";

import styles from "./ProductListPage.module.scss";

function ProductListPage() {
    const { keyword } = useProductValue();
    const { increasePage } = useProductAction();

    // NOTE: 최하단 스크롤 시 데이터를 더 가져옴
    useEffect(() => {
        const onScroll = debounce(() => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                increasePage();
            }
        }, 100);

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className={styles.ProductListPage}>
            <MainHeader
                toSearch="/search"
                searchKeyword={keyword}
                paddingTop="1rem"
            />
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.title}>공구 중인 식품</p>
                    {keyword && (
                        <p className={styles.searchResult}>
                            '<bold>{keyword}</bold>' 검색결과
                        </p>
                    )}
                    <FilterSection />
                </div>
                <ProductList />
            </div>
        </div>
    );
}

const withProductProvier = (WrappedComponent) => (props) => {
    return (
        <ProductProvider>
            <WrappedComponent props={props} />
        </ProductProvider>
    );
};

export default withProductProvier(ProductListPage);
