import React from "react";

import ProductListElement from "../../../../../../components/ProductListElement/ProductListElement";

import styles from "./ProductList.module.scss";

const products = [
    {
        id: 9,
        status: 1,
        userNickname: "게으른 리더",
        groupSize: 3,
        curGroupSize: 3,
        chatId: null,
        createdAt: "2025-04-18T02:10:57.258+00:00",
        closedAt: "2025-04-21T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11733377600576",
        locationLatitude: "37.36643994488451",
        title: "갈비찜 재료 공동구매합니다.",
        pricePerUser: 11800,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 1,
                name: "고추장",
                url: "https://www.kurly.com/goods/5156563",
            },
        ],
        images: [
            {
                id: 5,
                imagePath:
                    "/img/post/474ada2e-e09d-49d1-92c2-542ab2e18cbc.jpeg",
            },
            {
                id: 13,
                imagePath: "/img/post/1583220729606l0.jpg",
            },
            {
                id: 5,
                imagePath:
                    "/img/post/474ada2e-e09d-49d1-92c2-542ab2e18cbc.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 10,
        status: 1,
        userNickname: "냉정한 행동",
        groupSize: 4,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-04-23T02:10:57.258+00:00",
        closedAt: "2025-04-27T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11568931946839",
        locationLatitude: "37.365671922046396",
        title: "미역 한 묶음 공동구매할 분 있나요?",
        pricePerUser: 3600,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 5,
                name: "마늘",
                url: "https://www.kurly.com/goods/5027318",
            },
        ],
        images: [
            {
                id: 12,
                imagePath: "/img/post/1568959908860l0.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 16,
        status: 1,
        userNickname: "정직한 아이",
        groupSize: 4,
        curGroupSize: 0,
        chatId: null,
        createdAt: "2025-04-22T02:10:57.258+00:00",
        closedAt: "2025-04-26T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.1169544225956",
        locationLatitude: "37.36844391967304",
        title: "사과 한 박스 공동구매합니다.",
        pricePerUser: 8000,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 18,
                name: "새우젓",
                url: "https://www.coupang.com/vp/products/6957124407?itemId=16922960532&vendorItemId=84100794087&pickType=COU_PICK&q=%EC%83%88%EC%9A%B0%EC%A0%93&itemsCount=27&searchId=365f83c088424850bfb0c9ed03ff19a7&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 3,
                imagePath:
                    "/img/post/1ca094dd-294d-43e0-8d7f-5ce9dcf92260.jpeg",
            },
            {
                id: 1,
                imagePath:
                    "/img/post/0dc8cf3c-d0ae-4a1b-bcf6-86a6a12c7bf0.jpeg",
            },
            {
                id: 9,
                imagePath: "/img/post/7929c030-978c-4d2d-8862-8c8222180b0c.jpg",
            },
            {
                id: 10,
                imagePath: "/img/post/3421441c-4f0f-4fe2-a397-ffb6e2971140.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 9,
        status: 1,
        userNickname: "유머러스한 부모",
        groupSize: 5,
        curGroupSize: 3,
        chatId: null,
        createdAt: "2025-04-21T02:10:57.258+00:00",
        closedAt: "2025-04-27T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.1169709388271",
        locationLatitude: "37.36459633170929",
        title: "김치찌개 재료 같이 준비할 분 구합니다!",
        pricePerUser: 10100,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 14,
                name: "당근",
                url: "https://www.coupang.com/vp/products/6202345562?itemId=12314074324&vendorItemId=79584195630&q=%EB%8B%B9%EA%B7%BC&itemsCount=27&searchId=6a8aec6bf3f24b759099fd5c756a53d9&rank=1&isAddedCart=",
            },
            {
                id: 7,
                name: "깐대파",
                url: "https://www.kurly.com/goods/5027320",
            },
            {
                id: 5,
                name: "마늘",
                url: "https://www.kurly.com/goods/5027318",
            },
            {
                id: 9,
                name: "쌀",
                url: "https://www.kurly.com/goods/5003169",
            },
            {
                id: 18,
                name: "새우젓",
                url: "https://www.coupang.com/vp/products/6957124407?itemId=16922960532&vendorItemId=84100794087&pickType=COU_PICK&q=%EC%83%88%EC%9A%B0%EC%A0%93&itemsCount=27&searchId=365f83c088424850bfb0c9ed03ff19a7&rank=0&isAddedCart=",
            },
            {
                id: 1,
                name: "고추장",
                url: "https://www.kurly.com/goods/5156563",
            },
            {
                id: 19,
                name: "미역",
                url: "https://www.kurly.com/goods/5004778",
            },
        ],
        images: [
            {
                id: 15,
                imagePath: "/img/post/1653038353558l0.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 15,
        status: 1,
        userNickname: "성실한 관점",
        groupSize: 2,
        curGroupSize: 0,
        chatId: null,
        createdAt: "2025-05-10T02:10:57.258+00:00",
        closedAt: "2025-05-16T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11292520522622",
        locationLatitude: "37.361702566818934",
        title: "배추 공동구매할 분 있나요?",
        pricePerUser: 20200,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 14,
                name: "당근",
                url: "https://www.coupang.com/vp/products/6202345562?itemId=12314074324&vendorItemId=79584195630&q=%EB%8B%B9%EA%B7%BC&itemsCount=27&searchId=6a8aec6bf3f24b759099fd5c756a53d9&rank=1&isAddedCart=",
            },
        ],
        images: [
            {
                id: 13,
                imagePath: "/img/post/1583220729606l0.jpg",
            },
            {
                id: 2,
                imagePath: "/img/post/0e73779c-be7e-4784-ba61-303e9b4d5b78.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 2,
        status: 1,
        userNickname: "게으른 결정",
        groupSize: 2,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-04-21T02:10:57.258+00:00",
        closedAt: "2025-04-27T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.1092032986572",
        locationLatitude: "37.37076717476258",
        title: "배추 공동구매할 분 있나요?",
        pricePerUser: 19700,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 4,
                name: "참기름",
                url: "https://www.coupang.com/vp/products/7235432441?itemId=3019599468&vendorItemId=84993756491&pickType=COU_PICK&q=%EC%B0%B8%EA%B8%B0%EB%A6%84&itemsCount=27&searchId=e16ef9ad8dbd45e3b24539697e3d7080&rank=0&isAddedCart=",
            },
            {
                id: 4,
                name: "참기름",
                url: "https://www.coupang.com/vp/products/7235432441?itemId=3019599468&vendorItemId=84993756491&pickType=COU_PICK&q=%EC%B0%B8%EA%B8%B0%EB%A6%84&itemsCount=27&searchId=e16ef9ad8dbd45e3b24539697e3d7080&rank=0&isAddedCart=",
            },
            {
                id: 12,
                name: "배추",
                url: "https://www.coupang.com/vp/products/2233944989?itemId=3812413037&vendorItemId=71797311591&pickType=COU_PICK&q=%EB%B0%B0%EC%B6%94&itemsCount=27&searchId=ea435bc585b34aa8a5eb4e52280af94f&rank=0&isAddedCart=",
            },
            {
                id: 15,
                name: "소고기",
                url: "https://www.kurly.com/goods/5054443",
            },
            {
                id: 10,
                name: "김",
                url: "https://www.coupang.com/vp/products/266254917?itemId=834542714&vendorItemId=5124578637&q=%EA%B9%80&itemsCount=27&searchId=9141b44bfa3c4496b6dd27db4ac5a234&rank=0&isAddedCart=",
            },
            {
                id: 10,
                name: "김",
                url: "https://www.coupang.com/vp/products/266254917?itemId=834542714&vendorItemId=5124578637&q=%EA%B9%80&itemsCount=27&searchId=9141b44bfa3c4496b6dd27db4ac5a234&rank=0&isAddedCart=",
            },
            {
                id: 20,
                name: "고사리",
                url: "https://www.coupang.com/vp/products/6342738185?itemId=13313872019&vendorItemId=80570095547&pickType=COU_PICK&q=%EA%B3%A0%EC%82%AC%EB%A6%AC&itemsCount=27&searchId=7f77adf0ea4c4e2eacc63050bda5d5f2&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 20,
                imagePath: "/img/post/e5e8f113-c75e-4104-b4fb-5206c8b1d9b8.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 14,
        status: 1,
        userNickname: "고집 센 성격",
        groupSize: 4,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-04-26T02:10:57.258+00:00",
        closedAt: "2025-05-03T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11051566448404",
        locationLatitude: "37.37009056637245",
        title: "김밥 재료 함께 구입할 분 구합니다.",
        pricePerUser: 10900,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 18,
                name: "새우젓",
                url: "https://www.coupang.com/vp/products/6957124407?itemId=16922960532&vendorItemId=84100794087&pickType=COU_PICK&q=%EC%83%88%EC%9A%B0%EC%A0%93&itemsCount=27&searchId=365f83c088424850bfb0c9ed03ff19a7&rank=0&isAddedCart=",
            },
            {
                id: 19,
                name: "미역",
                url: "https://www.kurly.com/goods/5004778",
            },
            {
                id: 9,
                name: "쌀",
                url: "https://www.kurly.com/goods/5003169",
            },
        ],
        images: [
            {
                id: 10,
                imagePath: "/img/post/3421441c-4f0f-4fe2-a397-ffb6e2971140.jpg",
            },
            {
                id: 9,
                imagePath: "/img/post/7929c030-978c-4d2d-8862-8c8222180b0c.jpg",
            },
            {
                id: 17,
                imagePath: "/img/post/1656563327799l0.jpg",
            },
            {
                id: 10,
                imagePath: "/img/post/3421441c-4f0f-4fe2-a397-ffb6e2971140.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 5,
        status: 1,
        userNickname: "게으른 부모",
        groupSize: 5,
        curGroupSize: 4,
        chatId: null,
        createdAt: "2025-05-14T02:10:57.258+00:00",
        closedAt: "2025-05-18T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11176630260006",
        locationLatitude: "37.366088556096855",
        title: "불고기 재료 공동구매할 분 있나요?",
        pricePerUser: 6800,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 11,
                name: "두부",
                url: "https://www.kurly.com/goods/5053329",
            },
        ],
        images: [
            {
                id: 15,
                imagePath: "/img/post/1653038353558l0.jpeg",
            },
            {
                id: 16,
                imagePath: "/img/post/1653038616850l0.jpeg",
            },
            {
                id: 6,
                imagePath: "/img/post/523c90ab-d681-40cf-bfc4-a4df93bc220b.jpg",
            },
            {
                id: 1,
                imagePath:
                    "/img/post/0dc8cf3c-d0ae-4a1b-bcf6-86a6a12c7bf0.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 5,
        status: 1,
        userNickname: "정직한 반응",
        groupSize: 5,
        curGroupSize: 4,
        chatId: null,
        createdAt: "2025-04-22T02:10:57.258+00:00",
        closedAt: "2025-04-29T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.10822778427003",
        locationLatitude: "37.36912095842668",
        title: "미역 한 묶음 공동구매할 분 있나요?",
        pricePerUser: 3900,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 8,
                name: "고춧가루",
                url: "https://www.coupang.com/vp/products/188717799?itemId=2089138674&vendorItemId=70088115437&pickType=COU_PICK&q=%EA%B3%A0%EC%B6%A7%EA%B0%80%EB%A3%A8&itemsCount=27&searchId=b4d36fa793be43de8cef583ee0c4f36f&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 4,
                imagePath: "/img/post/9dfc0c12-fabc-46b9-bb89-f48dd740997a.jpg",
            },
            {
                id: 5,
                imagePath:
                    "/img/post/474ada2e-e09d-49d1-92c2-542ab2e18cbc.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 18,
        status: 1,
        userNickname: "유머러스한 영웅",
        groupSize: 2,
        curGroupSize: 1,
        chatId: null,
        createdAt: "2025-05-09T02:10:57.258+00:00",
        closedAt: "2025-05-12T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11625243092607",
        locationLatitude: "37.364781089044456",
        title: "불고기 재료 공동구매할 분 있나요?",
        pricePerUser: 3500,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 8,
                name: "고춧가루",
                url: "https://www.coupang.com/vp/products/188717799?itemId=2089138674&vendorItemId=70088115437&pickType=COU_PICK&q=%EA%B3%A0%EC%B6%A7%EA%B0%80%EB%A3%A8&itemsCount=27&searchId=b4d36fa793be43de8cef583ee0c4f36f&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 19,
                imagePath: "/img/post/c11e3b6e-5dee-47d0-8a7b-7df11a620867.jpg",
            },
            {
                id: 15,
                imagePath: "/img/post/1653038353558l0.jpeg",
            },
            {
                id: 14,
                imagePath: "/img/post/1653037915850l0.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 2,
        status: 1,
        userNickname: "정직한 리더",
        groupSize: 5,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-05-16T02:10:57.258+00:00",
        closedAt: "2025-05-22T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11144779289512",
        locationLatitude: "37.366219190129144",
        title: "달걀 한 판 같이 사서 나누실 분?",
        pricePerUser: 17300,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 11,
                name: "두부",
                url: "https://www.kurly.com/goods/5053329",
            },
            {
                id: 1,
                name: "고추장",
                url: "https://www.kurly.com/goods/5156563",
            },
            {
                id: 11,
                name: "두부",
                url: "https://www.kurly.com/goods/5053329",
            },
        ],
        images: [
            {
                id: 7,
                imagePath: "/img/post/4436fdec-039d-4683-b8f3-7ebf677ad190.jpg",
            },
            {
                id: 3,
                imagePath:
                    "/img/post/1ca094dd-294d-43e0-8d7f-5ce9dcf92260.jpeg",
            },
            {
                id: 18,
                imagePath:
                    "/img/post/a695cf27-81b4-4ac2-8683-da431feedb75.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 5,
        status: 1,
        userNickname: "다정한 부모",
        groupSize: 2,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-04-29T02:10:57.258+00:00",
        closedAt: "2025-05-03T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11671385338246",
        locationLatitude: "37.370187713633705",
        title: "사과 한 박스 공동구매합니다.",
        pricePerUser: 18600,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 8,
                name: "고춧가루",
                url: "https://www.coupang.com/vp/products/188717799?itemId=2089138674&vendorItemId=70088115437&pickType=COU_PICK&q=%EA%B3%A0%EC%B6%A7%EA%B0%80%EB%A3%A8&itemsCount=27&searchId=b4d36fa793be43de8cef583ee0c4f36f&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 11,
                imagePath: "/img/post/147918052537l0.jpg",
            },
            {
                id: 1,
                imagePath:
                    "/img/post/0dc8cf3c-d0ae-4a1b-bcf6-86a6a12c7bf0.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 11,
        status: 1,
        userNickname: "겸손한 반응",
        groupSize: 4,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-05-15T02:10:57.258+00:00",
        closedAt: "2025-05-17T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11162215641926",
        locationLatitude: "37.3701680264187",
        title: "된장찌개 재료 함께 구매할 분 찾습니다.",
        pricePerUser: 11600,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 8,
                name: "고춧가루",
                url: "https://www.coupang.com/vp/products/188717799?itemId=2089138674&vendorItemId=70088115437&pickType=COU_PICK&q=%EA%B3%A0%EC%B6%A7%EA%B0%80%EB%A3%A8&itemsCount=27&searchId=b4d36fa793be43de8cef583ee0c4f36f&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 9,
                imagePath: "/img/post/7929c030-978c-4d2d-8862-8c8222180b0c.jpg",
            },
            {
                id: 8,
                imagePath: "/img/post/06191e9a-85b8-41d1-ba4c-2444cc1571a6.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 5,
        status: 1,
        userNickname: "사교적인 리더",
        groupSize: 4,
        curGroupSize: 0,
        chatId: null,
        createdAt: "2025-04-18T02:10:57.258+00:00",
        closedAt: "2025-04-24T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11561055620037",
        locationLatitude: "37.36992194951247",
        title: "쌀 10kg 함께 주문하실 분 구해요.",
        pricePerUser: 8100,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 19,
                name: "미역",
                url: "https://www.kurly.com/goods/5004778",
            },
            {
                id: 15,
                name: "소고기",
                url: "https://www.kurly.com/goods/5054443",
            },
            {
                id: 6,
                name: "양파",
                url: "https://www.coupang.com/vp/products/1074470755?itemId=2573048645&vendorItemId=70565380605&pickType=COU_PICK&q=%EC%96%91%ED%8C%8C&itemsCount=27&searchId=258a059f4f854434ad9ff92317d20c74&rank=0&isAddedCart=",
            },
            {
                id: 19,
                name: "미역",
                url: "https://www.kurly.com/goods/5004778",
            },
        ],
        images: [
            {
                id: 6,
                imagePath: "/img/post/523c90ab-d681-40cf-bfc4-a4df93bc220b.jpg",
            },
            {
                id: 7,
                imagePath: "/img/post/4436fdec-039d-4683-b8f3-7ebf677ad190.jpg",
            },
            {
                id: 10,
                imagePath: "/img/post/3421441c-4f0f-4fe2-a397-ffb6e2971140.jpg",
            },
            {
                id: 5,
                imagePath:
                    "/img/post/474ada2e-e09d-49d1-92c2-542ab2e18cbc.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 3,
        status: 1,
        userNickname: "예민한 관점",
        groupSize: 5,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-05-09T02:10:57.258+00:00",
        closedAt: "2025-05-16T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.10808776295212",
        locationLatitude: "37.36232096520111",
        title: "김치찌개 재료 같이 준비할 분 구합니다!",
        pricePerUser: 3600,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 19,
                name: "미역",
                url: "https://www.kurly.com/goods/5004778",
            },
            {
                id: 7,
                name: "깐대파",
                url: "https://www.kurly.com/goods/5027320",
            },
            {
                id: 7,
                name: "깐대파",
                url: "https://www.kurly.com/goods/5027320",
            },
            {
                id: 12,
                name: "배추",
                url: "https://www.coupang.com/vp/products/2233944989?itemId=3812413037&vendorItemId=71797311591&pickType=COU_PICK&q=%EB%B0%B0%EC%B6%94&itemsCount=27&searchId=ea435bc585b34aa8a5eb4e52280af94f&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 15,
                imagePath: "/img/post/1653038353558l0.jpeg",
            },
            {
                id: 20,
                imagePath: "/img/post/e5e8f113-c75e-4104-b4fb-5206c8b1d9b8.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 3,
        status: 1,
        userNickname: "사교적인 영웅",
        groupSize: 4,
        curGroupSize: 1,
        chatId: null,
        createdAt: "2025-05-16T02:10:57.258+00:00",
        closedAt: "2025-05-22T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11674484709309",
        locationLatitude: "37.3663381469487",
        title: "달걀 한 판 같이 사서 나누실 분?",
        pricePerUser: 6300,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 3,
                name: "간장",
                url: "https://www.kurly.com/goods/5156583",
            },
        ],
        images: [
            {
                id: 3,
                imagePath:
                    "/img/post/1ca094dd-294d-43e0-8d7f-5ce9dcf92260.jpeg",
            },
            {
                id: 12,
                imagePath: "/img/post/1568959908860l0.jpg",
            },
            {
                id: 2,
                imagePath: "/img/post/0e73779c-be7e-4784-ba61-303e9b4d5b78.jpg",
            },
            {
                id: 20,
                imagePath: "/img/post/e5e8f113-c75e-4104-b4fb-5206c8b1d9b8.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 4,
        status: 1,
        userNickname: "낙천적인 행동",
        groupSize: 5,
        curGroupSize: 2,
        chatId: null,
        createdAt: "2025-05-17T02:10:57.258+00:00",
        closedAt: "2025-05-23T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.112478211603",
        locationLatitude: "37.36356406245773",
        title: "해물파전 재료 공동구매할 분 있나요?",
        pricePerUser: 15600,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 6,
                name: "양파",
                url: "https://www.coupang.com/vp/products/1074470755?itemId=2573048645&vendorItemId=70565380605&pickType=COU_PICK&q=%EC%96%91%ED%8C%8C&itemsCount=27&searchId=258a059f4f854434ad9ff92317d20c74&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 3,
                imagePath:
                    "/img/post/1ca094dd-294d-43e0-8d7f-5ce9dcf92260.jpeg",
            },
            {
                id: 13,
                imagePath: "/img/post/1583220729606l0.jpg",
            },
            {
                id: 6,
                imagePath: "/img/post/523c90ab-d681-40cf-bfc4-a4df93bc220b.jpg",
            },
            {
                id: 6,
                imagePath: "/img/post/523c90ab-d681-40cf-bfc4-a4df93bc220b.jpg",
            },
        ],
        likesCount: null,
    },
    {
        id: 17,
        status: 1,
        userNickname: "비관적인 판단",
        groupSize: 3,
        curGroupSize: 3,
        chatId: null,
        createdAt: "2025-04-23T02:10:57.258+00:00",
        closedAt: "2025-04-30T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.11118144399222",
        locationLatitude: "37.36347816663223",
        title: "대파 한 단 같이 사요.",
        pricePerUser: 17600,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 5,
                name: "마늘",
                url: "https://www.kurly.com/goods/5027318",
            },
        ],
        images: [
            {
                id: 13,
                imagePath: "/img/post/1583220729606l0.jpg",
            },
            {
                id: 16,
                imagePath: "/img/post/1653038616850l0.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 4,
        status: 1,
        userNickname: "용감한 결정",
        groupSize: 4,
        curGroupSize: 1,
        chatId: null,
        createdAt: "2025-04-22T02:10:57.258+00:00",
        closedAt: "2025-04-25T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.1121611282988",
        locationLatitude: "37.36908525245308",
        title: "비빔밥 재료 같이 사서 요리할 분 구해요.",
        pricePerUser: 10900,
        type: 1,
        contents: null,
        ingredients: [
            {
                id: 5,
                name: "마늘",
                url: "https://www.kurly.com/goods/5027318",
            },
            {
                id: 7,
                name: "깐대파",
                url: "https://www.kurly.com/goods/5027320",
            },
            {
                id: 16,
                name: "돼지고기",
                url: "https://www.coupang.com/vp/products/5923718611?itemId=10507163351&vendorItemId=77788822678&q=%EB%8F%BC%EC%A7%80%EA%B3%A0%EA%B8%B0&itemsCount=26&searchId=226d843ffa48495eaf9104870742ebbb&rank=2&isAddedCart=",
            },
            {
                id: 4,
                name: "참기름",
                url: "https://www.coupang.com/vp/products/7235432441?itemId=3019599468&vendorItemId=84993756491&pickType=COU_PICK&q=%EC%B0%B8%EA%B8%B0%EB%A6%84&itemsCount=27&searchId=e16ef9ad8dbd45e3b24539697e3d7080&rank=0&isAddedCart=",
            },
            {
                id: 16,
                name: "돼지고기",
                url: "https://www.coupang.com/vp/products/5923718611?itemId=10507163351&vendorItemId=77788822678&q=%EB%8F%BC%EC%A7%80%EA%B3%A0%EA%B8%B0&itemsCount=26&searchId=226d843ffa48495eaf9104870742ebbb&rank=2&isAddedCart=",
            },
            {
                id: 18,
                name: "새우젓",
                url: "https://www.coupang.com/vp/products/6957124407?itemId=16922960532&vendorItemId=84100794087&pickType=COU_PICK&q=%EC%83%88%EC%9A%B0%EC%A0%93&itemsCount=27&searchId=365f83c088424850bfb0c9ed03ff19a7&rank=0&isAddedCart=",
            },
            {
                id: 8,
                name: "고춧가루",
                url: "https://www.coupang.com/vp/products/188717799?itemId=2089138674&vendorItemId=70088115437&pickType=COU_PICK&q=%EA%B3%A0%EC%B6%A7%EA%B0%80%EB%A3%A8&itemsCount=27&searchId=b4d36fa793be43de8cef583ee0c4f36f&rank=0&isAddedCart=",
            },
        ],
        images: [
            {
                id: 15,
                imagePath: "/img/post/1653038353558l0.jpeg",
            },
        ],
        likesCount: null,
    },
    {
        id: 15,
        status: 1,
        userNickname: "인내심 있는 학생",
        groupSize: 4,
        curGroupSize: 0,
        chatId: null,
        createdAt: "2025-05-16T02:10:57.258+00:00",
        closedAt: "2025-05-22T02:10:57.258+00:00",
        locationBcode: 0,
        locationAddress: null,
        locationLongitude: "127.1149899997634",
        locationLatitude: "37.36722451821365",
        title: "해물파전 재료 공동구매할 분 있나요?",
        pricePerUser: 5300,
        type: 0,
        contents: null,
        ingredients: [
            {
                id: 15,
                name: "소고기",
                url: "https://www.kurly.com/goods/5054443",
            },
        ],
        images: [
            {
                id: 19,
                imagePath: "/img/post/c11e3b6e-5dee-47d0-8a7b-7df11a620867.jpg",
            },
            {
                id: 9,
                imagePath: "/img/post/7929c030-978c-4d2d-8862-8c8222180b0c.jpg",
            },
            {
                id: 2,
                imagePath: "/img/post/0e73779c-be7e-4784-ba61-303e9b4d5b78.jpg",
            },
        ],
        likesCount: null,
    },
];

function ProductList() {
    // const { products } = useProductValue();

    return (
        <div className={styles.ProductList}>
            {products.map(
                ({
                    id,
                    images,
                    title,
                    pricePerUser,
                    createdAt,
                    closedAt,
                    ingredients,
                }) => {
                    if (Array.isArray(images) && images.length > 0) {
                        return (
                            <ProductListElement
                                key={id}
                                id={id}
                                imagePath={images[0]?.imagePath}
                                title={title}
                                price={pricePerUser}
                                createdAt={createdAt}
                                closedAt={closedAt}
                                ingredients={ingredients}
                            />
                        );
                    }

                    return (
                        <ProductListElement
                            key={id}
                            id={id}
                            title={title}
                            price={pricePerUser}
                            createdAt={createdAt}
                            closedAt={closedAt}
                            ingredients={ingredients}
                        />
                    );
                }
            )}
        </div>
    );
}

export default ProductList;
