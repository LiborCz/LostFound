import React from "react";
import {AuthContext} from "../system/context/AuthContext";

function MenuUser() {

  const [user, setUser] = React.useContext(AuthContext);

  function hOnClick() {
      setUser((curUser) => {return {
        ...curUser,
        token: null, 
        exp: null
      }});
      
      localStorage.clear();        
  }

    return (
      <div className="navbar-end">
        <div id="menuUser" className="navbar-item has-dropdown is-hoverable">
          <span className="navbar-link">
              {user.fName + " " + user.lName}
          </span>

          <div className="navbar-dropdown is-boxed is-right">

              <a className="navbar-item" onClick={ hOnClick }>
                  Logout
              </a>

              <hr className="navbar-divider" />

              <a href="/profile" className="navbar-item">Profile</a>

          </div>
      </div>
    </div>
  );
}

export default MenuUser;