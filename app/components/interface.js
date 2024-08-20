"use client";

import { useState } from "react";
import { Container, TextField, Button, Typography, Box, IconButton, Grid } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  return (
    <Box display={"flex"} width={"100vw"} height={"100vh"} backgroundColor={"#EEEEEE"}>
      {/* Side Nav Bar */}
      <Box margin={2} display={"flex"} flexDirection={"column"} width={"250px"} borderRadius={2} backgroundColor={"white"} >
        <Box padding={2} display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignContent={"center"} alignItems={"center"}>
          <Typography variant="h6" fontWeight={"bold"}>Note AI</Typography>
          <MenuIcon/>
        </Box>
        <Box padding={2} gap={1} display={"flex"} flexDirection={"column"} height={"500px"}>
          <Typography variant="body2">Notes</Typography>
          {/* TODO -> Container for notes */}
          <Box>           
          </Box>
        </Box>
        <Box padding={2} gap={1} display={"flex"} flexDirection={"column"} >  
            <Box gap={2} display={"flex"} alignContent={"center"} alignItems={"center"}>
              <SettingsOutlinedIcon/>
              <Typography variant="body2">Settings</Typography>              
            </Box>
            <Box gap={2} display={"flex"} alignContent={"center"} alignItems={"center"}>
              <LogoutIcon/>
              <Button variant="text">Sign Out</Button>
              <Typography variant="body2">Sign out</Typography>              
            </Box>
        </Box>
      </Box>

      {/* Main Feature */}
      <Box margin={2} borderRadius={2} display={"flex"} flexDirection={"column"} width={"100vw"}>
        <Box textAlign={"center"} py={2}>
          <Typography variant="h4" fontWeight={"bold"} > Review Notes </Typography>
        </Box>

        <Box margin={2} borderRadius={2} textAlign={"center"}>
        <TextField backgroundColor={"white"} value={text} onChange={(e) => setText(e.target.value)} label="Enter text" fullWidth multiline rows={4} variant="outlined" sx={{ mb: 2 }}/>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Generate Flashcards
          </Button>
          {/* <Typography variant="h6"> No Notes Yet, Get started by uploading your study materials </Typography> */}
        </Box>

        <Box display={"flex"} margin={2} height={"200px"} borderRadius={2} alignItems={"center"} justifyContent={"center"} backgroundColor="white">
          <Typography variant="h4" fontWeight={"bold"}> What is Marketing? </Typography>
        </Box>

        <Box display={"flex"} margin={2} borderRadius={2} justifyContent={"space-between"}>
          <Button sx={{borderRadius:"2px", height:"40px"}} variant="contained"> Previous </Button>
          <Typography variant="body2"> 1 of 98 </Typography>
          <Button sx={{borderRadius:"2px", height:"40px"}} variant="contained"> Next </Button>
        </Box>
      </Box>
      



      {/* <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Generate Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Front:</Typography>
                      <Typography>{flashcard.front}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        Back:
                      </Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container> */}
    </Box>
  );
}

