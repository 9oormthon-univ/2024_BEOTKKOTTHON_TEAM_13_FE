import React from "react";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import ProductInfo from "./sub-components/ProductInfo/ProductInfo";
import ActionGroup from "./sub-components/ActionGroup/ActionGroup";

import { ProductDetailProvider } from "./contexts/ProductDetailContext";

import styles from "./ProductDetail.module.scss";

function ProductDetail() {
    return (
        <div className={styles.ProductDetail}>
            <DetailHeader
                enableOption
                optionItems={["게시글 수정하기", "게시글 삭제하기"]}
            />
            <ProductInfo />
            <ActionGroup />
        </div>
    );
}

const withProductDetailProvider = (WrappedComponent) => (props) => {
    return (
        <ProductDetailProvider>
            <WrappedComponent {...props} />
        </ProductDetailProvider>
    );
};

export default withProductDetailProvider(ProductDetail);
