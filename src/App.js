import React, { useState, useEffect } from "react";
import axios from "axios";
import { retrieveLaunchParams } from "@telegram-apps/sdk"; // Импорт retrieveLaunchParams
import Header from "./components/Header/Header";
import Stats from "./components/Stats/Stats";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App = () => {
    const [authStatus, setAuthStatus] = useState(null); // Состояние для статуса аутентификации

    // Отправка данных на сервер
    const authenticateWithServer = async (initDataRaw) => {
        try {
            const response = await axios.post(
                "https://cors-anywhere.herokuapp.com/https://30ea-2001-2020-4343-fe89-28f9-bbaa-da2d-787b.ngrok-free.app/bot_tg_back/api/login/index.php", // Укажите реальный адрес
                {}, // Тело запроса оставлено пустым, так как данные передаются через заголовок
                {
                    headers: {
                        "Authorization": `tma ${initDataRaw}`, // Передача данных initDataRaw через заголовок
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
        const { initDataRaw } = retrieveLaunchParams(); // Извлекаем initDataRaw
        if (initDataRaw) {
            console.log("Telegram Init Data Raw:", initDataRaw);

            // Отправка данных на сервер
            authenticateWithServer(initDataRaw);
        } else {
            console.warn("Telegram WebApp не предоставил данные.");
            setAuthStatus("Telegram WebApp не предоставил данные.");
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
