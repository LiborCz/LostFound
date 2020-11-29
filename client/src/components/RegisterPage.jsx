import React from "react";
import { AuthContext } from "../system/context/AuthContext";

const RegisterPage = () => {
  const [user, setUser] = React.useContext(AuthContext);

  const initialState = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    password2: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [formData, setFormData] = React.useState(initialState);

  const hOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMessage: ""
    });
  };

  const hOnSubmit = e => {
    e.preventDefault();

    if(formData.password!==formData.password2) {
      setFormData({ ...formData, errorMessage: "Passwords do not match!" });
      return;
    }

    setFormData({ ...formData, isSubmitting: true, errorMessage: null });

    fetch("/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fName: formData.fName,
        lName: formData.lName,
        username: formData.email,
        password: formData.password
      })
    })
      .then(res => {
        if (res.ok) { setFormData({ ...formData, isSubmitting: false });
          return res.json();
        }
        throw res;
      })

      .then(resJson => {
        if(resJson.customError) setFormData({ ...formData, errorMessage: resJson.customError });
        else setUser(resJson);
      })

      .catch(err => {
        setFormData({ ...formData, isSubmitting: false, errorMessage: err.statusText });
      });
  };

  return (
    <div className="section">
      <div className="container is-fluid">
        <div className="box" style={{ width: "30rem", height:"28rem" }}>
          <form onSubmit={hOnSubmit}>
            {/* First and Last Names */}
            <div className="field-group">
              <div className="field is-inline-block-desktop">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="fName"
                    onChange={hOnChange}
                    value={formData.fName}
                    required
                  />
                </div>
              </div>

              <div className="field is-inline-block-desktop">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="lName"
                    onChange={hOnChange}
                    value={formData.lName}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="field">
              <label className="label">Email Address</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={hOnChange}
                  value={formData.email}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            {/* Password */}
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={hOnChange}
                  value={formData.password}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>
            {/* PasswordConfirmation */}
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control has-icons-left">
                <input
                  id="passwordConf"
                  className="input"
                  type="password"
                  name="password2"
                  onChange={hOnChange}
                  value={formData.password2}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="notification has-text-danger has-text-weight-bold is-paddingless center">
              {formData.errorMessage}
            </div>

            <button
              type="submit"
              className="button is-info is-pulled-right"
              disabled={formData.isSubmitting}
            >
              Register
            </button>
          </form>

          <div className="block">
            <a href="/login" className="button is-white">{"<"} Back to Login Page</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
