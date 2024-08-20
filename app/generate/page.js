"use client";

import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";

import { collection, setDoc, doc, getDoc, writeBatch } from "firebase/firestore";
import {db} from "../firebase/config";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

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
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Saving flashcards to firebase
  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const { getToken } = useAuth();

  const { signOut } = useClerk();

  return (
    <>
      <Container maxWidth="md">
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
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Save your Flashcards
            </Button>
          </Box>
        )}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Save Flashcard Set</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your flashcard set.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Set Name"
              type="text"
              fullWidth
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={saveFlashcards} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
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
          <Box padding={2} gap={1} display={"flex"} flexDirection={"column"}>  
              <Box gap={2} display={"flex"} alignContent={"center"} alignItems={"center"}>
                <Button variant="text"> <SettingsOutlinedIcon/> Settings </Button>            
              </Box>
              <Box gap={2} display={"flex"} alignContent={"center"} alignItems={"center"}>                
                <Button variant="text" onClick={() => signOut({ redirectUrl: "/" })}> <LogoutIcon/> Sign Out</Button>
              </Box>
          </Box>
        </Box>

        {/* Main Feature */}
        <Box margin={2} borderRadius={2} display={"flex"} flexDirection={"column"} width={"100vw"}>
          <Box display={"flex"} justifyContent={"space-between"} textAlign={"center"} padding={2}>
            <Typography variant="h4" fontWeight={"bold"} > Review Notes </Typography>
            <UserButton showName={true} />
          </Box>
          <Box margin={2} borderRadius={2} textAlign={"center"} backgroundColor={"white"} >
          <TextField value={text} onChange={(e) => setText(e.target.value)} label="Enter text" fullWidth multiline rows={4} variant="outlined" sx={{ mb: 2 }}/>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Generate Flashcards
            </Button>
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
      </Box>
    </>
  );
}