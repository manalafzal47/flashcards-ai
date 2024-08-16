// components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";

const Navbar = () => {
    const { getToken } = useAuth();

    const { signOut } = useClerk();


  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Note AI</Typography>

        <>
          <UserButton showName={true} />

          <Button color="inherit" onClick={() => signOut({ redirectUrl: "/" })}>
            Sign Out
          </Button>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
