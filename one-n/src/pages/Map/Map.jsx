import React, { useEffect, useState } from 'react';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import './Map.css';
import LocationImage from '../../assets/Marker.svg';
import SetLocation from '../../assets/setlocation.png';
import axios from 'axios';
import { NavBar } from '../../components/NavBar/NavBar';
import { SearchOutlined } from '@ant-design/icons'; // 🔍 아이콘 추가

const Map = () => {
    const baseUrl = "https://n1.junyeong.dev/api2";
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // 🔹 필터링된 데이터 저장
    const [marker, setMarker] = useState(null);
    const [myLocation, setMyLocation] = useState(false);
    const [page, setPage] = useState(1);
    const [bottomPanel, setBottomPanel] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [activeType, setActiveType] = useState(null); // 🔹 필터링할 타입 (null: 전체, 0: 식재료, 1: 레시피 재료)

    const moveToUserLocation = () => {
        setMyLocation(!myLocation);
    };

    // 🔹 axios를 사용하여 데이터 요청
    const getFetchData = async () => {
        try {
            const storedBcode = sessionStorage.getItem('myBcode') || "";
            console.log("📡 데이터 요청 중...");

            const response = await axios.get(`${baseUrl}/post/list`, {
                params: {
                    type: "all",
                    bcode: storedBcode,
                    keyword: searchQuery,
                    page: 1
                }
            });

            console.log("✅ 데이터 가져오기 성공:", response.data);
            setProducts(response.data); // 전체 데이터 저장
        } catch (error) {
            console.error("❌ 데이터 가져오기 실패:", error);
        }
    };

    useEffect(() => {
        getFetchData();
    }, [page]);

    // 🔹 현재 선택된 `type`에 따라 데이터 필터링
    useEffect(() => {
        if (activeType === null) {
            setFilteredProducts(products); // 전체 데이터 표시
        } else {
            setFilteredProducts(products.filter(item => item.type === activeType));
        }
    }, [products, activeType]);

    useEffect(() => {
        const bottomPanelElement = document.querySelector(".bottom-panel");
        setBottomPanel(bottomPanelElement);
    }, []);
    
    useEffect(() => {
        if (!bottomPanel) return;
    
        bottomPanel.addEventListener("scroll", onScrollBottomPanel);
        return () => bottomPanel.removeEventListener("scroll", onScrollBottomPanel);
    }, [bottomPanel, page]);

    const onScrollBottomPanel = () => {
        const bottomPanel = document.querySelector(".bottom-panel");
        if (bottomPanel.scrollTop + bottomPanel.clientHeight >= bottomPanel.scrollHeight) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('kakao-map');
                const options = {
                    center: new window.kakao.maps.LatLng(37.506502, 127.053617),
                    level: 3,
                };
                const map = new window.kakao.maps.Map(container, options);

                products.forEach(markerData => {
                    if (!markerData.location || !markerData.location.latitude || !markerData.location.longitude) return;
                    
                    const position = new window.kakao.maps.LatLng(markerData.location.latitude, markerData.location.longitude);
                    
                    const circleOptions = {
                        center: position,
                        radius: 6,
                        strokeWeight: 0,
                        fillColor: '#FFDC25',
                        fillOpacity: 1
                    };

                    const circle = new window.kakao.maps.Circle(circleOptions);
                    circle.setMap(map);

                    window.kakao.maps.event.addListener(circle, 'click', () => {
                        setSelectedProduct(markerData);

                        if (marker) marker.setMap(null);
                        
                        const markerImage = new window.kakao.maps.MarkerImage(
                            LocationImage,
                            new window.kakao.maps.Size(33, 40)
                        );

                        const newMarker = new window.kakao.maps.Marker({
                            position: position,
                            map: map,
                            image: markerImage
                        });

                        setMarker(newMarker);
                    });
                });

                navigator.geolocation.getCurrentPosition(
                    position => {
                        const userPosition = new window.kakao.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                        const circle1 = new window.kakao.maps.Circle({
                            center: userPosition,
                            radius: 6,
                            strokeWeight: 0,
                            fillColor: '#0085FF',
                            fillOpacity: 1,
                        });

                        const circle2 = new window.kakao.maps.Circle({
                            center: userPosition,
                            radius: 12,
                            strokeWeight: 0,
                            fillColor: '#007bff',
                            fillOpacity: 0.2,
                        });

                        circle1.setMap(map);
                        circle2.setMap(map);

                        map.setCenter(userPosition);
                    },
                    error => {
                        console.error("❌ 위치 정보를 가져올 수 없습니다:", error);
                    }
                );
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [myLocation]);

    return (
        <>
            <div className="search-bar">
                <input 
                    type="text"
                    placeholder="게시글을 검색하세요."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" onClick={() => getFetchData()}>
                    <SearchOutlined />
                </button>
            </div>

            <button className='set-location-button' onClick={moveToUserLocation}>
                <img src={SetLocation} alt='SetLocation' className='set-location-image' />
            </button>

            <div id="kakao-map" style={{ width: '100%', height: '70vh' }} />

            <div className="bottom-panel">
                <div className='select-options'>
                    <button 
                        className={activeType === 0 ? "active" : ""}
                        onClick={() => setActiveType(prev => prev === 0 ? null : 0)}
                    >
                        식재료
                    </button>
                    <button 
                        className={activeType === 1 ? "active" : ""}
                        onClick={() => setActiveType(prev => prev === 1 ? null : 1)}
                    >
                        레시피 재료
                    </button>
                </div>

                {/* 🔹 필터링된 데이터만 렌더링 */}
                <div className='map-products'>
                    {filteredProducts.map((product, index) => (
                        <SaleProduct key={index} product={product} />
                    ))}
                </div>

                <NavBar />
            </div>
        </>
    );
};

export default Map;