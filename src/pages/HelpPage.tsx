
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     AppBar,
//     Toolbar,
//     IconButton,
//     Typography,
//     Drawer,
//     List,
//     ListItem,
//     ListItemText,
//     Box,
//     Container,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Card from '@mui/material/Card';

// import goal from '../assets/goal-setting.png';
// import user from '../assets/user-setting.png';
// import date from '../assets/date.png';
// import result from '../assets/result.png';

import React from "react";
import Header from "../components/Header";
import CommonLayout from "../components/CommonLayout"; // CommonLayoutをインポート
import { Typography, Box, Divider } from "@mui/material";
import goal from '../assets/goal-setting.png';
import user from '../assets/user-setting.png';
import date from '../assets/date.png';
import result from '../assets/result.png';
// import goal from "../assets/goal-setting.png";
// import user from "../assets/user1&user2.png";
// import date from "../assets/date.png";
// import result from "../assets/result3.png";


const HelpPage: React.FC = () => {
  return (
    <>
      <Header />
      {/* AppBarの下に余白を追加して、コンテンツが隠れないようにする */}
      <Box sx={{ mt: 5 }}></Box>
      {/* CommonLayoutで囲む */}
      <CommonLayout>
        {/* How to use?のテキストを非表示にする */}
        <Typography
          variant="body1"
          sx={{ textAlign: "center", visibility: "hidden" }}
        >
          How to use ?
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          使い方
        </Typography>

        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          1. 目標を設定
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ textAlign: "center" }}
          my={1}
        >
          達成したい目標を記入してください
        </Typography>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={goal}
            alt="Goal"
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
        </Box>
        <Divider />
        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          2. ユーザ情報を入力
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ textAlign: "center" }}
          my={1}
        >
          達成時のご褒美、
          <br />
          講座情報をそれぞれ入力してください
        </Typography>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={user}
            alt="User"
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
        </Box>
        <Divider />
        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          3. 目標達成期限を設定
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ textAlign: "center" }}
          my={1}
        >
          目標を達成する期限を入力してください
        </Typography>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={date}
            alt="Date"
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
        </Box>
        <Divider />
        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          4. 目標達成を報告
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ textAlign: "center" }}
          my={1}
        >
          ボタンを押下し、
          <br />
          取り組み結果がわかる画像を
          <br />
          アップロードしてください
        </Typography>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={result}
            alt="Result"
            style={{ width: "100%", maxWidth: "300px", height: "auto" }}
          />
        </Box>
      </CommonLayout>
    </>
  );
};

export default HelpPage;
