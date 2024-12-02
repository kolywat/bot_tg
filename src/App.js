import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";

function App() {

    const {onToggleButton, tg} = useTelegram();

    if (!tg) {
        console.error("Telegram WebApp API is not available");
    }

    useEffect(() => {
        tg.ready();
    })

  return (
    <div className="App">
        <Header />
        <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
