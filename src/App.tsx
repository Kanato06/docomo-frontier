// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import GoalSettingPage from "./pages/GoalSettingPage";
import GoalResultPage from "./pages/GoalResultPage";
import HomePage from './pages/HomePage';  // ホームページをインポート
import HelpPage from './pages/HelpPage';

// テーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1',
    },
    secondary: {
      main: '#A78BFA',
    },
  },
});

function App() {

  // const [goalForTwoUsers, setUser] = useState<Array<Schema["GoalForTwoUsers"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.GoalForTwoUsers.observeQuery().subscribe({
  //     next: (data) => setUser([...data.items]),
  //   });
  // }, []);

  // function createUser() {
  //   client.models.User.create({
  //     name: "myname",
  //     email: "myemail",
  //     createdAt: 2024
  //   });
  // }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* ホームページ */}
          <Route path="/" element={<HomePage />} />

          {/* 目標設定ページ */}
          <Route path="/goal-setting" element={<GoalSettingPage/>} />

          {/* 目標達成確認ページ */}
          <Route path="/goal-result" element={<GoalResultPage />} />

          {/* ヘルプページ */}
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
