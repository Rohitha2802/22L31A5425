import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

function App() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [level, setLevel] = useState("info");
  const [pkg, setPkg] = useState("style");

  // Snackbar state
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(true); // show success snackbar
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        AffordMed Logging Test
      </Typography>

      <TextField
        label="Auth Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Level"
        select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="info">Info</MenuItem>
        <MenuItem value="warning">Warning</MenuItem>
        <MenuItem value="error">Error</MenuItem>
      </TextField>
      <TextField
        label="Package"
        select
        value={pkg}
        onChange={(e) => setPkg(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="style">Style</MenuItem>
        <MenuItem value="component">Component</MenuItem>
        <MenuItem value="utils">Utils</MenuItem>
      </TextField>

      <Box textAlign="center" mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          SEND LOG
        </Button>
      </Box>

    
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          ✅ Log sent successfully! (Message: {message})
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default App;
