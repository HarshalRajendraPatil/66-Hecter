import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="mt-16 text-center p-10">
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
