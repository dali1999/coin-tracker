import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const onChange = (event) => setMoney(event.target.value);
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
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>

      <input
        onChange={onChange}
        type="number"
        placeholder="How much do you have?"
        value={money}
      />

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin, index) => (
            <option>
              {coin.name}({coin.symbol}): $
              {coin.hasOwnProperty("quotes")
                ? coin.quotes.hasOwnProperty("USD")
                  ? coin.quotes.USD.price
                  : null
                : null}{" "}
              USD{", "}You can have {money / coin.quotes.USD.price} BTC!
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default App;
