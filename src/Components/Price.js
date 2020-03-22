import React from "react";

import "./Price.css";

export default function Price(props) {
  const { multiplier = 1 } = props;
  const { unit_price = 0 } = ((props || {}).price || {}).buys || {};
  const price = unit_price * multiplier;

  if (price === 0) {
    return "priceless";
  }
  const priceInCoins = {
    gold: Math.floor(price / 10000),
    silver: Math.floor(price / 100) % 100,
    copper: price % 100
  };

  return (
    <div className="price">
      {Object.keys(priceInCoins).map(coinType =>
        priceInCoins[coinType] > 0 ? (
          <span className={`coin coin-${coinType}`}>
            {priceInCoins[coinType]}
          </span>
        ) : null
      )}
    </div>
  );
}
