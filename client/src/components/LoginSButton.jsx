import React from "react";
import { AuthContext, appendUser } from "../system/context/AuthContext";


const MenuButton = ({ app }) => {
  const { href, color, txt, name } = app;
  const [user, setUser, serverBE] = React.useContext(AuthContext);

  const initLoginData = {
    isSubmitting: false,
    errorMessage: null
  };

  const [loginData, setLoginData] = React.useState(initLoginData);

  function onClickSButton(e) {
    e.preventDefault();

    fetch(`${serverBE}/${href}`, {method: "get"})

    .then(res => {
      if (res.ok) {
        setLoginData({ ...loginData, isSubmitting: false });
        return res.json();
      }
      throw res;
    })

    .then(newUser => {

      console.log(newUser.username);

      localStorage.setItem('user', JSON.stringify(newUser));

      newUser = appendUser(newUser);

      setUser(newUser);
      
    })

    .catch(err => {
      setLoginData({
        ...loginData,
        isSubmitting: false, 
        errorMessage: err.statusText === "Unauthorized" ? "Incorrect Username or Password": err.statusText
      });
    });

  }

  return (
    <a href="#" className="button has-text-light"
      style={{ backgroundColor: color, margin: 5, display: "block" }}
      title={ txt }
      onClick={onClickSButton}
      >
      <i className={"fa fa-" + name}></i> - {name.toUpperCase()}
    </a>
  );
};

export default MenuButton;