import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleAuthentication = () => {
    router.push("/auth");
  };

  const scrollToSection = (sectionId) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    //         <AppBar position="fixed" sx={{ backgroundColor: 'black', color: 'white', fontFamily:""}}>
    //             <Toolbar sx={{ justifyContent: "space-between" }}>
    //                 <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontStyle:"bold", fontWeight:"bold" }}> FlashAI </Typography>
    //                 {/* <Button color="inherit"> Home </Button>             */}
    //                 <Button color="inherit"> Features </Button>
    //                 <Button color="inherit"> Pricing </Button>
    //                 {/* <Button href="/" fontWeight={"bold"} sx={{marginLeft: "20px", borderRadius:"2px", height:"35px", fontWeight:"bold",
    //                 // backgroundColor:"#f8fbfb", color:"black"
    //                 }}
    //                 variant="contained"
    //                 > Sign Up </Button> */}
    //                 {/* <Button onClick={handleAuthentication} sx={{marginLeft: "20px", borderRadius:"2px", height:"35px", fontWeight:"bold",
    //                 // backgroundColor:"#f8fbfb", color:"black"
    //                 }}
    //                 variant="contained"
    //                 > Log In</Button> */}
    //             </Toolbar>
    //         </AppBar>
    //     );
    // };
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "black", color: "white", fontFamily: "" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontStyle: "bold", fontWeight: "bold" }}
        >
          FlashAI
        </Typography>
        <Button color="inherit" onClick={() => scrollToSection("features")}>
          Features
        </Button>
        <Button color="inherit" onClick={() => scrollToSection("pricing")}>
          Pricing
        </Button>
         <Button onClick={handleAuthentication} sx={{marginLeft: "20px", borderRadius:"2px", height:"35px", fontWeight:"bold",
                    // backgroundColor:"#f8fbfb", color:"black"
                    }}
                   variant="contained"
                    > Get Started</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;