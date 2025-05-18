import React from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import SearchBar from "./sub-components/SearchBar/SearchBar";
import BottomMenu from "./sub-components/BottomMenu/BottomMenu";
import PositionResetButton from "./sub-components/PositionResetButton/PositionResetButton";

import {
    MapsProvider,
    useMapsValue,
    useMapsAction,
} from "./contexts/MapsContext";

import TargetLocationIcon from "../../assets/icons/target-location-4.svg";

import styles from "./MapsPage.module.scss";

function MapsPage() {
    const [] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services", "clusterer"],
    });
    const { mapRef, userLocation, centerPosition } = useMapsValue();
    const { setCenterPosition } = useMapsAction();

    return (
        <div className={styles.MapsPage}>
            <SearchBar />
            <Map
                ref={mapRef}
                className={styles.map}
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
                    <MapMarker
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
            </Map>
            <BottomMenu />
            <PositionResetButton />
        </div>
    );
}

const withProviders = (WrappedComponent) => (props) => {
    return (
        <MapsProvider>
            <WrappedComponent {...props} />
        </MapsProvider>
    );
};

export default withProviders(MapsPage);
