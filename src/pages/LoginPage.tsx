import { Authenticator } from "@aws-amplify/ui-react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import "@aws-amplify/ui-react/styles.css";
import { useHandleNavigation } from "../components/navigation";

const LoginPage: React.FC = () => {
  const handleNavigation = useHandleNavigation();
  return (
    <>
      <Header />
      <Box sx={{ mt: 20 }}></Box>

      <Authenticator>
        {/* 認証が成功したら handleNavigation を呼び出す */}
        {({ user }) => {
          if (user) {
            // ログイン済みなら goal-setting に遷移
            handleNavigation("/goal-setting");
          }
          return (
            <Authenticator.Provider>
              <div>ログインしてください</div>
            </Authenticator.Provider>
          );
        }}
      </Authenticator>
    </>
  );
};

export default LoginPage;
