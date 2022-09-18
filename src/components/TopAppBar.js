import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PetsIcon from "@mui/icons-material/Pets";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import myTheme from "../myTheme";
import { Link, useLocation } from "react-router-dom";

const TopAppBar = ({ searchRecipe }) => {
  const location = useLocation();
  const color =
    location.pathname === "/"
      ? myTheme.palette.primary.main
      : myTheme.palette.black;

  const location_to_title = (location) => {
    switch (location.pathname) {
      case "/addDraft":
        return "Drafts";
      case "/editingDraft":
        return "Editing Draft";
      case "/":
      default:
        return "Bawkcipes";
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ background: color }}>
        <Toolbar>
          {location.pathname !== "/" ? (
            <Link
              to={location.pathname === "/editingDraft" ? "/addDraft" : "/"}
              color="inherit"
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Link>
          ) : (
            <PetsIcon
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            />
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ mr: "1%", flexGrow: 1 }}
          >
            {location_to_title(location)}
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              placeholder="Search..."
              sx={{
                input: { color: "white" },
                placeholder: { padding: 0 },
              }}
              onChange={(event) => searchRecipe(event.target.value)}
            />
            <div>
              <SearchIcon style={{ marginRight: "1%" }} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;
