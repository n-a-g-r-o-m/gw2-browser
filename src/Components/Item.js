import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import Price from './Price';

import './Item.css';

export default function Item(props) {
    const {item} = props;

    return (
        <div className="item">
            <Tooltip  
                placement="top"
                title={
                    <div>
                        <div>{item.name}</div>
                        <Price price={item.prices} />
                    </div>
                }>
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