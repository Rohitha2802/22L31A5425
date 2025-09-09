import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useLogger } from "../context/LoggerContext";
import { generateShortcode, saveUrlMapping } from "../utils/urlHelpers";

const UrlForm = () => {
  const { logEvent } = useLogger();
  const [urls, setUrls] = useState([{ longUrl: "", validity: 30, shortcode: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    urls.forEach((u) => {
      if (!u.longUrl.startsWith("http")) {
        logEvent("Invalid URL entered", "error");
        return;
      }
      const shortcode = u.shortcode || generateShortcode();
      saveUrlMapping(u.longUrl, shortcode, u.validity);
      logEvent(`Short URL created: ${shortcode}`, "success");
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {urls.map((u, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Long URL"
            fullWidth
            value={u.longUrl}
            onChange={(e) => handleChange(i, "longUrl", e.target.value)}
          />
          <TextField
            label="Validity (min)"
            type="number"
            value={u.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
            sx={{ width: 120 }}
          />
          <TextField
            label="Custom Shortcode"
            value={u.shortcode}
            onChange={(e) => handleChange(i, "shortcode", e.target.value)}
            sx={{ width: 160 }}
          />
        </Box>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Shorten URLs
      </Button>
    </Box>
  );
};

export default UrlForm;
