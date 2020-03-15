import React, {useState, useEffect} from 'react';

import {wrappedFetch} from '../utils/urlHelper';

import GuildLogEntry from './GuildLogEntry'

export default function GuildLog(props) {
    const {id} = props;

    const [log, setLog] = useState([]);
    const [items, setItems] = useState({});
    const [error, setError] = useState(undefined);

    useEffect(() => {
        wrappedFetch(`/guild/${id}/log`, setLog, setError);
    }, [id])

    useEffect(() => {
        if(log.length > 0) {
            const itemIds = [...new Set(log.map(logEntry => logEntry.item_id))].filter(itemId => itemId);
            if(itemIds.length > 0) {
                wrappedFetch(`/items`, setItems, setError, {ids: itemIds}, 'id');
            }
        }
    }, [log])

    if(error) {
        return <div className="error">{error}</div>;
    }
    return (
        <div className='guild-log'>
            {log.map(logEntry => <GuildLogEntry logEntry={logEntry} items={items}/>)}
        </div>
    );
}