import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecord } from "../redux/authAndRecords";
import EditRecord from "./EditRecord";

function Record(props) {
  const { _id, content, mood, recordDate, tags, title } = props.record;
  const [isEdited, setIsEdited] = useState(false);

  const formattedDate = new Date(recordDate).toLocaleDateString();
  const dispatch = useDispatch();

  if (isEdited) {
    return <EditRecord setIsEdited={setIsEdited} {...props.record} />;
  }

  return (
    <div className="border p-3 rounded-sm bg-blue-400 text-blue-50">
      <div>{title}</div>
      <div>{content}</div>
      <div>{mood}</div>
      <div>[{tags.join(", ")}]</div>
      <div>{formattedDate}</div>
      <button onClick={() => dispatch(deleteRecord(_id))}>X</button>
      <button onClick={() => setIsEdited(true)}>Edit</button>
    </div>
  );
}

export default Record;
