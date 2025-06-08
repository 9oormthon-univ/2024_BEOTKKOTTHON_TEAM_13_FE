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
 * 유저의 현재 위치를 기반한 법접동코드(bcode)를 반환하는 훅
 */
const useUserBCode = () => {
    const [bCodeInfo, setBCodeInfo] = useState({
        status: false,
        bCode: null,
    });

    useEffect(() => {
        // NOTE: 세션 스토리지에 저장된 유저의 마지막 위치가 있다면 해당 위치를 사용
        if (sessionStorage.getItem("USER_LAST_LOCATION")) {
            const { bCode } = JSON.parse(
                sessionStorage.getItem("USER_LAST_LOCATION")
            );

            // NOTE: bCode가 다른 경우에만 업데이트 수행
            if (bCodeInfo.bCode !== bCode) {
                setBCodeInfo({
                    status: true,
                    bCode,
                });
            }

            return bCodeInfo;
        }

        if (!bCodeInfo.status && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async ({ coords: { latitude, longitude } }) => {
                    const bCode = await getBCode({ latitude, longitude });

                    if (bCode) {
                        setBCodeInfo({
                            status: true,
                            bCode,
                        });

                        // NOTE: 유저의 마지막 위치를 세션 스토리지에 저장
                        sessionStorage.setItem(
                            "USER_LAST_LOCATION",
                            JSON.stringify({
                                latitude,
                                longitude,
                                bCode,
                            })
                        );
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

                            // NOTE: 유저의 마지막 위치를 세션 스토리지에 저장
                            sessionStorage.setItem(
                                "USER_LAST_LOCATION",
                                JSON.stringify({
                                    latitude: lat,
                                    longitude: lon,
                                    bCode,
                                })
                            );
                        }
                    }
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    return bCodeInfo;
};

export default useUserBCode;
