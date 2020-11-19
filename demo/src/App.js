import logo from './logo.svg';
import './App.css';
// import {Input, SooInput} from "../../dist";
import {molecules} from 'my-test-package';

function App() {
    console.log(molecules);
    return (
    <div className="App">
        {/*<Input />*/}
        {/*<Input />*/}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
