import { Logout } from "@mui/icons-material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import PlaceIcon from "@mui/icons-material/Place";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import Logo1 from "../assets/images/Logo1.png";
import "../component.css/HeaderStyle.css";

const Search = styled("div")(({ theme }) => ({
  flex: 1,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  backgroundColor: "#F4F2E9", // White background
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Box shadow for depth
  "&:hover": {
    backgroundColor: "#FEFDF7", // Lighter white on hover
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  display: "flex",
  // alignItems : "center",
  // justifyContent : "center",
  width: "75%",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(3),
  //   marginRight: theme.spacing(3),
  //   width: "auto",
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "#333333",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#333333",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    "&::placeholder": {
      color: "#707B7C", // Lighter color for placeholder text
    },
  },
}));

function Navbar() {
  //mui code for menu - profile pop up
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //check is user is logged in or not
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <AppBar position="static" className="app-bar">
      <Box maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Box
              component="img"
              sx={{
                height: 30,
                width: 30,
                // maxHeight: { xs: "none", md: "flex" },
                // maxWidth: { xs: 350, md: 250 },
                // display : { xs: "none", md: "flex" },
                mr: 1,
              }}
              alt="Logo"
              src={Logo1}
            />
            <Typography
              className="title"
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "cursive",
                fontWeight: 700,
                // letterSpacing: ".1rem",
                color: "#2E2D2D",
                textDecoration: "none",
              }}
            >
              Fresh Fields
            </Typography>
          </Box>

          {/* <PlaceIcon sx={{ fontSize: 40 }} /> */}
          <PlaceIcon sx={{ color: "#2E2D2D" }} />

          <Typography
            variant="body1"
            sx={{
              mr: "auto",
              display: { xs: "none", md: "flex" },
              color: "#2E2D2D",
              fontFamily: "serif",
              fontWeight: 300,
              fontSize: "1 rem",
            }}
          >
            Update Location
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* SHOPPING CART */}

          <ShoppingCartTwoToneIcon
            sx={{
              fontSize: 30,
              color: "#2E2D2D",
              mr: 2,
            }}
          />

          {/* Toggle the components based on if they are logged in or not*/}

          <Box>
            {isUserLoggedIn ? (
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ mr: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}> M </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </React.Fragment>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  mr: 2,
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  href="#outlined-buttons"
                  sx={{
                    color: "white",
                    mr: "auto",
                    backgroundColor: "#64b367cd",
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "#4F9452",
                    },
                  }}
                >
                  Log In
                </Button>

                <Button
                  variant="outlined"
                  href="#outlined-buttons"
                  sx={{
                    color: "white",
                    mr: "auto",
                    backgroundColor: "#64b367cd",
                    borderColor: "white",
                    "&:hover": {
                      borderColor: "white",
                      backgroundColor: "#4F9452",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Navbar;
