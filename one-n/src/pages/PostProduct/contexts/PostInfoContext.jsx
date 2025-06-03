import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

import {
    POST_PRODUCT_TYPES,
    EMPTY_INGREDIENT,
    INGREDIENT_POST_TYPE,
} from "../consts/const";

const PostInfoValueContext = createContext();
const PostInfoActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const usePostInfoValue = () => {
    return useContext(PostInfoValueContext);
};

const usePostInfoAction = () => {
    return useContext(PostInfoActionContext);
};

/**
 * NOTE: 공동구매 게시글 작성을 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns PostInfo Provider
 */
function PostInfoProvider({ children }) {
    // NOTE: 업로드할 사진 목록
    const [photos, setPhotos] = useState([]);
    // NOTE: 게시글 유형 (재료, 레시피)
    const [postType, setPostType] = useState(POST_PRODUCT_TYPES[0].id);
    // NOTE: 게시글 제목
    const [postTitle, setPostTitle] = useState("");
    // NOTE: 게시글 재료 목록
    const [postIngredients, setPostIngredients] = useState([EMPTY_INGREDIENT]);
    // NOTE: 게시글 설명
    const [postDesc, setPostDesc] = useState("");
    // NOTE; 게시글 가격
    const [postPrice, setPostPrice] = useState(0);
    // NOTE; 게시글 참여자 수
    const [postParticipant, setPostParticipant] = useState(0);
    // NOTE: 게시글 거래 위치
    const [postLocation, setPostLocation] = useState({
        latitude: 0,
        longitude: 0,
        address: "",
        bCode: null,
    });
    // NOTE: 게시글 마감 일자
    const [postEndDate, setPostEndDate] = useState(null);

    // NOTE: 게시글의 모든 요소를 입력했는지 검증
    const validatePostInfo = () => {
        if (!Array.isArray(photos) || photos.length === 0) {
            alert("최소 한 장 이상의 사진을 업로드해주세요.");
            return false;
        }

        if (typeof postTitle !== "string" || !postTitle) {
            alert("제목을 입력해주세요.");
            return false;
        }

        if (!Array.isArray(postIngredients) || postIngredients.length === 0) {
            alert("하나 이상의 재료를 입력해주세요.");
            return false;
        }

        if (
            postIngredients.length > 0 &&
            (!postIngredients[0]?.name || !postIngredients[0]?.url)
        ) {
            alert("하나 이상의 재료를 입력해주세요.");
            return false;
        }

        if (!Array.isArray(postIngredients) || postIngredients.length === 0) {
            alert("재료를 추가해주세요.");
            return false;
        }

        if (typeof postDesc !== "string" || !postDesc) {
            alert("설명을 입력해주세요.");
            return false;
        }

        if (typeof postPrice !== "number" || postPrice <= 0) {
            alert("가격을 입력해주세요.");
            return false;
        }

        if (typeof postParticipant !== "number" || postParticipant <= 0) {
            alert("인원 수를 입력해주세요.");
            return false;
        }

        if (
            (postLocation?.latitude === 0 && postLocation?.longitude === 0) ||
            typeof postLocation?.address !== "string" ||
            !postLocation?.address ||
            !postLocation?.bCode
        ) {
            alert("거래 희망 장소를 선택해주세요.");
            return false;
        }

        if (!postEndDate) {
            alert("거래 마감일을 선택해주세요.");
            return false;
        }

        return true;
    };

    // NOTE: 게시글 업로드
    const uploadPostInfo = async () => {
        const response = await axios.post(
            "/api2/post/posts",
            {
                status: 1,
                groupSize: postParticipant,
                curGroupSize: 1,
                createdAt: new Date(),
                closedAt: postEndDate,
                locationBcode: postLocation.bCode,
                locationAddress: postLocation.address,
                locationLatitude: postLocation.latitude,
                locationLongitude: postLocation.longitude,
                title: postTitle,
                pricePerUser: postPrice,
                type: postType === INGREDIENT_POST_TYPE ? 0 : 1,
                contents: postDesc,
                ingredients: postIngredients,
                images: [
                    {
                        imagePath:
                            "https://hcnong.com/_upload/goods/INSERT/1930_0.jpg",
                    },
                ],
            },
            {
                withCredentials: true,
            }
        );

        // NOTE: 게시글 업로드에 실패한 경우
        if (response?.status !== 200) {
            return false;
        }

        return true;
    };

    /**
     * NOTE: PostInfoContext는 여러 상태들을 갖는 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로운 객체가 생성되는 것을 방지하기 위해 컨텍스트가 관리하는 객체에 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({
            photos,
            postType,
            postTitle,
            postIngredients,
            postDesc,
            postPrice,
            postParticipant,
            postLocation,
            postEndDate,
        }),
        [
            photos,
            postType,
            postTitle,
            postIngredients,
            postDesc,
            postPrice,
            postParticipant,
            postLocation,
            postEndDate,
        ]
    );

    const memoizedActions = useMemo(
        () => ({
            setPhotos,
            setPostType,
            setPostTitle,
            setPostIngredients,
            setPostDesc,
            setPostPrice,
            setPostParticipant,
            setPostLocation,
            setPostEndDate,
            validatePostInfo,
            uploadPostInfo,
        }),
        [
            photos,
            postType,
            postTitle,
            postIngredients,
            postDesc,
            postPrice,
            postParticipant,
            postLocation,
            postEndDate,
        ]
    );

    return (
        <PostInfoActionContext.Provider value={memoizedActions}>
            <PostInfoValueContext.Provider value={memoizedValues}>
                {children}
            </PostInfoValueContext.Provider>
        </PostInfoActionContext.Provider>
    );
}

export { usePostInfoValue, usePostInfoAction, PostInfoProvider };
