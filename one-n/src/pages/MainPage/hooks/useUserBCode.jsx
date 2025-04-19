import { useState } from "react";
import axios from "axios";

/**
 * 카카오 API로 지역 코드 요청
 * @param {*} param0
 */
const getBCode = async ({ latitude, longitude }) => {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

    const response = await axios.get(url, {
        headers: { Authorization: `KakaoAK b4a1d1fba1e4c2024ad2263ea4093534` },
    });

    if (response.status === 200 && response.data) {
        const { documents } = response.data;

        try {
            // NOTE: 법정동 기준의 도큐먼트를 찾음
            const bCodeDocument = documents.find(
                (document) => document["region_type"] === "B"
            );

            const { code: fullBCode } = bCodeDocument;

            return fullBCode.substring(0, 5);
        } catch (_) {
            return null;
        }
    }

    return null;
};

/**
 * 유저의 현재 위치를 기반한 법접동코드(bcode)를 반환하는 훅
 */
const useUserBCode = () => {
    const [bCodeInfo, setBCodeInfo] = useState({
        status: false,
        bCode: null,
    });

    if (!bCodeInfo.status && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude } }) => {
                const bCode = await getBCode({ latitude, longitude });

                if (bCode) {
                    setBCodeInfo({
                        status: true,
                        bCode,
                    });
                }
            },
            async () => {
                const response = await axios.get("http://ip-api.com/json/");

                if (
                    response?.status === 200 &&
                    response?.data &&
                    response.data.status === "success"
                ) {
                    const { lat, lon } = response.data;

                    const bCode = await getBCode({
                        latitude: lat,
                        longitude: lon,
                    });

                    if (bCode) {
                        setBCodeInfo({
                            status: true,
                            bCode,
                        });
                    }
                }
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    return bCodeInfo;
};

export default useUserBCode;
