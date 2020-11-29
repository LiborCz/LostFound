import React from "react";

import LoginForm from "./LoginForm";
import LoginSButtons from "./LoginSButtons";

const LoginPage = ({history}) => {

    return (
    <div className="section">
        <div className="container is-fluid">
            <div className="columns">
                <div className="column is-narrow">
                    <LoginForm history={history}/>
                </div>
                <div className="column is-narrow">
                    <LoginSButtons />
                </div>
            </div>
        </div>
    </div>
    );
};

export default LoginPage;