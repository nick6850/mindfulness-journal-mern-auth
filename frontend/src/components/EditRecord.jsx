import React, { useState } from "react";
import { editRecord } from "../redux/authAndRecords";
import { useDispatch } from "react-redux";
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
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

export default EditRecord;
