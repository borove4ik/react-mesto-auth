import React from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegistration }) => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegistration(userEmail, userPassword);
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="sign__input"
          id="email"
          name="email"
          placeholder="Email"
          value={userEmail}
          onChange={({ target }) => setUserEmail(target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          className="sign__input"
          id="password"
          placeholder="Пароль"
          value={userPassword}
          onChange={({ target }) => setUserPassword(target.value)}
          autoComplete="off"
        />
        <button className="sign__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__redirect">
        Уже зарегистрированы?
        <a href="/sign" className="sign__redirect-link">
          Войти
        </a>
      </p>
    </div>
  );
};

export default Register;
