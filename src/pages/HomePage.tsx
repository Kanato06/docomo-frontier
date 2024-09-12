import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container, Button, Paper } from "@mui/material";
import personImage from "../assets/11383_color.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // ページ遷移を行う関数
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // メインコンテンツ
  const renderMainContent = () => (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "60%" }, // レスポンシブ対応
        margin: "auto", // コンテンツを中央に配置
      }}
    >
      <Container>
        <Box mt={4} sx={{ textAlign: "center" }}>
          <Box sx={{ mb: 2 }}>
            <img
              src={personImage}
              alt="Person"
              style={{
                width: "100%", // レスポンシブ対応
                height: "auto", // レスポンシブ対応
                maxWidth: "520px", // 最大幅を設定
              }}
            />
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "2.5rem", mt: 6 }}
          >
            ようこそ、モチトモへ！
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 5 }}>
            モチトモ（モチベーション友達）は、友達と一緒に目標を掲げ、ご褒美を設定することでモチベを維持するアプリです。
            ただし、1人でも目標を達成できなければ、ご褒美は全て没収なので絶対に目標を達成しましょう！
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" gutterBottom>
            メニューから、目標設定や目標達成確認にアクセスできます。
          </Typography> */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavigation("/goal-setting")}
            sx={{
              mt: 7,
              mb: 5,
              width: "200px",
              display: "block",
              mx: "auto",
              fontSize: "1.5rem",
            }}
          >
            目標登録
          </Button>
        </Box>
      </Container>
    </Paper>
  );

  return (
    <>
      {/* Headerを組み込み */}
      <Header />
      {/* AppBarの下に余白を追加して、コンテンツが隠れないようにする */}
      <Box sx={{ mt: 8 }}></Box>
      {renderMainContent()}
    </>
  );
};

export default HomePage;
