import Image from "next/image";
import getStripe from '@/utils/get-stripe'
import {   ClerkProvider,  SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Head from 'next/head'
import { Container, Button, Typography, AppBar , Toolbar, Box} from '@mui/material'

export default function Home() {
  return(
    <Container maxWidth="100vh">
    <Head>
      <title>Flashcards AI</title>
      <meta name = "description" content="Create flashcard from your text"/>
    </Head>

    <AppBar position="static">
      <Toolbar >
      <Typography variant="h6" style={{flexGrow:1}}>Flashcards AI</Typography>
      <SignedOut>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Sign Up</Button>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
      </Toolbar>
    </AppBar>

    <Box
    sx={{
      textAlign: 'center',
      my:4,
    }}
    >
      <Typography variant="h2">Welcome to Flashcard AI</Typography>
      <Typography variant = "h5">
        {' '}
        The easiest way to add flashcards from your text
      </Typography>
      <Button variant="contained" color="primary"></Button>
    </Box>

    <Box sx={{my:6}}>
      <Typography variant="h4" component="h2"></Typography>

    </Box>
  </Container>
   
  )
}

