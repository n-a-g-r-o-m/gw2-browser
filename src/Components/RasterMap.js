import React from "react";
import { Map } from "react-leaflet";
import Leaflet from "leaflet";

export const LeafletMapContext = React.createContext(null);

export default class LeafletMap extends Map {
  createLeafletElement(props) {
    this.map = super.createLeafletElement(props);

    return this.map;
  }

  render() {
    return (
      <LeafletMapContext.Provider value={this.map}>
        {super.render()}
      </LeafletMapContext.Provider>
    );
  }
}
