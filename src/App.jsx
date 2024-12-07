import React, { useState } from "react";
import StatsBar from "./components/StatsBar";
import MainInfo from "./components/MainInfo";
import HamsterDisplay from "./components/MainDisplay";
import EnergyBar from "./components/EnergyBar";
import Menu from "./components/Menu";
import TapButton from "./components/TapButton";
import "./App.css";

const App = () => {
    const [coins, setCoins] = useState(15187121);
    const [energy, setEnergy] = useState(6500);
    const maxEnergy = 6500;

    const handleTap = () => {
        if (energy > 0) {
            setCoins(coins + 12);
            setEnergy(energy - 1);
        }
    };

    return (
        <div className="game-container">
            <StatsBar />
            <MainInfo coins={coins} />
            <HamsterDisplay />
            <EnergyBar energy={energy} maxEnergy={maxEnergy} />
            <Menu />
            <TapButton handleTap={handleTap} />
        </div>
    );
};

export default App;
