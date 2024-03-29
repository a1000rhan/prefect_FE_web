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
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import authstore from "../store/authStore";
import profileStore from "../store/profileStore";
import * as Icon from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

function Navbar(props) {
  const { t, i18n } = useTranslation();
  const navItemsAmin = [
    t("home"),
    t("allProfiles"),
    t("allRequests"),
    t("updateProfile"),
  ];
  const navItemsWorker = [t("home"), t("updateProfile")];
  const pathsAdmin = ["/", "/profiles", "/requests", "/updateProfiles"];
  const pathsWorker = ["/", "/updateProfiles"];
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

  const handleClick = (e) => {
    e.preventDefault();

    authstore.signOut(navigate);
  };
  currentLocation === "/signin" || currentLocation === "/signup"
    ? (showNav = "none")
    : (showNav = "block");

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <div className="top-nav">
          <Icon.Power className="nav-icon" onClick={handleClick} />
          Perfect &emsp;
          <Icon.Translate
            size={30}
            onClick={() => {
              if (i18n.language === "ar") {
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                document
                  .getElementsByTagName("html")[0]
                  .setAttribute("dir", "ltr");
              } else {
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
                document
                  .getElementsByTagName("html")[0]
                  .setAttribute("dir", "rtl");
              }
            }}
          />
        </div>
      </Typography>
      <Divider />
      <List>
        {authstore.user?.type === "admin"
          ? navItemsAmin.map((item, index) => (
              <NavLink
                to={pathsAdmin[index]}
                color="#ff44fd"
                className="nav-txt"
              >
                <ListItem
                  key={index}
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
              <NavLink
                to={pathsWorker[index]}
                color="#ff44fd"
                className="nav-txt"
              >
                <ListItem key={index} disablePadding>
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

  return (
    <React.Fragment>
      <Box sx={{ display: showNav }}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: "0", height: "60px" }}
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
                      <Button key={item} sx={{ color: "#fff" }}>
                        {item}
                      </Button>
                    </NavLink>
                  ))}
            </Box>
            {loaction.pathname === "/requests/createRequest" ? (
              <></>
            ) : (
              <NavLink to="/requests/createRequest">
                <StyledFab className="addBtn" color="primary" aria-label="add">
                  <AddIcon />
                </StyledFab>
              </NavLink>
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
            className="drawer"
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                right: "0",
                width: drawerWidth,
                backgroundColor: "#f0f7ff",
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
