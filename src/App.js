import logo from "./logo.svg";

import "./App.css";
// import EnrollWithFido from "./components/Enroll-w-Fido";
import EnrollWithFido2 from "./components/Enroll-w-Fido2";
// import EnrollWithFido3 from "./components/Enroll-w-Fido3";

function App() {

  return (
    <>
      <div className="App">
        <section className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Enroll with FIDO2.</p>
          
          <EnrollWithFido2 className="enrollWithFido" />
          
        </section>
      </div>
    </>
  );
}

export default App;
