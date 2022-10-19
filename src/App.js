import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);
  const recoin = coins.slice(0, 20);
  return (
    <div>
      {loading ? (
        <strong>"loading..."</strong>
      ) : (
        <div>
          <h1 className="coin_title">Coin Trackers({recoin.length})</h1>

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

            <div>Transfer USD to Coin</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
