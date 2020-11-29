import React from "react";
import {AuthContext} from "../system/context/AuthContext";

import UserMenu from "./MenuUser";

const MenuBar = () => {

    const [user] = React.useContext(AuthContext);

    return(
        <div>            
            <nav className="navbar is-fixed-top is-info" role="navigation" aria-label="dropdown navigation">

                <div className="navbar-item">
                    <b className="logo is-size-4 has-text-light">Ztráty a Nálezy</b>
                </div> 

                { user.isAuthenticated() && <UserMenu /> }

            </nav>
        </div>
    );

} 

export default MenuBar;