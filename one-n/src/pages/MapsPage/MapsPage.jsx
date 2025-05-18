import React from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import SearchBar from "./sub-components/SearchBar/SearchBar";
import BottomMenu from "./sub-components/BottomMenu/BottomMenu";
import PositionResetButton from "./sub-components/PositionResetButton/PositionResetButton";

import {
    MapsProvider,
    useMapsValue,
    useMapsAction,
} from "./contexts/MapsContext";

import styles from "./MapsPage.module.scss";

function MapsPage() {
    const [] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services", "clusterer"],
    });
    const { mapRef, centerPosition } = useMapsValue();
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
            />
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
