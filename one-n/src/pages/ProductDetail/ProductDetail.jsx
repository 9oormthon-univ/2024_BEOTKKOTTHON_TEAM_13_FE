import React from "react";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import ProductInfo from "./sub-components/ProductInfo/ProductInfo";
import ActionGroup from "./sub-components/ActionGroup/ActionGroup";

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

export default ProductDetail;
