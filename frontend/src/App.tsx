import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { UserData } from "./types";
import LoginForm from "./LoginForm";
import GameForm from "./GameForm";
function App() {
  const [userData, setUserData] = useState<UserData>({ username: "", id: -1  });

  return (
    <>
      <LoginForm userData={userData} setUserData={setUserData} />
      <GameForm userData={userData} />
    </>
  );
}

export default App;
