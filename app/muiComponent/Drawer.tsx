"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { globalState } from "../app/store";
import Link from "next/link";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function TemporaryDrawer() {
  const { isLoggedIn, sidebarState, toggleSidebar, toggleLogin } = globalState(
    (state) => state,
  );

  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const data = await response.json();
    toggleLogin(false);
    console.log(data);
    router.replace("/login");
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, display: "flex", justifyContent: "center" }}
      role="presentation"
      onClick={toggleSidebar}
    >
      <List>
        <ListItem disablePadding>
          <Link href="/">
            <ListItemButton>
              <ListItemText primary="Home" sx={{ color: "primary.main" }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/blog">
            <ListItemButton>
              <ListItemText primary="Blog" sx={{ color: "primary.main" }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/about">
            <ListItemButton>
              <ListItemText primary="About" sx={{ color: "primary.main" }} />
            </ListItemButton>
          </Link>
        </ListItem>

        {isLoggedIn && (
          <ListItem disablePadding className="mt-5">
            <Button onClick={handleLogout} variant="contained" color="error">
              Logout
            </Button>
          </ListItem>
        )}

        {!isLoggedIn && (
          <ListItem disablePadding className="mt-5">
            <Link href="/login">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0F52BA",
                }}
              >
                Login
              </Button>
            </Link>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={sidebarState} anchor="right" onClose={toggleSidebar}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={toggleSidebar}
            sx={{ fontSize: "2rem", color: "red" }}
          >
            <HighlightOffRoundedIcon fontSize="large" />
          </Button>
        </Box>
        {DrawerList}
      </Drawer>
    </div>
  );
}
