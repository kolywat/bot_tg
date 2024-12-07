import React, { useState } from "react";
import Header from "./components/Header/Header";
import Stats from "./components/Stats/Stats";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import "./App.css";

const App = () => {
    return (
        <div className="app">
            <Header />
            <Stats />
            <Main />
            <Footer />
        </div>
    );
};

export default App;
