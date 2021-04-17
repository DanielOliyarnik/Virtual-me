import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import ParticleBackground from "./ParticleBackground";
import LandingPage from "./views/LandingPage";

function App() {
  return (
    <div className="App">
      <div className="background">
        <ParticleBackground />
      </div>
      <div className="content">
        <Router>
          <AppBar
            color="transparent"
            position="static"
            style={{ background: "transparent", boxShadow: "none" }}
          >
            <Toolbar style={{ dispay: "flex", justifyContent: "flex-end" }}>
              <Button style={{ color: "white", textTransform: "capitalize" }}>
                Login
              </Button>
              <Button style={{ color: "white", textTransform: "capitalize" }}>
                Sign Up
              </Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
