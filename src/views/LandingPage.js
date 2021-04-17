import { Fab, Grid } from "@material-ui/core";

import React from "react";
import Matt from "../assets/Matt-removebg-preview.png";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <>
      <h1 className="title">VirtualMii</h1>
      <div className="body">
        <Grid container style={{ paddingLeft: 50 }}>
          <Grid item xs={12} sm={6}>
            <div
              className="glassmorph"
              style={{ width: "100%", height: "100%" }}
            >
              <h6 className="body-text">
                The innovative new solution to interactivity and engagement in
                online classes
              </h6>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img src={Matt} alt="matt" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fab
              variant="extended"
              style={{
                background: "darkorange",
                marginTop: 25,
                textAlign: "left",
                padding: 30,
              }}
            >
              {/* <div style={{display: 'flex', justifyContent:"center", alignItems:"center"}}>
                
              </div> */}
              <GetAppIcon
                style={{ paddingRight: 10, fontSize: 36, color: "#fff" }}
              />

              <p
                style={{
                  color: "#fff",
                  fontWeight: "light",
                  fontSize: 36,
                  textTransform: "capitalize",
                }}
              >
                Download
              </p>
            </Fab>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Fab
              variant="extended"
              style={{
                background: "darkorange",
                marginTop: 25,
                textAlign: "left",
                padding: 30,
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontWeight: "light",
                  fontSize: 36,
                  textTransform: "capitalize",
                }}
              >
                Customize My Avatar
              </p>
            </Fab>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LandingPage;
