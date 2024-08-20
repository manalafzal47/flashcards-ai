import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from "@mui/material";
import DevicesIcon from '@mui/icons-material/Devices';
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import React from "react";
import Navbar from "./nav"

const Homepage = () => {

  const router = useRouter();

    const handleAuthentication = () =>{
        router.push('/auth');
    };

  return (
    <>
      <Navbar/>
      {/* MAIN */}
      <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          height: '650px',
          width: '100wv',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px',
            marginTop: '60px'
          }}
        >
          Be the first to <br /> boost your <br /> memory
        </Typography>
        <Typography variant="p" width={"550px"} sx={{ textAlign: 'center', marginBottom:"40px"}}>
          Unlock your full potential with our AI-powered flashcard app. 
          Designed to help you master coding concepts effortlessly, 
          our innovative platform adapts to your learning style, 
          making studying more efficient and effective. 
          Join our waitlist today and be among the first to experience smarter, faster learning.
        </Typography>
        <Button onClick={handleAuthentication} sx={{borderRadius:"2px", height:"40px"}} variant="contained"> Try it for free</Button>
      </Box>

      {/* Features */}
      <Box py={1} alignItems={"center"} sx={{padding: 10, display: "flex", flexDirection:"column"}}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Features
          </Typography>
          {/* Feature 1 */}
          <Grid container spacing={4} justifyContent="center" alignItems={"center"} sx={{ mt: 4 }}>
            <Grid item xs={12} md={3} padding={5} margin={5} border={"solid 2px"}
              sx={{ '&:hover': {backgroundColor: 'black', boxShadow: '20px 8px 20px rgba(0, 0, 0, 0.1)', transform: 'scale(1.10)', color:'white'}}} >
              <Box sx={{ textAlign: 'center', p: 3, }}>
                <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Smart, Personalized Learning</Typography>
                <Typography variant="p" color="textSecondary">
                  AI adapts to your pace, focusing on areas you need to improve for efficient learning.
                </Typography>
              </Box>
            </Grid>            
            {/* Feature 2 */}
            <Grid item xs={12} md={3} padding={5} margin={5} border={"solid 2px"}
              sx={{ '&:hover': {backgroundColor: 'black', boxShadow: '20px 8px 20px rgba(0, 0, 0, 0.1)', transform: 'scale(1.10)', color:'white'}}} >
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Instant Flashcards</Typography>
                <Typography color="textSecondary">
                  Automatically generate flashcards from your notes or documents in seconds.
                </Typography>
              </Box>
            </Grid>
            {/* Feature 3 */}
            <Grid item xs={12} md={3} padding={5} margin={5} border={"solid 2px"}
              sx={{ '&:hover': {backgroundColor: 'black', boxShadow: '20px 8px 20px rgba(0, 0, 0, 0.1)', transform: 'scale(1.10)', color:'white',}}} >
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
                <Typography color="textSecondary">
                  Access your flashcards from any device, at any time. Study on the go with ease and flexibility.
                </Typography>
              </Box>
            </Grid>
            {/* Feature 4 */}
            <Grid item xs={12} md={5} padding={5} margin={5} border={"solid 2px"}
              sx={{ '&:hover': {backgroundColor: 'black', boxShadow: '20px 8px 20px rgba(0, 0, 0, 0.1)', transform: 'scale(1.10)', color:'white'}}} >
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
                <Typography color="textSecondary">
                  Access your flashcards from any device, at any time. Study on the go with ease and flexibility.
                </Typography>
              </Box>
            </Grid>
            {/* Feature 5 */}
            <Grid item xs={12} md={5} padding={5} margin={5} border={"solid 2px"}
              sx={{ '&:hover': {backgroundColor: 'black', boxShadow: '20px 8px 20px rgba(0, 0, 0, 0.1)', transform: 'scale(1.10)', color:'white'}}} >
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
                <Typography color="textSecondary">
                  Access your flashcards from any device, at any time. Study on the go with ease and flexibility.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

      {/* Pricing */}
      <Box sx={{ py: 7, textAlign: "center", backgroundColor:"black", color:"white"}}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Free Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Free Plan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $0 / month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Basic features with limited access.
                  </Typography>
                  <Button href="/" fontWeight={"bold"} sx={{marginLeft: "20px", borderRadius:"2px", height:"35px", fontWeight:"bold", 
                    // backgroundColor:"#f8fbfb", color:"black"
                    }} 
                    variant="contained"
                  > Sign Up </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* Pro Plan */}
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Pro Plan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    $5 / month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access to all features with premium support.
                  </Typography>
                  <Button href="/" fontWeight={"bold"} sx={{marginLeft: "20px", borderRadius:"2px", height:"35px", fontWeight:"bold", 
                    // backgroundColor:"#f8fbfb", color:"black"
                    }} 
                    variant="contained"
                  > Sign Up </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ py: 4}}>
        <Box maxWidth="lg">
          <Typography variant="body1" color="black" align="center">
            © {new Date().getFullYear()} FlashAI. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;