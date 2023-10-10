import React from "react";
import PopupWithForm from "./PopupWithForm";
const PopupAvatar = (props) => {
  const avatarLink = React.useRef();

  React.useEffect(() => {
    avatarLink.current.value = "";
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(avatarLink.current.value);
  };

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"popup-avatar"}
      submitText={"Сохранить"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      changeFormState={props.changeAvatarFormState}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatar-input-link"
        type="url"
        placeholder="Ссылка на аватар"
        name="link"
        ref={avatarLink}
        required
      />
      <span className="popup__error" id="avatar-input-link-error">
        {" "}
      </span>
    </PopupWithForm>
  );
};

export default PopupAvatar;
