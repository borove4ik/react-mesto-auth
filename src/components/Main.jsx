import React from "react";
import avatarEditIcon from "../images/avatar-edit.svg";
import profileEditIcon from "../images/edit-button-pen.png";
import addCardIcon from "../images/add-button-plus.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = (props) => {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img
            src={userContext.avatar}
            alt="фотография пользователя"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay">
            <button
              onClick={props.onEditAvatar}
              className="profile__avatar-edit"
              aria-label="редактировать"
              type="button"
            >
              <img src={avatarEditIcon} alt="редактировать" />
            </button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{userContext.name}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              aria-label="редактировать"
              type="button"
            >
              <img
                src={profileEditIcon}
                alt="карандаш для редактирования профиля"
                className="profile__edit-icon"
              />
            </button>
          </div>
          <p className="profile__description">{userContext.about}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          aria-label="Добавить"
          type="button"
        >
          <img
            src={addCardIcon}
            alt="плюс для добавления"
            className="profile__add-icon"
          />
        </button>
      </section>
      <section className="gallery">
        {props.cards?.map((card) => {
          return (
            <Card
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              key={card._id}
              onCardClick={props.handleCardClick}
              card={card}
              cards={props.cards}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          );
        })}
      </section>
    </>
  );
};

export default Main;
