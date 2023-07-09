import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.scss";
import { Layout } from "./views/Layout/Layout";
import { useAppSelector } from "./store/hooks";

function App() {
  const theme = useAppSelector((state) => state.ui.theme);
  useEffect(()=>{
    if(theme === "dark"){
      document.body.classList.add("body-dark");
    } else {
      document.body.classList.remove("body-dark");
    }
  },[theme])
  return <Layout />;
}

export default App;
