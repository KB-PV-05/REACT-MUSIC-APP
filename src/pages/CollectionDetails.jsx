import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Box,
} from "@mui/material";

const CollectionDetails = () => {
  const { id } = useParams(); 
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/albums")
      .then((res) => res.json())
      .then((data) => {
        const foundAlbum = data.find((a) => a.id === id);
        setAlbum(foundAlbum);
      });

    fetch("http://localhost:3002/songs")
      .then((res) => res.json())
      .then((data) => {
        const albumSongs = data.filter((song) => song.album === id);
        setSongs(albumSongs);
      });
  }, [id]);

  if (!album) return <Typography sx={{ mt: 5 }}>Loading...</Typography>;

  return (
    <Container maxWidth={false} disableGutters sx={{ width: "100vw", mx: "auto", px: 4, bgcolor: "#f0f7ff" ,minHeight: "100vh" }}>
      
      <Box sx={{ mt: 1, mb: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "#757575", fontSize: "14px" }}>
          Overview
        </Link>
        {" > "}
        <Typography component="span" sx={{ fontSize: "14px", color: "#333" }}>
          {album.collectionName}
        </Typography>
      </Box>

      {/* Album Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2,bgcolor: "white", py: 2, px: 2}}>
        {album.collectionName}
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3, boxShadow: "none", border: "none" }}>
  <Table sx={{ border: "none" }}>
    <TableHead>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}><strong>Artist</strong></TableCell>
        <TableCell sx={{ borderBottom: "none" }}><strong>Type</strong></TableCell>
        <TableCell sx={{ borderBottom: "none" }}><strong>Song Count</strong></TableCell>
        <TableCell sx={{ borderBottom: "none" }}><strong>Total Size</strong></TableCell>
        <TableCell sx={{ borderBottom: "none" }}><strong>Total Duration</strong></TableCell>
        <TableCell sx={{ borderBottom: "none" }}><strong>Released On</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell sx={{ borderBottom: "none" }}>{album.artistName}</TableCell>
        <TableCell sx={{ borderBottom: "none" }}>{album.type}</TableCell>
        <TableCell sx={{ borderBottom: "none" }}>{album.songCount}</TableCell>
        <TableCell sx={{ borderBottom: "none" }}>{album.size}</TableCell>
        <TableCell sx={{ borderBottom: "none" }}>{album.duration}</TableCell>
        <TableCell sx={{ borderBottom: "none" }}>{album.releasedOn}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>




      {/* Songs Table */}
      <TableContainer component={Paper} sx={{mb :10}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Song</strong></TableCell>
              <TableCell><strong>Performers</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Size</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <TableRow key={index}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.performers}</TableCell>
                  <TableCell>{song.duration}</TableCell>
                  <TableCell>{song.size}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No songs found for this album.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CollectionDetails;
