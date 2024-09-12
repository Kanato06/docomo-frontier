// components/navigation.ts
import { useNavigate } from "react-router-dom";

// ページ遷移を行う関数を定義
export const useHandleNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return handleNavigation;
};
