import logo from './logo.svg';
import './App.css';
// import {Input, SooInput} from "../../dist";
import {molecules, SooInput} from 'my-test-package';

function App() {
    console.log(molecules);
    return (
    <div className="App">
        {/*<SooInput />*/}
        {/*<Input />*/}
        {/*<Input />*/}
      <SooInput />
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
