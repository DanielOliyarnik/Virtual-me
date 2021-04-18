import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "../config";
import { useState } from "react";

function Bar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <AppBar
      color="transparent"
      position="static"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar style={{ dispay: "flex", justifyContent: "flex-end" }}>
        {!loggedIn ? (
          <>
            {" "}
            <Button
              style={{ color: "white", textTransform: "capitalize" }}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              style={{ color: "white", textTransform: "capitalize" }}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>{" "}
          </>
        ) : (
          <Button color="secondary" onClick={logout}>
            Sign out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Bar;
