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

    const authenticateWithServer = async (telegramData) => {
        try {
            const response = await axios.post(
                "https://cors-anywhere.herokuapp.com/https://14e8-2001-2020-4343-fe89-c0f9-af62-d0f8-5a7d.ngrok-free.app/bot_tg_back/api/login/index.php",
                {},
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Telegram-Data": telegramData,
                    },
                }
            );

            if (response.data.ok) {
                console.log("Authentication successful:", response.data);
                setAuthStatus("Success");
            } else {
                console.error("Authentication failed:", response.data.message);
                setAuthStatus("Failed");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setAuthStatus("Error");
        }
    };

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const telegramData = window.Telegram.WebApp.initData;
            setTelegramData(telegramData); // Сохраняем данные в состоянии
            authenticateWithServer(telegramData);
            console.log("Telegram Init Data:", telegramData);
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
