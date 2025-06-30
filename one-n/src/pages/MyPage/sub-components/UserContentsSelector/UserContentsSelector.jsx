import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cn from "classnames";

import styles from "./UserContentsSelector.module.scss";

function UserContentsSelector() {
    const navigate = useNavigate();
    const location = useLocation();

    const isMyPosts = location.pathname.includes("/my/products");
    const isMyRecipes = location.pathname.includes("/my/recipes");
    const isMyLikes = location.pathname.includes("/my/likes");

    return (
        <div className={styles.UserContentsSelector}>
            <button
                className={cn(styles.selector, isMyPosts && styles.active)}
                onClick={() => navigate("/my/products", { replace: true })}
            >
                내 글
            </button>
            <button
                className={cn(styles.selector, isMyRecipes && styles.active)}
                onClick={() => navigate("/my/recipes", { replace: true })}
            >
                내 레시피
            </button>
            <button
                className={cn(styles.selector, isMyLikes && styles.active)}
                onClick={() => navigate("/my/likes", { replace: true })}
            >
                내 찜
            </button>
        </div>
    );
}

export default UserContentsSelector;
