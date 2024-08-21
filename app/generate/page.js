"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useAuth, UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";

import {
  collection,
  setDoc,
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]); // Array to track flipped states
  const [text, setText] = useState("");
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(true); // Sidebar expand state
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();
  const { signOut } = useClerk();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }

    setLoading(true); // Start loading

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
      setFlipped(Array(data.length).fill(false)); // Initialize flipped states
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  // Flip card on click
  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

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

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box
        display={"flex"}
        width={"100vw"}
        height={"100vh"}
        backgroundColor={"#EEEEEE"}
      >
        {/* Side Nav Bar */}
        <Box
          margin={2}
          display={"flex"}
          flexDirection={"column"}
          width={expanded ? "250px" : "80px"} // Adjusted width when collapsed
          borderRadius={2}
          backgroundColor={"white"}
          height={"100vh"} // Ensures the sidebar takes up the full viewport height
        >
          <Box
            padding={2}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={expanded ? "space-between" : "center"}
            alignContent={"center"}
            alignItems={"center"}
          >
            {expanded && (
              <Typography variant="h6" fontWeight={"bold"}>
                Note AI
              </Typography>
            )}
            <IconButton onClick={toggleExpand}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Middle Content */}
          <Box
            padding={2}
            gap={1}
            display={"flex"}
            flexDirection={"column"}
            flexGrow={1} // Makes this box grow and take up the available space
          >
            {expanded && (
              <Typography variant="body2">Notes</Typography>
            )}
            {/* TODO -> Container for notes */}
            <Box></Box>
          </Box>

          {/* Bottom Buttons */}
          <Box marginBottom="5px" padding={2} gap={1} display={"flex"} flexDirection={"column"}>
            <Box
              gap={2}
              display={"flex"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <SettingsOutlinedIcon />
              {expanded && <Button variant="text">Settings</Button>}
            </Box>
            <Box
              gap={2}
              display={"flex"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <LogoutIcon />
              {expanded && (
                <Button
                  variant="text"
                  onClick={() => signOut({ redirectUrl: "/" })}
                >
                  Sign Out
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        {/* Main Feature */}
        <Box
          margin={2}
          borderRadius={2}
          display={"flex"}
          flexDirection={"column"}
          width={"100vw"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            textAlign={"center"}
            padding={2}
          >
            <Typography variant="h4" fontWeight={"bold"}>
              {" "}
              Review Notes{" "}
            </Typography>
            <UserButton showName={true} />
          </Box>
          <Box
            margin={2}
            borderRadius={2}
            textAlign={"center"}
            backgroundColor={"white"}
          >
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent", // Removes the default grey border
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent", // Removes the border when hovering
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent", // Removes the border when focused
                  },
                },
              }}
            />

            <Button
              marginBottom="10px"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Generate Flashcards
            </Button>
          </Box>

          {/* Loading Indicator */}
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="100px">
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Generating Flashcards...
              </Typography>
            </Box>
          )}

          {/* Flashcards Display */}
          <Container maxWidth="md">
            {flashcards.length > 0 && !loading && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Generated Flashcards
                </Typography>
                <Grid container spacing={2}>
                  {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          perspective: "1000px",
                          cursor: "pointer",
                          width: "300px",
                          height: "200px",
                        }}
                        onClick={() => handleFlip(index)}
                      >
                        <CardContent
                          sx={{
                            transformStyle: "preserve-3d",
                            transition: "transform 0.6s",
                            transform: flipped[index]
                              ? "rotateY(180deg)"
                              : "none",
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backfaceVisibility: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "white",
                              border: "1px solid #ddd",
                            }}
                          >
                            <Typography sx={{ textAlign: "center" }}>
                              {flashcard.front}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "white",
                              border: "1px solid #ddd",
                            }}
                          >
                            <Typography sx={{ textAlign: "center" }}>
                              {flashcard.back}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {flashcards.length > 0 && !loading && (
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

          <Box
            display={"flex"}
            margin={2}
            height={"200px"}
            borderRadius={2}
            alignItems={"center"}
            justifyContent={"center"}
            backgroundColor="white"
          >
            <Typography variant="h4" fontWeight={"bold"}>
              {" "}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            margin={2}
            borderRadius={2}
            justifyContent={"space-between"}
          >
            <Button
              sx={{ borderRadius: "2px", height: "40px" }}
              variant="contained"
            >
              {" "}
              Previous{" "}
            </Button>
            <Typography variant="body2"> 1 of 98 </Typography>
            <Button
              sx={{ borderRadius: "2px", height: "40px" }}
              variant="contained"
            >
              {" "}
              Next{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

