import React, { useEffect, useState } from 'react';
import SaleProduct from '../../components/SaleProduct/SaleProduct';
import './Map.css';
import LocationImage from '../../assets/Marker.svg';
import SetLocation from '../../assets/setlocation.png';
import { NavBar } from '../../components/NavBar/NavBar';

// Haversine formula를 이용한 거리 계산 함수
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구의 반경 (단위: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const Map = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 상품 목록을 관리할 상태 추가
    const [marker, setMarker] = useState(null);
    const [page, setPage] = useState(1);
    const [map, setMap] = useState(null);

    const getFetchData = async () => {
        const storedBcode = sessionStorage.getItem('myBcode');
        const url = `https://n1.junyeong.dev/api/post/list?type=all&bcode=&keyword=&page=${page}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(prev => [...prev, ...data]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const moveToUserLocation = () => {
        setProducts([]);
        setFilteredProducts([]);
        setSelectedProduct(null);
        marker.setMap(null);
        getFetchData();

        if (map) {
            navigator.geolocation.getCurrentPosition(position => {
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
                    shadow: {
                        color: "#000",
                        blur: 5,
                        offsetX: 3,
                        offsetY: 3,
                        opacity: 0.25
                    }
                });

                const circle2 = new window.kakao.maps.Circle({
                    center: userPosition,
                    radius: 12,
                    strokeWeight: 0,
                    fillColor: '#007bff',
                    fillOpacity: 0.2
                });

                circle1.setMap(map);
                circle2.setMap(map);
                map.setCenter(userPosition);
            });
        }
    };


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
                const newMap = new window.kakao.maps.Map(container, options);
                setMap(newMap);

                navigator.geolocation.getCurrentPosition(position => {
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
                        shadow: {
                            color: "#000",
                            blur: 5,
                            offsetX: 3,
                            offsetY: 3,
                            opacity: 0.25
                        }
                    });

                    const circle2 = new window.kakao.maps.Circle({
                        center: userPosition,
                        radius: 12,
                        strokeWeight: 0,
                        fillColor: '#007bff',
                        fillOpacity: 0.2
                    });

                    circle1.setMap(newMap);
                    circle2.setMap(newMap);
                    newMap.setCenter(userPosition);
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (map) {
            products.forEach(markerData => {
                const position = new window.kakao.maps.LatLng(markerData.location.latitude, markerData.location.longitude);

                const circleOptions = {
                    center: position,
                    radius: 6,
                    strokeWeight: 0,
                    fillColor: '#FFDC25',
                    fillOpacity: 1,
                };

                const circle = new window.kakao.maps.Circle(circleOptions);
                circle.setMap(map);

                window.kakao.maps.event.addListener(circle, 'click', () => {
                    if (selectedProduct === markerData) {
                        // 이미 선택된 마커를 다시 클릭한 경우 마커 제거
                        if (marker) {
                            marker.setMap(null);
                        }
                        setSelectedProduct(null);
                        setFilteredProducts([]);
                    } else {
                        setSelectedProduct(markerData);

                        if (marker) {
                            marker.setMap(null);
                        }

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

                        // 해당 마커 주변의 상품 목록 필터링
                        const filtered = products.filter(product => {
                            const distance = getDistanceFromLatLonInKm(
                                markerData.location.latitude,
                                markerData.location.longitude,
                                product.location.latitude,
                                product.location.longitude
                            );
                            return distance <= 1; // 1km 이내의 상품만 필터링 (필요에 따라 조정 가능)
                        });
                        setFilteredProducts(filtered); // 필터링된 상품 목록을 상태에 저장
                    }
                });
            });
        }
    }, [map, products, selectedProduct, marker]);

    useEffect(() => {
        getFetchData();
    }, [page]);

    useEffect(() => {
        if (selectedProduct) {
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.filter(product => product !== selectedProduct);
                return [selectedProduct, ...updatedProducts];
            });
        }
    }, [selectedProduct]);

    useEffect(() => {
        const bottomPanelElement = document.querySelector(".bottom-panel");
        if (!bottomPanelElement) return;

        bottomPanelElement.addEventListener("scroll", onScrollBottomPanel);
        return () => bottomPanelElement.removeEventListener("scroll", onScrollBottomPanel);
    }, [page]);

    return (
        <>
            <button className='set-location-button' onClick={moveToUserLocation}>
                <img src={SetLocation} alt='SetLocation' className='set-location-image' />
            </button>
            <div id="kakao-map" style={{ width: '100%', height: '70vh' }} />

            <div className="bottom-panel">
                <div className='map-products'>
                    {(filteredProducts.length > 0 ? filteredProducts : products).map((product, index) => ( // 필터링된 상품 목록이 있으면 그것을 표시
                        <SaleProduct key={index} product={product} isSelected={selectedProduct && selectedProduct.id === product.id} />
                    ))}
                </div>
                <NavBar />
            </div>
        </>
    );
};

export default Map;
