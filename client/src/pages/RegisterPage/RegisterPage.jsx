import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { registerUser } from '../../agent';

export const RegisterPage = () => {
  const history = useHistory()

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    isTeacher: false
  });

  const [labelClass, setLabelClass] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const registerHandler = async (event) => {
    try {
      event.preventDefault();
      registerUser(form)
        .then(res => {
          history.push('/login')
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

    else {
      setForm({ ...form, [event.target.name]: event.target.value })
      if (event.target.value)
        setLabelClass({ ...labelClass, [event.target.name]: 'active' })
      else
        setLabelClass({ ...labelClass, [event.target.name]: '' })
    }
  }

  return (
    <div className="form">
      <ul className="tab-group">
        <li className="tab"><Link to='/login'>Log In</Link></li>
        <li className="tab active"><Link to='/register'>Sign Up</Link></li>
      </ul>

      <div className="tab-content">
        <h1>Sign Up for Free</h1>

        {error && <div className="auth-error">
          <h2>{error}</h2>
        </div>}

        <form>
          <div className="top-row">
            <div className="field-wrap">
              <label className={labelClass.name}>
                First Name<span className="req">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                required
                autoComplete="off"
                onChange={changeHandler}
              />
            </div>

            <div className="field-wrap">
              <label className={labelClass.surname}>
                Last Name<span className="req">*</span>
              </label>
              <input
                type="text"
                name="surname"
                value={form.surname}
                required
                autoComplete="off"
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="field-wrap">
            <label className={labelClass.email}>
              Email Address<span className="req">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              required
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>

          <div className="field-wrap">
            <label className={labelClass.password}>
              Set A Password<span className="req">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              required
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>

          <div className="as_admin">
            <input
              type="checkbox"
              name="isTeacher"
              className="checkboxField"
              value={form.isTeacher}
              onChange={changeHandler}
            />
            <label>Register as teacher</label>
          </div>

          <input
            type="submit"
            className="button button-block"
            value="Get Started"
            onClick={registerHandler}
          />
        </form>
      </div>
    </div>
  );
};
