import React from "react";
import { SB_Data } from "../data/social_buttons";

import LoginSButton from "./LoginSButton";

export default function LoginSButtons () {
    return (
        <div className="box is-offset-1" style={{width:"20rem"}}>
            <div className="title is-6">...or login with:</div>
            {SB_Data.map(app => <LoginSButton app={app} key={app.name} />)}
        </div>

        );
    
};
