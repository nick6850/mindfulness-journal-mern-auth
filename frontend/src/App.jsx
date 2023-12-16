import React, { useEffect, useState } from "react";
import AllRecords from "./components/AllRecords";
import NewRecord from "./components/NewRecord";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.authAndRecords);
  const navigate = useNavigate();

  const [isAddingRecord, setIsAddingRecord] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
  }, [token]);

  return (
    <div className="w-screen h-fit min-h-screen flex flex-col items-center   gap-6 pt-4">
      <div className="w-96 h-fit">
        {isAddingRecord ? (
          <NewRecord setIsAddingRecord={setIsAddingRecord} />
        ) : (
          <input
            className="p-4 w-full border-none rounded-sm"
            onClick={() => setIsAddingRecord(true)}
            type:text
            placeholder="Add new record..."
          />
        )}
      </div>
      <div className=" w-96 mb-3">
        <AllRecords />
      </div>
    </div>
  );
}

export default App;
