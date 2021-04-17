import "./App.css";
import ParticleBackground from "./ParticleBackground";
import Matt from "./assets/Matt-removebg-preview.png";

function App() {
  return (
    <div className="App">
      <div className="background">
        <ParticleBackground />
      </div>
      <div className="content">
        <h1 className="title">VirtualMii</h1>
        <div className="body">
          <div
            className="glassmorph"
            style={{ width: "100%", height: "fit-content" }}
          >
            <h6 className="body-text">
              The innovative new solution to interactivity and engagement in
              online classes
            </h6>
          </div>
        </div>
        <div className="mii">
          <img src={Matt} alt="matt" />
        </div>
      </div>
    </div>
  );
}

export default App;
