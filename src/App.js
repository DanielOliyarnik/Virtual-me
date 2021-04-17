import "./App.css";
import ParticleBackground from "./ParticleBackground";

function App() {
  return (
    <div className="App">
      <div className="background">
        <ParticleBackground />
      </div>
      <div className="content">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 100,
            fontFamily: "Continuum",
          }}
        >
          <h1 className="title">VirtualMii</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
