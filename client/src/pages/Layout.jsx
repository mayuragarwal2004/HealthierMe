/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  browserHistory,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../components/context/auth/AuthState";
import "./Layout.css";
import { signOut } from "firebase/auth";
import { auth } from "../base";
import { useData } from "../components/context/data/DataState";
// import "./css/headerfooter.css";

import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import GroupsIcon from "@mui/icons-material/Groups";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const Layout = (props) => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [menu, setmenu] = useState(false);
  const [showFooter, setshowFooter] = useState(true);
  const [showMenu, setshowMenu] = useState(true);
  const {
    date,
    setdate,
    activityNo,
    setactivityNo,
    challengeNo,
    setcommunityNo,
    data,
    activityId,
  } = useData();
  function handleClick(val) {
    setmenu(val);
  }
  const location = useLocation();

  useEffect(() => {
    if (props.footer === false) {
      setshowFooter(false);
    }
    if (props.menu === false) {
      setshowMenu(false);
    }
  }, []);

  const { currentUser } = useAuth();

  console.log({ date, activityNo, challengeNo, activityId });

  function handleSignOut() {
    if (currentUser) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }

  useEffect(() => {
    // runs on location, i.e. route, change
    setmenu(false);
  }, [location]);
  // console.log(currentUser);
  return (
    <>
      <header data-role="Header" className="navigation-header">
        <AppBar position="static" sx={{ backgroundColor: "green" }}>
          <Toolbar>
            {showMenu && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => handleClick(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HealthierME
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {showMenu && (
          <Drawer
            anchor={"right"}
            open={menu}
            onClose={() => handleClick(false)}
          >
            <Box
              sx={{
                width: 250,
              }}
              role="presentation"
              onClick={() => handleClick(false)}
              onKeyDown={() => handleClick(false)}
            >
              <List>
                {data.community.map((item, index) => (
                  <ListItem
                    disablePadding
                    onClick={() => {
                      setcommunityNo(index);
                      navigate("/");
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <SupervisorAccountIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.cName} />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
                <ListItem disablePadding onClick={() => navigate("/admin")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Switch to Admin"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={handleSignOut}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
                {/* {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))} */}
              </List>
            </Box>
          </Drawer>
        )}
      </header>

      <main className="home-main">
        <Outlet context={[menu, setmenu]} />
      </main>

      {
        <footer
          className="footer-footer section-container footer-root-class-name"
          style={{ visibility: showFooter ? "visible" : "collapse" }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            sx={{ backgroundColor: "#a90000" }}
          >
            <BottomNavigationAction
              label="Back"
              sx={{ color: "white" }}
              icon={<NavigateBeforeIcon />}
              onClick={() => navigate(-1)}
            />
            <BottomNavigationAction
              label="Members"
              sx={{ color: "white" }}
              icon={<GroupsIcon />}
            />
            <BottomNavigationAction
              label="Add data"
              sx={{ color: "white" }}
              icon={<AddCircleIcon />}
            />
            <BottomNavigationAction
              label="My Chats"
              sx={{ color: "white" }}
              icon={<ForumIcon />}
            />
            <BottomNavigationAction
              label="Profile"
              sx={{ color: "white" }}
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
        </footer>
      }
    </>
  );
};

export default Layout;
