import React, { useState, useEffect } from "react";
import CustomMarker from "../../assets/Marker.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Back } from "../../assets/back.svg";

export default function CheckLocationPage() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [userPosition, setUserPosition] = useState(null); // 사용자 현재 위치 저장
  const navigate = useNavigate();
  const location = useLocation();
  const { address, latitude, longitude } = location.state || {};

  const goBack = () => {
    navigate(-1); // 뒤로가기
  };

  // 1) 카카오맵 API 불러오기 (중복 로드 방지)
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        process.env.REACT_APP_KAKAO_MAP_API_KEY
      }&autoload=false&libraries=services&t=${new Date().getTime()}`;

      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, []);

  // 2) 지도 초기화
  const initializeMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
  };

  // 3) 사용자 위치 표시 (현재 위치) → 먼저 실행됨
  useEffect(() => {
    if (!map) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentUserPosition = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        setUserPosition(currentUserPosition); // 상태 저장

        const circle1 = new window.kakao.maps.Circle({
          center: currentUserPosition,
          radius: 6,
          strokeWeight: 0,
          fillColor: "#0085FF",
          fillOpacity: 1,
        });

        const circle2 = new window.kakao.maps.Circle({
          center: currentUserPosition,
          radius: 12,
          strokeWeight: 0,
          fillColor: "#007bff",
          fillOpacity: 0.2,
        });

        circle1.setMap(map);
        circle2.setMap(map);

        // 지도 중심을 내 위치로 설정
        map.setCenter(currentUserPosition);

        // 지도를 강제 리사이즈 (CSS 깨짐 방지)
        setTimeout(() => {
          map.relayout();
        }, 500);
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다:", error);
      }
    );
  }, [map]);

  // 4) 마커 표시 (주소 위치) → 사용자 위치 설정 이후 실행
  useEffect(() => {
    if (!map || latitude == null || longitude == null) return;

    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    if (marker) {
      marker.setPosition(markerPosition);
    } else {
      const markerImage = new window.kakao.maps.MarkerImage(
        CustomMarker, // 이미지 경로
        new window.kakao.maps.Size(33, 40)
      );

      const newMarker = new window.kakao.maps.Marker({
        map: map,
        position: markerPosition,
        image: markerImage,
      });

      setMarker(newMarker);
    }

    // 사용자의 현재 위치가 없을 때만 마커 중심으로 설정
    if (!userPosition) {
      map.setCenter(markerPosition);
    }
  }, [map, latitude, longitude, userPosition]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh", zIndex: "10000" }}></div>
      <button className="seletctmap-back-button" onClick={goBack}>
        <Back />
      </button>
      <div className="modal"> 
          <p className="modal-address">{address || "주소 정보 없음"}</p>
      </div>
    </div>
  );
}