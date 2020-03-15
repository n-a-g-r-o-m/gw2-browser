import React, {useState, useEffect} from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import {wrappedFetch} from '../utils/urlHelpper';

import Items from './Items';
import Item from './Item';

export default function Guild(props) {
    const {id, upgrades} = props;

    const [treasury, setTreasury] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        wrappedFetch(`/guild/${id}/treasury`, setTreasury, setError, {}, 'item_id');
    }, [id])

    console.log({treasury, upgrades});
    if(error) {
        return <div className="error">{error}</div>;
    }
    const renderTreasuryItem = (item) => {
        const treasuryItem = treasury[item.id];
        const neededByUpgrades = treasuryItem.needed_by.map(need => ({...upgrades[need.upgrade_id], count: need.count}));

        return (
            <Item key={item.id} item={item}>
                <Tooltip title={<div>{neededByUpgrades.map(need => <div>{need.count} to {need.name}</div>)}</div>}>
                    <div>{treasury[item.id].count}</div>
                </Tooltip>
            </Item>
        );
    };
    return (
        <div className="treasury">
            <Items ids={Object.keys(treasury)} renderItem={renderTreasuryItem} sortBy="name"/>
        </div>
    );
}