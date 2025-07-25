import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DetailHeader from "../../components/DetailHeader/DetailHeader";
import LoginFailedModal from "./sub-components/LoginFailedModal/LoginFailedModal";

import {
    PageProvider,
    usePageValue,
    usePageAction,
} from "./contexts/PageContext";

import logo from "../../assets/logo/logo.png";

import "./Signin.css";

function Signin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // NOTE: 이메일, 비밀번호 피드백
    const [emailFeedback, setEmailFeedback] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState("");

    const { isFailedLoginModalOpened } = usePageValue();
    const { setIsFailedLoginModalOpened } = usePageAction();

    // NOTE: 이메일 및 비밀번호 검증
    const validateInputs = () => {
        // NOTE: 이메일 검증
        const emailFeedbackMsg = (() => {
            if (email) {
                const emailRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!emailRegex.test(email)) {
                    return "올바르지 않은 이메일 형식입니다.";
                }
            }

            if (!email) {
                return "이메일을 입력해주세요.";
            }

            return "";
        })();

        // NOTE: 비밀번호 검증
        const passwordFeedbackMsg = (() => {
            if (!password) {
                return "비밀번호를 입력해주세요.";
            }
            return "";
        })();

        setEmailFeedback(emailFeedbackMsg);
        setPasswordFeedback(passwordFeedbackMsg);

        return emailFeedbackMsg === "" && passwordFeedbackMsg === "";
    };

    const handleSignin = async () => {
        if (validateInputs()) {
            try {
                const response = await axios.post(
                    "/api2/user/sign/login",
                    {
                        email,
                        password,
                    },
                    { withCredentials: true }
                );

                if (response?.status === 200 && response?.data?.isSuccess) {
                    navigate("/", { replace: true }); // 홈으로 이동
                    return;
                }

                setIsFailedLoginModalOpened(true);
            } catch (error) {
                setIsFailedLoginModalOpened(true);
            }
        }
    };

    const toSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="signinpage-container">
            <DetailHeader enableOption={false} />

            <div className="signin-info">
                <img src={logo} alt="logo" className="signin-logo-img" />
                <div>
                    <div className="signin-title">식재료 1/N 할 수 있는</div>
                    <div className="signin-title2">식재료 공동구매 서비스</div>
                </div>
            </div>

            <div className="signin-input">
                <div>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailFeedback && (
                        <p className="signin-input-feedback">{emailFeedback}</p>
                    )}
                </div>
                <div>
                    <input
                        type="password"
                        className="input-field"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordFeedback && (
                        <p className="signin-input-feedback">
                            {passwordFeedback}
                        </p>
                    )}
                </div>
            </div>

            <button className="signin-btn" onClick={handleSignin}>
                이메일로 로그인
            </button>

            <div className="signup-search">
                <div className="signup-name" onClick={toSignup}>
                    회원가입
                </div>
                <div className="search-name">아이디/비밀번호 찾기</div>
            </div>

            {isFailedLoginModalOpened && <LoginFailedModal />}
        </div>
    );
}

const withPageContext = (WrappedComponent) => (props) => {
    return (
        <PageProvider>
            <WrappedComponent {...props} />
        </PageProvider>
    );
};

export default withPageContext(Signin);
