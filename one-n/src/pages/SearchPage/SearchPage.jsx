import React, { useState, useEffect } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/icons/back.svg";
import { ReactComponent as HeaderSearchIcon } from "../../assets/icons/header-search.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

import "./SearchPage.css";

function SearchPage() {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchHistories, setSearchHistories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 세션 스토리지에서 최근 검색어를 가져옴
        const storedSearch = sessionStorage.getItem("searchHistories:product");
        if (storedSearch) {
            setSearchHistories(JSON.parse(storedSearch));
        }
    }, []);

    // NOTE: 이전 페이지로 이동
    const handleBackClick = () => {
        navigate(-1);
    };

    // NOTE: 검색 결과 페이지로 이동
    const handleSearch = () => {
        if (searchKeyword && searchKeyword.trim()) {
            // 검색어를 세션 스토리지에 저장
            const updatedHistories = [
                searchKeyword.trim(),
                ...searchHistories.slice(0, 4),
            ];
            sessionStorage.setItem(
                "searchHistories:product",
                JSON.stringify(updatedHistories)
            );

            navigate(`/products?keyword=${searchKeyword}`, { replace: true });
        }
    };

    // NOTE: 특정 최근 검색어 삭제
    const handleDeleteHistory = (historyIndex) => {
        const updatedHistories = searchHistories.filter(
            (_, index) => index !== historyIndex
        );
        setSearchHistories(updatedHistories);
        sessionStorage.setItem(
            "searchHistories:product",
            JSON.stringify(updatedHistories)
        );
    };

    // NOTE: input에서 엔터 키 클릭 시 검색 수행
    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className="search-header">
                <div className="search-back-button" onClick={handleBackClick}>
                    <BackIcon width={24} height={24} />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="product-search"
                        placeholder="검색어를 입력하세요"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                    />
                    <HeaderSearchIcon onClick={handleSearch} />
                </div>
            </div>
            <div className="search-history-container">
                <p className="search-history-title">최근 검색어</p>
                <div className="search-history-list">
                    {searchHistories.map((item, index) => (
                        <div className="recently-search-item" key={index}>
                            <p
                                className="recently-search-item-text"
                                onClick={() => {
                                    navigate(`/products?keyword=${item}`, {
                                        replace: true,
                                    });
                                }}
                            >
                                {item}
                            </p>
                            <div
                                className="recently-search-item-delete"
                                onClick={() => handleDeleteHistory(index)}
                            >
                                <CloseIcon width={16} height={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <NavBar />
        </div>
    );
}

export default SearchPage;
