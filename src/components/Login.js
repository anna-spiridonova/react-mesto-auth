import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="login__container">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form"
        name="login-form"
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
