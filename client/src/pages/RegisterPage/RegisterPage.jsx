import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { registerUser } from '../../agent';

export const RegisterPage = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    isTeacher: false
  });

  const [error, setError] = useState(null);

  const registerHandler = async (event) => {
    try {
      event.preventDefault();
      registerUser(form)
        .then(res => {
          history.push('/')
        }).catch(error => {
          setError(error.response.data.message);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const changeHandler = event => {
    if (event.target.name === 'isTeacher')
      setForm({...form, isTeacher: !form.isTeacher})
    else
      setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="photo">
      <div className="main">
        <h1 className="h1">REGISTRATION</h1>

        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            className="input text"
            required
            autoComplete="off"
            placeholder="Name"
            onChange={changeHandler}
          />
          <input
            type="text"
            name="surname"
            value={form.surname}
            className="input text"
            required
            autoComplete="off"
            placeholder="Second name"
            onChange={changeHandler}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            className="input email"
            required
            autoComplete="off"
            placeholder="E-mail"
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            className="input password"
            required
            autoComplete="off"
            placeholder="Password"
            onChange={changeHandler}
          />
        </div>

        <div className="registration">
          <div className="as_admin">
            <input
              type="checkbox"
              name="isTeacher"
              className="checkboxField"
              value={form.isTeacher}
              onChange={changeHandler}
            />
            <label htmlFor="">Register as admin</label>
          </div>

            <input
              type="submit"
              value="Register"
              className="submit"
              onClick={registerHandler}
            />
          <p>Already registered? <Link to="/">Log in here!</Link></p>
        </div>
      </div>
    </div>
  );
};
