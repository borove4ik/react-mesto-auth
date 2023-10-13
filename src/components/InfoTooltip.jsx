import React from "react";
import closeIcon from "../images/Close-Icon.svg";
import successRegistration from "../images/success.svg";
import failRegistration from "../images/fail.svg";

const InfoTooltip = ({ isOpen, onClose, isSucceeded }) => {
  return (
    <div className={`popup popup__tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={onClose}>
          <img
            src={closeIcon}
            alt="закрывающий форму крестик"
            className="popup__close-icon"
          />
        </button>
        <img
          src={isSucceeded ? successRegistration : failRegistration}
          alt=""
          className="popup__tooltip-image"
        />
        <h2 className="popup__tooltip-title">
          {isSucceeded
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
