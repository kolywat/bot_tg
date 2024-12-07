import React from "react";
import "./MainInfo.css";

const MainInfo = ({ coins }) => {
    return (
        <div className="main-info">
            <div className="coin-display">{coins.toLocaleString()}</div>
            <div className="level">
                <span>Legendary</span>
                <span>Level 7/9</span>
            </div>
            <div className="progress-bar">
                <div className="progress" style={{ width: "70%" }}></div>
            </div>
        </div>
    );
};

export default MainInfo;
