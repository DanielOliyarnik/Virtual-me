import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import ParticleBackground from "./ParticleBackground";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import Signup from "./views/Signup";
import CharacterCreator from "./views/CharacterCreator";
import AppBar from "./components/AppBar";

function App() {
  return (
    <div className="App">
      <div className="background">
        <ParticleBackground />
        <div className="content">
          <Router>
            <AppBar />
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/creator">
                <CharacterCreator />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
