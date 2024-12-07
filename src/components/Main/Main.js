import React from "react";
import "./Main.css";

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
            <div className="character">
                <img src="https://via.placeholder.com/150" alt="Character" />
            </div>
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
