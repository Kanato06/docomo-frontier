// components/CommonLayout.tsx
import React from "react";
import { Paper, Box, Container, useTheme } from "@mui/material";

// childrenを受け取り、レイアウトを提供する共通コンポーネント
const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
        margin: "auto",
        minHeight: "calc(100vh - 64px)", // AppBarの高さを引いた分、Paperが画面全体を覆うようにする
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // コンテンツを縦に中央揃え
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center" }}>{children}</Box>
      </Container>
    </Paper>
  );
};

export default CommonLayout;
