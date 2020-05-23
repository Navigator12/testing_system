import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/auth.context";

export const NavBar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();

    history.push("/login");
  };

  return (
    <>
      <nav>
        <div className="sitename">
          <h2 className="smth_h2_ul">Tests & Contests</h2>
        </div>
        <div className="list_in_head">
          <ul className="smth_h2_ul">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/contest/builder">Contests</NavLink>
            </li>
            <li>|</li>
            <li className="profile_pic">
              <a href="">Profile</a>
            </li>
            <li className="logout_pic">
              <a href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
