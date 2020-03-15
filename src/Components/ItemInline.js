import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import {arrayToBase64String, base64StringToArray} from '../utils/base64Helper';

import './ItemInline.css';

export default function ItemInline(props) {
    const {item, count} = props;
    let chatLink = item.chat_link;
    if(count > 1) {
        console.log("BEFORE", {chatLink});
        const chatLinkData = base64StringToArray(chatLink.slice(2, -1));
        chatLinkData[1] = count;
        console.log({chatLinkData});
        chatLink = `[&${arrayToBase64String(chatLinkData)}]`;
        console.log("AFTER", {chatLink});
    }
    return (
        <div className="item-inline">
            <Tooltip 
                title={
                    <div
                        className="item-inline-icon"
                        style={{backgroundImage: `url(${item.icon})`}}
                        onClick={() => navigator.clipboard.writeText(chatLink)}
                    />
                } 
                placement="top">
                <div className={`item-rarity-${item.rarity.toLowerCase()}`}>[{count ? `${count} x ` : ''}{item.name}]</div>
            </Tooltip>
        </div>
    );
}