import closeIcon from "../images/Close-Icon.svg";
const PopupWithForm = (props) => {

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form  className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__form-title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type='submit'>{props.submitText}</button>
        </form>
        <button
          className="popup__close-button"
          onClick={props.onClose}
        >
          <img
            src={closeIcon}
            alt="закрывающий форму крестик"
            className="popup__close-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default PopupWithForm;
