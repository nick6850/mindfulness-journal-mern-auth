import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecord } from "../redux/authAndRecords";
import EditRecord from "./EditRecord";
import { CgCloseO, CgPen } from "react-icons/cg";

function Record(props) {
  const { _id, content, mood, recordDate, tags, title } = props.record;
  const [isEdited, setIsEdited] = useState(false);

  const formattedDate = new Date(recordDate).toLocaleDateString();
  const dispatch = useDispatch();

  if (isEdited) {
    return <EditRecord setIsEdited={setIsEdited} {...props.record} />;
  }

  return (
    <div className=" p-4 rounded-sm bg-blue-300 flex flex-col text-blue-800">
      <div className="self-end flex gap-2 ">
        <button className="w-min " onClick={() => setIsEdited(true)}>
          <CgPen />
        </button>
        <button className="w-min " onClick={() => dispatch(deleteRecord(_id))}>
          <CgCloseO />
        </button>
      </div>

      <span className="font-semibold mt-3">Title:</span>
      <div className="mb-3 bg-blue-50 text-blue-800 px-3 py-2 rounded-md mt-1">
        {title}
      </div>
      <span className="font-semibold">Description:</span>
      <div className="mb-3 bg-blue-50 text-blue-800 px-3 py-2 rounded-md mt-1">
        {content}
      </div>
      <span className="font-semibold">Mood:</span>
      <div className="mb-3 bg-blue-50 text-blue-800 px-3 py-2 rounded-md mt-1">
        {mood}
      </div>
      <div className="self-end text-center text-xs opacity-80 font-bold">
        [{tags.join(", ")}]<div>{formattedDate}</div>
      </div>
    </div>
  );
}

export default Record;
