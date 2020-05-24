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

  const [labelClass, setLabelClass] = useState({
    email: 'label',
    password: 'label',
  });

  const [error, setError] = useState(false);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    if (event.target.value)
      setLabelClass({ ...labelClass, [event.target.name]: 'label active' })
    else
      setLabelClass({ ...labelClass, [event.target.name]: 'label' })
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
    <div className="form">
      <ul className="tab-group">
        <li className="tab active"><Link to='/'>Log In</Link></li>
        <li className="tab"><Link to='/register'>Sign Up</Link></li>
      </ul>

      <div className="tab-content">
        <h1>Welcome Back!</h1>

        {error && <div className="auth-error">
          <h2>Invalid data</h2>
        </div>}

        <form>
          <div className="field-wrap">
            <label className={labelClass.email}>
              Email Address<span className="req">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="input"
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
              className="input"
              value={form.password}
              required
              autoComplete="off"
              onChange={changeHandler}
            />
          </div>

          <input
            type="button"
            className="button button-block input"
            value="Log In"
            onClick={loginHandler}
          />
        </form>
      </div>
    </div>
  );
};
