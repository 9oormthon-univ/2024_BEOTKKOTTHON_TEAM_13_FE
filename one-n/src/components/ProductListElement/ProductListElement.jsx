import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./ProductListElement.module.scss";

function ProductListElement({
    id = null,
    imagePath = null,
    title = "",
    price = null,
    createdAt = null,
    closedAt = null,
    ingredients = [],
}) {
    // NOTE: 화폐 단위로 변경해주는 함수
    const formatPrice = (price) => {
        if (price === null) {
            return "";
        }
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // NOTE: 두 날짜 간 차이를 계산해주는 함수
    const calculateDateDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // NOTE: 마감 날짜 스타일링
    const getClosedAtClassName = () => {
        const diffDays = calculateDateDifference(new Date(), closedAt);
        if (diffDays <= 1) {
            return styles.red;
        }
        return styles.hide;
    };

    return (
        <Link to={`/product/${id}`} className={styles.ProductListElement}>
            <div className={styles.info}>
                <img className={styles.image} src={imagePath} />
                <div className={styles.detailInfo}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.price}>{formatPrice(price)}원</p>
                    <div className={styles.dates}>
                        <div className={styles.createdAt}>
                            {calculateDateDifference(createdAt, new Date())}
                            일전
                        </div>
                        <div
                            className={cn(
                                styles.closedAt,
                                getClosedAtClassName()
                            )}
                        >
                            마감 D-
                            {calculateDateDifference(new Date(), closedAt)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ingredients}>
                {ingredients
                    .filter((_, index) => index < 4)
                    .map(({ id, name }) => {
                        return <IngredientBadge key={id} label={name} />;
                    })}
                {/* NOTE: 재료가 5개 이상인 경우 남은 개수 정보를 알려줌 */}
                {ingredients.length >= 5 && (
                    <IngredientBadge
                        key={`ingredients-left-${id}`}
                        label={`+${ingredients.length - 4}`}
                    />
                )}
            </div>
        </Link>
    );
}

function IngredientBadge({ label = "" }) {
    return <div className={styles.IngredientBadge}>{label}</div>;
}

export default ProductListElement;
