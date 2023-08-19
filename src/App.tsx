import "./App.css";
import Router from "./route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Router />
    </div>
  );
}

export default App;
