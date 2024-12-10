import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Stats from "./components/Stats/Stats";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./hooks/useTelegram";
import axios from "axios";
import "./App.css";

const App = () => {
    const [authStatus, setAuthStatus] = useState(null);
    const [telegramData, setTelegramData] = useState(null); // Сохраним данные Telegram в состоянии

    const authenticateWithServer = async (telegramDataString) => {
        try {
            const response = await axios.post(
                "https://cors-anywhere.herokuapp.com/https://14e8-2001-2020-4343-fe89-c0f9-af62-d0f8-5a7d.ngrok-free.app/bot_tg_back/api/login/index.php",
                `Telegram-Data=${telegramDataString}`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",

                    },
                }
            );

            if (response.data.ok) {
                console.log("✅ Authentication successful:", response.data);
                setAuthStatus("✅ Успешный вход!");
            } else {
                console.error("❌ Authentication failed:", response.data.message);
                setAuthStatus(`❌ Ошибка входа: ${response.data.message}`);
            }
        } catch (error) {
            // Если ошибка произошла в сети (сервер не доступен, CORS и т.д.)
            if (error.response) {
                // Сервер вернул ответ с ошибкой (например, 422, 500)
                console.error("🚨 Server responded with error:", error.response.data);
                setAuthStatus(`🚨 Ошибка: ${error.response.data.message || 'Неизвестная ошибка'}`);
            } else if (error.request) {
                // Запрос был отправлен, но ответа от сервера не было
                console.error("📡 No response from server:", error.request);
                setAuthStatus("📡 Сервер не отвечает. Проверьте соединение.");
            } else {
                // Что-то пошло не так при настройке запроса
                console.error("⚙️ Error setting up request:", error.message);
                setAuthStatus(`⚙️ Ошибка: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const telegramData = window.Telegram.WebApp.initData;
            const telegramDataString = encodeURIComponent(telegramData);
            setTelegramData(telegramDataString); // Сохраняем данные в состоянии
            authenticateWithServer(telegramDataString);
        }
    }, []);

    return (
        <div className="app">
            <Header />
            <Stats />
            <Main />
            <Footer />

            {/* Блок для отображения telegramData */}
            <div className="debug-area" style={{ padding: '20px', background: '#f9f9f9', border: '1px solid #ccc', marginTop: '20px' }}>
                <h2>Telegram Init Data:</h2>
                <pre>{JSON.stringify(telegramData, null, 2)}</pre>
            </div>
            {authStatus && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        border: '1px solid',
                        color: authStatus.includes('Успешный') ? 'green' : 'red'
                    }}
                >
                    {authStatus}
                </div>
            )}
        </div>
    );
};

export default App;
