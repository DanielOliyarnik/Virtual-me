import { Grid } from "@material-ui/core";
import React from "react";
import { Mouth1 } from "../assets/Mouth";

const CharacterCreator = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100% - 70px)",
      }}
    >
      <Grid
        container
        style={{ height: "70vh", paddingLeft: 75, paddingRight: 75 }}
      >
        <Grid item xs={12} sm={6}>
          <div className="glassmorph" style={{ width: "100%", height: "100%" }}>
            H3LLO WORLD
          </div>
        </Grid>
        <Grid item xs={12} sm={6} style={{ paddingLeft: 50 }}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx={100} cy={100} rx={65} ry={80} fill="rgb(212,135,63)" />
            <ellipse cx={70} cy={80} rx={10} ry={10} />
            <ellipse cx={130} cy={80} rx={10} ry={10} />
            <polygon points="100,90 100,120 120,120" />
            <Mouth1 />
          </svg>
        </Grid>
      </Grid>
    </div>
  );
};

export default CharacterCreator;
