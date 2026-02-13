"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import Link from "next/link";
import { globalState } from "../app/store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ButtonAppBar() {
  const { isLoggedIn, toggleSidebar, toggleLogin } = globalState(
    (state) => state,
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutMsg, setLogoutMessage] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const data = await response.json();
    handleClose();
    toggleLogin(false);
    router.replace("/login");
    setLogoutMessage(data.message);
  };

  console.log(logoutMsg);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">Next Blog</Link>
          </Typography>

          <div className="hidden sm:flex">
            <Link href="/">
              <Button
                color="inherit"
                sx={{
                  display: { xs: "none", sm: "block" },
                  textTransform: "none",
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="text"
                color="inherit"
                sx={{
                  display: { xs: "none", sm: "block" },
                  textTransform: "none",
                }}
              >
                Blog
              </Button>
            </Link>
            <Link href="/about">
              <Button
                color="inherit"
                sx={{
                  display: { xs: "none", sm: "block" },
                  textTransform: "none",
                }}
              >
                About
              </Button>
            </Link>

            {isLoggedIn && (
              <div className="ms-5">
                <div className="bg-sky-950 h-8 w-8 rounded-full flex justify-center items-center">
                  <Button
                    onClick={handleClick}
                    color="inherit"
                    sx={{ borderRadius: "100%", width: "2rem" }}
                  >
                    P
                  </Button>
                </div>
                <Menu
                  id="fade-menu"
                  slotProps={{
                    list: {
                      "aria-labelledby": "fade-button",
                    },
                  }}
                  slots={{ transition: Fade }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <Link href="/dashboard">
                    <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}

            {!isLoggedIn && pathname !== "/login" && (
              <Link href="/login">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0F52BA",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
          <div className="sm:hidden">
            <IconButton
              onClick={toggleSidebar}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
