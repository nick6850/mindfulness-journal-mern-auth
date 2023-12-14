import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecords } from "../redux/authAndRecords";
import Record from "./Record";

function AllRecords() {
  const { records, isLoading, error } = useSelector(
    (state) => state.authAndRecords
  );
  const { token } = useSelector((state) => state.authAndRecords);

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchRecords());
    }
  }, [token]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

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
