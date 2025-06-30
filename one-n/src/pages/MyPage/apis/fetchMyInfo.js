import axios from "axios";

import { EMPTY_MY_INFO } from "../consts/const";

const fetchMyInfo = async () => {
    try {
        const response = await axios.get("/api2/user/mypage/info", {
            withCredentials: true,
        });

        // NOTE: 성공적으로 데이터를 가져온 경우
        if (response?.status === 200 && response?.data) {
            const responseData = response?.data;

            // NOTE: 내 정보
            const myInfo = {
                id: responseData?.id,
                email: responseData?.email,
                nickname: responseData?.nickname,
                rating: responseData?.userRating,
                profileImage: responseData?.profileImageUrl,
            };

            return myInfo;
        }

        // NOTE: 데이터가 없는 경우
        if (response?.status === 200 && response?.data?.code === "COMMON404") {
            return EMPTY_MY_INFO;
        }

        throw new Error();
    } catch ({ response }) {
        alert("데이터를 가져올 수 없습니다.");
    }
};

export default fetchMyInfo;
