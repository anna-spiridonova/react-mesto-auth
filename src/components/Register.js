import { useState } from "react";
import { Link } from 'react-router-dom'; 
import InfoTooltip from "./InfoTooltip";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  // function handleSubmit(evt) {
  //   evt.preventDefault();
  //   props.onUpdateData({
  //     email,
  //     password,
  //   });
  // }

  return (
    <div className="login__container">
      <h2 className="login__title">Регистрация</h2>
      <form
        className="login__form"
        name="register-form"
        // onSubmit={props.onSubmit}
      >
        <input
          type="email"
          className="login__input"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          className="login__input"
          name="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="button login_submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">Уже зарегистрированы?
        <span>
          <Link to="/sign-in" className="link login__text"> Войти</Link>
        </span>
      </p>
    </div>
  );
}

export default Register;
