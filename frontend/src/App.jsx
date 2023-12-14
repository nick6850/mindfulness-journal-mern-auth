import React from "react";
import AllRecords from "./components/AllRecords";
import NewRecord from "./components/NewRecord";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-400 flex flex-col items-center justify-center ">
      <div className="bg-blue-300 w-fit h-96 p-6">
        <NewRecord />
        <AllRecords />
        <SignIn />
      </div>
    </div>
  );
}

export default App;
