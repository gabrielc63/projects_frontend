import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Center from "./components/Center";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Center /> */}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}

export default App;
