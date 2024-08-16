"use client";

import React from "react";
import getStripe from "@/utils/get-stripe";
import { useRouter } from "next/navigation";
import { Typography, Box, Button, Grid, Card, CardContent, CardActions } from "@mui/material";


export default function Home() {
  const router = useRouter();

  const handleAuthentication = () =>{
    router.push('/auth');
  };
  return (
    <>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
      </Box>

      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature item 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Feature 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Feature 1.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Feature item 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Feature 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Feature 2.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Feature item 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Feature 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Feature 3.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
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
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={handleAuthentication}>
                  Sign Up
                </Button>
              </CardActions>
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
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
