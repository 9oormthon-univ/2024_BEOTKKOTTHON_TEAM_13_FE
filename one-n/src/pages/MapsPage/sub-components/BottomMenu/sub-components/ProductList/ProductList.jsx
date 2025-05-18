import React from "react";

import ProductListElement from "../../../../../../components/ProductListElement/ProductListElement";

import { useProductValue } from "../../../../contexts/ProductContext";

import styles from "./ProductList.module.scss";

function ProductList() {
    const { products } = useProductValue();

    return (
        <div className={styles.ProductList}>
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
                    if (Array.isArray(images) && images.length > 0) {
                        return (
                            <ProductListElement
                                key={id}
                                id={id}
                                imagePath={images[0]?.imagePath}
                                title={title}
                                price={pricePerUser}
                                createdAt={createdAt}
                                closedAt={closedAt}
                                ingredients={ingredients}
                            />
                        );
                    }

                    return (
                        <ProductListElement
                            key={id}
                            id={id}
                            title={title}
                            price={pricePerUser}
                            createdAt={createdAt}
                            closedAt={closedAt}
                            ingredients={ingredients}
                        />
                    );
                }
            )}
        </div>
    );
}

export default ProductList;
