import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {wrappedFetch} from '../utils/urlHelper';

import Item from './Item';

import './Items.css';

const rarityOrder = ['Junk','Basic','Fine','Masterwork','Rare','Exotic','Ascended','Legendary'];

const sortByName = (itemA, itemB) =>  itemA.name.localeCompare(itemB.name);
const sortByFuncs = {
    name: sortByName,
    rarity: (itemA, itemB) =>  {
        const rarityDiff = rarityOrder.indexOf(itemA.rarity) - rarityOrder.indexOf(itemB.rarity);
        if(rarityDiff) return rarityDiff;
        return sortByName(itemA, itemB);
 /*   type: (itemA, itemB) =>  {
        const typeDiff = rarity.indexOf(itemA.rarity) - rarity.indexOf(itemB.rarity);
        if(typeDiff) return typeDiff;
        return sortByName(itemA, itemB);*/
    }
}

export default function Items(props) {
    const {ids = [], renderItem, sortBy} = props;

    const [items, setItems] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if(ids.length > 0) {
            wrappedFetch(`/items`, setItems, setError, {ids})
        }
    }, [ids])

    const sortedItems = items.sort(typeof sortBy === 'function' ? sortBy : sortByFuncs[sortBy])
    console.log({items});
    if(error) {
        return <div className="error">{error}</div>;
    }
    return (
        <div className="items">
            {sortedItems.map(item => renderItem(item))}
        </div>
    );
}

Items.protoTypes = {
    items: PropTypes.array,
    renderItem: PropTypes.func,
    sortBy: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf(['name', 'rarity'])
      ])
}

Items.defaultProps = {
    renderItem: (item) => <Item key={item.id} item={item}/>,
    sortBy: 'rarity'
}