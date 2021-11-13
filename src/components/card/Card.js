import React from "react";
import "./card.scss";

const Card = ({ onClick, content }) => {
  const { author, link, imgSrc, isFlipped } = content;

  const renderCardBackSide = () => {
    return (
      <div className="card__face card__face--back">
        <div className="card__header">
          <img alt="" src={imgSrc} className="avatar" />
          <h2>By: {author}</h2>
        </div>
        <div className="card__body">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Click this text to visit image source
          </a>
        </div>
      </div>
    );
  };

  return (
    <div
      className={!!isFlipped ? "card__inner is-flipped" : "card__inner"}
      onClick={onClick}
    >
      <div className="card__face card__face--front">
        <img className="card-image" alt="" src={imgSrc} />
      </div>
      {renderCardBackSide()}
    </div>
  );
};

export default Card;
