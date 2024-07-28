import Camera from '../../assets/camera.png'
import React, { useState, useContext } from 'react';
import { MyContext } from '../MyContextProvider/MyContextProvider';
import './ImageUploader.css';

export default function ImageUploader() {
    const {images, setImages} = useContext(MyContext);

    const handleImageClick = () => {
        // 이미지 클릭 시 해당 이미지를 제거하는 함수
        setImages([]);
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // 선택한 파일들 가져오기

        if (files.length + images.length > 5) {
            alert('최대 5장까지 업로드할 수 있습니다.');
            return;
        }

        const fileReaders = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders)
            .then(newImages => {
                setImages(prevImages => [...prevImages, ...newImages]);
            })
            .catch(error => {
                console.error('Error reading files:', error);
            });
    };

    return (
        <div className='image-upload-container'>
            <div className='product-post-image'>
                <label htmlFor="image-upload" className="image-upload-label">
                    <img src={Camera} alt="Upload Image" />
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
            <div className="image-preview-container">
                {images.map((imageURL, index) => (
                    <div key={index} className="image-wrapper">
                        <img
                            src={imageURL}
                            alt={`Uploaded ${index + 1}`}
                            className='image'
                        />
                        <button
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                            className='image-delete'
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

