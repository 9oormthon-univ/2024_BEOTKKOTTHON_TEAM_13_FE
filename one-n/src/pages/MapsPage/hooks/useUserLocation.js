import { useState, useEffect } from "react";
import axios from "axios";

/**
 * 카카오 API로 지역 코드 요청
 * @param {*} param0
 */
const getBCode = async ({ latitude, longitude }) => {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
        },
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
 * NOTE: 사용자의 위치를 가져오는 커스텀 훅
 * @returns { latitude, longitude }
 */
const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState({
        isLoading: true,
        latitude: 37.39486,
        longitude: 127.11119,
        bCode: null,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // NOTE: 브라우저로부터 위치를 가져올 수 있는 경우
                async ({ coords: { latitude, longitude } }) => {
                    const bCode = await getBCode({ latitude, longitude });

                    setUserLocation({
                        isLoading: false,
                        latitude,
                        longitude,
                        bCode,
                    });
                },
                // NOTE: 브라우저로부터 위치를 가져올 수 없는 경우 IP 주소를 통해 위치를 가져옴 (OP 환경에서는 동작 안됨)
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

                        setUserLocation({
                            isLoading: false,
                            latitude: lat,
                            longitude: lon,
                            bCode,
                        });
                    }
                }
            );
        }
    }, []);

    return userLocation;
};

export default useUserLocation;
