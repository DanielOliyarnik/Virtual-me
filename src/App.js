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
        <LandingPage />
      </div>
    </div>
  );
}

export default App;
