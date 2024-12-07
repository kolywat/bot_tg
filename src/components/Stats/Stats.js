import React from "react";
import "./Stats.css";

const Stats = () => {
    return (
        <div className="stats">
            <div className="stat-card">
                <p>Прибыль за тап:</p>
                <p>+12</p>
            </div>
            <div className="stat-card">
                <p>Монет для апа:</p>
                <p>50M</p>
            </div>
            <div className="stat-card">
                <p>Прибыль в час:</p>
                <p>+368,94K</p>
            </div>
        </div>
    );
};

export default Stats;
