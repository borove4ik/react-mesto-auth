import React from "react";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupProfile from "./PopupProfile";
import PopupAddCard from "./PopupAddCard";
import PopupAvatar from "./PopupAvatar";

function App() {
  const [currentUser, setIsCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [cards, setCards] = React.useState(null);
  const [imageIsOpen, setImageIsOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  React.useEffect(() => {
    api
      .getInfo()
      .then((res) => {
        setIsCurrentUser(res);
      })
      .catch((res) => {
        console.log(res.status);
      });
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((res) => {
        console.log(res.status);
      });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImageIsOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    console.log(isAddPlacePopupOpen);
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImageIsOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((res) => {
        console.log(res.status);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((deletedCard) => deletedCard._id !== card._id)
        );
      })
      .catch((res) => {
        console.log(res.status);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .setInfo({ inputName: name, inputInfo: about })
      .then(() => {
        api
          .getInfo()
          .then((res) => {
            setIsCurrentUser(res);
            closeAllPopups();
          })
          .catch((res) => {
            console.log(res.status);
          });
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных пользователя: ${err}`);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .setCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении новой карточки: ${err}`);
      });
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar({ link })
      .then(() => {
        api
          .getInfo()
          .then((res) => {
            setIsCurrentUser(res);
            closeAllPopups();
          })
          .catch((res) => {
            console.log(res.status);
          });
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении автара: ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main
          selectedCard={selectedCard}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          handleCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
        <Footer />
        <PopupProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={imageIsOpen}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
