import React from "react";
import Header from "../components/Header";
import { Typography, Box, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import goal from "../assets/goal-setting.png";
import user from "../assets/user1&user2.png";
import date from "../assets/date.png";
import result from "../assets/result3.png";

const HelpPage: React.FC = () => {
  // メインコンテンツ
  const renderMainContent = () => (
    <Box mt={4}>
      <Card variant="outlined">
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          How to use ?
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          使い方
        </Typography>

        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          1. 目標を設定
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          達成したい目標を記入してください
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={goal}
            alt="Goal"
            style={{ width: "300px", height: "auto" }}
          />
        </Box>
        <Divider />
        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          2. ユーザ情報を入力
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          目標挑戦者の名前、達成時のご褒美、
          <br />
          講座情報をそれぞれ入力してくだい
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={user}
            alt="User"
            style={{ width: "300px", height: "auto" }}
          />
        </Box>

        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          3. 目標達成期限を設定
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          目標を達成する期限を入力してください
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={date}
            alt="Date"
            style={{ width: "300px", height: "auto" }}
          />
        </Box>

        <Typography variant="h6" sx={{ textAlign: "center" }} mt={5}>
          4. 目標達成を報告
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
          ボタンを押下し、
          <br />
          取り組み結果がわかる画像を
          <br />
          アップロードしてください
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <img
            src={result}
            alt="Result"
            style={{ width: "300px", height: "auto" }}
          />
        </Box>
      </Card>
    </Box>
  );

  return (
    <>
      <Header />
      {/* AppBarの下に余白を追加して、コンテンツが隠れないようにする */}
      <Box sx={{ mt: 10 }}></Box>
      {renderMainContent()}
    </>
  );
};

export default HelpPage;
