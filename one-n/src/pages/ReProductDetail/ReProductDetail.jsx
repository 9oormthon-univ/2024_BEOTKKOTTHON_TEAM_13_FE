import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReProductDetail.css";
import { ReactComponent as Back } from "../../assets/back.svg";
import { useParams, useNavigate } from "react-router-dom";
import calendar from "../../assets/detailPageIcon/calendar.svg";
import people from "../../assets/detailPageIcon/people.svg";
import location from "../../assets/detailPageIcon/location.svg";
import nonPick from "../../assets/detailPageIcon/nonPick.svg";

export default function ReProductDetail() {
  const baseUrl = "https://n1.junyeong.dev/api2";
  const { productId } = useParams();
  const navigate = useNavigate();
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [productData, setProductData] = useState({});
  const [picked, setPicked] = useState(false);

  const togglePicked = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setPicked(!picked);
  };

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(`${baseUrl}/post/${productId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
  };

  useEffect(() => {
    // productId를 이용하여 상품 데이터 가져오기
    fetchProductData(productId)
      .then((data) => {
        setProductData(data);
        calculateDaysRemaining(data.closedAt); // 남은 일 수 계산
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [productId]);

  const calculateDaysRemaining = (closingDate) => {
    const currentDate = new Date(); // 현재 날짜
    const closingDateTime = new Date(closingDate); // 마감 날짜
    const timeDifference = closingDateTime.getTime() - currentDate.getTime(); // 밀리초 단위로 남은 시간 계산
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 일 단위로 변환 후 올림하여 남은 일 수 계산
    setDaysRemaining(remainingDays); // 남은 일 수 상태 업데이트
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMapButton = () => {
    // check-location 페이지로 이동하고 productData의 위치 정보를 함께 전달
    navigate("/check-location", {
      state: {
        address: productData.locationAddress,
        latitude: productData.locationLatitude,
        longitude: productData.locationLongitude,
      },
    });
  };

  return (
    <div className="product-detail-container">
      {Object.keys(productData).length > 0 && (
        <div>
          <div className="product-header">
            <button className="back-button" onClick={handleBackClick}>
              <Back />
            </button>
          </div>
          <div className="image-container">
            <img
              src={`https://n1.junyeong.dev/${productData.images[0].imagePath}`}
              alt="Product"
              className="product-images"
            />
          </div>
          <div className="product-seller">
            <div className="profile-img"></div>
            <div className="seller-name">
              {productData.nickname !== null
                ? productData.userNickname
                : "판매자 정보 불러오는 중..."}
            </div>
          </div>
          <div className="divide-line"></div>
          <div className="price-date-container">
            <div className="product-title">{productData.title}</div>
            <div className="product-price">
              {productData.pricePerUser.toLocaleString()} 원{" "}
            </div>
            <div className="product-info-container">
              <div className="create-date">
                {new Date(productData.createdAt).toLocaleDateString("ko-KR")}{" "}
              </div>
              <div className="product-type">
                {" "}
                {productData.type === 0 ? "재료" : "레시피 재료"}
              </div>
            </div>
          </div>
          <div className="reproduct-content">{productData.contents}</div>
          <div className="product-likes">찜 {productData.likesCount}</div>
          <div className="divide-line"></div>
          {/* 재료 */}
          <div className="product-recipe-header">
            {productData.type === 0 ? "구매 식재료" : "포함된 재료"}
          </div>
          <div className="reproduct-link">
            {productData.ingredients.map((item, index) => (
              <div key={index} className="link-container">
                <div className="link-item">
                  <div className="ingredient-name">{item.name}</div>
                  <div className="link-url">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="divide-line"></div>
          {/*공동구매 인원*/}
          <div className="product-people-container">
            공동구매 인원
            <div className="product-people">
              <img src={people} />
              <div>
                {productData.curGroupSize}명 / {productData.groupSize}명
              </div>
            </div>
          </div>
          <div className="divide-line"></div>
          {/*거래희망 장소*/}
          <div className="product-address-container">
            거래희망 장소
            <div className="address-container">
              <div className="product-address">
                <img src={location} />
                <div>{productData.locationAddress}</div>
              </div>
              <div className="map-button" onClick={handleMapButton}>지도보기  {">"}</div>
            </div>
          </div>
          <div className="divide-line"></div>
          {/*모집 마감일*/}
          <div className="product-day-container">
            <div>모집 마감일</div>
            <div className="product-day">
              <img src={calendar}/>
              <div className="close-day">{new Date(productData.closedAt).toLocaleDateString("ko-KR")}{" "}</div>
              <div className="remaining-day">D - {daysRemaining}</div>
            </div>
          </div>
          <div className="product-button-container">
            <div className="pick-button">
              <img src={nonPick}/>
              <div>찜하기</div>
            </div>
            <div className="buy-button">
              <div className="buy-product-price">{productData.pricePerUser.toLocaleString()} 원~</div>
              <div>구매하기</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
