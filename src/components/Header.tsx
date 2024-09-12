// Header.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Drawerを開閉する関数
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // ページ遷移を行う関数
  const headerHandleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* AppBarの定義 */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar component="header" position="fixed" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              モチトモ
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawerの定義 */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem
            component="button"
            onClick={() => headerHandleNavigation("/goal-setting")}
            sx={{
              color: "primary",
              backgroundColor: "primary",
            }}
          >
            <ListItemText primary="目標設定" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => headerHandleNavigation("/goal-result")}
          >
            <ListItemText primary="目標達成確認" />
          </ListItem>
          <ListItem
            component="button"
            onClick={() => headerHandleNavigation("/help")}
          >
            <ListItemText primary="使い方" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
