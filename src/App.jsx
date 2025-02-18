import "./App.css";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Registro from "./components/Registro";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
