import React from "react";
import { createRoot } from "react-dom/client";
import { Game } from "./components/widgets";

import "./index.scss";

const App = () => {
  return (
    <div className="app">
      <Game />
    </div>
  );
};

createRoot(document.getElementById("app")).render(<App />);
