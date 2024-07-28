//공동구매 게시글 작성 페이지
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Next } from '../../assets/Next.svg'
import InputForm from '../../components/InputForm/InputForm';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { MyContext } from '../../components/MyContextProvider/MyContextProvider';
import IngredientPost from '../../components/ProductPostForm/IngredientPost';
import RecipeIngredientsPost from '../../components/ProductPostForm/RecipeIngredientsPost';
import './ProductPost.css'
import Camera from '../../assets/camera.png'
import PostSucessModal from '../../components/PostSucessModal/PostSucessModal';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css'; // Datepicker의 CSS 파일 import
import ko from 'date-fns/locale/ko'; // 한국어 locale 파일 import
import ImageUploader from '../../components/ImageUploder/ImageUploder';


export default function ProductPost() {
    const [selectedOption, setSelectedOption] = useState('ingredients');
    const navigate = useNavigate();
    const { selectLocation, setSelectLocation } = useContext(MyContext);
    const [showModal, setShowModal] = useState(false);
    const userIDWithQuotes = sessionStorage.getItem('signinData');
    const userID = userIDWithQuotes ? userIDWithQuotes.replace(/"/g, '') : 'ea2185e2-a1b9-487d-9e76-25df7dbc2e2f';
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { postAddress, setPostAddress,
        postTitle, setPostTitle,
        postURL, setPostURL,
        postPrice, setPostPrice,
        postPeople, setPostPeople,
        postContent, setPostContent,
        postYear, setPostYear,
        postMonth, setPostMonth,
        postDay, setPostDay,
        longitude, setLongitude,
        latitude, setLatitude,
        images
    } = useContext(MyContext);
    // const [userLocation, setUserLocation] = useState(null); // 사용자 위치 정보 상태 추가
    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
        const day = currentDate.getDate();
        return { year, month, day };
    };

    const handleDateChange = date => {
        setPostYear(date.getFullYear());
        setPostMonth(date.getMonth() + 1);
        setPostDay(date.getDate());
        setShowDatePicker(false);
        
       
    };

    useEffect(() => {
        const currentDate = getCurrentDate();
        setPostYear(currentDate.year.toString());
        setPostMonth(currentDate.month.toString());
        setPostDay(currentDate.day.toString());
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

    const handleButtonClick = (option) => {
        if (selectedOption !== option) {
            setSelectedOption(option); // 선택된 옵션이 현재 선택된 옵션과 다를 때만 상태 변경
        }
    };

 
    const handleBackClick = () => {
        console.log("클릭툄");
        navigate('/');
    };



    const handleLocationButtonClick = () => {

        if (selectLocation) {
            setSelectLocation(false);
        }
        else {
            setSelectLocation(true);
        }
        
        console.log('거래 희망 장소 버튼을 클릭했습니다.');

        // 이동할 경로로 리다이렉션 수행
        navigate('/select-location');
    };


    const handlePostButtonClick = () => {
        console.log(userID);
        console.log("ingd");
        console.log(postTitle);
        console.log(postContent);
        console.log(postURL);
        console.log(postPrice);
        console.log(postPeople);
        console.log(postAddress);
        console.log(longitude);
        console.log(latitude);
        console.log(postYear);
        console.log(postMonth);
        console.log(postDay);

        if (selectedOption === 'ingredients') {
            const storedBcode = sessionStorage.getItem('myBcode');

            // ingredients에 관한 POST 요청 보내기
            const postData = {
                session_id: userID,
                image: images,
                type: "ingd",
                title: postTitle,
                contents: postContent,
                url: postURL,
                price: postPrice,
                group_size: postPeople,
                location_address: postAddress,
                location_bcode: storedBcode,
                location_longitude: longitude.toString(),
                location_latitude: latitude.toString(),
                closed_at: `${postYear}-${postMonth}-${postDay}`,
                ingredients: []
            };

            axios.post('https://n1.junyeong.dev/api/post', postData)
                .then(response => {
                    console.log('POST 요청 성공:', response.data);
                    setShowModal(true); // 성공 시 모달 표시
                })
                .catch(error => {
                    console.log(postData);
                    console.error('POST 요청 실패:', error);
                });
        } else {
            // 레시피에 관한 POST 요청 보내기
            // 다른 옵션에 관한 요청이 필요한 경우에는 여기에 추가
        }
    };


    return (
        <div className='product-post-container'>
            <div className="product-post-header">
                <button className='post-back-button' onClick={handleBackClick}>
                    <Back />
                </button>
                <div className='product-post-text'>
                    <p className='centered-text'>공동구매 게시글 작성</p>
                </div>
            </div>
            <ImageUploader/>

            <p className='product-post-select-text'>유형 </p>
            <div className='product-post-select'>
                <div className='option-buttons'>
                    <div className='option-buttons'>
                        <button className={selectedOption === 'ingredients' ? 'active' : ''} onClick={() => handleButtonClick('ingredients')}>재료</button>
                        <button className={selectedOption === 'recipe' ? 'active' : ''} onClick={() => handleButtonClick('recipe')}>레시피 재료</button>
                    </div>

                </div>
            </div>
            <InputForm title='제목' placeholder='글 제목을 입력해주세요.' />



            {selectedOption === 'ingredients' ? <IngredientPost /> : <RecipeIngredientsPost />}

            <div className='product-post-place'>
                <p className='product-post-place-text'>거래 희망 장소 </p>
                <button className='next-button' onClick={handleLocationButtonClick}>
                    <Next />
                </button>
            </div>
            <div className='product-post-select-place-container'>
                <input className='product-post-select-place' placeholder='거래 희망 장소를 선택하세요.' defaultValue={postAddress}></input>
            </div>
            <div className='product-sale-due-date'>
                <div className='due-date-title'>
                    <div className='product-sale-due-date-text' >거래 마감일</div>
                    <button className='next-button' onClick={() => setShowDatePicker(!showDatePicker)}>
                        <Next />
                    </button>
                </div>
                <div className='year-month-day'>
                    <DatePicker
                        selected={new Date(postYear, postMonth - 1, postDay)}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="날짜를 선택하세요"
                        className='due-date-placeholder custom-datepicker' /* custom-datepicker 클래스 추가 */
                        popperPlacement="bottom"
                        popperModifiers={{
                            preventOverflow: {
                                enabled: true,
                                escapeWithReference: false,
                                boundariesElement: 'viewport'
                            }
                        }}
                        open={showDatePicker}
                        locale={ko} // 한국어 locale 설정
                    />
                    {/* <input className='due-date-placeholder' placeholder=' 년도'
                        onChange={handleYearInputChange}
                        value={postYear}></input>
                    <input className='due-date-placeholder' placeholder=' 월' onChange={handleMonthInputChange} value={postMonth}></input>
                    <input className='due-date-placeholder' placeholder=' 일' onChange={handleDayInputChange} value={postDay}></input> */}
                </div>
            </div>


            <div>
                <div className='product-post-button-container'>
                    <button className='product-post-button' onClick={handlePostButtonClick}>올리기</button>
                </div>
            </div>

            {
                showModal && (
                    <PostSucessModal />
                )
            }
        </div>

    );
}
