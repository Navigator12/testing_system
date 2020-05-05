import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [labelClass, setLabelClass] = useState({
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
        <li className="tab active"><Link to='/login'>Log In</Link></li>
        <li className="tab"><Link to='/register'>Sign Up</Link></li>
      </ul>

      <div className="tab-content">
        <h1>Welcome Back!</h1>
        <form>
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
              Password<span className="req">*</span>
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

          <input type="button" className="button button-block" value="Log In"/>
        </form>
      </div>
    </div>
  );
};
