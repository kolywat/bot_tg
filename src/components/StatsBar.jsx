import React from "react";
import "./StatsBar.css";

const StatsBar = () => {
    return (
        <div className="stats-bar">
            <div>💰 Прибыль за тап: <b>+12</b></div>
            <div>📈 Монет для апа: <b>50M</b></div>
            <div>⏱ Прибыль в час: <b>+368,94K</b></div>
        </div>
    );
};

export default StatsBar;
