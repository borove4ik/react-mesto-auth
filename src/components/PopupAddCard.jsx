import React from "react";
import PopupWithForm from "./PopupWithForm";
const PopupAddCard = (props) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({ name, link });
  };
  return (
    <PopupWithForm
      title={"Новое место"}
      name={"popup-new-place"}
      submitText={"Создать"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        type="text"
        placeholder="Название"
        className="popup__input"
        id="input-place"
        name="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error" id="input-place-error">
        {" "}
      </span>
      <input
        value={link}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        id="input-link"
        name="link"
        onChange={(e) => {
          setLink(e.target.value);
        }}
        required
      />
      <span className="popup__error" id="input-link-error">
        {" "}
      </span>
    </PopupWithForm>
  );
};

export default PopupAddCard;
