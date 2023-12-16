import React, { useState } from "react";
import { createRecord } from "../redux/authAndRecords";
import { useDispatch } from "react-redux";
import { CgCloseO } from "react-icons/cg";
function NewRecord({ setIsAddingRecord }) {
  const [newRecord, setNewRecord] = useState({
    title: "",
    content: "",
    mood: "",
    tags: "",
    recordDate: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    setError("");
    setNewRecord((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, content, mood, tags, recordDate } = newRecord;
    if (!title || !content || !mood || !tags || !recordDate) {
      setError("Please fill in all the fields");
      return;
    }

    dispatch(createRecord(newRecord));
    setNewRecord({
      title: "",
      content: "",
      mood: "",
      tags: "",
      recordDate: new Date().toISOString().split("T")[0],
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-1 bg-blue-300 p-6 rounded-sm text-blue-800 font-semibold"
    >
      <button
        onClick={() => setIsAddingRecord(false)}
        className="self-end text-xl"
      >
        <CgCloseO />
      </button>
      <p className="mb-2 text-xl">New record</p>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        className="px-3 text-black"
        value={newRecord.title}
        onChange={handleChange}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        className="px-3 text-black"
        value={newRecord.content}
        onChange={handleChange}
        rows={5}
      />

      <label htmlFor="mood">Mood:</label>
      <select
        id="mood"
        value={newRecord.mood}
        onChange={handleChange}
        className="text-black"
      >
        <option value="" disabled>
          Select Mood
        </option>
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Calm">Calm</option>
        <option value="Stressed">Stressed</option>
        <option value="Excited">Excited</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        id="tags"
        className="px-3 py-1 text-black"
        value={newRecord.tags}
        onChange={handleChange}
      />

      <label htmlFor="recordDate">Record Date:</label>
      <input
        type="date"
        id="recordDate"
        className="text-black"
        value={newRecord.recordDate}
        onChange={handleChange}
      />

      <button type="submit" className="mt-3 text-xl">
        Submit
      </button>
      <p>{error && error}</p>
    </form>
  );
}

export default NewRecord;
