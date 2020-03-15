import React from 'react';

import ItemInline from './ItemInline';

import './GuildLogEntry.css';

const renderMessage = (logEntry, items) => {
    const {time, user, ...rest} = logEntry;
    const formatedTime = new Date(time).toLocaleString();
    const WhenWho = () => <><div>{`${formatedTime} ${user}`}</div></>
    switch(rest.type) {
        case 'treasury': {
            const item = items[rest.item_id];
            return (
                <>
                    <WhenWho/>
                    <div>{`added to treasury`}</div>
                    {item ? <ItemInline item={item} count={rest.count}/> : '◌'}
                </>
            );
        }
        case 'upgrade': {
            return (
                <>
                    <WhenWho/>
                    <div>{`approved upgrade ${rest.upgrade_id}`}</div>
                </>
            );
        }
        case 'motd':
            return (
                <>
                    <WhenWho/>
                    <div>{`changed the motd to "${rest.motd}"`}</div>
                </>
            );
        case 'joined':
            return (
                <>
                    <WhenWho/>
                    <div>{`joined"`}</div>
                </>
            );
        case 'invited':
            return (
                <>
                    <WhenWho/>
                    <div>{`was invited by ${rest.invited_by}`}</div>
                </>
            );
        case 'rank_change':
            return (
                <>
                    <WhenWho/>
                    <div>{`was changed from rank ${rest.old_rank} to ${rest.new_rank} by ${rest.changed_by || 'SYSTEM'}`}</div>
                </>
            );
        default:
            return (
                <>
                    <WhenWho/>
                    <div>{JSON.stringify(rest)}</div>
                </>
            );
    }
}

export default function GuildLogEntry(props) {
    const {logEntry, items} = props;
    return (
        <div className="guild-log-entry">
            {renderMessage(logEntry, items)}
        </div>
    );
}