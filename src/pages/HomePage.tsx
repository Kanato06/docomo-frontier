import React from "react";
import Header from "../components/Header";
import CommonLayout from "../components/CommonLayout";
import { Typography, Box, Button } from "@mui/material";
import personImage from "../assets/11383_color.png";
import { useHandleNavigation } from "../components/navigation";

const HomePage: React.FC = () => {
  const handleNavigation = useHandleNavigation();

  return (
    <>
      <Header />
      <Box sx={{ mt: 5 }}></Box>
      <CommonLayout>
        <Box sx={{ mb: 2 }}>
          <img
            src={personImage}
            alt="Person"
            style={{ width: "100%", height: "auto", maxWidth: "520px" }}
          />
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: "2.5rem", mt: 6 }}
        >
          ようこそ <br />
          モチトモへ！
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mt: 5 }}>
          モチトモ（モチベーション友達）は、友達と一緒に目標を掲げ、ご褒美を設定することでモチベを維持するアプリです。
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigation("/login")}
          sx={{ mt: 7, mb: 5, width: "200px", fontSize: "1.5rem" }}
        >
          目標登録
        </Button>
      </CommonLayout>
    </>
  );
};

export default HomePage;
