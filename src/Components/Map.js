import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

export default function Map(props) {
  const { continentId = 1 } = props.match?.params;
  const position = [0, 0];
  return (
    <LeafletMap
      center={position}
      zoom={3}
      minZoom={0}
      maxZoom={8}
      style={{ height: "calc(100vh - 64px)", width: "100vw" }}
    >
      <TileLayer
        url={`https://tiles{s}.guildwars2.com/${continentId}/1/{z}/{x}/{y}.jpg`}
        subdomains={[1, 2, 3, 4]}
      />
      {/*
            <Marker position={position}>
               <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
            */}
    </LeafletMap>
  );
}
