import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material';
import GoalSettingPage from './GoalSettingPage';
import GoalResultPage from './GoalResultPage';
import HomePage from './HomePage';  // ホームページをインポート

const client = generateClient<Schema>();

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
  useEffect(() => {
    client.models.User.observeQuery().subscribe({
      next: (data) => setUser([...data.items]),
    });
  }, []);

  const [user, setUser] = useState<Array<Schema["User"]["type"]>>([]);

  function createUser() {
    client.models.User.create({
      name: "myname",
      email: "myemail",
      createdAt: 2024
    });
  }

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // メニューを閉じる
  };


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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}




export default App;
