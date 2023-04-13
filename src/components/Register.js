import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 
import * as auth from '../utils/auth';

function Register(props) {
  const [formValue, setformValue] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const {name, value} = evt.target;
    setformValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    auth.register(email, password)
      .then((res) => {
        props.onSuccess(true);
        props.openTooltip();
        navigate("/sign-in")
      })
      .catch((err) => {
        props.onSuccess(false);
        props.openTooltip();
        console.log(err)
      });
  }

  return (
    <>
      <div className="login__container">
        <h2 className="login__title">Регистрация</h2>
        <form
          className="login__form"
          name="register-form"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="login__input"
            name="email"
            placeholder="Email"
            required
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="login__input"
            name="password"
            placeholder="Пароль"
            required
            value={formValue.password}
            onChange={handleChange}
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
    </>
  );
}

export default Register;
