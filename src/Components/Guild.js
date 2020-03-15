import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {wrappedFetch} from '../utils/urlHelpper';

import GuildTreasury from './GuildTreasury';
import GuildLog from './GuildLog';

import './Guild.css';

export default function Guild(props) {
    const {id} = useParams();

    const [selectedTab, setSelectedTab] = React.useState(1);
    const [allUpgrades, setAllUpgrades] = useState({});
    const [guild, setGuild] = useState({});
    const [guildUpgradeIds, setGuildUpgradeIds] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        wrappedFetch(`/guild/upgrades`, setAllUpgrades, setError, {ids: 'all'}, 'id');
    }, [])

    useEffect(() => {
        wrappedFetch(`/guild/${id}`, setGuild, setError, {}, 'id');
        wrappedFetch(`/guild/${id}/upgrades`, setGuildUpgradeIds, setError);
    }, [id])

    console.log({guild, guildUpgradeIds, allUpgrades});
    if(error) {
        return <div className="error">{error}</div>;
    }
    return (
        <div className="guild">
            <fieldset>
                <legend>Guild:</legend>
                <span>Name: {guild.name} [{guild.tag}]</span>
            </fieldset>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, newValue) => setSelectedTab(newValue)}
                aria-label="disabled tabs example"
            >
                <Tab label="Treasury" />
                <Tab label="Log" />
            </Tabs>

            {selectedTab === 0 && <div className="wrapper">
                <GuildTreasury id={id} upgrades={allUpgrades}/>
            </div>}

            {selectedTab === 1 && <div className="wrapper">
                <GuildLog id={id}/>
            </div>}
        </div>
    );
}