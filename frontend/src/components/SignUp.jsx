import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authAndRecords";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading } = useSelector((state) => state.authAndRecords);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({ email, password }));
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <p>Register:</p>
      <label htmlFor="email">Your email:</label>
      <input
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Your password:</label>
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-400 text-white self-end px-4 mt-2 rounded-sm">
        Sing up
      </button>
      <div>{error && error}</div>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </form>
  );
}

export default SignUp;
