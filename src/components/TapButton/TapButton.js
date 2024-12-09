import React, { useState } from "react";
import "./Button.css"; // Файл с анимацией и стилями
import axios from "axios";

const TapButton = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleTap = async () => {
        setIsClicked(true);

        try {
            // Выполняем запрос на сервер
            const response = await axios.post("/api/tap/index.php", {
                data: { action: "tap" },
            });

            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error during the request:", error);
        }

        // Убираем анимацию через 300 мс (длительность анимации)
        setTimeout(() => setIsClicked(false), 300);
    };

    return (
        <div className="character">
            <button
                className={`tap-button ${isClicked ? "clicked" : ""}`}
                onClick={handleTap}
            >
                <img src="tap_coin.png" alt="Character" />
            </button>
        </div>
    );
};

export default TapButton;
