import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./RecipeExplore.module.scss";

function RecipeExplore() {
    const [data, setData] = useState([]);

    // NOTE: 간단 레시피 리스트 API 호출
    useEffect(() => {
        const apiUrl = `/api2/recipe/brief`;

        axios.get(apiUrl).then((response) => {
            if (response.status === 200 && response.data) {
                setData(response.data);
            }
        });
    }, []);

    return (
        <div className={styles.RecipeExplore}>
            <div className={styles.container}>
                {data.map(({ id, thumbnailImagePath, title }) => {
                    return (
                        <RecipeElement
                            key={id}
                            id={id}
                            imagePath={thumbnailImagePath}
                            title={title}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function RecipeElement({ id = null, imagePath = "", title = "" }) {
    return (
        <Link className={styles.RecipeElement} to={`/recipe/${id}?becode=`}>
            <img
                className={styles.thumbnail}
                src={`https://n1.junyeong.dev/${imagePath}`}
            />
            <p className={styles.title}>{title}</p>
        </Link>
    );
}

export default RecipeExplore;
