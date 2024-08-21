import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import SchoolIcon from "@mui/icons-material/School";

import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import React from "react";
// import Navbar from "./nav";
import getStripe from "@/utils/get-stripe";

const Homepage = () => {
  const router = useRouter();

 const { user, session } = useClerk();

 const handleAuthentication = () => {
   router.push("/auth");
 };

 const handleSubmit = async () => {
   // Check if the user is authenticated
   if (!session) {
     // If not authenticated, redirect to the authentication page
     handleAuthentication();
     return;
   }

   // Proceed with Stripe checkout if authenticated
   const checkoutSession = await fetch("/api/checkout_session", {
     method: "POST",
     headers: { origin: "http://localhost:3000/" },
   });
   const checkoutSessionJson = await checkoutSession.json();

   const stripe = await getStripe();
   const { error } = await stripe.redirectToCheckout({
     sessionId: checkoutSessionJson.id,
   });

   if (error) {
     console.warn(error.message);
   }
 };
  return (
    <>
      {/* <Navbar /> */}
      {/* MAIN */}
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            marginTop: "60px",
          }}
        >
          Be the first to <br /> boost your <br /> memory
        </Typography>
        <Typography
          variant="p"
          width={"550px"}
          sx={{ textAlign: "center", marginBottom: "40px" }}
        >
          Unlock your full potential with our AI-powered flashcard app. Designed
          to help you master coding concepts effortlessly, our innovative
          platform adapts to your learning style, making studying more efficient
          and effective. Join our waitlist today and be among the first to
          experience smarter, faster learning.
        </Typography>
        <Button
          href="/"
          sx={{
            borderRadius: "4px",
            height: "45px",
            fontWeight: "bold",
            backgroundColor: "#f8fbfb",
            color: "black",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
          variant="contained"
        >
          Try it for free
        </Button>
      </Box>

      {/* Features */}
      <Box
        py={5}
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Features
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ maxWidth: "1200px", mt: 4 }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "white",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#333",
                  color: "white",
                },
              }}
            >
              <SchoolIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Smart, Personalized Learning
              </Typography>
              <Typography variant="body2">
                AI adapts to your pace, focusing on areas you need to improve
                for efficient learning.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "white",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#333",
                  color: "white",
                },
              }}
            >
              <FlashOnIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Instant Flashcards
              </Typography>
              <Typography variant="body2">
                Automatically generate flashcards from your notes or documents
                in seconds.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "white",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#333",
                  color: "white",
                },
              }}
            >
              <DevicesIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Accessible Anywhere
              </Typography>
              <Typography variant="body2">
                Access your flashcards from any device, at any time. Study on
                the go with ease and flexibility.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "white",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#333",
                  color: "white",
                },
              }}
            >
              <IntegrationInstructionsIcon
                color="primary"
                sx={{ fontSize: 60, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Seamless Integration
              </Typography>
              <Typography variant="body2">
                Effortlessly integrate with other tools and platforms for a
                unified learning experience.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "white",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#333",
                  color: "white",
                },
              }}
            >
              <TrendingUpIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Track Your Progress
              </Typography>
              <Typography variant="body2">
                Monitor your learning progress with detailed analytics and
                insights.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Pricing */}
      <Box
        sx={{
          height: "100vh",
          py: 7,
          alignItem: "center",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Typography
          marginTop="10vh"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Pricing
        </Typography>
        <Grid
          container
          spacing={4}
          marginTop="20px"
          justifyContent="center"
          alignItems="stretch"
        >
          {/* Free Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 2,
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Free Plan
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  $0 / month
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Basic features with limited access:
                </Typography>
                <ul
                  style={{
                    marginTop: "50px",
                    textAlign: "left",
                    paddingLeft: "20px",
                  }}
                >
                  <li>Basic Flashcards Creation</li>
                  <li>Access to Public Flashcards</li>
                  <li>Standard Study Mode</li>
                  <li>Limited Storage</li>
                  <li>Community Support</li>
                </ul>
              </CardContent>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  href="/"
                  sx={{
                    borderRadius: "4px",
                    height: "45px",
                    fontWeight: "bold",
                    backgroundColor: "#f8fbfb",
                    color: "black",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </Box>
            </Card>
          </Grid>
          {/* Pro Plan */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 2,
                background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient effect
                color: "white",
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                <Typography variant="h5" component="div" gutterBottom>
                  Pro Plan
                </Typography>
                <Typography variant="body2" gutterBottom>
                  $5 / month
                </Typography>
                <Typography variant="body2">
                  Access to all features with premium perks:
                </Typography>
                <ul
                  style={{
                    marginTop: "30px",
                    textAlign: "left",
                    paddingLeft: "20px",
                  }}
                >
                  <li>Unlimited Flashcards</li>
                  <li>Advanced Study Modes</li>
                  <li>Priority Customer Support</li>
                  <li>Custom Flashcard Design</li>
                  <li>Offline Access</li>
                  <li>Analytics & Insights</li>
                  <li>Ad-Free Experience</li>
                </ul>
              </CardContent>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                //   href="/stripe"
                  sx={{
                    borderRadius: "4px",
                    height: "45px",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ py: 4 }}>
        <Box maxWidth="lg">
          <Typography variant="body1" color="black" textAlign="center">
            © {new Date().getFullYear()} FlashAI. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
