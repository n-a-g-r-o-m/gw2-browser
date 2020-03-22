import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";

import { wrappedFetch } from "../utils/urlHelper";

import Items from "./Items";
import Item from "./Item";
import Price from "./Price";

export default function Guild(props) {
  const { id, upgrades } = props;

  const [treasury, setTreasury] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    wrappedFetch(`/guild/${id}/treasury`, setTreasury, setError, {}, "item_id");
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }
  const renderTreasuryItem = item => {
    const treasuryItem = treasury[item.id];
    const neededByUpgrades = treasuryItem.needed_by.map(need => ({
      ...upgrades[need.upgrade_id],
      count: need.count
    }));

    return (
      <Item key={item.id} item={item}>
        <Tooltip
          title={
            <div>
              <div>{"???"} Max</div>
              {neededByUpgrades.map(need => (
                <div>
                  <span>
                    {need.count} (
                    <Price price={item.prices} multiplier={need.count} />) -{" "}
                    {need.name}
                  </span>
                </div>
              ))}
            </div>
          }
        >
          <div>{treasury[item.id].count}</div>
        </Tooltip>
      </Item>
    );
  };
  return (
    <div className="treasury">
      <Items
        ids={Object.keys(treasury)}
        renderItem={renderTreasuryItem}
        sortBy="name"
      />
    </div>
  );
}
