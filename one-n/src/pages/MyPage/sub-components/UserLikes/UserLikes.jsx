import React from "react";

import PostTypeSelector from "./sub-components/PostTypeSelector/PostTypeSelector";
import ProductList from "./sub-components/ProductList/ProductList";

import styles from "./UserLikes.module.scss";

function UserLikes() {
    return (
        <div className={styles.UserLikes}>
            <PostTypeSelector />
            <ProductList />
        </div>
    );
}

export default UserLikes;
