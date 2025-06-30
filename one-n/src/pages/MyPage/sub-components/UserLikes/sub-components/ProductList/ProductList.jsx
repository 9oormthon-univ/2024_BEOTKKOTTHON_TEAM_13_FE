import React, { useMemo } from "react";

import ProductListElement from "../../../../../../components/ProductListElement/ProductListElement";

import { usePageValue } from "../../../../contexts/PageContext";
import { useUserContentsValue } from "../../../../contexts/UserContentsProvider";

import { MY_LIKES_INGREDIENT } from "../../../../consts/const";

import styles from "./ProductList.module.scss";

function ProductList() {
    const { selectedPostType } = usePageValue();
    const { myLikedIngdProducts, myLikesRecipeProducts } =
        useUserContentsValue();

    // NOTE: '재료', '레시피 재료' 타입 중 어떤 것을 보여줄지 결정
    const products = useMemo(() => {
        if (selectedPostType === MY_LIKES_INGREDIENT) {
            return myLikedIngdProducts;
        }
        return myLikesRecipeProducts;
    }, [selectedPostType, myLikedIngdProducts, myLikesRecipeProducts]);

    return (
        <div className={styles.ProductList}>
            {products.length === 0 && (
                <p className={styles.empty}>아직 찜한 재료가 없어요.</p>
            )}
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
