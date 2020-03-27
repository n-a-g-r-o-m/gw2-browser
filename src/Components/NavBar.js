import React from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import ApiKeyManager from "./ApiKeyManager";

export default function NavBar(props) {
  const history = useHistory();
  const [{ menuAnchorEl, menuId }, setMenuOpen] = React.useState({});

  const { guilds, continents } = props;

  const handleMenuOpen = (menuAnchorEl, menuId) => {
    setMenuOpen({ menuAnchorEl, menuId });
  };

  const navigateToGuild = guildId => {
    setMenuOpen({});
    history.push(`/guild/${guildId}`);
  };

  const navigateToMap = continentId => {
    setMenuOpen({});
    history.push(`/map/${continentId}`);
  };

  const handleClose = () => {
    setMenuOpen({});
  };

  const guildsMenu = () => {
    return (
      <>
        <Button
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={event => handleMenuOpen(event.currentTarget, "guilds")}
        >
          Guilds
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={menuId === "guilds"}
          onClose={handleClose}
        >
          {guilds.map(guild => (
            <MenuItem key={guild.id} onClick={() => navigateToGuild(guild.id)}>
              {guild.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };
  const mapsMenu = () => {
    return (
      <>
        <Button
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={event => handleMenuOpen(event.currentTarget, "maps")}
        >
          Maps
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={menuId === "maps"}
          onClose={handleClose}
        >
          {continents.map(continent => (
            <MenuItem
              key={continent.id}
              onClick={() => navigateToMap(continent.id)}
            >
              {continent.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {guildsMenu()}
          {mapsMenu()}
          <ApiKeyManager />
        </Toolbar>
      </AppBar>
    </div>
  );
}
