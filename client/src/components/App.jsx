import React from "react";

import MainPage from "./MainPage";
import MenuBar from "./MenuBar";
import Footer from "./Footer";

import {AuthProvider} from "../system/context/AuthContext";

function App() {

    return <div>
        <AuthProvider>
            <MenuBar />
            <MainPage />
        </AuthProvider>
        <Footer />
    </div>
}

export default App;
