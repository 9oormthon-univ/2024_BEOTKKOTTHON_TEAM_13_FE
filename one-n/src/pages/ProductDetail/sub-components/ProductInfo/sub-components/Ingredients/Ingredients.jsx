import React from "react";

import styles from "./Ingredients.module.scss";

function Ingredients({ ingredients = [] }) {
    return (
        <div className={styles.Ingredients}>
            <p className={styles.title}>포함된 재료</p>
            <div className={styles.ingdContainer}>
                {ingredients.map(({ name, link }) => (
                    <IngredientCard key={name} name={name} link={link} />
                ))}
            </div>
        </div>
    );
}

function IngredientCard({ name = "", link = "" }) {
    return (
        <div className={styles.IngredientCard}>
            <p className={styles.name}>{name}</p>
            <a
                href={link}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {link}
            </a>
        </div>
    );
}

export default Ingredients;
