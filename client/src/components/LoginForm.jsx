import React from 'react';

import { AuthContext, appendUser } from "../system/context/AuthContext";

const LoginForm = (props) => {

    const [user, setUser] = React.useContext(AuthContext);

    const initLoginData = {
      email: "", 
      password: "",
      isSubmitting: false,
      errorMessage: null
    };

    const [loginData, setLoginData] = React.useState(initLoginData);

    const hOnChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value, errorMessage: ""});
    };
    
    const hOnSubmit = e => {
      e.preventDefault();

      setLoginData({ ...loginData, isSubmitting: true, errorMessage: null });

      fetch("/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.email,
          password: loginData.password
        })
      })

      .then(res => {
        if (res.ok) {
          setLoginData({ ...loginData, isSubmitting: false });
          return res.json();
        }
        throw res;
      })

      .then(newUser => {
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
    };

  return (
    <div className="box" style={{width:"25rem"}}>
      <div className="block">
        <form onSubmit={hOnSubmit}>
          <div className="field">
            <label className="label">Email Address</label>
            <div className="control">
              <input className="input" type="email" name="email" 
                onChange={hOnChange} 
                value={loginData.email}
                required />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" 
                onChange={hOnChange} 
                value={loginData.password}
                required />
            </div>
          </div>
          
          <div className="notification has-text-danger has-text-weight-bold is-paddingless center">
            {loginData.errorMessage} 
          </div>

          <button type="submit" className="button is-info is-pulled-right"
            disabled={loginData.isSubmitting} >
            Login
          </button>

        </form>
      </div>

      <div className="block">
        <a href="/forgotten" className="button is-white">Forgotten Password?</a>

        <a href="/register" className="button is-white">New Sign-up?</a>
      </div>

    </div>
  );
};

export default LoginForm;