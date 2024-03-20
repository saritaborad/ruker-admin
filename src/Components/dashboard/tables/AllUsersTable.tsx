import React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { NavigatedFrom } from "./../../../store/slices/adminSlice";
import { useAppDispatch } from "./../../../store/hooks";

const AllUsersTable = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" separator={">"}>
        <Link
          to=""
          onClick={() => {
            dispatch(NavigatedFrom(false));
          }}
        >
          User
        </Link>
        <Link to={""}>All users</Link>
      </Breadcrumbs>
    </div>
  );
};

export default AllUsersTable;
