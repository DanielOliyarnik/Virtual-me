import { Fab, Fade, Grid } from "@material-ui/core";

import React from "react";
import One from "../assets/Kristofer-removebg-preview.png";
import Two from "../assets/Lucian-removebg-preview.png";
import Three from "../assets/Payton-removebg-preview.png";
import Four from "../assets/Zhen-removebg-preview.png";
import Five from "../assets/Trey-removebg-preview.png";
import GetAppIcon from "@material-ui/icons/GetApp";
import "./LandingPage.css";
import { useHistory } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

const LandingPage = (props) => {
  const history = useHistory();
  const [fade, setFade] = useState(true);
  const [image, setImage] = useState(0);
  const images = [One, Two, Three, Four, Five];
  useEffect(() => {
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    function changeImage() {
      setFade(false);
      sleep(2000);
      setImage((prev) => prev + 1);
      setFade(true);
    }
    setInterval(changeImage, 5000);
    return () => clearInterval(changeImage, 5000);
  }, []);
  console.log(image);
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
                The innovative solution to interactivity and engagement in
                online meetings.
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
              <Fade in={fade} timeout={{ enter: 1000, exit: 0 }}>
                <img src={images[image % 5]} alt="matt" />
              </Fade>
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
              <GetAppIcon
                style={{ paddingRight: 10, fontSize: 36, color: "#fff" }}
              />
              <a
                href="/VirtualMe.zip"
                download
                style={{
                  color: "#fff",
                  fontWeight: "light",
                  fontSize: 36,
                  textTransform: "capitalize",
                  textDecoration: "none",
                }}
              >
                download
              </a>

              {/* <p
                style={{
                  color: "#fff",
                  fontWeight: "light",
                  fontSize: 36,
                  textTransform: "capitalize",
                }}
              >
                Download
              </p> */}
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
              onClick={() => history.push("/creator")}
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
