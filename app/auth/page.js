"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {isSignUp ? (
        <SignUp routing="hash" forceRedirectUrl="/generate" />
      ) : (
        <SignIn routing="hash" forceRedirectUrl="/generate" />
      )}
    </div>
  );
}
