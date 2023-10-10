import logo from "../images/mestologo.svg";
const Header = () => {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип компании Место Россия"
        className="header__logo"
      />
    </header>
  );
};

export default Header;
