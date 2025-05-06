/**
 * NOTE: 공동구매 게시글 API를 통해 받아온 데이터를 형식에 맞게 가공하는 함수
 * @param {*} data
 */
const processProductData = (data) => {
    const processedData = {};

    // NOTE: 게시글 ID
    if (data.id) {
        processedData.id = data.id;
    }

    // NOTE: 게시글 이미지
    if (data.images?.length > 0) {
        processedData.imageSrc = data.images[0].imagePath;
    }

    // NOTE: 게시글 작성자
    if (data.userNickname) {
        processedData.userNickname = data.userNickname;
    }

    // NOTE: 게시글 제목
    if (data.title) {
        processedData.title = data.title;
    }

    // NOTE: 게시글 가격
    if (data.pricePerUser) {
        processedData.pricePerUser = data.pricePerUser;
    }

    // NOTE: 게시글 작성일
    if (data.createdAt) {
        processedData.postedAt = new Date(data.createdAt);
    }

    // NOTE: 게시글 내용
    if (data.contents) {
        processedData.contents = data.contents;
    }

    // NOTE: 게시글 좋아요 수
    if (data.likesCount) {
        processedData.likes = data.likesCount;
    }

    // NOTE: 게시글 재료
    if (Array.isArray(data.ingredients)) {
        processedData.ingredients = data.ingredients.map((ingredient) => ({
            name: ingredient.name,
            link: ingredient.url,
        }));
    }

    // NOTE: 게시글 참여자 수
    if (data.curGroupSize) {
        processedData.joinedUser = data.curGroupSize;
    }

    // NOTE: 게시글 총 인원 수
    if (data.groupSize) {
        processedData.totalUser = data.groupSize;
    }

    // NOTE: 게시글 위치
    if (
        data.locationAddress &&
        data.locationLongitude &&
        data.locationLatitude
    ) {
        processedData.location = {
            address: data.locationAddress,
            latitude: data.locationLatitude,
            longitude: data.locationLongitude,
        };
    }

    // NOTE: 게시글 마감일
    if (data.closedAt) {
        processedData.closedAt = new Date(data.closedAt);
    }

    return processedData;
};

export { processProductData };
