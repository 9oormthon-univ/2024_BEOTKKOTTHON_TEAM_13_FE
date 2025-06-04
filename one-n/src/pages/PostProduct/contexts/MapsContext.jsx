import React, {
    createContext,
    useContext,
    useRef,
    useState,
    useEffect,
    useMemo,
} from "react";

import useUserLocation from "../hooks/useUserLocation";

const MapsValueContext = createContext();
const MapsActionContext = createContext();

// NOTE: 해당 컨텍스트의 값을 가져오는 쪽에서 사용되는 훅
const useMapsValue = () => {
    return useContext(MapsValueContext);
};
const useMapsAction = () => {
    return useContext(MapsActionContext);
};

/**
 * NOTE: 게시글 등록 페이지의 전반적인 지도 관련 상태 및 관리하기 위한 컨텍스트
 * @param {*} children Children 요소
 * @returns MapsProvider
 */
function MapsProvider({ children }) {
    const mapRef = useRef(null);
    const userLocation = useUserLocation();
    const [centerPosition, setCenterPosition] = useState({
        lat: userLocation.latitude,
        lng: userLocation.longitude,
    });

    // NOTE: 초기 지도 위치로 재설정
    const resetPosition = () => {
        setCenterPosition({
            lat: userLocation.latitude,
            lng: userLocation.longitude,
        });
    };

    // NOTE: 사용자의 위치가 결정되면 지도 중심 위치를 업데이트
    useEffect(() => {
        setCenterPosition({
            lat: userLocation.latitude,
            lng: userLocation.longitude,
        });
    }, [userLocation]);

    /**
     * NOTE: MapsProvider는 여러 상태 및 객체들을 관리하기 때문에 값이 변경될 때마다
     * 새로 생성되는 것을 방지하기 위해 메모이제이션을 적용함
     */
    const memoizedValues = useMemo(
        () => ({ mapRef, userLocation, centerPosition }),
        [mapRef, userLocation, centerPosition]
    );

    const memoizedActions = useMemo(
        () => ({ setCenterPosition, resetPosition }),
        [userLocation]
    );

    return (
        <MapsActionContext.Provider value={memoizedActions}>
            <MapsValueContext.Provider value={memoizedValues}>
                {children}
            </MapsValueContext.Provider>
        </MapsActionContext.Provider>
    );
}

export { useMapsValue, useMapsAction, MapsProvider };
