import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        padding: "16px",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        DataProtectSafe (Serwis webowy do bezpiecznego przechowywania kontaktów
        osobistych)
      </Typography>
      <Typography variant="body1">
        Katolicki Uniwersytet Lubelski Jana Pawła II
      </Typography>
      <Typography variant="body1">Informatyka I stopnia</Typography>
      <Typography variant="body1">Taras Kovtun 2024</Typography>
    </Box>
  );
};
