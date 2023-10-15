import React from "react";
import ImagePopup from "./ImagePopup";
import Header from "./Header";
import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PopupProfile from "./PopupProfile";
import PopupAddCard from "./PopupAddCard";
import PopupAvatar from "./PopupAvatar";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.jsx";

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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSucceeded, setIsSucceeded] = React.useState(false);
  const [infotoolTipOpen, setInfoTooltipOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInfo()
        .then((res) => {
          setIsCurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка входа пользователя: ${err}`);
        });
      api
        .getCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(`Ошибка загрузки карточек пользователя: ${err}`);
        });
    }
  }, [loggedIn]);

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
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImageIsOpen(false);
    setInfoTooltipOpen(false);
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
      .catch((err) => {
        console.log(`Ошибка при изменении лайка пользователя: ${err}`);
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
      .catch((err) => {
        console.log(`Ошибка удаления карточки пользователя: ${err}`);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo({ name, about })
      .then((data) => {
        setIsCurrentUser(data);
        closeAllPopups();
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
      .then((data) => {
        setIsCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении автара: ${err}`);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSucceeded(true);
        setInfoTooltipOpen(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsSucceeded(false);
        setInfoTooltipOpen(true);
        console.log(`Ошибка при регистрации: ${err}`);
      });
  };

  const handleTokenCheck = (jwt) => {
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка проверки входа пользователя: ${err}`);
      });
  };

  const handleLogIn = (email, password) => {
    auth
      .login(email, password)
      .then((res) => {
        if (res.statusCode === 401) throw new Error("Ошибка авторизации");
        if (res) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
      });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      handleTokenCheck(jwt);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header
          loggedIn={loggedIn}
          setLoginState={setLoggedIn}
          resetUserEmail={setUserEmail}
          userEmail={userEmail}
        />
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  loggedOut={null}
                  selectedCard={selectedCard}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegistration={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogIn={handleLogIn} saveEmail={setUserEmail} />}
            />
            <Route
              path="*"
              element={
                !loggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/" />
              }
            />
          </Routes>
        </main>
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
        <InfoTooltip
          isOpen={infotoolTipOpen}
          onClose={closeAllPopups}
          isSucceeded={isSucceeded}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
