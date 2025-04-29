import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { MD5, enc } from "crypto-js";
import Masonry from "https://cdn.skypack.dev/react-masonry-css@1.0.16";

import MainHeader from "../../components/MainHeaader/MainHeader";

import { ReactComponent as BookmarkOutline } from "../../assets/icons/bookmark-outline.svg";

import {
    RecipeProvider,
    useRecipeValue,
    useRecipeAction,
} from "./contexts/RecipeContext";

import "./Explore.css";

function Explore() {
    const { keyword, recipes } = useRecipeValue();
    const { increasePage } = useRecipeAction();

    // NOTE: 최하단 스크롤 시 데이터를 더 가져옴
    useEffect(() => {
        const onScroll = debounce(() => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight
            ) {
                increasePage();
            }
        }, 100);

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // NOTE: 각 아이템의 값을 기반으로 레시피 카드의 높이를 결정함
    const getCardHeight = (title) => {
        const hash = MD5(title).toString(enc.Hex);
        const hashNumber = parseInt(hash.slice(0, 1), 16) % 5;

        const heights = ["200px", "220px", "260px", "280px", "300px"];
        return heights[hashNumber];
    };

    return (
        <>
            <MainHeader
                title="레시피"
                searchKeyword={keyword}
                toSearch="/recipe/search"
                paddingTop="16px"
            />
            <Masonry
                breakpointCols={2}
                className="grid-container"
                columnClassName="column"
            >
                {recipes.map((item) => (
                    <Link
                        to={`/recipe/${item.id}`}
                        key={item.id}
                        className="recipe-card"
                    >
                        <img
                            className="recipe-card-image"
                            src={`https://n1.junyeong.dev/${item.thumbnailImagePath}`}
                            alt={item.title}
                            height={getCardHeight(item.title)}
                        />
                        <div className="recipe-card-container">
                            <div className="recipe-card-title">
                                {item.title}
                            </div>
                            <div className="recipe-bookmark">
                                <BookmarkOutline />
                                <p className="recipe-bookmark-likes">
                                    {item.likesCount}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </Masonry>
        </>
    );
}

const withRecipeProvider = (WrappedComponent) => (props) => {
    return (
        <RecipeProvider>
            <WrappedComponent {...props} />
        </RecipeProvider>
    );
};

export default withRecipeProvider(Explore);
