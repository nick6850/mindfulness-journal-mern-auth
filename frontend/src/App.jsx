import React, { useEffect } from "react";
import AllRecords from "./components/AllRecords";
import NewRecord from "./components/NewRecord";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.authAndRecords);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token]);

  return (
    <div className=" bg-blue-400">
      <div className="w-screen h-screen flex flex-col items-center justify-center ">
        <div className="bg-blue-300 w-fit h-96 p-6">
          <NewRecord />
          <AllRecords />
        </div>
      </div>
    </div>
  );
}

export default App;
