// 간단 레시피 컴포넌트
import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import './Recipe.css'

export const ThrumnailRecipe = ({data}) => {
    useEffect(()=>{
      console.log(data);
    },[])
  
    return(
        <div className='recipePhoto'>
            {data.map((item) => (
              <div key={item.id}>
                <Link to={`/recipe/${item.id}?becode=`}>
                  <img src={`https://n1.junyeong.dev/${item.thumbnailImagePath}`} className='rec-photo' />
                </Link>
                <div className='photoStyle'  >
                  <span> {item.title} </span> 
              </div>
              </div>
            ))}
        </div>
    )
}