import React, { useEffect } from "react";
import { debounce } from "lodash";

import MainHeader from "../../components/MainHeaader/MainHeader";
import ExploreHeader from "./sub-components/ExploreHeader/ExploreHeader";
import FloatingActionButton from "./sub-components/FloatingActionButton/FloatingActionButton";
import RecipeExplore from "./sub-components/RecipeExplore/RecipeExplore";
import ProductList from "./sub-components/ProductList/ProductList";

import { ProductProvider, useProductAction } from "./contexts/ProductContext";
import { useLoginValue } from "../../contexts/LoginProvider";

import styles from "./MainPage.module.scss";

function MainPage() {
    const { increasePage } = useProductAction();
    const { isLogin } = useLoginValue();

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
        <div className={styles.MainPage}>
            <MainHeader toSearch="/search" paddingTop="1rem" />
            <div className={styles.container}>
                <div>
                    <ExploreHeader title="레시피 골라보기" to="/explore" />
                    <RecipeExplore />
                </div>
                <div>
                    <ExploreHeader title="공구 중인 식품" to="/products" />
                    <ProductList />
                </div>
            </div>
            {isLogin && <FloatingActionButton />}
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

export default withProductProvier(MainPage);
