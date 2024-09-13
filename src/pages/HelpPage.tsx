import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';

import goal from '../assets/goal-setting.png';
import user from '../assets/user-setting.png';
import date from '../assets/date.png';
import result from '../assets/result.png';

const HelpPage: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    // Drawerを開閉する関数
    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

    // ページ遷移を行う関数
    const handleNavigation = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    // AppBarとDrawerの定義
    const renderAppBar = () => (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    モチトモ（モチベーション友達）
                </Typography>
            </Toolbar>
        </AppBar>
    );

    // Drawer内のリンクリスト
    const renderDrawer = () => (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                <ListItem component="button" onClick={() => handleNavigation('/goal-setting')}>
                    <ListItemText primary="目標設定" />
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/goal-result')}>
                    <ListItemText primary="目標達成確認" />
                </ListItem>
                <ListItem component="button" onClick={() => handleNavigation('/help')}>
                    <ListItemText primary="ヘルプ" />
                </ListItem>
            </List>
        </Drawer>
    );

    // メインコンテンツ
    const renderMainContent = () => (
        <Container>
            <Box mt={4}>
                {/* <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    覚悟を決めれば<br />
                    どんな目標も達成できる
                </Typography>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <img src={manImage} alt="Man" style={{ width: '150px', height: 'auto' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                    目標とご褒美を設定できる
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                    友達と取り組める
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }} mb={20}>
                    一人でも失敗すれば連帯責任<br />
                    ご褒美なし！
                </Typography > */}

                <Card variant="outlined">
                <Typography variant="body1" sx={{ textAlign: 'center' }} >
                    How to use ?
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }} >
                    使い方
                </Typography>

                <Typography variant="h6" sx={{ textAlign: 'center' }} mt={5}>
                    1. 目標を設定
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                    達成したい目標を記入してください
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img src={goal} alt="Goal" style={{ width: '300px', height: 'auto' }}/>
                </Box>
                
                <Typography variant="h6" sx={{ textAlign: 'center' }} mt={5}>
                    2. ユーザ情報を入力
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                    目標挑戦者の名前、達成時のご褒美、<br />
                    講座情報をそれぞれ入力してくだい
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img src={user} alt="User" style={{ width: '300px', height: 'auto' }}/>
                </Box>

                <Typography variant="h6" sx={{ textAlign: 'center' }}mt={5}>
                    3. 目標達成期限を設定
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                    目標を達成する期限を入力してください
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img src={date} alt="Date" style={{ width: '300px', height: 'auto' }}/>
                </Box>

                <Typography variant="h6" sx={{ textAlign: 'center' }} mt={5}>
                    4. 目標達成を報告
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                    ボタンを押下し、<br />
                    取り組み結果がわかる画像を<br />
                    アップロードしてください
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img src={result} alt="Result" style={{ width: '300px', height: 'auto' }}/>
                </Box>
                </Card>



                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavigation('/goal-setting')}
                    sx={{ display: 'block', margin: '0 auto', mt: 3 }}
                >
                    目標を設定する
                </Button> */}
            </Box>
        </Container>
    );

    return (
        <>
            {renderAppBar()}
            {renderDrawer()}
            {renderMainContent()}
        </>
    //     <Container maxWidth="md">
    //         {renderAppBar()}
    //         {renderDrawer()}
    //         {/* {renderMainContent()} */}
    //     <Box my={4}>
    //         <Paper elevation={3} sx={{ p: 4, background: 'linear-gradient(145deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
    //             <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
    //                 目標設定
    //             </Typography>
    //             <Grid item xs={12} key={person}>
    //                 {renderMainContent()(person)}
    //             </Grid>
    //             renderMainContent()
    //         </Paper>
    //     </Box>
    // </Container>
    );
};

export default HelpPage;