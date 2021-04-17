import { Button, Fab } from "@material-ui/core";
import React from "react";
import Matt from "../assets/Matt-removebg-preview.png";
import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <>
      <h1 className="title">VirtualMii</h1>
      <div className="body">
        <div
          className="glassmorph"
          style={{ width: "100%", height: "fit-content" }}
        >
          <h6 className="body-text">
            The innovative new solution to interactivity and engagement in
            online classes
          </h6>
        </div>
        <div style={{ display: "flex" }}>
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
              Download Now
            </p>
          </Fab>
        </div>
      </div>
      <div className="mii">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img src={Matt} alt="matt" />
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
              Create
            </p>
          </Fab>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
