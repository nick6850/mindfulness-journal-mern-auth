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
    <form
      className="flex flex-col p-5 mt-10 text-white w-96 m-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl mb-4 underline">Log in</h1>
      <label htmlFor="email">Your email:</label>
      <input
        type="text"
        id="email"
        className="text-black px-3 mt-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className="mt-3">
        Your password:
      </label>
      <input
        type="password"
        id="password"
        className="text-black px-3  mt-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="text-xl text-white self-end px-4 mt-2 rounded-sm">
        Log in
      </button>
      <div>{error && error}</div>
      <p className="self-center mt-5">
        Don't have an account yet?{" "}
        <Link to="/register">
          <span className="font-bold">Sing up here.</span>
        </Link>
      </p>
    </form>
  );
}

export default SignIn;
