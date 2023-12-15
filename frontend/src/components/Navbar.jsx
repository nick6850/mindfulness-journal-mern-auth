import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authAndRecords";

function Navbar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authAndRecords);

  return (
    <div>
      <div className="w-screen flex justify-end p-5">
        {token && (
          <button
            onClick={() => dispatch(logout())}
            className="bg-blue-300 px-3 rounded-sm m-3"
          >
            Log out
          </button>
        )}
      </div>
      <h1 className="text-center text-4xl text-blue-50 mb-3">
        Mindfulness Journal
      </h1>
    </div>
  );
}

export default Navbar;
