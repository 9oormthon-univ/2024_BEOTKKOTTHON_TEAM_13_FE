import React from "react";
import {
    Map as KakaoMap,
    MapMarker as KakaoMapMarker,
    useKakaoLoader,
} from "react-kakao-maps-sdk";

import { useMapsValue, useMapsAction } from "../../contexts/MapsContext";
import { useProductValue } from "../../contexts/ProductContext";

import UserLocationIcon from "../../../../assets/icons/target-location-4.svg";
import ProductLocationIcon from "../../../../assets/icons/target-location-5.svg";

import styles from "./Map.module.scss";

function Map() {
    const [] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services", "clusterer"],
    });
    const { mapRef, userLocation, centerPosition } = useMapsValue();
    const { setCenterPosition } = useMapsAction();
    const { products } = useProductValue();

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
            {/* NOTE: 상품 마커 */}
            {products.map((product) => (
                <KakaoMapMarker
                    key={product.id}
                    position={{
                        lat: product.locationLatitude,
                        lng: product.locationLongitude,
                    }}
                    image={{
                        src: ProductLocationIcon,
                        size: {
                            width: 41.6,
                            height: 54.6,
                        },
                    }}
                />
            ))}
        </KakaoMap>
    );
}

export default Map;
