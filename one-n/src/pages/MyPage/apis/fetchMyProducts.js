import axios from "axios";

const fetchMyProducts = async () => {
    try {
        const response = await axios.get("/api2/user/mypage/posts", {
            withCredentials: true,
        });

        // NOTE: 성공적으로 데이터를 가져온 경우
        if (response?.status === 200 && response?.data?.isSuccess) {
            const responseResult = response?.data?.result;

            return responseResult?.posts;
        }

        // NOTE: 데이터가 없는 경우
        if (response?.status === 200 && response?.data?.code === "COMMON404") {
            return [];
        }

        throw new Error();
    } catch ({ response }) {
        alert("데이터를 가져올 수 없습니다.");
    }
};

export default fetchMyProducts;
