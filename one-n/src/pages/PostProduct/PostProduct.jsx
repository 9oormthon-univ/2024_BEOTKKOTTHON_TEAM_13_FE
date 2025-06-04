import React from "react";
import { useLocation } from "react-router-dom";

import MeetingLocation from "./MeetingLocation";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import ProductInfo from "./sub-components/ProductInfo/ProductInfo";
import ActionGroup from "./sub-components/ActionGroup/ActionGroup";
import EndDate from "./sub-components/EndDate/EndDate";
import Modals from "./sub-components/Modals/Modals";

import { PageProvider, usePageAction } from "./contexts/PageContext";
import { PostInfoProvider } from "./contexts/PostInfoContext";

import styles from "./PostProduct.module.scss";

function PostProduct() {
    const { setIsAbortModalOpened } = usePageAction();

    // NOTE: 뒤로가기 버튼 클릭 시 취소 모달 열기
    const handleBack = () => {
        setIsAbortModalOpened(true);
    };

    return (
        <div className={styles.PostProduct}>
            <DetailHeader
                label="공동구매 게시글 작성"
                enableOption={false}
                onBackClicked={handleBack}
            />
            <ProductInfo />
            <ActionGroup />
            <EndDate />
            <Modals />
        </div>
    );
}

function PostProductRouter() {
    const location = useLocation();

    // NOTE: 거래 희망 장소 선택 페이지
    if (location.pathname.includes("/post/product/meeting-place")) {
        return <MeetingLocation />;
    }

    return <PostProduct />;
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

export default withContexts(PostProductRouter);
