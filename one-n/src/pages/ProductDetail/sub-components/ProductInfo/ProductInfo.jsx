import React from "react";

import BannerImage from "./sub-components/BannerImage/BannerImage";
import Writer from "./sub-components/Writer/Writer";
import Details from "./sub-components/Details/Details";
import Ingredients from "./sub-components/Ingredients/Ingredients";
import Participants from "./sub-components/Participants/Participants";
import MeetingPlace from "./sub-components/MeetingPlace/MeetingPlace";
import DueDate from "./sub-components/DueDate/DueDate";

import { useProductDetailValue } from "../../contexts/ProductDetailContext";

import styles from "./ProductInfo.module.scss";

function ProductDetail() {
    const { productData } = useProductDetailValue();

    return (
        <div className={styles.ProductInfo}>
            <BannerImage src={productData.imageSrc} />
            <Writer userImage="" userName={productData.userNickname} />
            <hr />
            <Details
                title={productData.title}
                price={productData.pricePerUser}
                postDate={productData.postedAt}
                contents={productData.contents}
                likesCount={productData.likes}
            />
            <hr />
            <Ingredients ingredients={productData.ingredients} />
            <hr />
            <Participants
                joined={productData.joinedUser}
                total={productData.totalUser}
            />
            <hr />
            <MeetingPlace address={productData.location?.address} />
            <hr />
            <DueDate date={productData.closedAt} />
        </div>
    );
}

export default ProductDetail;
