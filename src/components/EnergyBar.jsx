import React from "react";
import "./EnergyBar.css";

const EnergyBar = ({ energy, maxEnergy }) => {
    return (
        <div className="energy-bar">
            Энергия: {energy}/{maxEnergy}
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: `${(energy / maxEnergy) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default EnergyBar;
