import React from "react";

function Footer() {
    return (
    
    <footer className="footer is-fixed-bottom is-paddingless">
        <div className="container">
            <button className="button is-info is-outlined is-small" disabled>
                Copyright © Me - {new Date().getFullYear()}
            </button>

            {/* <p>
                <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
            </p> */}
        </div>
    </footer>    
    );
}

export default Footer;