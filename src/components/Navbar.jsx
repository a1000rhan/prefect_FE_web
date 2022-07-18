import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import authstore from "../store/authStore";
import profileStore from "../store/profileStore";

const drawerWidth = 240;
const navItemsAmin = [
  "Home",
  "All Profiles",
  "All Requests",
  "Update Profile",
  "Sign Out",
];
const navItemsWorker = ["Home", "Registration", "Update Profile", "Sign out"];
const pathsAdmin = [
  "/",
  "/profiles",
  "/requests",
  "/updateProfiles",
  "/signin",
];
const pathsWorker = ["/", "/signin", "/updateProfiles", "/signin"];
function Navbar(props) {
  const navigate = useNavigate();
  const loaction = useLocation();
  const { window, location } = props;

  let showNav = "block";
  let showBtn = "block";
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",

    display:
      authstore.user?.type === "admin"
        ? (showBtn = "flex")
        : (showBtn = "none"),
  });
  let currentLocation = location.pathname;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  currentLocation === "/signin" || currentLocation === "/signup"
    ? (showNav = "none")
    : (showNav = "block");

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Perfect
      </Typography>
      <Divider />
      <List>
        {authstore.user?.type === "admin"
          ? navItemsAmin.map((item, index) => (
              <NavLink to={pathsAdmin[index]} className="nav-txt">
                <ListItem
                  key={item}
                  disablePadding
                  onClick={() => profileStore.fetchProfiles()}
                >
                  <ListItemButton sx={{ textAlign: "start" }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))
          : navItemsWorker.map((item, index) => (
              <NavLink to={pathsWorker[index]} className="nav-txt">
                <ListItem key={item} disablePadding>
                  <ListItemButton
                    sx={{
                      textAlign: "start",
                    }}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleClick = (index) => {
    if (index == 3) {
      authstore.signOut(navigate);
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: showNav }}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: "0" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Perfect
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {authstore.user?.type === "admin"
                ? navItemsAmin.map((item, index) => (
                    <NavLink to={pathsAdmin[index]} className="nav-txt">
                      <Button key={item} sx={{ color: "#fff" }}>
                        {item}
                      </Button>
                    </NavLink>
                  ))
                : navItemsWorker.map((item, index) => (
                    <NavLink to={pathsWorker[index]} className="nav-txt">
                      <Button
                        key={item}
                        sx={{ color: "#fff" }}
                        onClick={() => handleClick(index)}
                      >
                        {item}
                      </Button>
                    </NavLink>
                  ))}
            </Box>
            {loaction.pathname === "/requests/createRequest" ? (
              <></>
            ) : (
              <Link to="/requests/createRequest">
                <StyledFab color="primary" aria-label="add">
                  <AddIcon />
                </StyledFab>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
