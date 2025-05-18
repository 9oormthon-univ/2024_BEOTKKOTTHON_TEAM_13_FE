import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import ProductListElement from "../../../../../../components/ProductListElement/ProductListElement";

import {
    useProductValue,
    useProductAction,
} from "../../../../contexts/ProductContext";

import styles from "./ProductList.module.scss";

function ProductList() {
    const { SCROLL_ELEMENT_ID, products } = useProductValue();
    const { increasePage } = useProductAction();

    return (
        <InfiniteScroll
            className={styles.ProductList}
            dataLength={products.length}
            next={increasePage}
            hasMore={true}
            scrollableTarget={SCROLL_ELEMENT_ID}
        >
            {products.map(
                ({
                    id,
                    images,
                    title,
                    pricePerUser,
                    createdAt,
                    closedAt,
                    ingredients,
                }) => {
                    return (
                        <ProductListElement
                            key={id}
                            id={id}
                            imagePath={images[0]?.imagePath ?? ""}
                            title={title}
                            price={pricePerUser}
                            createdAt={createdAt}
                            closedAt={closedAt}
                            ingredients={ingredients}
                        />
                    );
                }
            )}
        </InfiniteScroll>
    );
}

export default ProductList;
