import React from "react";
import "./Main.css";
import TapButton from "../TapButton/TapButton";

const Main = () => {
    return (
        <div className="main">
            <div className="progress-section">
                <p>Legendary</p>
                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>
                <p>Level 7/9</p>
            </div>
            <TapButton />
            <div className="energy">
                <p>Энергия: 6467/6500</p>
                <div className="progress-bar energy-bar">
                    <div className="progress-fill"></div>
                </div>
            </div>
        </div>
    );
};

export default Main;
