import { useState, useEffect } from "react";
import './Search.css'

export default function RecentlySearch() {
    const [recentlySearch, setRecentlySearch] = useState([]);

    useEffect(() => {
        // 세션 스토리지에서 데이터 가져오기
        const storedSearch = sessionStorage.getItem('recentlySearch');
        if (storedSearch) {
            setRecentlySearch(JSON.parse(storedSearch));
        }
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

    const handleDelete = (index) => {
        // 삭제 버튼 클릭 시 해당 항목 제거
        const updatedSearch = [...recentlySearch];
        updatedSearch.splice(index, 1);
        setRecentlySearch(updatedSearch);
        // 변경된 데이터를 다시 세션 스토리지에 저장
        sessionStorage.setItem('recentlySearch', JSON.stringify(updatedSearch));
    };

    return (
        <div className="recently-search-container">
            <div className='recently-search'>최근검색어</div>
            <div className='recently-search-items'>
                {recentlySearch.map((item, index) => (
                    <div key={index} className='recently-search-item'>
                        <div>
                            {item}
                        </div>
                        <button className='search-delete-button' onClick={() => handleDelete(index)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
