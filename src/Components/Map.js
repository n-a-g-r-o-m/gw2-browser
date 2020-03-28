import React, { useState, useEffect } from "react";
import { TileLayer, Marker, Popup, Icon } from "react-leaflet";
import L from "leaflet";

import LeafletMap, { LeafletMapContext } from "./LeafletMap";
import { wrappedFetch } from "../utils/urlHelper";

export default function Map(props) {
  const { assets, continents, match } = props;
  const { continentId = 1 } = match?.params;
  const continent = continents.find(
    continent => continent.id === parseInt(continentId)
  );

  const [floors, setFloors] = useState([]);
  const [selectedFloorId, setSelectedFloorId] = useState(1);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    wrappedFetch(`/continents/${continentId}/floors`, setFloors, setError, {
      ids: "all"
    });
  }, [continentId]);

  const floor = floors.find(floor => floor.id === selectedFloorId);
  console.log({ floor });
  const position = [0, 0];
  return (
    <LeafletMap
      center={position}
      zoom={2}
      minZoom={3}
      maxZoom={7}
      crs={L.CRS.Simple}
      style={{ height: "calc(100vh - 64px)", width: "100vw" }}
    >
      <LeafletMapContext.Consumer>
        {map => {
          const southWest = map.unproject([0, 48000], map.getMaxZoom());
          const northEast = map.unproject([38000, 0], map.getMaxZoom());

          map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
          const tileLayer = (
            <TileLayer
              url={`https://tiles{s}.guildwars2.com/${continentId}/${selectedFloorId}/{z}/{x}/{y}.jpg`}
              continuousWorld={true}
              subdomains={[1, 2, 3, 4]}
            />
          );
          if (!floor || Object.keys(assets).length === 0) {
            return <>{tileLayer}</>;
          }
          return (
            <>
              {tileLayer}
              <select
                value={selectedFloorId}
                onChange={event =>
                  setSelectedFloorId(parseInt(event.target.value))
                }
                style={{ position: "absolute", top: 0, right: 0, zIndex: 400 }}
              >
                {floors
                  ?.sort((a, b) => a.id - b.id)
                  .map(floor => (
                    <option value={floor.id}>{floor.id}</option>
                  ))}
              </select>
              {Object.values(floor?.regions || {}).map(region => [
                <Marker
                  position={map.unproject(region.label_coord, map.getMaxZoom())}
                  icon={L.divIcon({
                    className: "my-div-icon",
                    html: region.name
                  })}
                ></Marker>,
                ...Object.values(region.maps || {}).reduce(
                  (result, gameMap) => [
                    ...result,
                    ...Object.values(gameMap.points_of_interest || {}).map(
                      (poi, index) => {
                        const iconUrl =
                          poi.icon ||
                          assets[
                            poi.type === "landmark"
                              ? "map_poi"
                              : `map_${poi.type}`
                          ]?.icon;
                        !iconUrl && console.log({ poi });
                        return (
                          <Marker
                            key={`${gameMap.id}_${poi.type}_${poi.id}`}
                            title={poi.name}
                            position={map.unproject(
                              poi.coord,
                              map.getMaxZoom()
                            )}
                            icon={L.icon({ iconUrl })}
                            onClick={() =>
                              navigator.clipboard.writeText(poi.chat_link)
                            }
                          />
                        );
                      }
                    )
                  ],
                  []
                )
              ])}
            </>
          );
        }}
      </LeafletMapContext.Consumer>
    </LeafletMap>
  );
}
