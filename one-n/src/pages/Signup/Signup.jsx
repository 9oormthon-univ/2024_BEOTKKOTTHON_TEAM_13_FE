import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ReactComponent as Back } from "../../assets/icons/back.svg";
import { ReactComponent as RightCheck } from "../../assets/rightCheck.svg";
import { ReactComponent as WrongCheck } from "../../assets/wrongCheck.svg";

import "./Signup.css";
import BottomBorderInput from "../../components/BottomBorderInput/BottomBorderInput";
import Checkbox from "./sub-components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";

function Signup() {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 비밀번호
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isPasswordValid = password.length >= 10 && password.length <= 15;
    const passwordsMatch =
        password && confirmPassword && password === confirmPassword;

    // 체크박스
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isECommerceChecked, setIsECommerceChecked] = useState(false);
    const [isMarketingChecked, setIsMarketingChecked] = useState(false);

    // 전체동의 체크박스 변경 핸들러
    const handleAllCheckChange = () => {
        const newCheckedState = !isAllChecked;
        setIsAllChecked(newCheckedState);
        setIsECommerceChecked(newCheckedState);
        setIsMarketingChecked(newCheckedState);
    };

    // 개별 체크박스 상태 변경 핸들러
    const handleCheckboxChange = () => {
        setIsAllChecked(isECommerceChecked && isMarketingChecked);
    };

    useEffect(() => {
        handleCheckboxChange();
    }, [isECommerceChecked, isMarketingChecked]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSignup = async () => {
        const requestData = {
            email: email,
            password: password,
            passwordCheck: confirmPassword,
            nickname: nickname,
        };

        try {
            const response = await axios.post(
                "/api2/user/sign/join",
                requestData
            );

            if (response?.status === 200 && response?.data?.isSuccess) {
                alert("회원가입이 완료되었습니다!");
                navigate("/");
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                alert(error?.response?.data?.message);
            }
        }
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmailValid(emailRegex.test(newEmail));
    };

    return (
        <div className="signuppage">
            <div className="top-nav">
                <Back onClick={handleBackClick} />
                <div className="signup-title">회원가입</div>
            </div>

            <div className="signuppage-container">
                {/* 닉네임 */}
                <div className="info-layout">
                    <div className="info-title">닉네임</div>
                    <BottomBorderInput
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="사용하실 닉네임을 입력해주세요."
                    />
                </div>

                {/* 이메일 */}
                <div className="info-layout">
                    <div className="info-title">이메일</div>
                    <BottomBorderInput
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="이메일을 입력해주세요."
                    />
                    {!isEmailValid && email && (
                        <div className="error_message">
                            <WrongCheck />
                            <div style={{ margin: "0 8px" }}>
                                유효한 이메일을 입력해주세요.
                            </div>
                        </div>
                    )}
                </div>

                {/* 비밀번호 */}
                <div className="info-layout">
                    <div className="info-title">비밀번호</div>
                    <BottomBorderInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력해주세요."
                    />
                    {isPasswordValid && (
                        <div className="match_message">
                            <RightCheck />
                            <div style={{ margin: "0 8px" }}>
                                사용 가능한 비밀번호입니다
                            </div>
                        </div>
                    )}
                    {!isPasswordValid && password && (
                        <div className="error_message">
                            <WrongCheck />
                            <div style={{ margin: "0 8px" }}>
                                비밀번호로 사용하실 수 없습니다.
                            </div>
                        </div>
                    )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="info-layout">
                    <div className="info-title">비밀번호 확인</div>
                    <BottomBorderInput
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="비밀번호를 한 번 더 입력해주세요."
                    />
                    {passwordsMatch && (
                        <div className="match_message">
                            <RightCheck />
                            <div style={{ margin: "0 8px" }}>
                                설정한 비밀번호와 일치합니다.
                            </div>
                        </div>
                    )}
                    {confirmPassword && !passwordsMatch && (
                        <div className="error_message">
                            <WrongCheck />
                            <div style={{ margin: "0 8px" }}>
                                설정한 비밀번호가 일치하지 않습니다.
                            </div>
                        </div>
                    )}
                </div>

                <div className="service-info">
                    <div className="info-title">서비스 정책</div>
                    <div className="service-box">
                        {/* 전체동의 체크박스 */}
                        <div
                            className="service-box-content"
                            style={{
                                alignItems: "flex-start",
                                marginBottom: "0.5rem",
                            }}
                        >
                            <Checkbox
                                id="all-checkbox"
                                checked={isAllChecked}
                                onChange={handleAllCheckChange}
                            />
                            <label htmlFor="all-checkbox">
                                전체동의
                                <br />
                                <p className="all-checkbox-desc">
                                    하단의 약관에 모두 동의합니다.
                                </p>
                            </label>
                        </div>

                        {/* 개별 체크박스들 */}
                        <div className="service-box-content">
                            <Checkbox
                                id="ecommerce-checkbox"
                                checked={isECommerceChecked}
                                onChange={() =>
                                    setIsECommerceChecked(!isECommerceChecked)
                                }
                            />
                            <label htmlFor="ecommerce-checkbox">
                                전자상거래 조약 약관
                            </label>
                        </div>

                        <div className="service-box-content">
                            <Checkbox
                                id="marketing-checkbox"
                                checked={isMarketingChecked}
                                onChange={() =>
                                    setIsMarketingChecked(!isMarketingChecked)
                                }
                            />
                            <label htmlFor="marketing-checkbox">
                                (선택) 마케팅 수신 및 정보 보관
                            </label>
                        </div>
                    </div>
                </div>
                <Button
                    color="yellow"
                    size="md"
                    fullWidth
                    onClick={handleSignup}
                >
                    회원가입
                </Button>
            </div>
        </div>
    );
}

export default Signup;
