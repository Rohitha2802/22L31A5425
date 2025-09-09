import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { createMapping, getMappings } from "../utils/urlHelpers";
import { useNavigate } from "react-router-dom";

const ShortenerPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");
  const [mappings, setMappings] = useState(getMappings());
  const navigate = useNavigate();

  const handleShorten = () => {
    if (!longUrl.startsWith("http")) {
      alert("Please enter a valid URL (starting with http/https)");
      return;
    }
    const newMapping = createMapping(longUrl, validity, shortcode);
    setMappings([...mappings, newMapping]);
    setLongUrl("");
    setShortcode("");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        React URL Shortener
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          fullWidth
        />
        <TextField
          label="Validity (minutes)"
          type="number"
          value={validity}
          onChange={(e) => setValidity(Number(e.target.value))}
          sx={{ width: 150 }}
        />
        <TextField
          label="Custom Shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          sx={{ width: 200 }}
        />
        <Button variant="contained" onClick={handleShorten}>
          Shorten
        </Button>
      </Box>

      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => navigate("/stats")}
      >
        View Stats
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Expiry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappings.map((m) => (
              <TableRow key={m.shortcode}>
                <TableCell>
                  <a
                    href={`/${m.shortcode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {window.location.origin}/{m.shortcode}
                  </a>
                </TableCell>
                <TableCell>{m.longUrl}</TableCell>
                <TableCell>
                  {new Date(m.expiry).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShortenerPage;
