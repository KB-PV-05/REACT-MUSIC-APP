import React, { useEffect, useState } from "react";
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, InputAdornment, IconButton, Menu, MenuItem, FormControlLabel, Checkbox, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";


const Overview = () => {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTypes, setFilterTypes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (type) => {
    setFilterTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredAlbums = albums.filter(
    (album) =>
      album.collectionName.toLowerCase().includes(search.toLowerCase()) &&
      (filterTypes.length === 0 || filterTypes.includes(album.type))
  );

  return (
    <Container maxWidth={false} disableGutters sx={{ width: "100vw", mx: "auto", px: 4 }}>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Overview
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 360 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

<Button
  variant="contained"
  onClick={handleFilterClick}
  endIcon={<ArrowDropDownIcon />}
  sx={{
    backgroundColor: "#ECEFF1",
    color: "black",
    boxShadow: "none",
    textTransform: "none",
    border: "none",
    ":hover": {
      backgroundColor: "#E3F2FD",
      boxShadow: "none",
      color: "#0d6efd",
      border: "1px solid #0d6efd", 
    },
  }}
>
  Type {filterTypes.length > 0 ? `(${filterTypes.length})` : ""}
</Button>


        
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {["Album", "EP", "Single"].map((type) => (
            <MenuItem key={type} onClick={() => handleCheckboxChange(type)}>
              <FormControlLabel
                control={<Checkbox checked={filterTypes.includes(type)} />}
                label={type}
              />
            </MenuItem>
          ))}
        </Menu>
      </Box>

      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Collection Name</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Song Count</strong></TableCell>
              <TableCell><strong>Duration</strong></TableCell>
              <TableCell><strong>Size</strong></TableCell>
              <TableCell><strong>Released On</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlbums.map((album) => (
              <TableRow key={album.id}>
                <TableCell>
                  <strong>{album.collectionName}</strong>
                  <br />
                  <small>{album.artistName}</small>
                </TableCell>
                <TableCell>{album.type}</TableCell>
                <TableCell>{album.songCount}</TableCell>
                <TableCell>{album.duration}</TableCell>
                <TableCell>{album.size}</TableCell>
                <TableCell>{album.releasedOn}</TableCell>
                <TableCell>
  <Link
    to={`/collection/${album.id}`}
    style={{
      display: "flex",
      alignItems: "center",
      color: "#0d6efd",
      textDecoration: "none",
      fontWeight: 500,
    }}
  >
    <VisibilityIcon sx={{ fontSize: 18, marginRight: 4 }} />
    <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
      View Details
    </Typography>
  </Link>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Overview;
