import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: "#F8F9FA",
        px: 15,
        py: 8,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Skeleton
        sx={{ bgcolor: "grey" }}
        variant="rectangular"
        width={300}
        height={315}
      />
      <Skeleton
        sx={{ bgcolor: "grey" }}
        variant="rectangular"
        width={300}
        height={315}
      />
      <Skeleton
        sx={{ bgcolor: "grey" }}
        variant="rectangular"
        width={350}
        height={315}
      />
    </Box>
  );
}
