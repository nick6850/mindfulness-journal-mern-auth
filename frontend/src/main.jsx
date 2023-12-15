import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navbar from "./components/Navbar";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-blue-400">
      <Provider store={store}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  </React.StrictMode>
);
