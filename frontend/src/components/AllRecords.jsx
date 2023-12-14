import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecords } from "../redux/recordsSlice";
import Record from "./Record";

function AllRecords() {
  const { records, isLoading, error } = useSelector((state) => state.records);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecords());
  }, []);

  if (records.length) {
    return (
      <>
        {records.map((record) => {
          return <Record key={record._id} record={record} />;
        })}
      </>
    );
  }
}

export default AllRecords;
