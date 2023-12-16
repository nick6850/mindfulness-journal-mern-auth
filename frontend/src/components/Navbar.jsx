import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authAndRecords";

function Navbar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authAndRecords);

  return (
    <div className="bg-blue-300 flex flex-col p-5">
      <div className="flex justify-end">
        {token && (
          <button
            onClick={() => dispatch(logout())}
            className="text-white bg-blue-400 px-3 py-1 text-xl font-semibold rounded-sm hover:bg-blue-500"
          >
            Log out
          </button>
        )}
      </div>
      <h1 className="text-center text-4xl text-white">Mindfulness Journal</h1>
    </div>
  );
}

export default Navbar;
