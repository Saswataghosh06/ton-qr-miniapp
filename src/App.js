
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [amountBRL, setAmountBRL] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const walletAddress = "EQDX...YourWalletAddress..."; // Replace with your TON wallet

  const generateQR = (e) => {
    e.preventDefault();
    const tonAmount = (parseFloat(amountBRL) / 6).toFixed(2);
    const tonLink = `https://tonhub.com/transfer/${walletAddress}?amount=${tonAmount}`;
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(tonLink)}`;
    setQrUrl(qr);
  };

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div className="App">
      <h2>TON QR Payment</h2>
      <form onSubmit={generateQR}>
        <input
          type="text"
          placeholder="Item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (in BRL)"
          value={amountBRL}
          onChange={(e) => setAmountBRL(e.target.value)}
          required
        />
        <button type="submit">Generate QR</button>
      </form>

      {qrUrl && (
        <div className="qr-section">
          <p>Customer can scan this QR to pay 👇</p>
          <img src={qrUrl} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default App;
