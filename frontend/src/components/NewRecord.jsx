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
      className="flex flex-col gap-1 bg-blue-300 p-6"
    >
      <button
        onClick={() => setIsAddingRecord(false)}
        className="self-end text-xl text-blue-800"
      >
        <CgCloseO />
      </button>
      <p>New record</p>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={newRecord.title}
        onChange={handleChange}
      />

      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={newRecord.content}
        onChange={handleChange}
        rows={5}
      />

      <label htmlFor="mood">Mood:</label>
      <select id="mood" value={newRecord.mood} onChange={handleChange}>
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
        value={newRecord.tags}
        onChange={handleChange}
      />

      <label htmlFor="recordDate">Record Date:</label>
      <input
        type="date"
        id="recordDate"
        value={newRecord.recordDate}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
      <p>{error && error}</p>
    </form>
  );
}

export default NewRecord;
