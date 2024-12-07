import React from "react";
import "./TapButton.css";

const TapButton = ({ handleTap }) => {
    return (
        <button className="tap-button" onClick={handleTap}>
            Тап!
        </button>
    );
};

export default TapButton;
