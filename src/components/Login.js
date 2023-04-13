import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import * as auth from '../utils/auth';

function Login(props) {
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
    auth.authorize(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem('jwt', res.token);
      };
      props.onLogin(email);
      navigate("/main")
    })
    .catch((err) => {
      console.log(err)
    });
  }
  
  return (
    <div className="login__container">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form"
        name="login-form"
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
