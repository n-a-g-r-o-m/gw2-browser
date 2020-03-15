import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {CookiesProvider, useCookies} from 'react-cookie';

import Account from "./Components/Account";
import Guild from "./Components/Guild";

import './App.css';

const ApiKeyManager = (props) => {
  const [{gw2ApiKey}, setApiKeyCookie, removeApiKeyCookie] = useCookies(['gw2ApiKey']);

  const handleChange = (event) => {
    const value = event.target.value;
    if(value) {
      setApiKeyCookie('gw2ApiKey', value, { path: '/' });
    } else {
      removeApiKeyCookie('gw2ApiKey', { path: '/' });
    }
  }
  console.log({gw2ApiKey})
  return <div>API key: <input value={gw2ApiKey} onChange={event => handleChange(event)} /></div>;
}

// All new
function App() {
  return (
    <CookiesProvider>
      <Router>
        <ApiKeyManager />
        <Switch>
          <Route exact path="/" component={Account} />
          <Route path="/guild/:id" component={Guild} />
          <Route render={() => "404 - Not Found!"} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
