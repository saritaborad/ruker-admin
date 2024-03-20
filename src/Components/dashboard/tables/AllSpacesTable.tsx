import React from "react";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { NavigatedFrom } from "./../../../store/slices/adminSlice";
import { useAppDispatch } from "./../../../store/hooks";

const AllSpacesTable = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" separator={">"}>
        <Link
          color="inherit"
          to=""
          onClick={() => {
            dispatch(NavigatedFrom(false));
          }}
        >
          Space
        </Link>
        <Link color="inherit" to={""}>
          All Spaces
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default AllSpacesTable;
