import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
const PopupProfile = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  const profileName = React.useRef();
  const profileDescription = React.useRef();

  React.useEffect(() => {
    profileName.current.value = currentUser.name;
    profileDescription.current.value = currentUser.about;
  }, [props.isOpen, currentUser.name, currentUser.about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name: profileName.current.value,
      about: profileDescription.current.value,
    });
  };

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"profile-popup"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        className="popup__input"
        id="input-name"
        name="inputName"
        minLength="2"
        maxLength="40"
        ref={profileName}
        required
      />
      <span className="popup__error" id="input-name-error">
        {" "}
      </span>
      <input
        type="text"
        placeholder="О себе"
        className="popup__input"
        id="input-bio"
        name="inputInfo"
        minLength="2"
        maxLength="200"
        ref={profileDescription}
        required
      />
      <span className="popup__error" id="input-bio-error"></span>
    </PopupWithForm>
  );
};

export default PopupProfile;
