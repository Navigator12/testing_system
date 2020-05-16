import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/Auth";
import { Link } from "react-router-dom";
import { loginUser } from "../../agent";

export const LoginPage = () => {
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
    isTeacher: false
  });

  const [labelClass, setLabelClass] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(false);

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
        <li className="tab active"><Link to='/login'>Log In</Link></li>
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

          <div className="as_admin">
            <input
              type="checkbox"
              name="isTeacher"
              className="checkboxField"
              value={form.isTeacher}
              onChange={changeHandler}
            />
            <label>Log in as teacher</label>
          </div>

          <input
            type="button"
            className="button button-block"
            value="Log In"
            onClick={loginHandler}
          />
        </form>
      </div>
    </div>
  );
};
