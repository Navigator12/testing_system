import React, { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [labelClass, setLabelClass] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    if (event.target.value)
      setLabelClass({ ...labelClass, [event.target.name]: 'active' })
    else
      setLabelClass({ ...labelClass, [event.target.name]: '' })
  }

  return (
    <div className="form">
      <ul className="tab-group">
        <li className="tab"><Link to='/login'>Log In</Link></li>
        <li className="tab active"><Link to='/register'>Sign Up</Link></li>
      </ul>

      <div className="tab-content">
        <h1>Sign Up for Free</h1>
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

          <input type="submit" className="button button-block" value="Get Started"/>
        </form>
      </div>
    </div>
  );
};
