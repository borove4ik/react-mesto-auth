import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import deleteButton from "../images/Trash.svg";

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const handleClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card, props.cards);
  };

  const cardLikeButtonClassName = `gallery__like ${
    isLiked && "gallery__like_active"
  }`;

  return (
    <div className="gallery__element">
      <img
        src={props.link}
        onClick={handleClick}
        alt={props.name}
        className="gallery__photo"
      />
      <div className="gallery__element-description-wrapper">
        <h2 className="gallery__element-description">{props.name}</h2>
        <div className="gallery__like-wrapper">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
          ></button>
          <div className="gallery__like-counter">{props.likes}</div>
        </div>
      </div>
      {isOwn && (
        <button onClick={handleDeleteClick} className="gallery__trash">
          <img src={deleteButton} alt="удалить карточку" />
        </button>
      )}
    </div>
  );
};

export default Card;
