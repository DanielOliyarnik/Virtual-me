import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Bar() {
  const history = useHistory();
  return (
    <AppBar
      color="transparent"
      position="static"
      style={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar style={{ dispay: "flex", justifyContent: "flex-end" }}>
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
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Bar;
