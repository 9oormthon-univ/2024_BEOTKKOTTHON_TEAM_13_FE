import React from "react";
import {
    Map as KakaoMap,
    MapMarker as KakaoMapMarker,
    useKakaoLoader,
} from "react-kakao-maps-sdk";

import { useMapsValue, useMapsAction } from "../../contexts/MapsContext";

import TargetLocationIcon from "../../../../assets/icons/target-location-4.svg";

import styles from "./Map.module.scss";

function Map() {
    const [] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services", "clusterer"],
    });
    const { mapRef, userLocation, centerPosition } = useMapsValue();
    const { setCenterPosition } = useMapsAction();

    return (
        <KakaoMap
            ref={mapRef}
            className={styles.Map}
            center={centerPosition}
            isPanto={true}
            level={5}
            onDragEnd={(map) => {
                // NOTE: 드래그 종료 시점에 지도 중심 위치를 업데이트
                const center = map.getCenter();
                setCenterPosition({
                    lat: center.getLat(),
                    lng: center.getLng(),
                });
            }}
        >
            {!userLocation.isLoading && (
                <KakaoMapMarker
                    position={{
                        lat: userLocation.latitude,
                        lng: userLocation.longitude,
                    }}
                    image={{
                        src: TargetLocationIcon,
                        size: {
                            width: 23,
                            height: 23,
                        },
                    }}
                />
            )}
        </KakaoMap>
    );
}

export default Map;
