import React from "react";

const Login = ({ onLogIn, saveEmail }) => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogIn(userEmail, userPassword);
    saveEmail(userEmail);
    console.log("userEmail", userEmail);
  };

  return (
    <div className="sign">
      <h2 className="sign__title">Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="sign__input"
          id="email"
          name="email"
          placeholder="Email"
          value={userEmail}
          onChange={({ target: { value } }) => setUserEmail(value)}
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          className="sign__input"
          id="password"
          placeholder="Пароль"
          value={userPassword}
          onChange={({ target: { value } }) => setUserPassword(value)}
          autoComplete="off"
          required
        />
        <button className="sign__button"> Войти</button>
      </form>
    </div>
  );
};

export default Login;
