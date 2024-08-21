"use client";

import React from "react";
import getStripe from "@/utils/get-stripe";
import { useRouter } from "next/navigation";
import { Typography, Box, Button, Grid, Card, CardContent, CardActions } from "@mui/material";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";
import Homepage from "./components/homepage";

export default function Home() {

  let theme = createTheme({
    typography: {
      fontFamily: '', // Change to your desired font
    },
    shadows: ["none"],
  });
  
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Homepage/>
    </ThemeProvider>
  );
}
