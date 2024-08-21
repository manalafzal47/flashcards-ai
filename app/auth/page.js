"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Box} from "@mui/material";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box>
        {isSignUp ? (
          <SignUp routing="hash" forceRedirectUrl="/generate" />
        ) : (
          <SignIn routing="hash" forceRedirectUrl="/generate" />
        )}
      </Box>
    </Box>
  );
}
