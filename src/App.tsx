import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import GoalSettingPage from "./pages/GoalSettingPage";
import GoalResultPage from "./pages/GoalResultPage";
import HomePage from "./pages/HomePage"; // ホームページをインポート
import HelpPage from "./pages/loginPage";
import LoginPage from "./pages/loginPage";

// テーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: "#DC0000", // プライマリカラー
    },
    secondary: {
      main: "#FFDB89", // セカンダリカラー
      dark: "#850000",
    },
    background: {
      default: "#EEF2FF", // 全体の背景色
      paper: "#ffffff", // Paperコンポーネントの背景色
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* ホームページ */}
          <Route path="/" element={<HomePage />} />

          {/* 目標設定ページ */}
          <Route path="/goal-setting" element={<GoalSettingPage />} />

          {/* 目標達成確認ページ */}
          <Route path="/goal-result" element={<GoalResultPage />} />

          {/* ヘルプページ */}
          <Route path="/help" element={<HelpPage />} />

          {/* ログイン */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
