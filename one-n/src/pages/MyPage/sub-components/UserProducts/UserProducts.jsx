import React from "react";

import ProductListElement from "../../../../components/ProductListElement/ProductListElement";

import { useUserContentsValue } from "../../contexts/UserContentsProvider";

import styles from "./UserProducts.module.scss";

function UserProducts() {
    const { myProducts } = useUserContentsValue();

    return (
        <div className={styles.UserProducts}>
            {myProducts.length === 0 && (
                <p className={styles.empty}>아직 등록한 재료가 없어요.</p>
            )}
            {myProducts.map(
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

export default UserProducts;
