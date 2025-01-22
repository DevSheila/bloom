import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-green-300">
        Hello world!
      </h1>
      <div>
      <Button>Click me</Button>
    </div>
    </>
  );
}

export default App;
