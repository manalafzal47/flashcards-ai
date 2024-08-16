"use client";

import { SignInButton, SignUp, SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/auth") {
      router.push("/auth/signup");
    }
  }, [router]);

  return (
    <>
      <SignedOut>
        <SignUp path="/auth/signup" routing="path" />
      </SignedOut>
      <SignedIn>{router.push("/")}</SignedIn>
    </>
  );
}
