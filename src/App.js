import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      }); //api 받아오기
  }, []); //빈 배열이므로 이 코드는 한번만 작동
  return (
    <div>
      <h1>The Coins!({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select key={coins.id}>
        {coins.map((coin, index) => (
          <option>
            {coin.name} ({coin.symbol}): $
            {coin.hasOwnProperty("quotes")
              ? coin.quotes.hasOwnProperty("USD")
                ? coin.quotes.USD.price
                : null
              : null}{" "}
            USD
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
