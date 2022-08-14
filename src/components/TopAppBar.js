import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PetsIcon from "@mui/icons-material/Pets";
import myTheme from "../myTheme";

const TopAppBar = ({ title, toMain, toAdd }) => {
  const color =
    title === "Bawkcipes"
      ? myTheme.palette.primary.main
      : myTheme.palette.black;
  console.log(title);
  console.log(color);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ background: color }}>
        <Toolbar>
          {title !== "Bawkcipes" ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={title === "Editing Recipe" ? toAdd : toMain}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <PetsIcon
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            />
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;
