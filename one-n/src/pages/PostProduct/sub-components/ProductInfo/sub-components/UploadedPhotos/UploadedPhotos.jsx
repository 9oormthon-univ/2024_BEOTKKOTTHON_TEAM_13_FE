import React, { useRef } from "react";

import { ReactComponent as CameraIcon } from "../../../../../../assets/icons/camera.svg";

import {
    usePostInfoAction,
    usePostInfoValue,
} from "../../../../contexts/PostInfoContext";

import styles from "./UploadedPhotos.module.scss";

// NOTE: 업로드할 수 있는 최대 사진 개수
const MAX_UPLOAD_PHOTOS = 5;

function UploadedPhotos() {
    const { photos } = usePostInfoValue();
    const { setPhotos } = usePostInfoAction();

    // NOTE: 선택된 사진을 photos 배열에 추가
    const addPhotos = (selectedPhotos) => {
        if (Array.isArray(selectedPhotos)) {
            // NOTE: 사진 업로드는 최대 5개까지만 가능
            if (photos.length + selectedPhotos.length > MAX_UPLOAD_PHOTOS) {
                alert("사진은 최대 5개까지 업로드가 가능합니다.");
            }

            const reducedPhotos = selectedPhotos.slice(
                0,
                MAX_UPLOAD_PHOTOS - photos.length
            );
            setPhotos((prevPhotos) => [...prevPhotos, ...reducedPhotos]);
        }
    };

    return (
        <div className={styles.UploadedPhotos}>
            <UploadPhotoButton onPhotosUploaded={addPhotos} />
            {photos.map((photo, index) => (
                <PhotoCard key={index} src={photo} />
            ))}
        </div>
    );
}

/**
 * NOTE: 사진 업로드 버튼 컴포넌트
 */
function UploadPhotoButton({ onPhotosUploaded = () => {} }) {
    const inputRef = useRef(null);

    // NOTE: 선택된 사진이 변경될 경우 실행
    const onInputChanged = (e) => {
        if (e.target.files?.length > 0) {
            const files = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            onPhotosUploaded(files);
        }
    };

    return (
        <div
            className={styles.UploadPhotoButton}
            onClick={() => inputRef.current?.click()}
        >
            <input
                className={styles.input}
                ref={inputRef}
                multiple
                type="file"
                onChange={onInputChanged}
                accept="image/*"
            />
            <CameraIcon />
        </div>
    );
}

/**
 * NOTE: 업로드된 사진을 보여주는 카드 컴포넌트
 */
function PhotoCard({ src }) {
    return (
        <div className={styles.PhotoCard}>
            <img className={styles.image} src={src} alt="Uploaded" />
        </div>
    );
}

export default UploadedPhotos;
