import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [postAddress, setPostAddress] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postTitle, setPostTitle] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postURL, setPostURL] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postContent, setPostContent] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postPrice, setPostPrice] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postPeople, setPostPeople] = useState(''); // 기본값으로 빈 문자열을 설정합니다.
    const [postYear, setPostYear] = useState('');
    const [postMonth, setPostMonth] = useState('');
    const [postDay, setPostDay] = useState('');
    const [myBcode, setMyBcode] = useState('');
    const [selectLocation, setSelectLocation] = useState(false);
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [images, setImages] = useState([]);

    return (
        <MyContext.Provider value={{
            postAddress, setPostAddress,
            postTitle, setPostTitle,
            postURL, setPostURL,
            postPrice, setPostPrice,
            postPeople, setPostPeople,
            postContent, setPostContent,
            postYear, setPostYear,
            postMonth, setPostMonth,
            postDay, setPostDay,
            myBcode, setMyBcode,
            selectLocation, setSelectLocation,
            longitude, setLongitude,
            latitude, setLatitude,
            images, setImages,
            
        }}>
            {children}
        </MyContext.Provider>
    );
};