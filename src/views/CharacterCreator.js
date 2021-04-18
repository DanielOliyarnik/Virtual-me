import { Grid } from "@material-ui/core";
import React from "react";
import firebase from "../config";
import faceList from "../assets/faceId.json";
import "./CharacterCreator.css";
import LinearProgress from "../components/LinearProgress";

const CharacterCreator = (props) => {
  async function handleFileUpload(e) {
    try {
      const file = e.target.files[0];
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        alert("Use a png or jpg image");
        return;
      }
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then((snap) => {
        // console.log(snap);
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
            response.json().then((data) => {
              console.log(faceList);
              let body = {
                faceId: data[0].faceId,
                faceIds: faceList,
                maxNumOfCandidatesReturned: 3,
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
                  console.log(data);
                  getMatchAvatars(data);
                })
              );
            });
          });

          console.log();
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
        console.log(element.url);
      }
    });
  }

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
            <h2>Generate Personalized Avatar</h2>
            <label for="file-upload" className="custom-file-upload">
              Upload file
            </label>
            <input id="file-upload" type="file" onChange={handleFileUpload} />
            <LinearProgress variant="determinate" value={10} />
          </div>
          <div className="glassmorph" style={{ width: "100%", height: "70%" }}>
            <h2>Create Custom Avatar</h2>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} style={{ paddingLeft: 50 }}></Grid>
      </Grid>
    </div>
  );
};

export default CharacterCreator;
