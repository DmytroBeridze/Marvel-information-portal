import "./style/style.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./components/services/MarvelService";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
