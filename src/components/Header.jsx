import { useNavigate, useLocation } from "react-router-dom";
import logo from "../images/mestologo.svg";
const buttonText = {
  "/sign-in": "Регистрация",
  "/sign-up": "Вход",
  "/": "Выйти",
};
const newPath = {
  "/sign-in": "/sign-up",
  "/sign-up": "/sign-in",
  "/": "/sign-up",
};
const Header = ({ loggedIn, setLoginState, resetUserEmail, userEmail }) => {
  const location = useLocation().pathname;

  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoginState(false);
    resetUserEmail("");
    navigate(newPath[location]);
  };

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип компании Место Россия"
        className="header__logo"
      />
      <div className="header__controls">
        {loggedIn && <p className="header__email">{userEmail}</p>}
        <button className="header__button" onClick={handleLogOut}>
          {buttonText[location]}
        </button>
      </div>
    </header>
  );
};

export default Header;
