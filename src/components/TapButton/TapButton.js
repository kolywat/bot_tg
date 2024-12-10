import React, { useState , useEffect  } from "react";
import "./Button.css"; // Файл с анимацией и стилями
import axios from "axios";
import tapCoin from '../../images/tap_coin.png';

const TapButton = () => {
    const [coins, setCoins] = useState(0);

    const userId = 1953583187; // Ваш ID пользователя

    // Обработчик клика
    const handleTap = () => {
        axios
            .post(`https://3fff-2001-2020-4343-fe89-8042-8259-15dc-ff1f.ngrok-free.app/bot_tg_back/api/tap/index.php`, {
                user_id: userId,
            })
            .then((response) => {
                if (response.data.success) {
                    setCoins((prev) => prev + response.data.increment); // Увеличение баланса
                } else {
                    console.error('Ошибка на сервере:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Ошибка во время запроса:', error);
            });
    };

    return (
        <div className="tap-button">
            <img
                src={tapCoin}
                alt="Tap"
                onClick={handleTap}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default TapButton;
