export const MY_LIKES_INGREDIENT = Symbol.for("my-likes-ingredient");
export const MY_LIKES_RECIPE_INGD = Symbol.for("my-likes-recipe-ingredient");

export const MY_LIKES_PRODUCT_TYPES = [
    {
        id: MY_LIKES_INGREDIENT,
        label: "재료",
        type: 0,
    },
    {
        id: MY_LIKES_RECIPE_INGD,
        label: "레시피 재료",
        type: 1,
    },
];

export const EMPTY_MY_INFO = {
    id: null,
    email: "",
    nickname: "",
    profileImage: "",
    rating: 0,
};
