import React from "react";
import { Link } from "react-router-dom";
import { MD5, enc } from "crypto-js";
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";

import { useUserContentsValue } from "../../contexts/UserContentsProvider";

import { ReactComponent as BookmarkOutline } from "../../../../assets/icons/bookmark-outline.svg";

import styles from "./UserRecipes.module.scss";

function UserRecipes() {
    const { myRecipes } = useUserContentsValue();

    // NOTE: 각 아이템의 값을 기반으로 레시피 카드의 높이를 결정함
    const getCardHeight = (title) => {
        const hash = MD5(title).toString(enc.Hex);
        const hashNumber = parseInt(hash.slice(0, 1), 16) % 5;

        const heights = ["200px", "220px", "260px", "280px", "300px"];
        return heights[hashNumber];
    };

    return (
        <div className={styles.UserRecipes}>
            {myRecipes.length === 0 && (
                <p className={styles.empty}>아직 등록한 레시피가 없어요.</p>
            )}
            <Masonry
                breakpointCols={2}
                className={styles.masonry}
                columnClassName="column"
            >
                {myRecipes.map((item) => (
                    <Link
                        to={`/recipe/${item.id}`}
                        key={item.id}
                        className={styles.card}
                    >
                        <img
                            className={styles.image}
                            src={`https://n1.junyeong.dev/${item.thumbnailImagePath}`}
                            alt={item.title}
                            style={{ height: getCardHeight(item.title) }}
                        />
                        <div className={styles.title}>
                            <div className={styles.label}>{item.title}</div>
                            <div className={styles.likes}>
                                <BookmarkOutline />
                                <p className={styles.label}>
                                    {item.likesCount}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </Masonry>
        </div>
    );
}

export default UserRecipes;
