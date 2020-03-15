import React from 'react';

const renderMessage = (logEntry) => {
    const {time, user, ...rest} = logEntry;
    const WhenWho = () => <><span>{`${time} ${user} `}</span></>
    switch(rest.type) {
        case 'treasury':
            return (
                <div>
                    <WhenWho/>
                    <span>{`added ${rest.count} x item ${rest.item_id} to treasury`}</span>
                </div>
            );
        case 'upgrade':
            return (
                <div>
                    <WhenWho/>
                    <span>{`approved upgrade ${rest.count} x item ${rest.item_id}`}</span>
                </div>
            );
        case 'motd':
            return (
                <div>
                    <WhenWho/>
                    <span>{`changed the motd to "${rest.motd}"`}</span>
                </div>
            );
        case 'joined':
            return (
                <div>
                    <WhenWho/>
                    <span>{`joined"`}</span>
                </div>
            );
        case 'invited':
            return (
                <div>
                    <WhenWho/>
                    <span>{`was invited by ${rest.invited_by}`}</span>
                </div>
            );
        case 'rank_change':
            return (
                <div>
                    <WhenWho/>
                    <span>{`was changed from rank ${rest.old_rank} to ${rest.new_rank} by ${rest.changed_by || 'SYSTEM'}`}</span>
                </div>
            );
        default:
            return (
                <div>
                    <WhenWho/>
                    <span>{JSON.stringify(rest)}</span>
                </div>
            );
    }
}

export default function GuildLogEntry(props) {
    const {logEntry} = props;

    return (
        <div className="guild-log-entry">
            {renderMessage(logEntry)}
        </div>
    );
}