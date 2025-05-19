import React from "react";

import { ReactComponent as SearchIcon } from "../../../../assets/icons/search.svg";

import styles from "./SearchBar.module.scss";

function SearchBar() {
    return (
        <div className={styles.SearchBar}>
            <input
                className={styles.input}
                type="text"
                placeholder="검색어를 입력하세요"
            />
            <SearchIcon />
        </div>
    );
}

export default SearchBar;
