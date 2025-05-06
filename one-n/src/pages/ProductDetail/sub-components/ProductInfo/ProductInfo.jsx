import React from "react";

import BannerImage from "./sub-components/BannerImage/BannerImage";
import Writer from "./sub-components/Writer/Writer";
import Details from "./sub-components/Details/Details";
import Ingredients from "./sub-components/Ingredients/Ingredients";
import Participants from "./sub-components/Participants/Participants";
import MeetingPlace from "./sub-components/MeetingPlace/MeetingPlace";
import DueDate from "./sub-components/DueDate/DueDate";

import styles from "./ProductInfo.module.scss";

function ProductDetail() {
    return (
        <div className={styles.ProductInfo}>
            <BannerImage src="" />
            <Writer userImage="" userName="윤준영" />
            <hr />
            <Details
                title="감자볶음 재료 공동구매 구합니다."
                price={4250}
                postDate={new Date()}
                contents="감자, 물엿, 참깨 등 한꺼번에 구매하려고 하는데 값싸게 구매하고 싶어 같이 공구할 분들을 찾습니다!!"
                likesCount={0}
            />
            <hr />
            <Ingredients
                ingredients={[
                    {
                        name: "감자 1KG",
                        link: "https://coupang.com/qwejisdjf",
                    },
                    {
                        name: "물엿 850ml 1개",
                        link: "https://coupang.com/qwejisdjf",
                    },
                    {
                        name: "참깨 1통",
                        link: "https://coupang.com/qwejisdjf",
                    },
                ]}
            />
            <hr />
            <Participants joined={3} total={4} />
            <hr />
            <MeetingPlace address="서울특별시 서초구 반포대로 12" />
            <hr />
            <DueDate date={new Date()} />
        </div>
    );
}

export default ProductDetail;
