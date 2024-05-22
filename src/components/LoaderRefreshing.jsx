import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export const LoaderRefreshing = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <CircularProgress />
      <Typography variant="h6" component="p" marginTop={2}>
        Refreshing user...
      </Typography>
    </Box>
  );
};
