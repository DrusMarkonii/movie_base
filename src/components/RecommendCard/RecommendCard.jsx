import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IMAGE_API_PATH } from "../../service/endpoints";
import feature_true from "../../assets/img/feature_true.png";

import "./RecommendCard.scss";

export default function RecommendCard({
  poster_path,
  original_title,
  id,
  vote_average,
}) {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className="RecommendCard">
      <Link
        key={id}
        to={`/film/${id}`}
        className="RecommendCard_link"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="RecommendCard_img"
          src={`${IMAGE_API_PATH}${poster_path}`}
          alt={original_title}
          onClick={() => setIsAdded(!isAdded)}
        />
        <div className="RecommendCard_description_box">
          <span className="RecommendCard_description_title">
            {original_title}
          </span>
          <img
            src={feature_true}
            alt="rate"
            className="recommendCard_rate"
          />
          <span className="RecommendCard_description_rate">{vote_average}</span>
        </div>
      </Link>
    </div>
  );
};
