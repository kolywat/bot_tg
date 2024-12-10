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
    const [telegramData, setTelegramData] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const authenticateWithServer = async (telegramData) => {
        try {
            const response = await axios.post(
                "https://cors-anywhere.herokuapp.com/https://3fff-2001-2020-4343-fe89-8042-8259-15dc-ff1f.ngrok-free.app/bot_tg_back/api/login/index.php",
                {},
                {
                    headers: { "Telegram-Data": telegramData },
                }
            );

            if (response.data.ok) {
                console.log("✅ Authentication successful:", response.data);
                setAuthStatus("✅ Успешный вход!");
                setToken(response.data.token);
            } else {
                console.error("❌ Authentication failed:", response.data.message);
                setAuthStatus(`❌ Ошибка входа: ${response.data.message}`);
            }
        } catch (err) {
            console.error("⚙️ Error during authentication:", err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const telegramData = window.Telegram.WebApp.initData;
            if (!telegramData) {
                console.error("Telegram initData is missing");
                return;
            }
            setTelegramData(telegramData);
        }
    }, []);

    useEffect(() => {
        if (telegramData && !token) {
            authenticateWithServer(telegramData);
        }
    }, [telegramData, token]);

    return (
        <div className="app">
            <Header />
            <Stats />
            <Main />
            <Footer />

            <div className="debug-area">
                <h2>Telegram Init Data:</h2>
                <pre>{JSON.stringify(telegramData, null, 2)}</pre>
            </div>
            {authStatus && <div style={{ color: authStatus.includes("Успешный") ? "green" : "red" }}>{authStatus}</div>}
            {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}
        </div>
    );
};

export default App;
