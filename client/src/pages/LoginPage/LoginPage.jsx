import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/Auth";
import { Link } from "react-router-dom";
import { loginUser } from "../../agent";

export const LoginPage = () => {
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async (event) => {
    try {
      event.preventDefault();
      loginUser(form)
        .then(res => {
          auth.login(res.data.token, res.data.userId, res.data.isTeacher);
        }).catch(error => {
          setError(true);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="photo">
      <div className="main">
        <h1 className="h1">LOGIN</h1>

        <div>
          <input
            type="email"
            name="email"
            className="input email"
            placeholder="E-mail"
            value={form.email}
            required
            autoComplete="off"
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            className="input password"
            placeholder="Password"
            value={form.password}
            required
            autoComplete="off"
            onChange={changeHandler}
          />
        </div>
        <div className="login">
          <input
            type="submit"
            value="Login"
            className="submit"
            onClick={loginHandler}
          />
          <p>Not registered yet? <Link to="/register">Register here!</Link></p>
        </div>
      </div>
    </div>
  );
};
