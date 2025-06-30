import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import EditMyPage from "./EditMyPage";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import UserProfile from "./sub-components/UserProfile/UserProfile";
import UserContentsSelector from "./sub-components/UserContentsSelector/UserContentsSelector";
import UserProducts from "./sub-components/UserProducts/UserProducts";
import UserRecipes from "./sub-components/UserRecipes/UserRecipes";
import UserLikes from "./sub-components/UserLikes/UserLikes";

import postLogout from "./apis/postLogout";

import { PageProvider } from "./contexts/PageContext";
import { UserContentsProvider } from "./contexts/UserContentsProvider";

import styles from "./MyPage.module.scss";

function MyPage() {
    const navigate = useNavigate();

    // NOTE: 뒤로가기 버튼 클릭 핸들러
    const handleBackClicked = () => {
        navigate("/");
    };

    // NOTE: 로그아웃 버튼 클릭 핸들러
    const handleLogout = async () => {
        const logoutResult = await postLogout();
        if (logoutResult) {
            navigate("/");
        } else {
            alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className={styles.MyPage}>
            <DetailHeader
                onBackClicked={handleBackClicked}
                optionItems={["로그아웃"]}
                onOptionItemClicked={handleLogout}
            />
            <UserProfile />
            <UserContentsSelector />
            <UserContentsRouter />
        </div>
    );
}

function UserContentsRouter() {
    const location = useLocation();

    if (location.pathname.includes("/my/products")) {
        return <UserProducts />;
    } else if (location.pathname.includes("/my/recipes")) {
        return <UserRecipes />;
    } else if (location.pathname.includes("/my/likes")) {
        return <UserLikes />;
    }

    return;
}

function MyPageRouter() {
    const location = useLocation();

    if (location.pathname.includes("/my/edit")) {
        return <EditMyPage />;
    }

    return <MyPage />;
}

const withProviders = (WrappedComponent) => (props) => {
    return (
        <PageProvider>
            <UserContentsProvider>
                <WrappedComponent {...props} />
            </UserContentsProvider>
        </PageProvider>
    );
};

export default withProviders(MyPageRouter);
