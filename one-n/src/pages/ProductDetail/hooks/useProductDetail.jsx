import axios from "axios";
import { useEffect, useState, useMemo } from "react";

import { processProductData } from "../utils/processing";

const useProductDetail = (productId) => {
    // NOTE: 데이터 로딩 유무
    const [isLoading, setIsLoading] = useState(true);

    // NOTE: 상품 게시글 데이터
    const [productData, setProductData] = useState({
        id: null,
        imageSrc: "",
        userNickname: "", // TODO: userId로 변경
        title: "",
        pricePerUser: 0,
        postedAt: new Date(),
        contents: "",
        likes: 0,
        ingredients: [],
        joinedUser: 0,
        totalUser: 0,
        location: {
            address: "",
            latitude: null,
            longitude: null,
        },
        closedAt: new Date(),
    });

    useEffect(() => {
        axios
            .get(`/api2/post/${productId}`, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.status === 200 && res.data) {
                    setProductData(processProductData(res.data));
                    setIsLoading(false);
                }
            });
    }, []);

    return useMemo(() => ({ isLoading, productData }), [isLoading]);
};

export default useProductDetail;
