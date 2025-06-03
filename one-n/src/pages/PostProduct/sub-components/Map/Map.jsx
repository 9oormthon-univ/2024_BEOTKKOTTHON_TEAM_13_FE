import React from "react";
import {
    Map as KakaoMap,
    MapMarker as KakaoMapMarker,
    useKakaoLoader,
} from "react-kakao-maps-sdk";

import { useMapsValue } from "../../contexts/MapsContext";

import UserLocationIcon from "../../../../assets/icons/target-location-4.svg";

import styles from "./Map.module.scss";

function Map() {
    const [] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services", "clusterer"],
    });
    const { mapRef, userLocation, centerPosition } = useMapsValue();

    return (
        <KakaoMap
            ref={mapRef}
            className={styles.Map}
            center={centerPosition}
            level={5}
            draggable={false}
            zoomable={false}
        >
            {/* NOTE: 사용자 위치 */}
            {!userLocation.isLoading && (
                <KakaoMapMarker
                    position={{
                        lat: userLocation.latitude,
                        lng: userLocation.longitude,
                    }}
                    image={{
                        src: UserLocationIcon,
                        size: {
                            width: 27.6,
                            height: 27.6,
                        },
                    }}
                />
            )}
        </KakaoMap>
    );
}

export default Map;
