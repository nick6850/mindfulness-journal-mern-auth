import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authAndRecords";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, token } = useSelector(
    (state) => state.authAndRecords
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <p>Log in:</p>
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
      <p>
        Don't have an account yet? <Link to="/register">Sing up here.</Link>
      </p>
    </form>
  );
}

export default SignIn;
