import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getMappings } from "../utils/urlHelpers";

const StatsPage = () => {
  const mappings = getMappings();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Total Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappings.map((m) => (
              <TableRow key={m.shortcode}>
                <TableCell>{m.shortcode}</TableCell>
                <TableCell>
                  <a href={m.longUrl} target="_blank" rel="noreferrer">
                    {m.longUrl}
                  </a>
                </TableCell>
                <TableCell>
                  {new Date(m.created).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(m.expiry).toLocaleString()}
                </TableCell>
                <TableCell>{m.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {mappings.map((m) => (
        <Accordion key={m.shortcode}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Logs for: {m.shortcode}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {m.clickLogs.length === 0 ? (
              <Typography>No clicks yet.</Typography>
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Referrer</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {m.clickLogs.map((log, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>{log.referrer}</TableCell>
                      <TableCell>{log.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default StatsPage;
