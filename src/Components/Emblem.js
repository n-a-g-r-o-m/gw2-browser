import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { wrappedFetch } from "../utils/urlHelper";

const EmblemElem = styled.div`
  width: 128px;
  height: 128px;
  background: black;
`;

const EmblemLayerElem = styled.img`
  position: absolute;
  filter: ${({ color: { brightness, contrast, hue, saturation, lightness } }) =>
    `contrast(${contrast})hue-rotate(${hue}deg)saturate(${saturation})brightness(${lightness})`};
`;
//`brightness(${brightness})contrast(${contrast})hue-rotate(${hue}deg)saturate(${saturation})brightness(${lightness})`};

export default function Emblem(props) {
  const { emblem } = props;

  const [foreground, setForeground] = useState({});
  const [background, setBackground] = useState({});
  const [colors, setColors] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (emblem) {
      wrappedFetch(
        `/emblem/foregrounds/${emblem.foreground.id}`,
        setForeground,
        setError
      );
      wrappedFetch(
        `/emblem/backgrounds/${emblem.background.id}`,
        setBackground,
        setError
      );
      wrappedFetch(
        `/colors`,
        setColors,
        setError,
        {
          ids: [...emblem.foreground.colors, ...emblem.background.colors]
        },
        "id"
      );
    }
  }, [emblem]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  const pickColor = (type, index) =>
    colors[emblem[type].colors[index]]?.metal || {};

  return (
    <EmblemElem>
      {background &&
        (background.layers || []).map((layer, index) => (
          <EmblemLayerElem
            key={`b${index}`}
            src={layer}
            color={pickColor("background", index)}
          />
        ))}
      {foreground &&
        (foreground.layers || []).map((layer, index) => (
          <EmblemLayerElem
            key={`f${index}`}
            src={layer}
            color={pickColor("foreground", index)}
          />
        ))}
    </EmblemElem>
  );
}
