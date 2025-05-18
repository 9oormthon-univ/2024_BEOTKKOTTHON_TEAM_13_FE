import { useState, useEffect } from "react";
import axios from "axios";

/**
 * NOTE: 사용자의 위치를 가져오는 커스텀 훅
 * @returns { latitude, longitude }
 */
const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState({
        isLoading: true,
        latitude: 37.39486,
        longitude: 127.11119,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // NOTE: 브라우저로부터 위치를 가져올 수 있는 경우
                async ({ coords: { latitude, longitude } }) => {
                    setUserLocation({
                        isLoading: false,
                        latitude,
                        longitude,
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

                        setUserLocation({
                            isLoading: false,
                            latitude: lat,
                            longitude: lon,
                        });
                    }
                }
            );
        }
    }, []);

    return userLocation;
};

export default useUserLocation;
