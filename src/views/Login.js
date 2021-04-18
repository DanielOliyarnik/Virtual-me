import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import firebase from "../config";

const Login = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  function login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        history.push("/");
        // ...
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  }
  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="glassmorph"
        style={{ height: "100%", width: "100%", maxWidth: 800, maxHeight: 500 }}
      >
        <h1 style={{ fontSize: 48 }}>Login</h1>
        <div
          style={{
            margin: "2px 1em 0 auto",
            height: "70%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            error={error}
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            // style={{ color: "white", width: "80%" }}
            style={{
              backgroundColor: "transparent",
              width: "80%",
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
            helperText={error ? "Incorrect username or password" : ""}
          />
          <TextField
            variant="outlined"
            fullWidth
            error={error}
            password
            label="Password"
            type="password"
            value={password}
            style={{
              backgroundColor: "transparent",
              width: "80%",
              marginTop: 50,
            }}
            InputProps={{
              style: {
                color: "white",
              },
            }}
            helperText={error ? "Incorrect username or password" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ color: "#fff", backgroundColor: "#FB8C01" }}
            onClick={login}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
