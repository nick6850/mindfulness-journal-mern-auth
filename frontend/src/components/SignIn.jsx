import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
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
        Log in
      </button>
      <div>{error && error}</div>
    </form>
  );
}

export default SignIn;
