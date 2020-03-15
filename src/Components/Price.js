import React from 'react';

import './Price.css';

export default function Price(props) {
    const {unit_price = 0} = (((props || {}).price || {}).buys || {});
    const price = {
        gold: Math.floor(unit_price/10000),
        silver: Math.floor(unit_price/100) % 100,
        copper: unit_price % 100
    }

    return (
        <div className="price">
            {Object.keys(price).map(
                coinType => price[coinType] > 0
                    ? <span className={`coin coin-${coinType}`}>{price[coinType]}</span>
                    : null
            )}
        </div>
    );
}