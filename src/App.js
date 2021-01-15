import logo from './logo.svg';
import './App.css';
import EnrollwFido from "./Enroll-w-Fido";

function App() {
  return (
    <div className="App">
      <section className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enroll with FIDO2.
        </p>
        <EnrollwFido className="enrollwFido" />
      </section>
    </div>
  );
}

export default App;
