import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../../components/Button/Button";

import { useMapsValue } from "../../contexts/MapsContext";
import { usePostInfoAction } from "../../contexts/PostInfoContext";

import styles from "./AddressInfo.module.scss";

function AddressInfo() {
    const navigate = useNavigate();

    const { userLocation, centerPosition } = useMapsValue();
    const { setPostLocation } = usePostInfoAction();

    // NOTE: 주소 설정 버튼 이벤트 핸들러
    const handleSetAddress = () => {
        // NOTE: 사용자의 위치 정보를 가져온 경우에만 주소 설정
        if (userLocation.address) {
            setPostLocation({
                latitude: centerPosition.lat,
                longitude: centerPosition.lng,
                address: userLocation.address,
                bCode: userLocation.bCode,
            });
            navigate(-1);
        }
    };

    return (
        <div className={styles.AddressInfo}>
            <p className={styles.address}>
                {userLocation.address ?? "불러오는 중..."}
            </p>
            <Button
                color="yellow"
                size="md"
                fullWidth
                onClick={handleSetAddress}
            >
                이 주소로 설정하기
            </Button>
        </div>
    );
}

export default AddressInfo;
