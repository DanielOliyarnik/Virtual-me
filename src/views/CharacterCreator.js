import {
  Fab,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
} from "@material-ui/core";
import React, { useState } from "react";
import firebase from "../config";
import faceList from "../assets/faceId.json";
import "./CharacterCreator.css";
import LinearProgress from "../components/LinearProgress";
import { useHistory } from "react-router";

const CharacterCreator = (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(0);
  const [custom, setCustom] = useState(false);
  const [loading2, setLoading2] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [attributes, setAttributes] = useState({
    age: 1,
    skin: 1,
    gender: "female",
  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  const skinMarks = [
    {
      value: 1,
      label: "Lighter",
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    { value: 5, label: "Darker" },
  ];
  const ageMarks = [
    {
      value: 1,
      label: "Younger",
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    { value: 5, label: "Older" },
  ];

  async function handleFileUpload(e) {
    setCustom(false);
    try {
      setLoading(10);
      setAvatar(null);
      const file = e.target.files[0];
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Use a png or jpg image");
        return;
      }
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then((snap) => {
        // console.log(snap);
        setLoading(30);
        fileRef.getDownloadURL().then((url) => {
          console.log(url);
          fetch(
            "https://virtualmii.cognitiveservices.azure.com/face/v1.0/detect?detectionModel=detection_02&returnFaceId=true&returnFaceLandmarks=false",
            {
              body: JSON.stringify({ url }),
              headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AZURE_KEY,
              },
              method: "POST",
            }
          ).then((response) => {
            setLoading(40);
            response.json().then((data) => {
              if (!data.length) {
                alert("No face detected, Please upload an image of a face");
                setLoading(0);
                return;
              }
              setLoading(50);
              console.log(faceList);
              let body = {
                faceId: data[0].faceId,
                faceIds: faceList,
                maxNumOfCandidatesReturned: 1,
                mode: "matchFace",
              };
              fetch(
                "https://virtualmii.cognitiveservices.azure.com/face/v1.0/findsimilars",
                {
                  body: JSON.stringify(body),
                  headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key":
                      process.env.REACT_APP_AZURE_KEY,
                  },
                  method: "POST",
                }
              ).then((response) =>
                response.json().then((data) => {
                  setLoading(90);
                  console.log(data);
                  setConfidence(data[0].confidence * 300);
                  getMatchAvatars(data);
                  setLoading(100);
                  setTimeout(() => setLoading(0), 1000);
                })
              );
            });
          });
        });
      });
    } catch (error) {
      console.log("user cancelled");
    }
  }
  async function getMatchAvatars(faces) {
    let FaceIds = faces.map((element) => element.faceId);
    let avatars = await firebase.database().ref("avatars").get();
    console.log(avatars.val());
    avatars.val().forEach((element) => {
      if (FaceIds.includes(element.facial)) {
        console.log(element);
        setAvatar(element.url);
      }
    });
  }
  console.log(loading2);
  async function generateCustomAvatar() {
    setAvatar(null);

    setCustom(true);
    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    for (let i = 10; i <= 100; i += 10) {
      await sleep(100);
      setLoading2(i);
      if (i === 100) {
        setTimeout(() => setLoading2(0), 1000);
      }
    }
    let avatars = await firebase.database().ref("avatars").get();
    let matches = [];
    avatars.val().forEach((element) => {
      if (
        element.skin === attributes.skin &&
        element.age === attributes.age &&
        (element.gender === attributes.gender || attributes.gender === "other")
      ) {
        matches.push(element);
      }
    });
    if (matches.length) {
      setAvatar(matches[Math.floor(Math.random() * matches.length)].url);
    } else {
      console.log("no initial match");
      avatars.val().forEach((element) => {
        if (
          Math.abs(element.skin - attributes.skin) <= 1 &&
          Math.abs(element.age - attributes.age) <= 1 &&
          (element.gender === attributes.gender ||
            attributes.gender === "other")
        ) {
          matches.push(element);
        }
      });
      if (matches.length) {
        setAvatar(matches[Math.floor(Math.random() * matches.length)].url);
      } else {
        avatars.val().forEach((element) => {
          if (
            Math.abs(element.skin - attributes.skin) <= 2 &&
            Math.abs(element.age - attributes.age) <= 2 &&
            (element.gender === attributes.gender ||
              attributes.gender === "other")
          ) {
            matches.push(element);
          }
          if (matches.length) {
            setAvatar(matches[Math.floor(Math.random() * matches.length)].url);
          }
        });
      }
    }
  }
  console.log(custom);
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
          <div className="glassmorph" style={{ width: "100%", height: "30%" }}>
            <h1>Generate Personalized Avatar</h1>
            <label htmlFor="file-upload" className="custom-file-upload">
              Upload Face
            </label>
            <input id="file-upload" type="file" onChange={handleFileUpload} />
            {loading !== 0 && (
              <LinearProgress variant="determinate" value={loading} />
            )}
            {loading === 30 || loading === 40 ? (
              <p style={{ marginBottom: 10 }}>Analyzing Image</p>
            ) : (
              loading !== 0 && (
                <p style={{ marginBottom: 10 }}>Generating Avatar</p>
              )
            )}
          </div>
          <div className="glassmorph" style={{ width: "100%", height: "70%" }}>
            <h1>Create Custom Avatar</h1>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel
                    component="legend"
                    style={{ color: "#fff", marginBottom: 10 }}
                  >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={attributes.gender}
                    onChange={(e) =>
                      setAttributes((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <FormControlLabel
                      style={{ color: "white" }}
                      value="female"
                      control={<Radio style={{ color: "darkorange" }} />}
                      label="Female"
                    />
                    <FormControlLabel
                      style={{ color: "white" }}
                      value="male"
                      control={<Radio style={{ color: "darkorange" }} />}
                      label="Male"
                    />
                    <FormControlLabel
                      style={{ color: "white" }}
                      value="other"
                      control={<Radio style={{ color: "darkorange" }} />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <p style={{ margin: 0 }}>Skin Color</p>
                <Slider
                  style={{ width: "70%", color: "darkorange" }}
                  value={attributes.skin}
                  min={1}
                  step={1}
                  max={5}
                  // valueLabelDisplay="auto"
                  marks={skinMarks}
                  onChange={(e, newValue) =>
                    setAttributes((prev) => ({ ...prev, skin: newValue }))
                  }
                />
                <p style={{ margin: 0 }}>Age</p>
                <Slider
                  style={{ width: "70%", color: "darkorange" }}
                  value={attributes.age}
                  min={1}
                  step={1}
                  max={5}
                  marks={ageMarks}
                  onChange={(e, newValue) =>
                    setAttributes((prev) => ({ ...prev, age: newValue }))
                  }
                />
              </Grid>
            </Grid>

            <Fab
              variant="extended"
              style={{
                background: "darkorange",
                color: "#fff",
                textTransform: "capitalize",
                fontSize: 16,
                paddingLeft: 25,
                paddingRight: 25,
                marginTop: 25,
              }}
              onClick={generateCustomAvatar}
            >
              Generate
            </Fab>
            {loading2 !== 0 && (
              <>
                <LinearProgress variant="determinate" value={loading2} />
                <p style={{ marginBottom: 10 }}>Generating Avatar</p>
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} style={{ paddingLeft: 50 }}>
          <Fade in={avatar !== null} timeout={{ enter: 3000, exit: 0 }}>
            <div
              className="glassmorph"
              style={{
                marginTop: 20,
                height: "calc(100% + 21px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <h1>Avatar</h1>
              <img src={avatar} alt="avatar" />
              {!custom && (
                <p>{`${Math.min(
                  confidence - Math.floor(Math.random() * 10),
                  100
                ).toFixed(2)}% Match`}</p>
              )}

              {!loggedIn && (
                <Fab
                  variant="extended"
                  style={{
                    background: "darkorange",
                    color: "#fff",
                    textTransform: "capitalize",
                    fontSize: 16,
                    paddingLeft: 25,
                    paddingRight: 25,
                    marginBottom: 10,
                  }}
                  onClick={() => history.push("/signup")}
                >
                  Sign Up and Save Your Avatar
                </Fab>
              )}
            </div>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

export default CharacterCreator;
