import React from "react";
import CloseIcon from "../images/Close-Icon.svg";
const ImagePopup = (props) => {
  const [link, setLink] = React.useState("");
  const [about, setAbout] = React.useState("");

  const [popupOpenedClass, setPopupOpenedClass] = React.useState("");
  React.useEffect(() => {
    if (props.isOpen) {
      setPopupOpenedClass("popup_opened");
    } else {
      setPopupOpenedClass("");
    }
  }, [props.isOpen]);

  React.useEffect(() => {
    if (props.selectedCard) {
      setLink(props.selectedCard.link);
      setAbout(props.selectedCard.name);
    }
  }, [props.isOpen, props.selectedCard]);

  return (
    <div
      className={`popup ${popupOpenedClass} popup_background_dark`}
      id="popup-open-card"
    >
      <div className="popup__gallery-container">
        <img src={link} alt={about} className="popup__gallery-photo" />
        <h2 className="popup__gallery-description">{about}</h2>
        <button
          className="popup__close-button"
          id="popup-close-photo-button"
          type="button"
          onClick={
            props.onClose
          }
        >
          <img
            src={CloseIcon}
            alt="закрывающий форму крестик"
            className="popup__close-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default ImagePopup;
