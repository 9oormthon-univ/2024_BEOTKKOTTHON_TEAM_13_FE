import React from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import SearchBar from "./sub-components/SearchBar/SearchBar";
import BottomMenu from "./sub-components/BottomMenu/BottomMenu";

import useUserLocation from "./hooks/useUserLocation";

import styles from "./MapsPage.module.scss";

function MapsPage() {
    const [] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAO_JS_KEY,
        libraries: ["services", "clusterer"],
    });
    const userLocation = useUserLocation();

    return (
        <div className={styles.MapsPage}>
            <SearchBar />
            <Map
                className={styles.map}
                center={{
                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                }}
                isPanto={true}
                level={5}
            />
            <BottomMenu />
        </div>
    );
}

export default MapsPage;
