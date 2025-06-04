export const INGREDIENT_POST_TYPE = Symbol.for("ingredient");
export const RECIPE_POST_TYPE = Symbol.for("recipe");

export const POST_PRODUCT_TYPES = [
    {
        id: INGREDIENT_POST_TYPE,
        label: "재료",
    },
    {
        id: RECIPE_POST_TYPE,
        label: "레시피",
    },
];

// NOTE: 빈 재료 객체
export const EMPTY_INGREDIENT = {
    name: "",
    url: "",
};
