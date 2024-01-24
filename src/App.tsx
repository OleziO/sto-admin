import React from "react";
import "./App.css";
import { AuthProvide } from "./helpers/authProvide";
import { MainApp } from "./pages/main";

function App() {
  return (
    <div className="App">
      <AuthProvide>
        <MainApp />
      </AuthProvide>
    </div>
  );
}

export default App;
