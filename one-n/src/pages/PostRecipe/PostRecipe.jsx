import React from "react";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import TopBanner from "./sub-components/TopBanner/TopBanner";
import RecipeInfo from "./sub-components/RecipeInfo/RecipeInfo";
import ActionGroup from "./sub-components/RecipeInfo/sub-components/ActionGroup/ActionGroup";
import Modals from "./sub-components/Modals/Modals";

import { PageProvider, usePageAction } from "./contexts/PageContext";
import { PostInfoProvider } from "./contexts/PostInfoContext";

import styles from "./PostRecipe.module.scss";

function PostRecipe() {
    const { setIsAbortModalOpened } = usePageAction();

    // NOTE: 뒤로가기 버튼 클릭 시 취소 모달 열기
    const handleBack = () => {
        setIsAbortModalOpened(true);
    };
    return (
        <div className={styles.PostRecipe}>
            <DetailHeader enableOption={false} onBackClicked={handleBack} />
            <TopBanner />
            <RecipeInfo />
            <ActionGroup />
            <Modals />
        </div>
    );
}

// NOTE: 컴포넌트를 PostInfoContext와 PageContext로 감싸는 HOC
const withContexts = (WrappedComponent) => (props) => {
    return (
        <PageProvider>
            <PostInfoProvider>
                <WrappedComponent {...props} />
            </PostInfoProvider>
        </PageProvider>
    );
};

export default withContexts(PostRecipe);
