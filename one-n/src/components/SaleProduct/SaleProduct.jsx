import React, { useState, useEffect } from "react";
import './SaleProduct.css';
import profile from '../../assets/Profile.png'
import Mypick from '../../assets/pick.svg'
import FiledPick from '../../assets/filedpick.png'
import { useNavigate } from "react-router-dom";
import CurPeople from '../../assets/curpeople.png'

export default function SaleProduct({ product }) {
    const navigate = useNavigate();
    const imageUrl="https://n1.junyeong.dev";

    const [picked, setPicked] = useState(false);
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        console.log("프로덕트", product);
        // product.closed_at에서 날짜 가져오기
        const closedDate = new Date(product.closed_at);
        
        // 현재 날짜 가져오기
        const currentDate = new Date();
        
        // 마감까지 남은 일 수 계산
        const differenceInTime = closedDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        
        console.log(differenceInDays);
        setDaysLeft(differenceInDays);
    }, [product.closed_at]);

    const togglePicked = (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        setPicked(!picked);
    };

    const handleProductClick = () => {
        console.log("handleProductClick 함수가 실행되었습니다."); // 확인을 위한 로그 추가
        const typeToPathMap = {
            'ingd': 'product-detail',
            'r_ingd': 'reproduct-detail'
        };

        const path = typeToPathMap[product.type];
        if (path) {
            navigate(`/${path}/${product.id}`);
        } else {
            console.error("Unknown product type:", product.type);
            // Handle error, e.g., show an alert to the user
        }
    };

    return (
        <div className="sale-product" onClick={handleProductClick}>
            <div className="sale-product-container">
            <div className="product-details">
                <img src={`${imageUrl}${product.images[0].imagePath}`} alt="Product" className="product-image" />
                <div className="sale-product-details">
                    <div className="sale-product-title-container">
                        <div className="sale-product-title">{product.title}</div>
                        <div className="sale-product-price">{product.pricePerUser} 원</div>
                    </div>
                    <div className="product-date">
                        <div className="product-create-date">1일전</div>
                        <div className="product-due-date">마감 D-1</div>
                    </div>
                   
                </div>
            </div>
            <div className="products">
                {product.ingredients && product.ingredients.map((item, index) => (
                    <span key={index} className="product-item">{item.name}</span>
                ))}
            </div>
            </div>
        </div>
    );
}