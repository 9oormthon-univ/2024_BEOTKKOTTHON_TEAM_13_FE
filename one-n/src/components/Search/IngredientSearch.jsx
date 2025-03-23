import { useState } from "react";
import SaleProduct from "../SaleProduct/SaleProduct";

export default function IngredientSearch({ product }) {
    const [selectedOption, setSelectedOption] = useState('ingredients');

    const handleButtonClick = (option) => {
        if (selectedOption !== option) {
            setSelectedOption(option); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };

    // 각각의 옵션에 따라 렌더링할 product 배열 필터링
    const filteredProducts = selectedOption === 'ingredients' 
        ? product.filter(item => item.type === 0)
        : product.filter(item => item.type === 1);

    return (
        <div className="search-select-container">
                <div className='search-option-buttons'>
                    <button 
                        className={selectedOption === 'ingredients' ? 'active' : ''} 
                        onClick={() => handleButtonClick('ingredients')}
                    >
                        재료
                    </button>
                    <button 
                        className={selectedOption === 'recipe' ? 'active' : ''} 
                        onClick={() => handleButtonClick('recipe')}
                    >
                        레시피 재료
                    </button>
                </div>
            {/* 조건에 따라 다르게 렌더링 */}
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                    <SaleProduct key={index} product={item} />
                ))
            ) : (
                <p className="none-search">검색 결과가 없습니다.</p>
            )}
        </div>
    );
}
