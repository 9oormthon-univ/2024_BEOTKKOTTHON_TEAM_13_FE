import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
} from "react";
import { useLocation } from "react-router-dom";

const LoginValueContext = createContext();
const LoginActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useLoginValue = () => {
    return useContext(LoginValueContext);
};

const useLoginAction = () => {
    return useContext(LoginActionContext);
};

/**
 * NOTE: 로그인 상태를 관리하기 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns LoginProvider
 */
function LoginProvider({ children }) {
    const location = useLocation();

    // NOTE: null(식별 불가), false(비로그인), true(로그인)
    const [isLogin, setIsLogin] = useState(null);

    // NOTE: 로그인 상태를 관리하기 위한 useEffect 훅
    useEffect(() => {
        // NOTE: LUSER 쿠키가 존재하는 경우 로그인 상태로 설정
        const isLogin = document.cookie
            .split("; ")
            .find((row) => row.startsWith("LUSER="));

        setIsLogin(isLogin);
    }, [location.pathname]);

    // NOTE: 특정 페이지에서 미로그인 상태일 경우 로그인 페이지로 리다이렉트
    useEffect(() => {
        const loginRequiredPaths = [
            /^\/recipeRegister/,
            /^\/product-post/,
            /^\/scrap/,
            /^\/chatroom/,
        ];

        const isLoginRequired = loginRequiredPaths.some((path) =>
            path.test(location.pathname)
        );

        if (isLogin !== null && !isLogin && isLoginRequired) {
            global.location?.replace("/login");
        }
    }, [isLogin, location.pathname]);

    /**
     * NOTE: LoginContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(() => ({ isLogin }), [isLogin]);

    const memoizedActions = useMemo(() => ({ setIsLogin }), []);

    return (
        <LoginActionContext.Provider value={memoizedActions}>
            <LoginValueContext.Provider value={memoizedValues}>
                {children}
            </LoginValueContext.Provider>
        </LoginActionContext.Provider>
    );
}

export { useLoginValue, useLoginAction, LoginProvider };
