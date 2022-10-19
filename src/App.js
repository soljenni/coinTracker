import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);

  const [weight, setWeight] = useState(0);
  const [neutral, setNeutral] = useState(true);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);
  const recoin = coins.slice(0, 20);

  const coincase = (event) => {
    if (event.target.value === "Choose a coin") {
      setNeutral(true);
      onReset();
    } else {
      setNeutral(false);
      setWeight(event.target.value);
    }
  };

  const onChange = (event) => {
    setAmount(event.target.value);
  };

  const onReset = () => {
    setAmount(0);
  };
  return (
    <div>
      {loading ? (
        <strong>"loading..."</strong>
      ) : (
        <div>
          <h1 className="coin_title">Coin Trackers (Top {recoin.length})</h1>

          <div className="below_title">
            <ul className="api_table">
              <div className="top_label">
                <div className="label1">Coin</div>
                <div className="label2">Symbol</div>
                <div className="label3">Price</div>
                <div className="label4">Volume</div>
                <div className="label5">From ATH</div>
              </div>
              {recoin.map((coin) => (
                <li className="coin_list">
                  <div className="coin_table">
                    <div className="coin_name">{coin.name}</div>{" "}
                    <div className="coin_symbol">({coin.symbol})</div>
                    <div className="coin_price">
                      {coin.quotes.USD.price.toFixed(1)} USD
                    </div>
                    <div className="coin_volume">
                      {coin.quotes.USD.volume_24h.toFixed(1)}
                    </div>
                    <div className="coin_ath">
                      {coin.quotes.USD.percent_from_price_ath}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="coin_trans">
              <div className="cointrans_title">Transfer USD to Coin</div>
              <select onChange={coincase}>
                <optgroup>
                  <option>Choose a coin</option>
                  {recoin.map((coin) => (
                    <option value={coin.quotes.USD.price.toFixed(1)}>
                      {coin.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              <label>Dollars Input </label>
              <input
                value={amount}
                onChange={onChange}
                disabled={neutral}
              ></input>
              <label>Coin Output </label>
              <input
                value={(amount * weight).toFixed(1)}
                disabled={neutral}
              ></input>
              <button onClick={onReset}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
