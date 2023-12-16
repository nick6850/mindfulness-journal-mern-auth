import React, { useState } from "react";
import { editRecord } from "../redux/authAndRecords";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseO } from "react-icons/cg";

function EditRecord({
  content,
  mood,
  recordDate,
  tags,
  title,
  setIsEdited,
  _id,
}) {
  const formattedDate = new Date(recordDate).toISOString().split("T")[0];

  const [newRecord, setNewRecord] = useState({
    content,
    mood,
    recordDate: formattedDate,
    tags,
    title,
  });

  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.authAndRecords);

  function handleChange(e) {
    setNewRecord((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { title, content, mood, tags, recordDate } = newRecord;
    if (!title || !content || !mood || !tags || !recordDate) {
      return;
    }

    dispatch(editRecord({ newRecord, _id }));
    setIsEdited(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-1 bg-blue-300 p-6 rounded-sm text-blue-800 font-semibold mb-3"
    >
      <button onClick={() => setIsEdited(false)} className="self-end text-xl">
        <CgCloseO />
      </button>

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
        defaultValue={newRecord.recordDate}
        onChange={handleChange}
      />

      <button className="mt-3 text-xl">Submit</button>
      <p>{error && error}</p>
    </form>
  );
}

export default EditRecord;
