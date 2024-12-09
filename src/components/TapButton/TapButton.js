import React, { useState , useEffect  } from "react";
import "./Button.css"; // Файл с анимацией и стилями
import axios from "axios";
import tapCoin from '../../images/tap_coin.png';

const TapButton = () => {
    const [coins, setCoins] = useState(0);

    const userId = 1953583187; // Ваш ID пользователя

    // Получение текущего баланса
    useEffect(() => {
        axios
            .get(`https://14e8-2001-2020-4343-fe89-c0f9-af62-d0f8-5a7d.ngrok-free.app/bot_tg_back/api/getCoins.php?user_id=${userId}`)
            .then((response) => {
                setCoins(response.data.balance || 0); // Установить баланс из ответа сервера
            })
            .catch((error) => {
                console.error('Ошибка получения монет:', error);
            });
    }, []);

    // Обработчик клика
    const handleTap = () => {
        axios
            .post(`https://14e8-2001-2020-4343-fe89-c0f9-af62-d0f8-5a7d.ngrok-free.app/bot_tg_back/api/tap/index.php`, {
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
            <div className="stat-card">
                <p>Количество монет:</p>
                <p>{coins !== null ? `+${coins}` : 'Загрузка...'}</p>
            </div>
        </div>
    );
};

export default TapButton;
