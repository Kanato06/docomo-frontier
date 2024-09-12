import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Container,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Home } from '@mui/icons-material';


function HomePage() {
    return (
        <main>
            <div>
                {/* AppBarとハンバーガーメニュー */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            モチトモ（モチベーション友達）
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Drawer（ハンバーガーメニュー） */}
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <List>
                        {/* 目標設定ページへのリンク */}
                        <ListItem component="button" onClick={() => handleNavigation('/goal-setting')}>
                            <ListItemText primary="目標設定" />
                        </ListItem>

                        {/* 目標達成確認ページへのリンク */}
                        <ListItem component="button" onClick={() => handleNavigation('/goal-result')}>
                            <ListItemText primary="目標達成確認" />
                        </ListItem>
                    </List>
                </Drawer>

                {/* メインコンテンツ */}
                <Container>
                    <Box mt={4}>
                        <Typography variant="h4" gutterBottom>
                            ようこそ、モチトモへ！
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            モチトモ（モチベーション友達）は、友達と一緒に目標を設定し、達成までの進捗をお互いに確認し合いながらモチベーションを高めるためのアプリです。
                            目標を設定し、ご褒美やペナルティを設けて、楽しみながら目標を達成しましょう！
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            メニューから、目標設定や目標達成確認にアクセスできます。
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleNavigation('/goal-setting')}
                            sx={{ mt: 3 }}
                        >
                            目標を設定する
                        </Button>
                    </Box>
                </Container>
            </div>
        </main>
    );
}


export default HomePage;
