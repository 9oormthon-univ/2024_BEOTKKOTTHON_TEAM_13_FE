// 레시피 상세페이지
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetail.css";
import user from "../../assets/icons/user.png";
import previous from "../../assets/icons/previous.svg";
import dot from "../../assets/icons/dot.png";
import pick from "../../assets/pick.svg";
import FiledPick from "../../assets/filedpick.png";
import arrow from "../../assets/icons/direct-arrow.png";

function RecipeDetail() {
  const baseUrl = "https://n1.junyeong.dev/api2";
  const imgUrl = "https://n1.junyeong.dev/";
  const navigate = useNavigate();
  const { recipeId } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [formDate, setFormDate] = useState("");
  const [picked, setPicked] = useState(false);
  const [like, setLike] = useState(0);

  const [signinData, setSigninData] = useState(null);

  useEffect(() => {
    const storedSigninData = sessionStorage.getItem("signinData");
    if (storedSigninData) {
      setSigninData(JSON.parse(storedSigninData));
    }
  }, []);

  // 레시피 좋아요
  const togglePicked = () => {
    const PickapiUrl = `${baseUrl}/user/likes`;
    const userData = {
      session_id: `${signinData}`,
      type: "recipe",
      id: `${recipeId}`,
    };

    axios
      .post(PickapiUrl, userData)
      .then((response) => {
        setLike((prevCount) => (picked ? prevCount - 1 : prevCount + 1));
        setPicked(!picked);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  };

  useEffect(() => {
    const storedBcode = sessionStorage.getItem("myBcode");
    const apiUrl = `${baseUrl}/recipe/${recipeId}?bcode=${storedBcode}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const updatedData = {
          ...response.data,
          thumbnail_image: `${baseUrl}${response.data.thumbnail_image}`,
        };
        setRecipe(updatedData);

        // 날짜 계산
        const date = new Date(recipe.created_at);
        const yy = date.getFullYear().toString().slice(-2);
        const mm = (date.getMonth() + 1).toString().padStart(2, "0");
        const dd = date.getDate().toString().padStart(2, "0");

        const formdate = `${yy}.${mm}.${dd}`;
        setFormDate(formdate);
        setLike(response.data.likes_count);
      })
      .catch((error) => {
        console.error("API 요청 에러:", error);
      });
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-detail-container">
      <div className="recipe-header">
        <img src={previous} alt="previous" onClick={() => navigate(-1)} />
        <img src={dot} alt="dot" />
      </div>
      <div className="body">
        <img
          src={`${imgUrl}${recipe.thumbnailImagePath}`}
          className="recipe-img"
        />
        <div className="user">
          <img src={`${imgUrl}${recipe.userProfileUrl}`} />
          <div>{recipe.userNickname}</div>
        </div>
        <div className="recipe-title">{recipe.title}</div>
        <div className="divide-line"></div>
        <>
          <div className="recipe-subtitle">소개</div>
          <div className="recipe-contents">{recipe.contents}</div>
        </>
        <div className="divide-line"></div>
        <>
          <div className="recipe-subtitle">재료</div>
          <div className="grd-tags">
            {recipe.ingredients.map((ingredient) => (
              <div className="grd-tag">
                <div key={ingredient.id} className="grd-name">
                  {ingredient.name}
                </div>
                <img src={arrow} />
                <div className="grd-amount">{ingredient.amount}개</div>
              </div>
            ))}
          </div>
        </>
        <div className="divide-line"></div>
        <div className="recipe-subtitle">레시피 과정</div>
        <div className="recipe-container">
          {recipe.processes.map((process, index) => (
            <>
              <img src={`${imgUrl}${process.imagePath}`} className="step-img" />
              <div className="cook-step">
                <div className="step1"> {index + 1} </div>
                <div className="step1-detail"> {process.contents}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
