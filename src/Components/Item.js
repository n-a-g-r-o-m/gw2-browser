import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import './Item.css';

export default function Item(props) {
    const {item} = props;

    return (
        <div className="item">
            <Tooltip title={item.name} placement="top">
                <div>
                    <div className="item-icon" style={{backgroundImage: `url(${item.icon})`}} />
                </div>
            </Tooltip>
            <Tooltip title={"Click to copy"}>
                <div className="item-chat-link" onClick={() => navigator.clipboard.writeText(item.chat_link)}>{item.chat_link}</div>
            </Tooltip>
            {props.children}
        </div>
    );
}