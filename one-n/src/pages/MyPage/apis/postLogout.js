import axios from "axios";

const postLogout = async () => {
    try {
        const response = await axios.post(
            "/api2/user/sign/logout",
            {},
            {
                withCredentials: true,
            }
        );

        // NOTE: 로그아웃 성공
        if (response?.status === 200 && response?.data?.isSuccess) {
            return true;
        }

        // NOTE: 로그아웃 실패
        throw new Error("로그아웃에 실패했습니다.");
    } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
        return false;
    }
};

export default postLogout;
