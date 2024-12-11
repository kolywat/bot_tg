import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Stats from "./components/Stats/Stats";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./hooks/useTelegram";
import axios from "axios";
import "./App.css";

const App = () => {
    const [authStatus, setAuthStatus] = useState(null); // Состояние для статуса аутентификации
    const [telegramData, setTelegramData] = useState(null); // Сохраним данные Telegram

    const authenticateWithServer = async (telegramData) => {
        try {
            const response = await axios.post(
                "https://8d13-2001-2020-4343-fe89-a8d3-e09b-72f1-eb4a.ngrok-free.app/bot_tg_back/api/login/index.php", // Замените на реальный адрес
                { initData: telegramData }, // Передача данных в теле запроса
                {
                    headers: {
                        "Content-Type": "application/json", // Заголовок указывает на JSON
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
            if (error.response) {
                console.error("🚨 Server responded with error:", error.response.data);
                setAuthStatus(`🚨 Ошибка: ${error.response.data.message || "Неизвестная ошибка"}`);
            } else if (error.request) {
                console.error("📡 No response from server:", error.request);
                setAuthStatus("📡 Сервер не отвечает. Проверьте соединение.");
            } else {
                console.error("⚙️ Error setting up request:", error.message);
                setAuthStatus(`⚙️ Ошибка: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            // Инициализация WebApp и получение данных Telegram
            const initData = window.Telegram.WebApp.initData || "";
            console.log("Telegram Init Data:", initData);
            setTelegramData(initData);

            // Отправка данных Telegram на сервер
            authenticateWithServer(initData);
        } else {
            console.warn("Telegram WebApp не инициализирован.");
            setAuthStatus("Telegram WebApp не доступен.");
        }
    }, []);

    return (
        <div className="app">
            <Header />
            <Stats />
            <Main />
            <Footer />

            {/* Отображение статуса авторизации */}
            {authStatus && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "10px",
                        border: "1px solid",
                        color: authStatus.includes("Успешный") ? "green" : "red",
                    }}
                >
                    {authStatus}
                </div>
            )}
        </div>
    );
};

export default App;
