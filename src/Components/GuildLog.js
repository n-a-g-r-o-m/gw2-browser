import React, {useState, useEffect} from 'react';

import {wrappedFetch} from '../utils/urlHelpper';

import GuildLogEntry from './GuildLogEntry'

export default function GuildLog(props) {
    const {id} = props;

    const [log, setLog] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        wrappedFetch(`/guild/${id}/log`, setLog, setError);
    }, [id])

    console.log({log});
    if(error) {
        return <div className="error">{error}</div>;
    }
    return <div className='guild-log'>{log.map(logEntry => <GuildLogEntry logEntry={logEntry} />)}</div>
}