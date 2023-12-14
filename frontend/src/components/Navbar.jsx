import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authAndRecords";

function Navbar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authAndRecords);

  if (token) {
    return (
      <button
        onClick={() => dispatch(logout())}
        className="bg-blue-300 px-3 rounded-sm m-3"
      >
        Log out
      </button>
    );
  }
}

export default Navbar;
