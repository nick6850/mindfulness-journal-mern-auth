import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authAndRecords";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, success } = useSelector(
    (state) => state.authAndRecords
  );
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({ email, password }));
  }

  return (
    <form
      className="flex flex-col p-5 mt-10 text-white w-96 m-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl mb-4 underline">Register</h1>
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
        Sign up
      </button>

      {!error ? (
        <p className="self-center mt-5">
          {success ? "You registered succesfully!" : "Already have an account?"}
          <Link to="/login">
            <span className="font-bold"> Login here.</span>
          </Link>
        </p>
      ) : (
        <div className="text-center">{error}</div>
      )}
    </form>
  );
}

export default SignUp;
