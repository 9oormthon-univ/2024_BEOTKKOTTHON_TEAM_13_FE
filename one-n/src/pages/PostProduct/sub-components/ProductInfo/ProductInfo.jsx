import React from "react";

import styles from "./ProductInfo.module.scss";
import InfoTemplate from "./sub-components/InfoTemplate/InfoTemplate";
import UploadedPhotos from "./sub-components/UploadedPhotos/UploadedPhotos";
import PostTypeSelector from "./sub-components/PostTypeSelector/PostTypeSelector";
import PostTitle from "./sub-components/PostTitle/PostTitle";
import PostIngredients from "./sub-components/PostIngredients/PostIngredients";
import PostDesc from "./sub-components/PostDesc/PostDesc";
import PostPrice from "./sub-components/PostPrice/PostPrice";
import PostParticipant from "./sub-components/PostParticipant/PostParticipant";

function ProductInfo() {
    return (
        <div className={styles.ProductInfo}>
            {/* NOTE: 사진 업로드 */}
            <InfoTemplate title="사진" withPadding={false}>
                <UploadedPhotos />
            </InfoTemplate>

            {/* NOTE: 게시글 유형 */}
            <InfoTemplate title="유형">
                <PostTypeSelector />
            </InfoTemplate>

            {/* NOTE: 게시글 제목 */}
            <InfoTemplate title="제목">
                <PostTitle />
            </InfoTemplate>

            {/* NOTE: 게시글 재료 */}
            <InfoTemplate title="재료">
                <PostIngredients />
            </InfoTemplate>

            {/* NOTE: 게시글 설명 */}
            <PostDesc />

            {/* NOTE: 게시글 가격 */}
            <InfoTemplate title="가격">
                <PostPrice />
            </InfoTemplate>

            {/* NOTE: 게시글 참여 인원 수 */}
            <InfoTemplate title="인원 수">
                <PostParticipant />
            </InfoTemplate>
        </div>
    );
}

export default ProductInfo;
