import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";

import { wrappedFetch } from "./utils/urlHelper";

import NavBar from "./Components/NavBar";
import Account from "./Components/Account";
import Guild from "./Components/Guild";
import Map from "./Components/Map";

import "./App.css";

// All new
function App() {
  const [{ gw2ApiKey }] = useCookies(["gw2ApiKey"]);
  const [assets, setAssets] = useState({});
  const [account, setAccount] = useState({});
  const [continents, setContinents] = useState([]);
  const [guilds, setGuilds] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    wrappedFetch("/files", setAssets, setError, { ids: "all" }, "id");
    wrappedFetch("/continents", setContinents, setError, { ids: "all" });
  }, []);

  useEffect(() => {
    if (gw2ApiKey) {
      wrappedFetch("/account", setAccount, setError);
    }
  }, [gw2ApiKey]);

  useEffect(() => {
    const guildIds = account.guilds || [];
    if (guildIds.length > 0) {
      guildIds.forEach(guildId =>
        wrappedFetch(
          `/guild/${guildId}`,
          newGuild => setGuilds({ ...guilds, [newGuild.id]: newGuild }),
          setError
        )
      );
    }
  }, [account]);

  console.log({ account, guilds, assets, continents });
  return (
    <CookiesProvider>
      <Router>
        <NavBar guilds={Object.values(guilds)} continents={continents} />
        {error && <div>{error}</div>}
        <Switch>
          <Route exact path="/">
            <Account account={account} guilds={guilds} />
          </Route>
          <Route path="/guild/:id" component={Guild} />
          <Route
            path="/map/:continentId"
            render={props => (
              <Map {...props} assets={assets} continents={continents} />
            )}
          />
          <Route render={() => "404 - Not Found!"} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
